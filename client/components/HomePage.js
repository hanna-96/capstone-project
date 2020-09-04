import React, { useEffect, useState } from "react";
import axios from "axios";
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from "@material-ui/core/styles";
// import Typography from '@material-ui/core/Typography';
import SwipeableTextMobileStepper from "./CarouselForHomePage";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       maxWidth: 400,
//       flexGrow: 1,
//     },
//     header: {
//       display: "flex",
//       alignItems: "center",
//       height: 50,
//       paddingLeft: theme.spacing(4),
//       backgroundColor: theme.palette.background.default,
//     },
//     img: {
//       height: 255,
//       display: "block",
//       maxWidth: 400,
//       overflow: "hidden",
//       width: "100%",
//     },
//   }));

const HomePape = (props) => {
  //added props here so that we could use it for useEffect
  const [ingredient, setIngredient] = useState([]);
  // const [switch1, setSwitch1] = useState(false);
  // const classes = useStyles()

  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await axios.get(
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum"
        );
        console.log("data", data);
        const ingr = data.drinks.slice(16, 21);
        console.log(ingr);
        setIngredient(ingr);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, [props]); //props goes from undefined to defined when the component initially renders, so it's safe to use here

  console.log(ingredient, "short list");
  return (
    <div>
      <React.Fragment>
        <img className="mainPic" src="https://i.ibb.co/0Jhtp3b/Cheers-3.png" />
        <SwipeableTextMobileStepper ingredients={ingredient} />
      </React.Fragment>
    </div>
  );
};
export default HomePape;

{
  /* <Card className={classes.root} color='primary' variant='outlined'>
<CardMedia
className={classes.media}
component="img"
image={ingredient.strDrinkThumb}
title={ingredient.strDrink}
/>
<Typography variant="body2" color="textSecondary" component="p">
{ingredient.strInstructions}
</Typography> */
}
// </Card>
