const validateNikeName = (nikeName, translate) => {
  if (nikeName.length > 20) {
    return translate['Official name is wrong']
  }
}

const organizationBasicInfoValidation = (values, {translate}) => {
  const errors = {}
  const {nikeName} = values
  const requiredFields = []
  if (nikeName) errors.nikeName = validateNikeName(nikeName, translate)

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

export default organizationBasicInfoValidation
