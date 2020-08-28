import React from 'react'
import PropTypes from 'prop-types'
import {connect,withRouter} from 'react-redux'
// import {getSingleUserThunk} from '../redux/user'
/**
 * COMPONENT
 */
const UserHome = props => {
    console.log('USERHOME props',props)
//   const {userName} = props

  return (
    <div>
      <h3>Welcome to User Home!!!!!!</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
    console.log('userhome state',state)
  return {
    userName: state.user.Item.userName
  };
}

export default connect(mapState,null)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   userName: PropTypes.string
// }
