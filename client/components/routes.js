import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Request from '../request-test'
import AllIngredients from './AllIngredients'

export default class Routes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/" component={Request} />
                    <Route exact path="/users/:userId/allingredients" component={AllIngredients} />
                </Switch>
            </div>
        )
    }
}