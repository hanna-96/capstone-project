import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./Login";
// import InputForm from "../input-form";
import Signup from "./Signup";
import PropTypes from "prop-types";
// import Request from "../request-test";
import UserHome from "./UserHome";
import AllIngredients from "./AllIngredients";
// import AllUsers from "./AllUsers";
import { connect } from "react-redux";
import { me } from "../redux/user";
import history from '../history'

class Routes extends React.Component {

  componentDidMount() {
    this.props.loadInitialData();
  }
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      history.push('/welcome')
      console.log("it's working")
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    console.log("is logged in", isLoggedIn);
    return (
      <div>
        <Switch>
          {/* <Route
            exact
            path="/welcome"
            component={isLoggedIn ? UserHome : InputForm}
          /> */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <Route
            exact
            path="/users/:userId/allingredients"
            component={AllIngredients}
          />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/welcome" component={UserHome} />
            </Switch>
          )}
          <Route component={Login} />
        </Switch>
        {/* <UserHome /> */}
      </div>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log("routes state", state);
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.userName,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
