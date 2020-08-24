import React from 'react'
import {Route} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
            </div>
        )
    }
}