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
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const tutorialSteps = [
  {
    label: "The  Witch`s heart",
    imgPath:"https://wallpaperaccess.com/full/1663371.jpg"
  },
  {
    label: "St. Regis Berries Boom",
    imgPath:"https://www.smithjournal.com.au/images/blogs/2017/Behind_the_Scenes_of_the_Original_Blade_Runner_Models/cocktailFINAL/Cocktail_1.jpg"  },
 {
    label: "The Bahhus",
    imgPath:"https://www.1802house.com/wp-content/uploads/2018/06/cocktails-slide.jpg"
  },
  {
    label: "Mezcal Sour",
    imgPath:"https://americansocialbar.com/wp-content/uploads/2016/07/Cool-Cocktails-for-a-Hot-Summer-in-Miami-Bond-edit.jpg"  },
  {
    label: "Whiskey Smash",
    imgPath:"https://www.thespruceeats.com/thmb/um-o_60dJ3P3iYYsE-jfSlsHtHs=/4000x2667/filters:no_upscale():max_bytes(150000):strip_icc()/Floradora-Cocktail-3e5eb09045ff4764a60bd818a5985af0.jpg"
  },
  {
    label: "Clover club",
    imgPath:
      "https://assets.punchdrink.com/wp-content/uploads/2017/04/Slide-Clover-Club-Egg-White-Cocktails-Boston-Sour-Clover-Club-Recipe-1024x576.jpg",
  },
  {
    label: "Strawbery rum cocktail",
    imgPath:"https://images.unsplash.com/photo-1485265449635-ca623a55e95c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
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
    height: 400, //was 450 looks good for web but not for mobile
    display: "block",
    // maxWidth: 400,
    overflow: "hidden",
    width: "100%",
  },
}));

function SwipeableTextMobileStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  // const ingredientsArr = props.ingredients;
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  return (
    <div className={classes.root} >
      <div id="carousel1">
      <Paper square elevation={0} className={classes.header} align="center">
        <Typography variant="h5" component="h5" color="primary">{tutorialSteps[activeStep].label}</Typography>
      </Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((ingredient, index) => (
          <div key={ingredient.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img
                className={classes.img}
                src={ingredient.imgPath}
                alt={ingredient.label}
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
  );
}

export default SwipeableTextMobileStepper;
