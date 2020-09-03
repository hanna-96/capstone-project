import React from "react";
import Routes from "./components/routes";
import NewDrawer from "./components/NewDrawer";
// import Container from "@material-ui/core/Container";

function App() {
  return (
        <div className="App">
          <NewDrawer />
          <Routes />
        </div>
  );
}

export default App;
