import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'
import constants from "../../../../consts/constants";

const getCertificates = state => state.common.certificate.list
const getFiles = state => state.common.file.list
const getUserCertificates = (state, props) => {
  const is = props.id || props.userId
  if (state && state.users.list && state.users.list[is] && state.users.list[is].certificates)
    return state.users.list[is].certificates.content
  else return undefined
}

/** this selector selects certificates by certificateIdentity or without that. **/
export const makeUserCertificatesSelector = (state, props) => {
  return createSelector(
      [getCertificates, getUserCertificates, getFiles],
      (certificates, userCertificates, files) => {
        const userId = props.id || props.userId
        if (certificates && Object.keys(certificates).length !== 0 && certificates.constructor === Object && userCertificates && userId) {
          const arrayCertificate = helpers.getObjectOfArrayKeys(userCertificates, certificates)
          return arrayCertificate.map(certificate => {
            const certificatePictureFile = files[certificate.certificate_picture] && files[certificate.certificate_picture].file
            const certificateLogoFile = files[certificate.certificate_logo] && files[certificate.certificate_logo].file
            return {
              certificate_picture_file: certificatePictureFile,
              certificate_logo_file: certificateLogoFile,
              ...certificate
            }
          })
        }
        return []
      }
  )
}

