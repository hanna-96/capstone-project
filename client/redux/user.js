import axios from "axios";
import history from '../history'
const initialState = {};
const GET_SINGLE_USER = "GET_SINGLE_USER";
const GET_USER = "GET_USER";
const getSingleUser = (user) => {
  return {
    type: GET_SINGLE_USER,
    user,
  };
};
const getUser = (user) => ({ type: GET_USER, user });

export const me = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/me");
    dispatch(getUser(res.data || initialState));
  } catch (err) {
    console.error(err);
  }
};
export const authLogin = (userName, password,history) => async dispatch => {
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
    // console.log('data from login thunk',res.data)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    // setTimeout(function(){
    //   history.push('/welcome')
    // },3000)
     
   dispatch(getUser(res.data.Item))

   history.push('/welcome')
    console.log('data from login thunk',res.data.Item)

  
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}
export const getSingleUserThunk = (userName) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userName}`);
    dispatch(getSingleUser(data));
  } catch (err) {
    console.error(err);
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case GET_SINGLE_USER:
      return action.user;
    default:
      return state;
  }
}
