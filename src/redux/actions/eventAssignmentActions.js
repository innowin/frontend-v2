import types from './types'

const createEventAssignment = ({formValues, eventId, userId, organizationId}) => ({
  type: types.EVENT_ASSIGNMENT.CREATE_EVENT_ASSIGNMENT,
  payload: {formValues, eventId, userId, organizationId}
})


const EventAssignmentActions = {
  createEventAssignment,
}

export default EventAssignmentActions
