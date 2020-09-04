import React, { useEffect } from "react";
// import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { withRouter} from "react-router-dom";
import Link from "@material-ui/core/Link";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SwipeableTextMobileStepper from "./Carousel";
import { getFavoriteDrinks } from "../redux/drinks";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import TabScrollButton from '@material-ui/core/TabScrollButton'


// import classNames from 'classnames';
const UserHome = (props) => {
  const {userName} = props.user
  return (
    <React.Fragment>
      <div align="center" className = "userHome"> 
        <Typography variant="h3" component="h3" >
          Welcome {userName}!
        </Typography>
        <div>
          <br />
          {/* <Link to={`/users/${props.userName}/cabinet`}>Recently made drinks</Link> */}
          <Typography variant="h6" component="h6" >
    <Link href={`/users/${userName}/cabinet`} >
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
      <div id='the-last-one-i-swear'>
        <button className='block'>
          <ArrowBackIosIcon />
        </button>
        <div id='favorites-bar'>
          <span>favorite cocktails</span>
          <div id='favorites-view'>
              {
              props.drinks.map(drink =>
                // <div className='favorite-drink-thumb' key={drink.idDrink}>
                  <Link to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }} className='favorite-drink-thumb mui-like' key={drink.idDrink}>
                    <img src={drink.strDrinkThumb + '/preview'} className='favorite-drink-img' />
                    {drink.strDrink}
                  </Link>
                // </div>
              )}
            <Link id='see-all-favorites-link mui-like'>See all</Link>
          </div>
        </div>
        <button className='block'>
          <ArrowForwardIosIcon />
        </button>
      </div>
      }
  </React.Fragment>
  );
};

const mapState = (state) => {
  console.log('userhome state',state)
  return {
    user: state.user,
    drinks: state.drinks.favorites
  };
};

// const mapDispatch = dispatch => ({
//   getFavorites: (drinks, type) => dispatch(getFavoriteDrinks(drinks, type))
// })

// export default connect(mapState, mapDispatch)(UserHome);
// export default connect(mapState, null)(withStyles(styles)(UserHome))
/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   classes: PropTypes.object.isRequired,
// };
export default connect(mapState, null)(UserHome);
