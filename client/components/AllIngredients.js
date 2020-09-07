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

// class AllIngredients extends React.Component {
//   async componentDidMount() {
//     const userName = this.props.match.params.userName
//     const ingredients = await this.props.ingredients
//     console.log(ingredients, 'ingredients')
//     this.props.addIngredient(userName, this.props.ingred)
//     this.props.getIngredients(userName);
//     }

//   render() {
//     const ingredients = this.props.ingredients;
//     return (
//       <div>

//       </div>
//     );
// }

// }

// const mapState = (state) => {
//   return {
//     ingredients: state.ingredients,
//   };
// };

// const mapDispatch = (dispatch) => {
//   return {
//     getIngredients: userName => dispatch(getAllIngredientsThunk(userName)),
//     addIngredient: (userName, ingredient) =>
//       dispatch(addIngredientThunk(userName, ingredient)),
//   };
// };

// export default withRouter(connect(mapState, mapDispatch)(AllIngredients));

// <div> 
// { newIngredients.length ? 
// <div>
//   {ingredients.includes(props.ingred) ? 
//   <div>{props.ingred.split('_').join(' ')} is already in your Cabinet but is included in the search results! </div> 
//   : <div> {props.ingred.split('_').join(' ')} was added to your Cabinet</div> }
// </div>

// : <div></div>

// }
// </div>