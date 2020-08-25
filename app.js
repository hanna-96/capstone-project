import React from 'react';
import CameraInput from './CameraInput'
// import {Route} from 'react-router-dom'
// import Login from './Login'
// import Signup from './Signup'
import Routes from './routes'

import Request from './client/request-test'


function App() {
  return (
    <div className="App">
      <h2>Welcome to Mixologist</h2>
      <CameraInput />
      <Request />
      <Routes />
    </div>
  );
}

export default App;
