import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import InputForm from '../input-form'

export default class Routes extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    {/* <Route exact path="/" component={Login} />
                    <Route exact path="/signup" component={Signup} /> */}
                    {/* <Route exact path="/bla" component={Request} /> */}
                        <Route exact path="/" component={InputForm} />

                </Switch>
            </div>
        )
    }
}