import axios from "axios";
/**
 * ACTION TYPES
 */
const GET_INGREDIENTS = "GET_INGREDIENTS";
const ADD_INGREDIENT = "ADD_INGREDIENT";
const DELETE_INGREDIENT = "DELETE_INGREDIENT" 

const initialState = []

/**
 * ACTION CREATORS
 */
const getIngredients = (ingredients) => ({
  type: GET_INGREDIENTS,
  ingredients,
});

const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    ingredient,
  };
};

const deleteIngredient = (ingredients,idx) => {
  return {
    type: DELETE_INGREDIENT,
    ingredients,
    idx
  }
}
/**
 * THUNK CREATORS
 */
export const getAllIngredientsThunk = (userName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${userName}/allingredients`);
      dispatch(getIngredients(data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const addIngredientThunk = (userName, ingredient) => {
  return async (dispatch) => {
    console.log('ingredient from thunk: ', ingredient)
    try {
      if (ingredient) {
        let { data } = await axios.put(
          `/api/users/${userName}/allingredients`, {ingredient}
        )
        console.log('data from ing thunk: ', data)
        dispatch(addIngredient(ingredient))
      }
    } catch (error) {
      console.log(error)
    }
  };
};

export const deleteIngredientThunk = (userName, ingredients, idx) => {
  return async (dispatch) => {

  try {
      console.log("idx", idx)
       await axios.delete(`/api/users/${userName}/allingredients/${idx.toString()}`, {ingredients,idx})
        dispatch(deleteIngredient(ingredients,idx))
  } catch(err) {
    console.log(err)
  } 
}
}
/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.ingredients
    case ADD_INGREDIENT:
      return [...state, action.ingredient]
    case DELETE_INGREDIENT:
      return action.ingredients.filter((ing, idx) => idx!== action.idx)
    default:
      return state;
  }
}
