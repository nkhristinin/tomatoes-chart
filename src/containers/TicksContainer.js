// @flow

import React from "react"
import { connect } from "react-redux"
import { getTicks, fetchTicks } from "../modules/ticks"

class TicksContainer extends React.Component {
  componentDidMount() {
    this.fetchTicksFromStreamAPI()
  }

  fetchTicksFromStreamAPI() {
    const { fetchTicks } = this.props

    const updateTicks = () =>
      setTimeout(() => {
        fetchTicks()
        updateTicks()
      }, 500)

    updateTicks()
  }

  render() {
    return <div>hello</div>
  }
}

const mapStateToProps = state => ({
  ticks: getTicks(state)
})

const mapDispatchToProps = {
  fetchTicks: fetchTicks
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicksContainer)
