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
export const getAllIngredientsThunk = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/users/${id}/allingredients`);      // const spots = data.map((spot) => {
      //   return {
      //     description: spot.description.S,
      //     id: spot.id.S,
      //     name: spot.name.S,
      //     image: spot.image.S,
      //   };
      // });
      dispatch(getIngredients(data));
    } catch (error) {
      console.error(error);
    }
  };
};
export const addIngredientThunk = (id, ingredient) => {
  return async (dispatch) => {
   
    try {
      if (ingredient) {
        let { data } = await axios.put(
          `/api/users/${id}/allingredients`, {ingredient}
        );
        dispatch(addIngredient(data));
    }
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
