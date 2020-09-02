import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../redux/user'

import AppBar from './AppBar'
const Navbar = () => (
  <div>
    <h1>Mixologist</h1>
    <nav>
      {/* <button onClick={this.props.handleClick}>Logout</button> */}
    <AppBar />
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.user.userName
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

export default connect(null, null)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
