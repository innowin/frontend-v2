const validatePublicEmail = (publicEmail, translate) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(publicEmail) || publicEmail.length < 5) {
    return translate['Email is wrong']
  }
}

const validateTelegramAccount = (telegramAccount, translate) => {
  if (!/^@[a-zA-Z\-0-9]+$/.test(telegramAccount)) {
    return translate['Telegram account is incorrect']
  }
}

const validateNationalCode = (nationalCode, translate) => {
  if (!/^[0-9]{10}$/.test(nationalCode)) {
    return translate['National code is incorrect']
  }
}
const validateDay = (day, translate) => {
  if (!/^(0[1-9]|\d|[12]\d|3[01])$/.test(day)) {
    return translate['Day is incorrect']
  }
}

const validateMonth = (month, translate) => {
  if (!/^(0[1-9]|\d|1[12])$/.test(month)) {
    return translate['Month is incorrect']
  }
}

const validateYear = (year, translate) => {
  if (!/^(19|20|13|14)\d\d$/.test(year)) {
    return translate['Year is incorrect']
  }
}

const profileInfoBasicInformation = (values, {translate}) => {
  const errors = {}
  const {publicEmail, telegramAccount, nationalCode, day, month, year} = values

  if (publicEmail) errors.publicEmail = validatePublicEmail(publicEmail, translate)
  if (telegramAccount) errors.telegramAccount = validateTelegramAccount(telegramAccount, translate)
  if (nationalCode) errors.nationalCode = validateNationalCode(nationalCode, translate)
  if (day) errors.day = validateDay(day, translate)
  if (month) errors.month = validateMonth(month, translate)
  if (year) errors.year = validateYear(year, translate)

  return errors
}

export default profileInfoBasicInformation
