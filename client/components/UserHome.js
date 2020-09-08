import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter} from "react-router-dom";
// import Link from "@material-ui/core/Link";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SwipeableTextMobileStepper from "./Carousel";
import { getFavoriteDrinks } from "../redux/drinks"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import IconButton from '@material-ui/core/IconButton'

const UserHome = (props) => {

  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    const faves = props.user.favorites.length > 10 ? props.user.favorites.slice(0, 10) : props.user.favorites
    props.getFavorites(faves, 'favorites')
    const getIngredients = () => {
      // const userHomeIngredients = []
      const userHomeIngredients = props.user.ingredients > 10 ? props.user.ingredients.slice(0, 10) : props.user.ingredients
      const a = userHomeIngredients.map(i => ({
        name: i,
        img: `https://www.thecocktaildb.com/images/ingredients/${i}-small.png`
      }))
      setIngredients(a)
    }
    if (props.user.ingredients) getIngredients()
  }, [props.user])

  //grabs the scrollable element
  const faveRef = useRef()
  const ingRef = useRef()
  //scrolls the scrollable element
  const handleScroll = (dir, ref) => {
    if (dir === 'forwards') ref.current.scrollLeft += Math.ceil(window.outerWidth/2)
    else ref.current.scrollLeft -= Math.ceil(window.outerWidth/2)
  }

  const {userName} = props.user
  return (
    <div className='for-centering-container'>
      <div align="center" className = "userHome"> 
        <Typography variant="h3" component="h3" >
          Welcome {userName}!
        </Typography>
        <div>
          <br />
          <Typography variant="h4" component="h6" >
              Featured Drinks
          </Typography>
        </div>
        <SwipeableTextMobileStepper className="carousel"/>
      </div>

      {/* /////////////////////////FAVORITES ELEMENT/////////////////////////// */}

      { props.user.favorites.length &&
      <div className='user-home-bar'>
        <IconButton className='block' onClick={() => handleScroll('backwards', faveRef)}>
          <ArrowBackIosIcon />
        </IconButton>
        <div id='favorites-bar'>
          <div className='bar-info'>
            <span>{`favorite cocktails | `}</span>
            <Link to={`/users/${props.user.userName}/allFavorites`} className='see-all-favorites-link mui-like'>see all</Link>
          </div>
          <div className='favorites-view' ref={faveRef}>
              {
              props.favorites.map(drink =>
                <Link to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }} className='favorite-drink-thumb mui-like' key={drink.idDrink} >
                  <img src={drink.strDrinkThumb + '/preview'} className='favorite-drink-img' />
                  {drink.strDrink}
                </Link>
              )}
          </div>
        </div>
        <IconButton className='block' onClick={() => handleScroll('forwards', faveRef)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      }

      {/* /////////////////////////INGREDIENTS ELEMENT/////////////////////////// */}

      { ingredients.length &&
      <div className='user-home-bar'>
        <IconButton className='block' onClick={() => handleScroll('backwards', ingRef)}>
          <ArrowBackIosIcon />
        </IconButton>
        <div id='favorites-bar'>
          <div className='bar-info'>
            <span>{`inside your cabinet | `}</span>
            <Link to={`/users/${props.user.userName}/cabinet`} className='see-all-favorites-link mui-like'>see all</Link>
          </div>
          <div className='favorites-view' ref={ingRef}>
            {
            ingredients.map((ingredient, i) =>
                <div className='favorite-drink-thumb' key={i}>
                  <img src={ingredient.img} className='favorite-drink-img' />
                  {ingredient.name}
                </div>
            )}
          </div>
        </div>
        <IconButton className='block' onClick={() => handleScroll('forwards', ingRef)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      }
  </div>
  );
};

const mapState = (state) => {
  console.log('userhome state',state)
  return {
    user: state.user,
    favorites: state.drinks.favorites
  };
};

const mapDispatch = dispatch => ({
  getFavorites: (drinks, type) => dispatch(getFavoriteDrinks(drinks, type))
})

export default connect(mapState, mapDispatch)(UserHome)
