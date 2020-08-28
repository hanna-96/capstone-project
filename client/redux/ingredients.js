import axios from "axios";
/**
 * ACTION TYPES
 */
const GET_INGREDIENTS = "GET_INGREDIENTS";
const ADD_INGREDIENT = "ADD_INGREDIENT";

const initialState = [];

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
    try {
      const { data } = await axios.put(
        `/api/users/${userName}/ingredients`,
        ingredient
      );
      dispatch(addIngredient(data));
    } catch (error) {
      console.log(error);
    }
  };
};
/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.ingredients;
    case ADD_INGREDIENT:
      return [...state, action.ingredient];
    default:
      return state;
  }
}
