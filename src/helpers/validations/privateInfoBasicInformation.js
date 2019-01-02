const validateEmail = (email, translate) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
    return translate['Email is wrong']
  }
}

const validateDay = (day, translate) => {
  if (!/^(0[1-9]|\d|[12]\d|3[01])$/.test(day)) {
    return translate['Day is incorrect']
  }
}

const validateMonth = (month, translate) => {
  if (!/^(0[1-9]|\d|1[120])$/.test(month)) {
    return translate['Month is incorrect']
  }
}

const validateYear = (year, translate) => {
  if (!/^(19|20|13|14)\d\d$/.test(year)) {
    return translate['Year is incorrect']
  }
}

const validateNationalCode = (nationalCode, translate) => {
  if (!/^[0-9]{10}$/.test(nationalCode)) {
    return translate['National code is incorrect']
  }
}

const validateAuthMobile = (authMobile, translate) => {
  if (!/^[0-9]{11}$/.test(authMobile)) {
    return translate['Phone number is wrong']
  }
}

const privateInfoBasicInformation = (values, {translate}) => {
  const errors = {}
  const requiredFields = ['email']
  const {email, nationalCode, day, month, year, authMobile} = values

  let requiredErrors = []
  requiredFields.forEach(field => {
    if (!values[field]) {
      // errors[field] = true
      errors[field] = translate['Fill required fields']
      requiredErrors.push(true)
    } else {
      requiredErrors.push(false)
    }
    (requiredErrors.includes(true)) ? (errors._error = translate['Fill required fields']) : (errors._error = "")
  })

  if (email) errors.email = validateEmail(email, translate)
  if (nationalCode) errors.nationalCode = validateNationalCode(nationalCode, translate)
  if (day) errors.day = validateDay(day, translate)
  if (month) errors.month = validateMonth(month, translate)
  if (year) errors.year = validateYear(year, translate)
  if (year) errors.authMobile = validateAuthMobile(authMobile, translate)

  return errors
}

export default privateInfoBasicInformation
