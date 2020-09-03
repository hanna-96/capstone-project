import axios from 'axios'

const GET_FAVORITE_DRINKS = 'GET_FAVORITE_DRINKS'

const setFavoriteDrinks = drinks => ({
  type: GET_FAVORITE_DRINKS,
  drinks
})

export const getFavoriteDrinks = drinks => async dispatch => {
  try {
    const allDrinks = await Promise.all(drinks.map(drink => 
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`)
    ))
    dispatch(setFavoriteDrinks(allDrinks.reduce((acc, v) => [...acc, ...v.data.drinks], [])))
  } catch(e) { console.error(e) }
}

export default function(state = [], action) {
  switch(action.type) {
    case GET_FAVORITE_DRINKS:
      return action.drinks
    default:
      return state
  }
}