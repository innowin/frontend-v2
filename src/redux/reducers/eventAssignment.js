import initialState from "src/redux/reducers/initialState"
import types from "src/redux/actions/types"
import slices from './sliceReducers/eventAssignment'

const eventAssignment = (state = initialState.eventAssignment, action) => {
  switch (action.type) {
      /** -------------------------- create event assignment -------------------------> **/
    case types.SUCCESS.EVENT_ASSIGNMENT.CREATE_EVENT_ASSIGNMENT:
      return slices.createEventAssignment.success(state, action)
      /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.eventAssignment
    default:
      return state
  }
}
export default eventAssignment