// @flow
import { makeGetTicks } from "../API"

const fetchTicksFromAPI = makeGetTicks(100)

// constants
const GET_TICKS = "ticks/GET_TICKS"

// reducers
const initialState = {
  data: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TICKS:
      return {
        data: action.ticks
      }
    default:
      return state
  }
}

// selectors
export const getTicks = state => state.ticks.data

// actions
export const fetchTicks = () => dispatch => {
  return dispatch({
    type: GET_TICKS,
    ticks: fetchTicksFromAPI()
  })
}
