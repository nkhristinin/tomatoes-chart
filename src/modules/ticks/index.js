// @flow
import { makeGetTicks } from "../../API"
import { getTicksForChart, getNearestRoundedTimeBy } from "./utils"

const fetchTicksFromAPI = makeGetTicks()

// constants
const GET_TICKS = "ticks/GET_TICKS"
const GROUP_BY = "ticks/GROUP_BY"

// reducers
type TicksStateType = {
  data: Array<Tick>,
  groupedBy: number,
  ticksCount: number
}

const FIVE_MINUTES = 1000 * 60 * 5
const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = ONE_HOUR * 24
const ONE_MONTH = ONE_DAY * 30

const initialState: TicksStateType = {
  data: [],
  groupedBy: FIVE_MINUTES,
  ticksCount: ONE_HOUR / FIVE_MINUTES
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
        ticksCount: action.ticksCount
      }
    default:
      return state
  }
}

//selectors

const groupBy = (groupedBy, ticksCount) => ({
  type: GROUP_BY,
  groupedBy,
  ticksCount
})

export const groupByFiveMinutes = () =>
  groupBy(FIVE_MINUTES, ONE_HOUR / FIVE_MINUTES)

export const groupByOneDay = () => groupBy(ONE_DAY, ONE_MONTH / ONE_DAY)

// Return ticks for charts
// for opmiziation can use reselect or other solutions for memoisation
export const getTicks = ({ ticks: { data, groupedBy, ticksCount } }) =>
  getTicksForChart(
    data,
    getNearestRoundedTimeBy(new Date(), groupedBy),
    groupedBy,
    ticksCount
  )

// actions
export const fetchTicks = () => dispatch => {
  return dispatch({
    type: GET_TICKS,
    ticks: fetchTicksFromAPI()
  })
}
