import React from "react";
import { connect } from "react-redux";
import {
  getAllIngredientsThunk,
  addIngredientThunk,
} from "../redux/ingredients";
import AddIngredientForm from "./AddIngredientForm";

class AllIngredients extends React.Component {
  componentDidMount() {
    const id = this.props.match.params.userId;
    console.log("id is", id);
    this.props.getIngredients(id);
    console.log("all ingredients before", this.props);
  }
  render() {
    const id = this.props.match.params.userId;
    const ingredients = this.props.ingredients;
    console.log("all ingredients after", ingredients);

    return (
      <div>
        <h1>Here is the list of your ingredients!</h1>
        {ingredients.map((ingredient) => {
          return (
            <div>
              <ul>
                <li>{ingredient}</li>
              </ul>
 
            </div>
          );
        })}
        <AddIngredientForm addIngredient={this.props.addIngredient} id={id} />
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

export default connect(mapState, mapDispatch)(AllIngredients);
