// @flow

import React from "react"
import { connect } from "react-redux"
import {
  getTicks,
  fetchTicks,
  groupByOneDay,
  groupByFiveMinutes,
  getTimeFormat,
  getGroupTime
} from "../modules/ticks"
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
    const {
      ticks,
      groupByFiveMinutes,
      groupByOneDay,
      timeFormat,
      groupTime
    } = this.props
    return (
      <div>
        <div>
          <button onClick={groupByFiveMinutes}>5 minutes</button>
          <button onClick={() => groupByOneDay()}>one day</button>
        </div>
        <TicksChart
          paddingTime={groupTime}
          timeFormat={timeFormat}
          ticks={ticks}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ticks: getTicks(state),
  timeFormat: getTimeFormat(state),
  groupTime: getGroupTime(state)
})

const mapDispatchToProps = {
  fetchTicks,
  groupByFiveMinutes,
  groupByOneDay
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicksContainer)
