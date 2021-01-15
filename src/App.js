import React, { Component, Suspense } from "react";
import "./App.css";
import "antd/dist/antd.css";


import Home from "./Components/Home/Home";

class App extends Component {
  render() {
    return (

          <div className="App">
            <Home />
          </div>

    );
  }
}

export default App;
