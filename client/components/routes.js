import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Login from "./Login";
import InputForm from "../input-form";
import Signup from "./Signup";
import DrinkList from "./drink-list";
import DrinkId from "./drink-by-id";
import Cabinet from "./Cabinet";
import PropTypes from "prop-types";
import Request from "../request-test";
import UserHome from "./UserHome";
import Feed from './Feed'
// import AllIngredients from "./AllIngredients";
// import AllUsers from "./AllUsers";
import { connect } from "react-redux";
import { me } from "../redux/user";
import history from "../history";
import CameraInput from "./CameraInput";
import AllFavorites from "./AllFavorites";
import HomePage from "./HomePage"

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;
    return (
      <div id="routes">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path='/users/:userName/allFavorites' component={AllFavorites} />
          <Route exact path="/users/:userName" component={InputForm} />
          <Route exact path= "/users/:userName/cabinet" component={Cabinet} />
          {/* <Route exact path={`/users/${this.props.userName}`} component={InputForm} />
          <Route exact path= {`/users/${this.props.userName}/cabinet`} component={Cabinet} /> */}
          <Route exact path='/results' component={DrinkList} />
          <Route exact path='/results/:id' component={DrinkId} />
          <Route exact path='/scan' component={CameraInput} />
          <Route exact path='/:userName/feed' component={Feed} />

          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/welcome" component={UserHome} />
              <Route exact path= "/users/:userName/cabinet" component={Cabinet} />
            </Switch>
          )}
          <Route component={Login} />
        </Switch>
      </div>
    );
  }
}
/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    userName: state.user.userName,
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
