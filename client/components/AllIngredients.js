import React, {useEffect, useState} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {withRouter} from 'react-router-dom';


import {
  getAllIngredientsThunk,
  addIngredientThunk,
} from "../redux/ingredients";

const AllIngredients = (props) => {
  const userName = props.match.params.userName

  const [rendered, setRendered] = useState(false)

  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.ingredients)

  useEffect(() => {
       dispatch(addIngredientThunk(userName, props.ingred))

  }, [dispatch])
  

  return (
    <div> { ingredients.length > 0 &&
    <div>
      {ingredients.includes(props.ingred) ? 
      <div>{props.ingred.split('_').join(' ')} is already in your Cabinet but is included in the search results! </div> 
      
    : <div> {props.ingred.split('_').join(' ')} was added to your Cabinet</div> }
    </div>
    
    }</div>
  )
}


export default withRouter(AllIngredients)