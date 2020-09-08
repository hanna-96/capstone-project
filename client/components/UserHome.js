import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles'
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SwipeableTextMobileStepper from "./Carousel";
import { getFavoriteDrinks } from "../redux/drinks"

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  scrollBar: {
    '&::-webkit-scrollbar': {
      height: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.15)',
      outline: '1px solid slategrey'
    }
  }
}));
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

  const classes = useStyles()
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

      { props.user.favorites &&
      <div className='user-home-bar'>
        <div id='favorites-bar'>
          <div className='bar-info'>
            <span>{`favorite cocktails | `}</span>
            <Link to={`/users/${props.user.userName}/allFavorites`} className='see-all-favorites-link mui-like'>see all</Link>
          </div>
          <div className={`${classes.scrollBar} items-view ${!props.favorites.length ? 'empty' : ''}`}>
              {
              props.favorites.length ?
              props.favorites.map(drink =>
                <Link to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }} className='favorite-drink-thumb mui-like' key={drink.idDrink} >
                  <img src={drink.strDrinkThumb + '/preview'} className='favorite-drink-img' />
                  {drink.strDrink}
                </Link>
              ) : <div className='empty'>No favorites yet. <Link to={`/users/${userName}`} className='mui-like'>Add some now!</Link></div>
              }
          </div>
        </div>
      </div>
      }

      {/* /////////////////////////INGREDIENTS ELEMENT/////////////////////////// */}

      { ingredients &&
      <div className='user-home-bar'>
        <div id='favorites-bar'>
          <div className='bar-info'>
            <span>{`inside your cabinet | `}</span>
            <Link to={`/users/${props.user.userName}/cabinet`} className='see-all-favorites-link mui-like'>see all</Link>
          </div>
          <div className={`${classes.scrollBar} items-view ${!ingredients.length ? 'empty' : ''}`}>
            {
            ingredients.length ?
            ingredients.map((ingredient, i) =>
                <div className='favorite-drink-thumb' key={i}>
                  <img src={ingredient.img} className='favorite-drink-img' />
                  {ingredient.name}
                </div>
            ) : <div className='empty'>Nothing in your cabinet yet. <Link to={`/users/${userName}`} className='mui-like'>Add some ingredients now!</Link></div>
            }
          </div>
        </div>
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
