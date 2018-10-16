const validateDescription = (description, translate) => {
  if (description.length < 5) {
    return translate['Description is wrong']
  }
}

const validateName = (name, translate) => {
  if (name.length < 5) {
    return translate['Name is wrong']
  }
}

const validateTag = (tag, translate) => {
  if (tag.length < 5) {
    return translate['Tag is wrong']
  }
}

const productInfoValidation = (values, {translate}) => {
  const errors = {}
  const requiredFields = []

  const {description, name} = values
  if (description) errors.description = validateDescription(description, translate)
  if (name) errors.name = validateName(name, translate)

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

export default productInfoValidation
