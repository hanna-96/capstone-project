import React, {useEffect, useState} from 'react'
import axios from 'axios';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import SwipeableTextMobileStepper from './Carousel';

export default function HomePape() {
    // const [ingredient, setIngredient] = useState('')
    // const [switch1, setSwitch1] = useState(false)
    // // const classes = useStyles()

    // useEffect(() => {
    //     const func =  async () => {
    //         try {
    //             const {data} = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum') 
    //             // console.log('data', data)
    //             const ingr = data.drinks.slice(0, 8)
    //             console.log(ingr)
    //             setIngredient(ingr)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
        // if (!switch1) {
        //     setSwitch1(true)
        //     func()
        // }
    // })
    // const ingredientsArray = ingredient
    // console.log(ingredient, 'short list')
    return(
        <div>
        <React.Fragment>
        <img className="mainPic" 
             src="https://i.ibb.co/0Jhtp3b/Cheers-3.png"/>
        <SwipeableTextMobileStepper />
        </React.Fragment>
        </div>
    )
}



{/* <Card className={classes.root} color='primary' variant='outlined'>
<CardMedia
className={classes.media}
component="img"
image={ingredient.strDrinkThumb}
title={ingredient.strDrink}
/>
<Typography variant="body2" color="textSecondary" component="p">
{ingredient.strInstructions}
</Typography> */}
// </Card>