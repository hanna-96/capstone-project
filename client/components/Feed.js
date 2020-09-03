import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getFriendsThunk, addFriendThunk} from '../redux/friends'
import {getAllUsersThunk} from '../redux/users'
import Button from '@material-ui/core/Button'

const Feed = (props) => {
    console.log(props, 'the props')
    const userName = props.match.params.userName
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const friends = useSelector(state => state.friends)

    const handleClick = (e) => {
        e.preventDefault()
        const selectedFriend = e.currentTarget.value
        console.log(selectedFriend)
        dispatch(addFriendThunk(userName, selectedFriend))
    }

    useEffect(()=> {
        dispatch(getAllUsersThunk())
    }, [dispatch])

    return (
        
        <div>{users.map((user, id) => 
            <div id={id}>
                {user.userName} 
                <Button value={`${user.userName}`} onClick={handleClick} >Add User to Friends</Button>
            </div>)}
        </div>
    )
}

export default withRouter(Feed)