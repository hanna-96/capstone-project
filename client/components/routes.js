import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import InputForm from "../input-form";
import Signup from "./Signup";
import PropTypes from "prop-types";
import Request from "../request-test";
import UserHome from "./UserHome";
import AllIngredients from "./AllIngredients";
import AllUsers from "./AllUsers";
import { connect } from "react-redux";
import { me } from "../redux/user";

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        <Route
          exact
          path="/users/:userId/allingredients"
          component={AllIngredients}
        />
       {/* {<Route exact path="/welcome" component={UserHome} /> }  */}
        <Route exact path="/" component={InputForm} />
        {isLoggedIn ? <Route exact path="/welcome" component={UserHome} /> : "Sorry not working"}
      </Switch>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  console.log("userhome state", state);
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.userName
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default connect(mapState, mapDispatch)(Routes);
/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
