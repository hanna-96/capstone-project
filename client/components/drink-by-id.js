import axios from 'axios'
import React, {useEffect, useState} from 'react'


const DrinkId = (props) => {
    const id = history.state.state.id
    console.log(id)
    const [drinkDetails, setDrink] = useState({})

    const [didRun, setDidRun] = useState(false)
  
    useEffect( () => {
      const getDrinkDetails = async (id)  => {
        try {
          const {data}= await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
          const {drinks} = data
          setDrink(drinks[0])
          
        } catch (error) {
          console.log(error);
        }
  
      }
  

      if(!didRun) {
        getDrinkDetails(id)
        setDidRun(true)
        
      }
      
    } )
  
    return (
    
        <div>
            { didRun ? console.log(drinkDetails ,'the data') : null}
          { drinkDetails.strDrink ? <div>
            <p>{drinkDetails.strDrink}</p>
            <p>{drinkDetails.strMeasure1}</p>
            </div>
     : <div></div>} 
            </div>
        
      )
    }



export default DrinkId