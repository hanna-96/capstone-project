import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Button from '@material-ui/core/Button'


const DrinkId = (props) => {
    const id = history.state.state.id
    console.log(props)
    const [drinkDetails, setDrink] = useState({})
    const [ingreds, setIngreds] = useState([])
    const [measure, setMeasure] = useState([])
    const [details, setDetails] = useState([])
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

    useEffect( () => {
      const getIngAndMeasure = () => {
        const drinkProps = Object.keys(drinkDetails)
        const ingredients = drinkProps.filter((prop) => prop.includes('strIngredient') && drinkDetails[prop] !== null).map((prop) => drinkDetails[prop])
        const measurements = drinkProps.filter((prop) => prop.includes('strMeasure') && drinkDetails[prop] !== null).map((prop) => drinkDetails[prop])
        setIngreds(ingredients)
        setMeasure(measurements)

        for (let i = 0; i < ingredients.length ; i++) {
          setDetails(prev => [...prev, {ingreds: ingredients[i], measure: measurements[i]}])
        }

      }
      getIngAndMeasure()
  
    }, [drinkDetails]
    )
  
  
    return (
    
        <div>
            { didRun ? console.log('details', details) : null}
          { drinkDetails.strDrink ? <div>
            <p>{drinkDetails.strDrink}</p>
            <p><img src={drinkDetails.strDrinkThumb}/></p>

            <h2>Receipe</h2>

            {details.map(detail  =><p>{detail.ingreds} {detail.measure}</p> )}
            <p>{drinkDetails.strInstruction}</p>
            <Button onClick={results}>Back to results</Button>
            </div>
     : <div></div>} 
            </div>
        
      )
    }



export default DrinkId