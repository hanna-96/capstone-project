const GET_SEARCH = 'GET_SEARCH'

const getSearch = (drinks) => {
   return {
       type: GET_SEARCH,
        drinks
   }
}

const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
      case GET_SEARCH:
        return action.drinks;
    default:
        return state
    }
}

export const fetchSearches = (drinks) => {
    return (dispatch) => {
    try {
        dispatch(getSearch(drinks))
    } catch(err) {
        console.log(err)
        }
    }
}