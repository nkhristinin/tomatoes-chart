// @flow
import { makeGetTicks } from "../../API"
import { getTicksForChart, getNearestRoundedTimeBy } from "./utils"

const fetchTicksFromAPI = makeGetTicks()

// constants
const GET_TICKS = "ticks/GET_TICKS"

// reducers
type TicksStateType = {
  data: Array<Tick>,
  groupedBy: number,
  ticksCount: number
}

const FIVE_MINUTES = 1000 * 60 * 5
const ONE_HOUR = 1000 * 60 * 60

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
    default:
      return state
  }
}

// selectors

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
