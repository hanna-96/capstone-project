import React from 'react'
import axios from 'axios'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
          userName: '',
          password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      async handleSubmit(event) {
        event.preventDefault()
        await axios.post("/api/users/login", this.state);
        this.setState({
          userName: '',
          password: ''
        })
        this.props.history.push('/') 
      }
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
      }
      render() {
          return (
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>User name</label>
                <input
                  name='userName'
                  type='text'
                  required
                  onChange={this.handleChange}
                  value={this.state.userName}
                />
                <p>
                  <label>Password</label>
                  <input
                    name='password'
                    type='text'
                    required
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </p>
                <button type='submit'>Log in</button>
              </form>
              </div>
            )
      }
    }