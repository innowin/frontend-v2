const validateText = (text, translate) => {
  if (text.length < 5) {
    return translate['Name is wrong']
  }
}

const validateTitle = (title, translate) => {
  if (title.length < 5) {
    return translate['Title is wrong']
  }
}

const skillInfoValidation = (values, {translate}) => {
  const errors = {}
  const requiredFields = []

  const {text, title} = values
  if (text) errors.text = validateText(text, translate)
  if (title) errors.title = validateTitle(title, translate)

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

export default skillInfoValidation
