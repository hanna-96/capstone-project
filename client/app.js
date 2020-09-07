import React from "react";
import Routes from "./components/routes";
import NewDrawer from "./components/NewDrawer";
// import Container from "@material-ui/core/Container";
import Footer from './components/Footer'
function App() {
  return (
        <div className="App">
          <NewDrawer />
          <Routes />
          <Footer />
        </div>
  );
}

export default App;
