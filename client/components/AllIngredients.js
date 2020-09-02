import React, {useEffect, useState} from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {withRouter} from 'react-router-dom';


import {
  getAllIngredientsThunk,
  addIngredientThunk,
} from "../redux/ingredients";

const AllIngredients = (props) => {
  const userName = props.match.params.userName
  console.log(props, userName)

  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.ingredients)

  useEffect(() => {
       dispatch(addIngredientThunk(userName, props.ingred))
       dispatch(getAllIngredientsThunk(userName))

  }, [])
  

  return (
    <div>
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
