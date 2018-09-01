// @flow
import { makeGetTicks } from "../../API"
import { getTicksForChart, getNearestRoundedTimeBy } from "./utils"

const fetchTicksFromAPI = makeGetTicks()

// constants
const GET_TICKS = "ticks/GET_TICKS"
const GROUP_BY = "ticks/GROUP_BY"

const FIVE_MINUTES = 1000 * 60 * 5
const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_MONTH = ONE_DAY * 30

export const MODE_FIVE_MINUTES = "MODE_FIVE_MINUTES"
export const MODE_ONE_DAY = "MODE_ONE_DAY"

const GROUP_5_MINUTES = {
  groupedBy: FIVE_MINUTES,
  ticksCount: ONE_HOUR / FIVE_MINUTES,
  timeFormat: "HH:mm",
  mode: MODE_FIVE_MINUTES
}

const GROUP_1_DAY = {
  groupedBy: ONE_DAY,
  ticksCount: ONE_MONTH / ONE_DAY,
  timeFormat: "D MMM",
  mode: MODE_ONE_DAY
}

// reducers
type TicksStateType = {
  data: Array<Tick>,
  groupedBy: number,
  ticksCount: number,
  timeFormat: string
}

const initialState: TicksStateType = {
  data: [],
  ...GROUP_5_MINUTES
}

export default (
  state: TicksStateType = initialState,
  action
): TicksStateType => {
  switch (action.type) {
    case GET_TICKS:
      return {
        ...state,
        data: action.ticks
      }
    case GROUP_BY:
      return {
        ...state,
        groupedBy: action.groupedBy,
        ticksCount: action.ticksCount,
        timeFormat: action.timeFormat,
        mode: action.mode
      }
    default:
      return state
  }
}

//selectors

const groupBy = groupParams => ({
  type: GROUP_BY,
  ...groupParams
})

// Return ticks for charts
// for opmiziation can use reselect or other solutions for memoisation
export const getTicks = ({ ticks: { data, groupedBy, ticksCount } }) =>
  getTicksForChart(
    data,
    getNearestRoundedTimeBy(new Date(), groupedBy),
    groupedBy,
    ticksCount
  )

export const getLastTickFromAPI = state =>
  state.ticks.data[state.ticks.data.length - 1]

export const getTimeFormat = state => state.ticks.timeFormat

export const getGroupTime = state => state.ticks.groupedBy

export const getMode = state => state.ticks.mode

// actions

export const groupByFiveMinutes = () => groupBy(GROUP_5_MINUTES)

export const groupByOneDay = () => groupBy(GROUP_1_DAY)

export const fetchTicks = () => dispatch => {
  return fetchTicksFromAPI().then(ticks => {
    return dispatch({
      type: GET_TICKS,
      ticks
    })
  })
}
