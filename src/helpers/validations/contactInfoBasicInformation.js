const validatePublicEmail = (publicEmail, translate) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(publicEmail) || publicEmail.length < 5) {
    return translate['Email is wrong']
  }
}

const validateAddress = (address, translate) => {
  if (address.length < 5) {
    return translate['Address is incorrect']
  }
}

const validatePhone = (phone, translate) => {
  if (!/^\d{11}$/.test(phone)) {
    return translate['Phone number is wrong']
  }
}

const validateWebSite = (web_site, translate) => {
  if (!/^https|http:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}$/.test(web_site)) {
    return translate['Url is wrong']
  }
}

const contactInfoBasicInformation = (values, {translate}) => {
  const errors = {}
  const {address, publicEmail, phone, mobile, webSite} = values

  if (address) errors.address = validateAddress(address, translate)
  if (publicEmail) errors.publicEmail = validatePublicEmail(publicEmail, translate)
  if (phone) errors.phone = validatePhone(phone, translate)
  if (mobile) errors.mobile = validatePhone(mobile, translate)
  if (webSite) errors.webSite = validateWebSite(webSite, translate)

  return errors
}

export default contactInfoBasicInformation
