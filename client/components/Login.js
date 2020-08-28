import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
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
    this.props.getUser(this.state.userName,this.state.password);
    // await axios.post("/api/users/login", this.state);
    this.setState({
      userName: "",
      password: "",
    });
    // this.props.history.push('/welcome')
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  
  render() {
    const {isLoggedIn}  = this.props
    //  if(isLoggedIn){
    //   return  <Redirect to ="/welcome" /> 
    //  }else{
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
          <button type="submit">
            {/* <Link to="/welcome">Log In</Link> */}
          </button>
        </form>
      </div>
    );
     }
    }
 
  // }

const mapState = (state) => {
  return {
    user: state.user,
    isLoggedIn:!!state.user.userName
  };
};
const mapDispatch = (dispatch,ownProps) => {
  return {
    getUser: (userName, password) => dispatch(authLogin(userName, password,ownProps.history)),
  };
};

export default connect(mapState, mapDispatch)(Login);
