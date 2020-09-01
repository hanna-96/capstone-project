import axios from 'axios'

//moved this out of user.js so that singleUser and the logged in user are not sharing the same object in state

const GET_SINGLE_USER = "GET_SINGLE_USER"
const CLEAR_SINGLE_USER = "CLEAR_SINGLE_USER"

const getSingleUser = user => ({ type: GET_SINGLE_USER, user })

export const clearSingleUser = () => ({ type: CLEAR_SINGLE_USER })

export const getSingleUserThunk = (userName) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userName}`);
    dispatch(getSingleUser(data));
  } catch (err) {
    console.error(err);
  }
}

export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_USER:
      return action.user
    case CLEAR_SINGLE_USER:
      return {}
    default:
      return state
  }
}