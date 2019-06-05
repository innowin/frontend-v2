import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'

const getOwnerId = (state, props) => {
  const {ownerId, organization, user, userId} = props
  return (user && user.id) || (organization && organization.id) || ownerId || userId
}
const getCertificates = state => state.common.certificate.list
const getUserCertificates = (state, props) => {
  const {ownerId, userId} = props
  const id = ownerId || userId
  return state.identities.list[id] && state.identities.list[id].certificates
      ? state.identities.list[id].certificates.content
      : []
}

const getIdentities = state => state.identities.list

/** this selector selects certificates by certificateIdentity or without that. **/
export const userCertificatesSelector = createSelector(
    [getOwnerId, getCertificates, getUserCertificates, getIdentities],
    (ownerId, certificates, userCertificates, identities) => {
      if (certificates && Object.keys(certificates).length !== 0 && certificates.constructor === Object && userCertificates && ownerId) {
        const arrayCertificates = helpers.getObjectOfArrayKeys(userCertificates, certificates)
        for (let i = 0; i < arrayCertificates.length; i++) {
          const organizationId = (arrayCertificates[i].certificate_organization && arrayCertificates[i].certificate_organization.id) || arrayCertificates[i].certificate_organization
          if (organizationId && identities[organizationId]) {
            arrayCertificates[i].organizationOfficialName = identities[organizationId].official_name
          } else {
            arrayCertificates[i].organizationOfficialName = ''
          }
        }
        return [...arrayCertificates]
      }
      return []
    }
)

