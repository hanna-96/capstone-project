import React from 'react'
import {Link} from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const DrinkList = (props) => {

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
  let drinks = []
  if (history.state.state) {
    drinks = history.state.state.drinkList.reduce((acc, v) => {
      let s = false
      v.relevance = 1
      for (let i = 0; i < acc.length; i++) {
        if (acc[i].idDrink === v.idDrink) {
          acc[i].relevance += 1
          s = true
        }
      }
      if (!s) acc.push(v)
      return acc
    }, [])
    .sort((a, b) => b.relevance - a.relevance)
  }
  return (
    <div className='for-centering-container'>
      <h3 id='search-results'>Search results:</h3>
      <div className='all-drinks-container'>
      { history.state.state !== undefined && history.state.state !== null ?
        drinks.map(drink => {
          return (
            <div className={classes.root} key={drink.idDrink} className='drink-list-thumb'>
              <img src={drink.strDrinkThumb} className='drink-img-all' />
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                <Link to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }}>{drink.strDrink}</Link>
              </Typography>
            </div>
          )}) : null}
      </div>
    </div>)
}


export default DrinkList

