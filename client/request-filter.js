import axios from 'axios'
import React, {useEffect, useState} from 'react'
import AllIngredients from './components/AllIngredients'
import Request from './request-test'
import {Route, Link, withRouter} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {
    getAllIngredientsThunk,
    addIngredientThunk,
  } from "./redux/ingredients";
  

const RequestFilter = (props) => {
    let {ingreds, fields, inputLen} = props
    console.log(props, 'props for request filter')
    const userName = props.match.params.userName
    const [valid, setValid] = useState(false)
    const [validIng, setValidIng] = useState([])

    const dispatch = useDispatch()
    const ingredients = useSelector(state => state.ingredients)
  
    useEffect(() => {
         dispatch(getAllIngredientsThunk(userName))
  
    }, [validIng])
  
    
    useEffect( () => {
        const reqValidator = async (ing) => {
            try{
                if(ing.includes(' ')) ing = ing.split(' ').join('_')
                // makes call to API DB .. if there is a drinks object present, set to true otherwise set to false
                const {data} =await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ing}`)
                if(data.drinks && !validIng.includes(ing)) {
                        setValid(true)
                        setValidIng(prev => [...prev, ing])

                } else {
                    setValid(false)

                }
            } catch(err) {
                console.log(err)
            }
            
        }

        ingreds.forEach(async ing => await reqValidator(ing))
    }, [inputLen])

    
    return (
        
        <div>
    {ingredients.length ?
    <div>
    <p>{validIng.map( (ingred) => 
    <div>
    
    {console.log(ingredients.includes(ingred))}
    <p>{!ingredients.includes(ingred)?
    <div>
        <div>{ingred.split('_').join(' ')} has been added</div>
            <AllIngredients ingred={ingred} /> 
        </div>
     : <div>{ingred} is already in your Cabinet!</div>} </p>
      </div>
    )}</p>
    <p>See your results: </p>
  <Request ingreds={validIng} /> 
  </div>
  : 
  
  <div></div>
}
    </div>

    )
}
    


export default withRouter(RequestFilter)

