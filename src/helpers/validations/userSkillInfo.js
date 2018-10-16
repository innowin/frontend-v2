const validateDescription = (university, translate) => {
  if (university.length < 5) {
    return translate['Description is wrong']
  }
}

const validateTitle = (grade, translate) => {
  if (grade.length < 5) {
    return translate['Title is wrong']
  }
}

const validateTag = (fieldOfStudy, translate) => {
  if (fieldOfStudy.length < 5) {
    return translate['Tag is wrong']
  }
}

const skillInfoValidation = (values, {translate}) => {
  const errors = {}
  const requiredFields = []

  const {description, title, tag} = values
  if (description) errors.description = validateDescription(description, translate)
  if (title) errors.title = validateTitle(title, translate)
  // if (tag) errors.tag = validateTag(tag, translate)

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
