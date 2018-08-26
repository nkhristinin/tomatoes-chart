// @flow

import React from "react"
import { connect } from "react-redux"
import { getTicks, fetchTicks } from "../modules/ticks"
import TicksChart from "../components/TicksChart"

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
      }, 3000)

    updateTicks()
  }

  render() {
    return <TicksChart ticks={this.props.ticks} />
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
