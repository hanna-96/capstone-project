import React from 'react'
import axios from 'axios'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
          email: '',
          password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
      }
      async handleSubmit(event) {
        event.preventDefault()
        const data = await axios.post('/api/users/login', this.state);
        console.log(data, "hello")
        // this.props.history.push('/') 
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
                <label>Email</label>
                <input
                  name='email'
                  type='email'
                  required
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                <p>
                  <label>Password</label>
                  <input
                    name='password'
                    type='password'
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