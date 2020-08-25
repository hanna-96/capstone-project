import axios from 'axios'
import React, {useEffect, useState} from 'react'
import RequestId from './request-id'

const Request = () => { 
  const allDrinks = []
  const [drinkList, setDrinks] = useState([])


  const [len, setLen] = useState([])
  
  const [skip, setSkip] = useState([])
  const ingreds = ['lime_juice', 'sauce', 'tequila', 'gin', 'testt', 'vodka', 'blah', 'whiskey']

  useEffect( () => {
    
    
    const getDrinks = async (ing, idx)  => {
      
      try {
        const {data} =await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`) || ''
        if(typeof data !== 'string') {
          const {drinks} = data
          setDrinks(prevDrinks => [...prevDrinks,...drinks])
          setLen(prevLen => [...prevLen, drinks.length ])
        }
        else {
          setDrinks(prevDrinks => [...prevDrinks])
          setLen(prevLen => [...prevLen])
          setSkip(prev => [...prev,idx])
          
        }
      } catch (error) {
        console.log(error);
      }
      
    }
   
    ingreds.forEach( async (ing, idx) => await getDrinks(ing, idx))
    
}, [])

 

  return (
    
    
    <div>
      {console.log(len, skip, ingreds)}
      {skip.length ? skip.forEach( (val) => ingreds.splice(val,1)) : ingreds}
      {console.log(ingreds)}
      { 
      
      drinkList.length && len.length === ingreds.length ?
      <div>
        <p><img src={drinkList[140].strDrinkThumb} /></p>
        <h1>hi</h1>
        <p>Drink of the Day : {drinkList[0].strDrink}</p>
        {console.log(drinkList[140])}
        </div>
 : <div> Loading...
   </div>} 
        </div>
    
  )
      }


export default Request

