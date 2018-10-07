const validateWebSite = (web_site, translate) => {
  if (!/^https|http:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}$/.test(web_site)) {
    return translate['Url is wrong']
  }
}
const validateAddress = (address, translate) => {
  if (address.length < 3) {
    return translate['Address is incorrect']
  }
}
const validatePhone = (phone, translate) => {
  if (!/^\+[0-9]{12}$/.test(phone)) {
    return translate['Phone number is wrong']
  }
}
const validateEmail = (email, translate) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
    return translate['Email is wrong']
  }
}


const organizationContactInfoValidation = (values, {translate}) => {
  const errors = {}
  const {address, webSite, phone, publicEmail} = values
  const requiredFields = []

  let requiredErrors = []

  if (webSite) errors.webSite = validateWebSite(webSite, translate)
  if (address) errors.address = validateAddress(address, translate)
  if (phone) errors.phone = validatePhone(phone, translate)
  if (publicEmail) errors.publicEmail = validateEmail(publicEmail, translate)


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

export default organizationContactInfoValidation
