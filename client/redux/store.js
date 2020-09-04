import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import ingredients from './ingredients'
import users from './users'
import user from './user'
import searches from './searches'
import singleUser from './singleUser'
import friendsReducer from './friends'
import drinks from './drinks'
const reducer = combineReducers({ ingredients, users, user, singleUser, searches, friendsReducer, drinks})



const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

const store = createStore(reducer, middleware)

export default store

