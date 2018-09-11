const validateEmail = (email, translate) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
    return translate['Email is wrong']
  }
}

const userInfoValidation = (values, {translate}) => {
  const errors = {}
  const requiredFields = ['email']

  const {email} = values
  if (email) errors.email = validateEmail(email, translate)

  let requiredErrors = []
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true
      requiredErrors.push(true)
    } else {
      requiredErrors.push(false)
    }
    (requiredErrors.includes(true)) ? (errors._error = translate['Email is required']) : (errors._error = "")
  })

  return errors
}

export default userInfoValidation
