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
      const { data } = await axios.get(`/api/users/${id}/allingredients`);
      console.log("data allIngredients", data);
      // const spots = data.map((spot) => {
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
      let { data } = await axios.put(
        `/api/users/${id}/ingredients`,
        ingredient
      );
      console.log("data from add ingredient thunk", data);
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
