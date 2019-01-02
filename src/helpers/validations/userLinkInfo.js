// const validateAccount = (account, translate) => {
//   if (!/^[a-zA-Z0-9]+$/.test(account) || account.length < 2) {
//     return translate['Account is incorrect']
//   }
// }

const validateUrl = (url, translate) => {
  if (!/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(url) || url.length < 5) {
    return translate['Url is wrong']
  }
}

const linkInfoValidation = (values, {translate}) => {
  const errors = {}
  const requiredFields = []

  const {telegramAccount, instagramAccount, linkedinAccount, webSite} = values
  // if (telegramAccount) errors.telegramAccount = validateAccount(telegramAccount, translate)
  // if (instagramAccount) errors.instagramAccount = validateAccount(instagramAccount, translate)
  // if (linkedinAccount) errors.linkedinAccount = validateAccount(linkedinAccount, translate)
  if (webSite) errors.webSite = validateUrl(webSite, translate)

  let requiredErrors = []
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

export default linkInfoValidation
