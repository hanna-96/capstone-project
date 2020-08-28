import React from "react";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';


import {
  getAllIngredientsThunk,
  addIngredientThunk,
} from "../redux/ingredients";

class AllIngredients extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.userId
    this.props.addIngredient(id,this.props.ingred)
    this.props.getIngredients(id);

  }
  render() {
    const ingredients = this.props.ingredients;
    {console.log(this.props)}
    return (
      <div>


        <div>{this.props.ingred}</div>

//         <h1>Here is the list of your ingredients!</h1>
//         {ingredients.map((ingredient) => {
//           return (
//             <div>
//               <ul>
//                 <li>{ingredient}</li>
//               </ul>
 
//             </div>
//           );
//         })}

      </div>
    );
}

}

const mapState = (state) => {
  return {
    ingredients: state.ingredients,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getIngredients: (id) => dispatch(getAllIngredientsThunk(id)),
    addIngredient: (id, ingredient) =>
      dispatch(addIngredientThunk(id, ingredient)),
  };
};

export default withRouter(connect(mapState, mapDispatch)(AllIngredients));
