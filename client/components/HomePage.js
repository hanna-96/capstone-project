import React, { useEffect, useState } from "react";
import axios from "axios";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import SwipeableTextMobileStepper from "./Carousel";

const HomePape = (props) => {
  const [ingredient, setIngredient] = useState([]);
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
        <CssBaseline />
        <Container maxWidth="xl" id="container"> 

          <Typography
            component="div"
            style={{ backgroundColor: "none", height: "100vh"}}
          >
            {/* <h1>Mixologist</h1> */}
            <Typography variant="h2" component="h3" align="center" color="primary">
         Scan,shake & sip!
        </Typography>
            <SwipeableTextMobileStepper ingredients={ingredient}  />
          </Typography>
        {/* <img className="mainPic" src="https://i.ibb.co/0Jhtp3b/Cheers-3.png" /> */}

        </Container>
      </React.Fragment>
    </div>
  );
};
export default HomePape;


