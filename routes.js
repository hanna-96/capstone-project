import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Request from './request-test'

export default class Routes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/" component={Signup} />
                    <Route exact path="/bla" component={Request} />
                </Switch>
            </div>
        )
    }
}