import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'
import constants from "src/consts/constants"

const getOwnerId = (state, props) => props.ownerId
const getCertificates = state => state.common.certificate.list
const getUserCertificates = (state, props) => {
  const {ownerId, identityType} = props
  if (identityType === constants.USER_TYPES.PERSON){
    if (state && state.users.list && state.users.list[ownerId] && state.users.list[ownerId].certificates)
      return state.users.list[ownerId].certificates.content
  }
  else if (identityType === constants.USER_TYPES.ORG){
    if (state && state.organs.list && state.organs.list[ownerId] && state.organs.list[ownerId].certificates)
      return state.organs.list[ownerId].certificates.content
  }
  return undefined
}

/** this selector selects certificates by certificateIdentity or without that. **/
export const userCertificatesSelector = createSelector(
      [getOwnerId, getCertificates, getUserCertificates],
      (ownerId, certificates, userCertificates) => {
        if (certificates && Object.keys(certificates).length !== 0 && certificates.constructor === Object && userCertificates && ownerId) {
          const arrayCertificate = helpers.getObjectOfArrayKeys(userCertificates, certificates)
          return [...arrayCertificate]
        }
        return []
      }
  )

