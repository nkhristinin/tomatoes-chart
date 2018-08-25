import React, { Component } from "react"
import TicksContainer from "./containers/TicksContainer"
import logo from "./logo.svg"
import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <TicksContainer />
      </div>
    )
  }
}

export default App
