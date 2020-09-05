import React from 'react'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const DrinkList = (props) => {
  const favorites = useSelector(state => state.user.favorites)
  const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  const classes = useStyles();

  const favoriteCheck = new Map()
  if (favorites) favorites.forEach(f => favoriteCheck.set(f, true))

  return (
    <div className='for-centering-container'>
      <h3 id='search-results'>Search results:</h3>
      <div className='all-drinks-container'>
      { history.state.state !== undefined && history.state.state !== null ?
        history.state.state.drinkList.map(drink => {
          return (
            <div className={classes.root} key={drink.idDrink} className='drink-list-thumb'>
              <img src={drink.strDrinkThumb} className='drink-img-all' />
              {favoriteCheck.has(drink.idDrink) ? <FavoriteBorderIcon className='heart-icon' fontSize='large'/> : null}
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                <Link className='mui-like' to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }}>{drink.strDrink}</Link>
              </Typography>
            </div>
          )}) : null}
      </div>
    </div>)
}


export default DrinkList

