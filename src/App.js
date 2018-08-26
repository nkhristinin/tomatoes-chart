import React, { Component } from "react"
import TicksContainer from "./containers/TicksContainer"
import logo from "./logo.svg"
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Tomatoes chart</h1>
        <TicksContainer />
      </div>
    )
  }
}

export default App
