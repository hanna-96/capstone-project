// import React from 'react'
// import PropTypes from 'prop-types'
// import {connect} from 'react-redux'
// // import user from '../store/users'
// import {Link} from 'react-router-dom'

// export const UserHome = props => {
//   const {user} = props

//   return (
//     <div >
//       <br />
//       <h3 >
//         Welcome, {user} !
//       </h3>
//       {props.user.isAdmin && <Link to="/users"> View all Users</Link>}
//       <img
//         id="welcomeIMG"
//         src="https://media3.giphy.com/media/3o6fJ0mUt4WWF1qox2/giphy.gif?cid=ecf05e47iq8ohvy8ghhvlb3e9tvum6rw76172vxpac1rw8dp&rid=giphy.gif"
//       />
//     </div>
//   )
// }

// const mapState = state => {
//   return {
//     userName: state.user.userName,
//     user: state.user
//   }
// }

// export default connect(mapState)(UserHome)

// UserHome.propTypes = {
//   userName: PropTypes.string
// }
