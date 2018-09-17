const validateUniversity = (university, translate) => {
  if (university.length < 5) {
    return translate['University is wrong']
  }
}

const validateGrade = (grade, translate) => {
  if (grade.length < 5) {
    return translate['Grade is wrong']
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

const userEducationInfo = (values, {translate}) => {
  const errors = {}
  const requiredFields = []

  const {university, grade, fieldOfStudy, dayFromDate, monthFromDate, yearFromDate, dayToDate, monthToDate, yearToDate} = values
  if (university) errors.university = validateUniversity(university, translate)
  if (grade) errors.grade = validateGrade(grade, translate)
  if (dayFromDate) errors.dayFromDate = validateDay(dayFromDate, translate)
  if (monthFromDate) errors.monthFromDate = validateMonth(monthFromDate, translate)
  if (yearFromDate) errors.yearFromDate = validateYear(yearFromDate, translate)
  if (dayToDate) errors.dayToDate = validateDay(dayToDate, translate)
  if (monthToDate) errors.monthToDate = validateMonth(monthToDate, translate)
  if (yearToDate) errors.yearToDate = validateYear(yearToDate, translate)

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
