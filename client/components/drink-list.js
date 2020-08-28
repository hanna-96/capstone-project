import React from 'react'

const DrinkList = (props) => {
    // const {drinks} = props
   

    console.log(history)
    return (
        <div>
      { history.state !== undefined && history.state !== null ? history.state.state.drinkList.map ((drink) => {

        return (
          <div>
        <p><img src={drink.strDrinkThumb} /></p>
          
        <p>Drink Name: {drink.strDrink}</p>
        </div>
        )
      }
 
        ) : <div>No good</div>}
        </div>
    )

}


export default DrinkList