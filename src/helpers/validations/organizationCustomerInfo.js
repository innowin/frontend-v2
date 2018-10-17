const validateTitle = (title, translate) => {
  if (title.length < 3) {
    return translate['Title is wrong']
  }
}

const organizationCustomerValidation = (values, {translate}) => {
  const errors = {}
  const {title} = values
  const requiredFields = []

  let requiredErrors = []

  if (title) errors.title = validateTitle(title, translate)

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

export default organizationCustomerValidation
