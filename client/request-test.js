import axios from 'axios'
import React, {useEffect, useState} from 'react'
import RequestId from './request-id'

const Request = () => { 

  const [drinkList, setDrinks] = useState([])

  const [didRun, setDidRun] = useState(false)
  const [len, setLen] = useState([])
  const allDrinks = []
  const ingreds = ['lime_juice', 'tequila', 'gin', 'vodka']

  useEffect( () => {
    
    // const getDrinks = async ()  => {
      
    //   try {
    //     ingreds.forEach( async (ing, idx) => {
    //       const {data}= await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`);
    //       const {drinks} = data
    //       allDrinks.push(...drinks)
          
    //       if(idx === ingreds.length-1 ) {
    //         setDrinks(allDrinks)
    //         setLen(allDrinks.length)
    //       }
    //     }) 
    //     // const {data} =await axios.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=lime_juice')
    //     // const {drinks} = data
    //   } catch (error) {
    //     console.log(error);
    //   }

    // }
    
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
    ingreds.forEach( async ing => await getDrinks(ing))

 
    
  //   getDrinks()
    
  //   setDidRun(true)
  // }
}, [])


  return (
    
    
    <div>
      { 
      drinkList.length && len.length === ingreds.length ?
      <div>
        {console.log(drinkList, 'the drinks', len)}
        <p><img src={drinkList[140].strDrinkThumb} /></p>
        <h1>hi</h1>
        <p>Drink of the Day : {drinkList[0].strDrink}</p>
        {/* <RequestId id={drinkList[0].idDrink}/> */}
        </div>
 : <div> Loading...
   </div>} 
        </div>
    
  )
      }


export default Request

