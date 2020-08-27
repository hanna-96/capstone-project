import React from 'react'
import {connect} from 'react-redux'
import {getAllUsersThunk} from '../redux/users'
import {Link} from 'react-router-dom'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    const users = this.props.users
    return (
      <div className="has-text-centered">
        <br />
        <h1 className="title is-4">Registered Users</h1>
        <ol>
          {users &&
            users.map(user => {
              return (
                <li key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    {user.firstName} {user.lastName}
                  </Link>
                  {''} {user.email}
                </li>
              )
            })}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsersThunk())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
