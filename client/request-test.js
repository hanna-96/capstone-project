
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import RequestFilter from './request-filter'

const Request = (props) => { 

  const [drinkList, setDrinks] = useState([])

  const [len, setLen] = useState([])
  const {ingreds} = props
  console.log('the ingreds', ingreds)

  useEffect( () => {

    const getDrinks = async (ing)  => {
      try {
        const {data} =await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
        const {drinks} = data
        setDrinks(prevDrinks => [...prevDrinks,...drinks])
        setLen(prevLen => [...prevLen, drinks.length ])
      } catch (error) {
        console.log(error);
      }

    }
    ingreds.forEach( async ing => {
      console.log('in the forEach')
      await getDrinks(ing)
    })
}, [ingreds])


  return (


    <div>
      { 
      drinkList.length  ?
      
      <div>
        {console.log(drinkList, 'the drinks')}
      {/* {console.log(ingreds)} */}
        <p><img src={drinkList[0].strDrinkThumb} /></p>
        <h1>hi</h1>
        <p>Drink of the Day : {drinkList[0].strDrink}</p>
        </div>
 : <div> Bleh...
   </div>} 
        </div>

  )
      }


export default Request
