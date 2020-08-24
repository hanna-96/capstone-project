import React from 'react';

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }
    handleSumbit(e) {
        e.preventDefault()
    }
    handleChange(e) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSumbit}>
                <input type='text' name='email' value={this.state.email} 
                onChange={this.handleChange} />
                    <label>Your email</label>
                    <input type='text' name='password' value={this.state.password} 
                onChange={this.handleChange} />
                    <label>Your password</label>
            </form>
        )
    }
}