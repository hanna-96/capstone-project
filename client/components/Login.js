import React from "react";
import { connect } from "react-redux";
import { authLogin } from "../redux/user";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(event) {
    event.preventDefault();
    this.props.getUser(this.state.userName, this.state.password);
    this.setState({
      userName: "",
      password: "",
    });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>User name</label>
          <input
            name="userName"
            type="text"
            required
            onChange={this.handleChange}
            value={this.state.userName}
          />
          <p>
            <label>Password</label>
            <input
              name="password"
              type="text"
              required
              onChange={this.handleChange}
              value={this.state.password}
            />
          </p>
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.userName,
  };
};
const mapDispatch = (dispatch, ownProps) => {
  return {
    getUser: (userName, password) =>
      dispatch(authLogin(userName, password, ownProps.history)),
  };
};

export default connect(mapState, mapDispatch)(Login);
