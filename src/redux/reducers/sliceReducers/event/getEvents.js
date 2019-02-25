const success = (state, action) => {
  const {data, isLoading} = action.payload
  let allEvents = {}
  data.forEach(event => {
    let detail = []
    if (event.detail && event.detail.length > 0) {
      detail = JSON.parse(event.detail)
    }
    allEvents[event.id] = {
      id: event.id,
      detail,
      event_type: event.event_type,
      title: event.title
    }
  })
  return {
    ...state,
    list: {
      ...state.list,
      ...allEvents,
    },
    isLoading: isLoading
  }
}

const error = (state, action) => {

}

const base = (state, action) => {

}

export default {
  base,
  error,
  success
}