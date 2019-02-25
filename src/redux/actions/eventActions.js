import types from './types'

const getEvents = () => ({
  type: types.EVENT.GET_EVENTS,
  payload: {}
})

const EventActions = {
  getEvents,
}

export default EventActions