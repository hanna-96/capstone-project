import React, { useEffect, useRef } from "react"
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SwipeableTextMobileStepper from "./Carousel";
import { getFavoriteDrinks } from "../redux/drinks"
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

const UserHome = (props) => {

  useEffect(() => {
    const faves = props.user.favorites.length > 10 ? props.user.favorites.slice(0, 10) : props.user.favorites
    props.getFavorites(faves, 'favorites')
  }, [props.user])

  //grabs the scrollable element
  const faveRef = useRef()
  //scrolls the scrollable element
  const handleScroll = dir => {
    if (dir === 'forwards') faveRef.current.scrollLeft += Math.ceil(window.outerWidth/2)
    else faveRef.current.scrollLeft -= Math.ceil(window.outerWidth/2)
  }

  return (
    <React.Fragment>
      <div align="center" className = "userHome"> 
        <Typography variant="h3" component="h3" >
          Welcome {props.userName}!
        </Typography>
        <div>
          <br />
          {/* <Link to={`/users/${props.userName}/cabinet`}>Recently made drinks</Link> */}
          <Typography variant="h6" component="h6" >
            <Link to={`/users/${props.userName}/cabinet`} className='mui-like'>
              Recently made drinks
            </Link>
          </Typography>
        </div>
        <SwipeableTextMobileStepper />
        <Button variant="contained" href="/scan" align="center" className="scan-btn" color="primary">
          Scan items
        </Button>
      </div>
      { props.user.favorites.length &&
      <div className='the-last-one-i-swear'>
        <button className='block' onClick={() => handleScroll('backwards')}>
          <ArrowBackIosIcon />
        </button>
        <div id='favorites-bar'>
          <div className='bar-info'>
            <span>{`favorite cocktails | `}</span>
            <Link to={`/users/${props.user.userName}/allFavorites`} className='see-all-favorites-link mui-like'>see all</Link>
          </div>
          <div id='favorites-view' ref={faveRef}>
              {
              props.favorites.map(drink =>
                  <Link to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }} className='favorite-drink-thumb mui-like' key={drink.idDrink} >
                    <img src={drink.strDrinkThumb + '/preview'} className='favorite-drink-img' />
                    {drink.strDrink}
                  </Link>
              )}
          </div>
        </div>
        <button className='block' onClick={() => handleScroll('forwards')}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      }
      { props.user.ingredients.length &&
      <div className='the-last-one-i-swear'>
        <button className='block' onClick={() => handleScroll('backwards')}>
          <ArrowBackIosIcon />
        </button>
        <div id='favorites-bar'>
          <div className='bar-info'>
            <span>{`favorite cocktails | `}</span>
            <Link to={`/users/${props.user.userName}/allFavorites`} className='see-all-favorites-link mui-like'>see all</Link>
          </div>
          <div id='favorites-view' ref={faveRef}>
              {
              props.favorites.map(drink =>
                  <Link to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }} className='favorite-drink-thumb mui-like' key={drink.idDrink} >
                    <img src={drink.strDrinkThumb + '/preview'} className='favorite-drink-img' />
                    {drink.strDrink}
                  </Link>
              )}
          </div>
        </div>
        <button className='block' onClick={() => handleScroll('forwards')}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      }
  </React.Fragment>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
    favorites: state.drinks.favorites
  };
};

const mapDispatch = dispatch => ({
  getFavorites: (drinks, type) => dispatch(getFavoriteDrinks(drinks, type))
})

export default connect(mapState, mapDispatch)(UserHome)