import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getToasts = state => state.toast.list

/** this selector selects customers. **/
const getToastSelector = createSelector(
    [getToasts],
    (toasts) => {
      if (toasts && Object.keys(toasts).length !== 0 && toasts.constructor === Object) {
        const arrayToasts = helpers.changeObjectKeyValueToArray(toasts)
        return [...arrayToasts]
      }
      return []
    }
)

export default getToastSelector