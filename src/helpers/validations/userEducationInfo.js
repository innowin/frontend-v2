// const validateUniversity = (university, translate) => {
//   if (university.length < 5) {
//     return translate['University is wrong']
//   }
// }
//
// const validateGrade = (grade, translate) => {
//   if (grade.length < 5) {
//     return translate['Education grade is wrong']
//   }
// }
//
// const validateFieldOfStudy = (fieldOfStudy, translate) => {
//   if (fieldOfStudy.length < 5) {
//     return translate['Field of study is wrong']
//   }
// }
//
// const validateAverage = (average, translate) => {
//   if (!/^(0[1-9]|\d|1[1-9]|20)$/.test(average)) {
//     return translate['Average is incorrect']
//   }
// }
//
// const validateDescription = (desctiption, translate) => {
//   if (desctiption.length < 5) {
//     return translate['Description is wrong']
//   }
// }

const validateDay = (day, translate) => {
  if (!/^(0[1-9]|\d|[120]\d|3[01])$/.test(day)) {
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

const userEducationInfo = (values, {translate}) => {
  const errors = {}
  const requiredFields = ['fieldOfStudy', 'grade', 'university']

  // const {university, grade, fieldOfStudy, average, description, dayFromDate, monthFromDate, yearFromDate, dayToDate, monthToDate, yearToDate} = values
  const {dayFromDate, monthFromDate, yearFromDate, dayToDate, monthToDate, yearToDate} = values
  // if (university) errors.university = validateUniversity(university, translate)
  // if (grade) errors.grade = validateGrade(grade, translate)
  // if (fieldOfStudy) errors.fieldOfStudy = validateFieldOfStudy(fieldOfStudy, translate)
  // if (average) errors.average = validateAverage(average, translate)
  // if (description) errors.description = validateDescription(description, translate)
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
