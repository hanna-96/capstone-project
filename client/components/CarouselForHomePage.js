import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import ingredients from "../redux/ingredients";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
// const tutorialSteps = [
//   {
//     label: "The  Witch`s heart",
//     imgPath:
//       "https://www.theflavorbender.com/wp-content/uploads/2015/10/Witch-Heart-Halloween-Cocktail-The-Flavor-Bender-Featured-Image-SQ-3-500x375.jpg",
//   },
//   {
//     label: "St. Regis Berries Boom",
//     imgPath:
//       "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
//   },
//   {
//     label: "The Bahhus",
//     imgPath:
//       "https://i.pinimg.com/originals/86/cd/2d/86cd2d17121e4f9d43c7e5587029d4dd.jpg",
//   },
//   {
//     label: "Mezcal Sour",
//     imgPath:
//       "https://d194ip2226q57d.cloudfront.net/images/Mezcal-Sour_Tequila-and-Mezcal_By-Brandon-Alms.original.jpg",
//   },
//   {
//     label: "Whiskey Smash",
//     imgPath:
//       "https://www.thecocktailproject.com/sites/default/files/Makers_Mark_Whiskey_Smash_Thumb.jpg",
//   },
//   {
//     label: "Clover club",
//     imgPath:
//       "https://assets.punchdrink.com/wp-content/uploads/2017/04/Slide-Clover-Club-Egg-White-Cocktails-Boston-Sour-Clover-Club-Recipe-1024x576.jpg",
//   },
//   {
//     label: "Strawbery rum cocktail",
//     imgPath:
//       "https://i2.wp.com/buythiscookthat.com/wp-content/uploads/2019/04/Strawberry-Mint-Rum-Cocktail-2.jpg",
//   },
// ];

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

function SwipeableTextMobileStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const ingredientsArr = props.ingredients;
  const maxSteps = ingredientsArr.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  console.log("PROPS", props);
  console.log(" ingredients arr in carousel", ingredientsArr);
  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        {/* <Typography>{ingredientsArr[activeStep].strDrink}</Typography> */}
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {ingredientsArr.map((ingredient, index) => (
          <div key={ingredient.strDrink}>
            <p>{ingredient.strDrink}</p>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={ingredient.strDrinkThumb}
                alt={ingredient.strDrink}
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
  );
}

export default SwipeableTextMobileStepper;
