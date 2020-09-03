import axios from 'axios'

const initialState = {
  favorites: [],
  featured: []
}

const GET_FAVORITE_DRINKS = 'GET_FAVORITE_DRINKS'
const GET_FEATURED_DRINKS = 'GET_FEATURED_DRINKS'

const actionCreators = {
  favorites: drinks => ({
    type: GET_FAVORITE_DRINKS,
    drinks
  }),
  featured: drinks => ({
    type: GET_FEATURED_DRINKS,
    drinks
  })
}
// const getFavouriteDrink =(featuredDrinks)=>{
//   return {
//     type:GET_FEATURED_DRINKS,
//     featuredDrinks
//   }
// }
// export const getFeaturedDrinks = (drinks) => async dispatch => {
//   try {
//        const allDrinks = await Promise.all(drinks.map(drink => 
//       axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`)
//     ))
//     // const allDrinks = await Promise.all(drinks.map(drink => 
//     //   axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`)
//     // ))
//     console.log('allDrinks fromm thunk',allDrinks)
//     dispatch(getFavouriteDrink(allDrinks.reduce((acc, v) => [...acc, ...v.data.drinks], [])))
//   } catch(e) { console.error(e) }
// }


export const getFavoriteDrinks = (drinks, type) => async dispatch => {
  console.log('drinks in thunk',drinks)
  try {
    //goes to api and finds drinks objects based on the favouritedrinks from User tabla
    //returns an array of those objects
    const allDrinks = await Promise.all(drinks.map(drink => 
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`)
    ))
    console.log('allDrinks fromm thunk',allDrinks)
    dispatch(actionCreators[type](allDrinks.reduce((acc, v) => [...acc, ...v.data.drinks], [])))
  } catch(e) { console.error(e) }
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_FAVORITE_DRINKS:
      return { ...state, favorites: action.drinks }
    case GET_FEATURED_DRINKS:
      return { ...state, featured: action.drinks }
    default:
      return state
  }
}