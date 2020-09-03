import React, {useEffect, useState} from 'react'
import axios from 'axios';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import SwipeableTextMobileStepper from './Carousel';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 400,
      flexGrow: 1,
    },
    header: {
      display: "flex",
      alignItems: "center",
      height: 50,
      paddingLeft: theme.spacing(4),
      backgroundColor: theme.palette.background.default,
    },
    img: {
      height: 255,
      display: "block",
      maxWidth: 400,
      overflow: "hidden",
      width: "100%",
    },
  }));

export default function HomePape() {
    const [ingredient, setIngredient] = useState('')
    const [switch1, setSwitch1] = useState(false)
    // const classes = useStyles()
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = ingredients.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };
    useEffect(() => {
        const func =  async () => {
            try {
                const {data} = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum') 
                // console.log('data', data)
                const ingr = data.drinks.slice(0, 8)
                console.log(ingr)
                setIngredient(ingr)
            } catch (error) {
                console.log(error)
            }
        }
        if (!switch1) {
            setSwitch1(true)
            func()
        }
    })
    // const ingredientsArray = ingredient
    // console.log(ingredient, 'short list')
    return(
        <div>
        <img className="mainPic" 
             src="https://i.ibb.co/0Jhtp3b/Cheers-3.png"/>
    <div className={classes.root}>
      <h1>hello</h1>
      <Paper square elevation={0} className={classes.header}>
        <Typography>{ingredients[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {ingredients.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>

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