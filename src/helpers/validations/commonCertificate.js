const validateTitle = (title, translate) => {
  if (title.length < 1) {
    return translate['Title is wrong']
  }
}

const userEducationInfo = (values, {translate}) => {
  const errors = {}
  const requiredFields = []

  const {title} = values
  if (title) errors.title= validateTitle(title, translate)

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

export default userEducationInfo