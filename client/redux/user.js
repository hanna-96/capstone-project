import axios from "axios";
import history from '../history'

const initialState = {};

const GET_USER = "GET_USER"
const REMOVE_USER = "REMOVE_USER"
const ADD_TO_USER_FAVORITES = "ADD_TO_USER_FAVORITES"
const REMOVE_FROM_USER_FAVORITES = "REMOVE_FROM_USER_FAVORITES"

const getUser = (user) => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })
export const addToUserFavorites = favorite => ({ type: ADD_TO_USER_FAVORITES, favorite })
export const removeFromUserFavorites = unFavorite => ({ type: REMOVE_FROM_USER_FAVORITES, unFavorite })

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/auth/me");
    dispatch(getUser(res.data || initialState));
  } catch (err) {
    console.error(err);
  }
};
export const authLogin = (userName, password, history) => async dispatch => {
  let res
  try {
    // res = await axios.post('/api/users/login', {
    //   userName,
    //   password
    // })
    res = await axios.post('/api/users/login', {
      userName,
      password
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
   dispatch(getUser(res.data.Item))

   history.push('/welcome')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const authSignup = (user, history) => async dispatch => {
  let res
  try {
    res = await axios.post(`/api/users/signup`, user)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data.Item))
    history.push('/welcome')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/api/users/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

//this is not a thunk I just wasn't sure where to put it for re-useablility
export const updateFavorites = async (userName, favorites) => {
  try {
    await axios.put(`/api/users/${userName}/favorites`, favorites)
  } catch(e) { console.error(e) }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return initialState
    case ADD_TO_USER_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.favorite] }
    case REMOVE_FROM_USER_FAVORITES:
      return { ...state, favorites: state.favorites.filter(fave => fave !== action.unFavorite) }
    default:
      return state;
  }
}
