const GET_SINGLE_USER = 'GET_SINGLE_USER';
const getSingleUser = (user)=>{
    return {
      type:GET_SINGLE_USER,
      user
    }
  }
  export const getSingleUserThunk = userName => async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${userName}`)
      dispatch(getSingleUser(data))
    } catch (err) {
      console.error(err)
    }
  }
const initialState = {};
  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_SINGLE_USER:
        return action.user
      default:
        return state
    }
  }