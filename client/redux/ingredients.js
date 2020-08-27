import axios from "axios";
/**
 * ACTION TYPES
 */
const GET_INGREDIENTS = "GET_INGREDIENTS";

const initialState = [];

/**
 * ACTION CREATORS
 */
const getIngredients = (ingredients) => ({
  type: GET_INGREDIENTS,
  ingredients,
});

/**
 * THUNK CREATORS
 */
export const getAllIngredintesThunk = (id) => {
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

/**
 * REDUCER
 */
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.ingredients;
    //   case ADD_SPOT:
    //     return [...state, action.spot];
    //   case REMOVE_SPOT:
    //     return state.filter((spot) => spot.id !== action.id);
    default:
      return state;
  }
}
