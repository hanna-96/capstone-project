import axios from 'axios'
import { Action } from 'history'

const initialState = []

const GET_FRIENDS = 'GET_FRIENDS'
const ADD_FRIEND = 'ADD_FRIEND'
// const REMOVE_FRIEND = 'REMOVE_FRIEND'

const getFriends = (type, friends) => {
    return {
        type: GET_FRIENDS,
        friends,
    }
}

const addFriend = (type, friend) => {
    return {
        type: ADD_FRIEND,
        friend,
    }
}

export const getFriendsThunk = (userName) => {
    return async (dispatch) => {
    try {
        const {data} = await axios.get(`/api/users/${userName}/friends`)
        dispatch(getFriends(data))
    } catch(err) {
        console.log(err)
        }
    }
}

export const addFriendThunk = (userName, friend) => {
    return async (dispatch) => {
    try {
        const {data} = await axios.put(`/api/users/${userName}/friends`, {friend})
        console.log(data)
        dispatch(addFriend(data))
    } catch(err) {
        console.log(err)
        }
    }
}

const friendsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FRIENDS :
            return action.friends
        case ADD_FRIEND:
            return action.friend
        default:
            return state
    }
}

export default friendsReducer