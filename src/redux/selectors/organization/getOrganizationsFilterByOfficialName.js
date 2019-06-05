import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getSearchedOrganizations = state => state.organization.searchedOrganizations.content

/** this selector selects organizations. **/
const getSearchedOrganizationsSelector = createSelector(
    [getSearchedOrganizations],
    (searchedOrganizations) => {
      if (searchedOrganizations && Object.keys(searchedOrganizations).length !== 0 && searchedOrganizations.constructor === Object) {
        const arrayOrganizations = helpers.changeObjectKeyValueToArray(searchedOrganizations)
        return [...arrayOrganizations]
      }
      return []
    }
)

export default getSearchedOrganizationsSelector