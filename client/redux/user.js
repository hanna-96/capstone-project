import axios from "axios";
import history from '../history'

const initialState = {};

const GET_USER = "GET_USER"
const REMOVE_USER = "REMOVE_USER"

const getUser = (user) => ({ type: GET_USER, user })
const removeUser = () => ({ type: REMOVE_USER })

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

export const logout = () => async dispatch => {
  try {
    await axios.post('/api/users/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return initialState
    default:
      return state;
  }
}
