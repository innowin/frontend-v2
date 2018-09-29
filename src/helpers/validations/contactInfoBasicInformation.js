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

// const validateTelegramAccount = (telegramAccount, translate) => {
//   if (!/^@[a-zA-Z\-0-9]+$/.test(telegramAccount)) {
//     return translate['Telegram account is incorrect']
//   }
// }
// const validateDescription = (description, translate) => {
//   if (description.length < 5) {
//     return translate['Description is incorrect']
//   }
// }

const contactInfoBasicInformation = (values, {translate}) => {
  const errors = {}
  const {address, publicEmail} = values
  // const {description telegramAccount} = values

  if (address) errors.address = validateAddress(address, translate)
  if (publicEmail) errors.publicEmail = validatePublicEmail(publicEmail, translate)

  // if (telegramAccount) errors.telegramAccount = validateTelegramAccount(telegramAccount, translate)
  // if (description) errors.description = validateDescription(description, translate)

  return errors
}

export default contactInfoBasicInformation
