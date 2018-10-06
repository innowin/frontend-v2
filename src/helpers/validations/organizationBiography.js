const validateBiography = (biography, translate) => {
  if (biography.length > 70) {
    return translate['Biography length is wrong']
  }
}

const organizationBiographyValidation = (values, {translate}) => {
  const errors = {}
  const {biography} = values
  const requiredFields = []

  let requiredErrors = []

  if (biography) errors.biography = validateBiography(biography, translate)

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

export default organizationBiographyValidation
