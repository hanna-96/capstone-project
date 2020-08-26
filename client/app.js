import React from "react";

// import {Route} from 'react-router-dom'
// import Login from './Login'
// import Signup from './Signup'
import Routes from "./components/routes";
import {Button, Drawer, toggleDrawer} from '@material-ui/core/';
import  NewDrawer from './components/NewDrawer'
import  AppBar from './components/AppBar'
import Request from './request-test'
import RequestFilter from './request-filter'

function App() {
  return (
    <div className="App">
      <NewDrawer />
      <h2>Welcome to Mixologist</h2>
      


      <Routes />
    </div>
  );
}

export default App;
