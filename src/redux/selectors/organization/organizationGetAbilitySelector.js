import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getAbilities = state => state.ability.list
const getOrganizationAbilities = (state, props) => {
  const {organizationId} = props
  const organizationsList = state.organs.list
  if (organizationsList[organizationId] && organizationsList[organizationId].abilities)
    return organizationsList[organizationId].abilities.content
  else return undefined
}
const getOrganizationId = (state, props) => props.organizationId

/** this selector selects abilities. **/
const getAbilitiesSelector = createSelector(
    [getAbilities, getOrganizationAbilities, getOrganizationId],
    (abilities, organizationAbilities, organizationId) => {
      if (abilities && Object.keys(abilities).length !== 0 && abilities.constructor === Object && organizationAbilities && organizationId) {
        const arrayAbilities = helpers.getObjectOfArrayKeys(organizationAbilities, abilities)
        return [...arrayAbilities]
      }
      return []
    }
)

export default getAbilitiesSelector