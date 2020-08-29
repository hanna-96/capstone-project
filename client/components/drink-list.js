import React from 'react'
import {Link} from 'react-router-dom'

const DrinkList = (props) => {
    // const {drinks} = props
    return (
        <div>
      { history.state.state !== undefined && history.state.state !== null ? history.state.state.drinkList.map((drink) => {

        return (
          <div>
        <p><img src={`${drink.strDrinkThumb}/preview`} /></p>
          
        <p>Drink Name:  <Link to={{ pathname: `/results/${drink.idDrink}`, state: {id: drink.idDrink} }}>{drink.strDrink}</Link></p>
        </div>
        )
      }
 
        ) : <div>No good</div>}
        </div>
    )

}


export default DrinkList