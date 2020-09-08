import React, {useEffect, useState, useRef} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {withRouter} from 'react-router-dom';


import {
  getAllIngredientsThunk,
  addIngredientThunk,
} from "../redux/ingredients";

const AllIngredients = (props) => {
  const userName = props.match.params.userName
  const [rendered, setRendered] = useState(false)
  const [oldOrNew, setOldorNew] = useState('')
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.user.ingredients)
  useEffect(() => {
      console.log('props.ingred in allingredients: ', props.ingred)
      // dispatch(getAllIngredientsThunk(userName))
      dispatch(addIngredientThunk(userName, props.ingred))
      // props.ingreds.forEach(ingred => dispatch(addIngredientThunk(userName, ingred)))
      // setRendered(true)
  }, [props])
  
  useEffect(() => {
      if (ingredients.includes(props.ingred)) setOldorNew('old')
      else setOldorNew('new')
  }, [])

  return (
    <div>
      
      {/* { newIngredients.includes(props.ingred) && <div>{props.ingred.split('_').join(' ')} was added to your Cabinet!</div> } */}
      {oldOrNew === 'new' && <div>{props.ingred.split('_').join(' ')} was added to your Cabinet!</div>}
      {oldOrNew === 'old' && <div>{props.ingred.split('_').join(' ')} is in your cabinet and was included in the search!</div>}
    </div>
    
  )
}


export default withRouter(AllIngredients)
