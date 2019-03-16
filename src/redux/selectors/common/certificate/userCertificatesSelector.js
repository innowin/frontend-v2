import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getOwnerId = (state, props) => {
  const {ownerId, organization, user} = props
  return (user && user.id) || (organization && organization.id) || ownerId
}
const getCertificates = state => state.common.certificate.list
const getUserCertificates = (state, props) => {
  const {ownerId} = props
  return state.identities.list[ownerId].certificates
      ? state.identities.list[ownerId].certificates.content
      : []
}

/** this selector selects certificates by certificateIdentity or without that. **/
export const userCertificatesSelector = createSelector(
    [getOwnerId, getCertificates, getUserCertificates],
    (ownerId, certificates, userCertificates) => {
      if (certificates && Object.keys(certificates).length !== 0 && certificates.constructor === Object && userCertificates && ownerId) {
        return helpers.getObjectOfArrayKeys(userCertificates, certificates)
      }
      return []
    }
)

