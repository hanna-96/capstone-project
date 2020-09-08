import React, {useEffect, useState} from 'react'
import axios from 'axios';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
        height: "150px",
        // paddingTop: '56.25%', // 16:9
      },
  });

export default function HomePape() {
    const [ingredient, setIngredient] = useState('')
    const [switch1, setSwitch1] = useState(false)
    const classes = useStyles()

    useEffect(() => {
        const func =  async () => {
            try {
                const {data} = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php') 
                console.log('data', data)
                setIngredient(data.drinks[0])
                // setSwitch1(true)
            } catch (error) {
                console.log(error)
            }
        }
        if (!switch1) {
            setSwitch1(true)
            func()
        }
    })

    console.log(typeof ingredient.strDrinkThumb)
    return(
        <div>
            {ingredient && 
        (<div>
        <img className="mainPic" 
             src="https://i.ibb.co/0Jhtp3b/Cheers-3.png"/>

             <Card className={classes.root} color='primary' variant='outlined'>
             <CardMedia
        className={classes.media}
        component="img"
        image={ingredient.strDrinkThumb}
        title={ingredient.strDrink}
      />
      <Typography variant="body2" color="textSecondary" component="p">
      {ingredient.strInstructions}
      </Typography>
        </Card>
        </div>)}
        </div>
    )
}