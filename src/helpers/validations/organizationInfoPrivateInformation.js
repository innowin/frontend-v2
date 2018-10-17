const validateOfficialName = (officialName, translate) => {
  if (officialName.length < 3) {
    return translate['Official name is wrong']
  }
}
const validateEstablishedYear = (establishedYear, translate) => {
  if (!/^[0-9]+$/.test(establishedYear.length)) {
    return translate['Year is incorrect']
  }
}
const validateNationalCode = (nationalCode, translate) => {
  if (!/^[0-9]{10}$/.test(nationalCode)) {
    return translate['National code is incorrect']
  }
}
const validateUrl = (url, translate) => {
  if (!/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(url) || url.length < 5) {
    return translate['Url is wrong']
  }
}
const validateStaffCount = (staffCount, translate) => {
  if (!/^[0-9]+$/.test(staffCount)) {
    return translate['Staff count must be positive']
  }
}
const validateEmail = (email, translate) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
    return translate['Email is wrong']
  }
}


const organizationPrivateInfoValidation = (values, {translate}) => {
  const errors = {}
  const {officialName, nationalCode, establishedYear, email, registrationAdsUrl, staffCount} = values
  const requiredFields = []

  let requiredErrors = []

  if (officialName) errors.officialName = validateOfficialName(officialName, translate)
  if (nationalCode) errors.nationalCode = validateNationalCode(nationalCode, translate)
  if (establishedYear) errors.establishedYear = validateEstablishedYear(establishedYear, translate)
  if (registrationAdsUrl) errors.registrationAdsUrl = validateUrl(registrationAdsUrl, translate)
  if (staffCount) errors.staffCount = validateStaffCount(staffCount, translate)
  if (email) errors.email = validateEmail(email, translate)


  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true
      requiredErrors.push(true)
    } else {
      requiredErrors.push(false)
    }
    (requiredErrors.includes(true)) ? (errors._error = translate['Fill required fields']) : (errors._error = "")
  })

  return errors
}

export default organizationPrivateInfoValidation
