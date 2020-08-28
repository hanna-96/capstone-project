import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'


const DrinkId = (props) => {
    const id = history.state.state.id
    console.log(props)
    const [drinkDetails, setDrink] = useState({})

    const [didRun, setDidRun] = useState(false)

    const results = () => {
      props.history.goBack()
    }
  
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
            <Button onClick={results}>Back to results</Button>
            </div>
     : <div></div>} 
            </div>
        
      )
    }



export default DrinkId