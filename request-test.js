import axios from 'axios'
import React, {useEffect, useState} from 'react'


const Request = () => { 

  const [drinks, setDrinks] = useState([])

  const [didRun, setDidRun] = useState(false)

  useEffect( () => {
    const getDrink = async ()  => {
      try {
        const {data}= await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lime_juice');
        const {drinks} = data
        setDrinks(drinks)

      } catch (error) {
        console.log(error);
      }

    }

  if(!drinks.length && !didRun) {
    getDrink()
    setDidRun(true)
    
  }
  } )

  return (
    
    <div>
      {console.log(drinks)}
      { drinks.length ? <div>
        <p><img src={drinks[0].strDrinkThumb} /></p>
        <p>Drink of the Day : {drinks[0].strDrink}</p>
        </div> : <div></div>} 
        </div>
    
  )
}


export default Request

// async function getDrink(...ingridents) {
//     try {
//       const {data}= ingridents.forEach( (ing) => await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`));
//       const drinks = data.drinks.map( (drink) => drink.strDrink)
//       console.log(drinks)
//      return drinks
//     } catch (error) {
//       console.error(error);
//     }
//   }

// const drinks = getDrink(lime_juice)

// console.log(drinks)
