import React from "react";
import axios from "axios";

export default class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    const data = await axios.post("/api/users/signup", this.state);
    // this.props.history.push('/')
    this.setState({
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  }

  render() {
    return (
      // <div>
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>User Name</label>
          <input
            name="userName"
            type="text"
            required
            onChange={this.handleChange}
            value={this.state.userName}
          />
        </p>
        <label>First Name</label>

        <input
          name="firstName"
          type="text"
          placeholder="First Name"
          required
          onChange={this.handleChange}
          value={this.state.firstName}
        />
        <label>Last Name</label>
        <input
          name="lastName"
          type="text"
          placeholder="Last Name"
          required
          onChange={this.handleChange}
          value={this.state.lastName}
        />
        <label>Email</label>
        <input
          name="email"
          type="text"
          required
          onChange={this.handleChange}
          value={this.state.email}
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
        <button type="submit">Sign up</button>
      </form>
    );
  }
}
