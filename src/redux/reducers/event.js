import initialState from "src/redux/reducers/initialState"
import types from "src/redux/actions/types"
import slices from './sliceReducers/event'

const eventAssignment = (state = initialState.event, action) => {
  switch (action.type) {
      /** -------------------------- get events -------------------------> **/
    case types.SUCCESS.EVENT.GET_EVENTS:
      console.log(types.SUCCESS.EVENT.GET_EVENTS)
      return slices.getEvents.success(state, action)
      /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.event
    default:
      return state
  }
}
export default eventAssignment