// @flow

import React from "react"
import { connect } from "react-redux"
import {
  getTicks,
  fetchTicks,
  groupByOneDay,
  groupByFiveMinutes,
  getTimeFormat,
  getGroupTime,
  getLastTickFromAPI,
  getMode,
  MODE_FIVE_MINUTES,
  MODE_ONE_DAY
} from "../modules/ticks"
import TicksChart from "../components/TicksChart"
import StatusView from "../components/StatusView"
import Tab from "../components/Tab"

class TicksContainer extends React.Component {
  componentDidMount() {
    this.props.fetchTicks()
  }

  render() {
    const {
      ticks,
      groupByFiveMinutes,
      groupByOneDay,
      timeFormat,
      groupTime,
      lastTickFromAPI,
      mode
    } = this.props

    return (
      <div>
        {lastTickFromAPI ? (
          <div>
            <div className="header-container">
              <StatusView
                selectionSize={lastTickFromAPI.segmentSize}
                lastUpdateTime={lastTickFromAPI.timestamp}
                lastUpdateAdded={lastTickFromAPI.totalCallsAdded}
                lastUpdateRemoved={lastTickFromAPI.totalCallsRemoved}
              />
              <div>
                <Tab
                  selected={mode === MODE_FIVE_MINUTES}
                  onClick={groupByFiveMinutes}
                >
                  Last one hour
                </Tab>
                <Tab selected={mode === MODE_ONE_DAY} onClick={groupByOneDay}>
                  Last month
                </Tab>
              </div>
            </div>
            <TicksChart
              paddingTime={groupTime}
              timeFormat={timeFormat}
              ticks={ticks}
            />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ticks: getTicks(state),
  timeFormat: getTimeFormat(state),
  groupTime: getGroupTime(state),
  lastTickFromAPI: getLastTickFromAPI(state),
  mode: getMode(state)
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
