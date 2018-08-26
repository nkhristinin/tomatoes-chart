import React, { Component } from "react"
import TicksContainer from "./containers/TicksContainer"
import tomato from "./tomato.png"
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="logo-container">
          <img
            className="logo"
            src={tomato}
            alr="tomato"
            width="48"
            height="48"
          />
        </div>
        <h1 className="title">Tomatoes chart</h1>

        <TicksContainer />
      </div>
    )
  }
}

export default App
