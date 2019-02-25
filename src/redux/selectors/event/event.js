import {createSelector} from 'reselect'
const events = state => state.event.list
const userType = state => {
  let ut = state.auth.client.user_type
  if (ut === 'person') {
    return 'user'
  } else if (ut === 'org') {
    return 'organization'
  }
}
/** this selector selects Events and add to them showDetails : false **/
export const getEventsSelector = createSelector(
    [events,userType],
    (events, userType) => {
      let result = {}
      if (events && Object.keys(events).length !== 0) {
        for (let key in events) {
          if (events.hasOwnProperty(key) && events[key].event_type === userType) {
            result[key] =  {
              ...events[key],
              showDetails: false
            }
          }
        }
      }
      return result
    }
)