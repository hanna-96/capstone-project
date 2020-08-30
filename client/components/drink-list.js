import React from "react";
import { Link } from "react-router-dom";

const DrinkList = (props) => {
  // const {drinks} = props

  // console.log(history)
  return (
    <div>
      {history.state !== undefined && history.state !== null ? (
        history.state.state.drinkList.map((drink) => {
          return (
            <div>
              <p>
                <img src={drink.strDrinkThumb} />
              </p>

              <p>
                Drink Name:{" "}
                <Link
                  to={{
                    pathname: `/results/${drink.idDrink}`,
                    state: { id: drink.idDrink },
                  }}
                >
                  {drink.strDrink}
                </Link>
              </p>
            </div>
          );
        })
      ) : (
        <div>No good</div>
      )}
    </div>
  );
};

export default DrinkList;
