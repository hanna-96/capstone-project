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
    const bull = <span className={classes.bullet}>•</span>;
    return (
        <div>
            
      { history.state.state !== undefined && history.state.state !== null ? history.state.state.drinkList.map((drink) => {

        return (
          <div>
           <Card className={classes.root}>
           <CardContent>
        <p><img src={`${drink.strDrinkThumb}/preview`} /></p>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        <p>  Drink Name: <Link to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }}>{drink.strDrink}</Link></p>
  </Typography>
        
        </CardContent>
        </Card>
        </div>
        )
      }
 
        ) : <div></div>}
        </div>
    )

}


export default DrinkList

