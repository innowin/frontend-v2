const validateTitle = (title, translate) => {
  if (title.length < 5) {
    return translate['Title is wrong']
  }
}

const validatePageCount = (pageCount, translate) => {
  if (!/^\d+$/.test(pageCount)) {
    return translate['Page Count is wrong']
  }
}

const validateYear = (year, translate) => {
  if (!/^(19|20|13|14)\d\d$/.test(year)) {
    return translate['Year is incorrect']
  }
}

const validatePublication = (publication, translate) => {
  if (publication.length < 5) {
    return translate['Publication is incorrect']
  }
}

const validateUrl = (url, translate) => {
  if (!/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(url) && url.length < 5) {
    return translate['Url is wrong']
  }
}

const validateAuthor = (author, translate) => {
  if (author.length < 5) {
    return translate['Author is incorrect']
  }
}

const validateResearchLink = (researchLink, translate) => {
  if (!/^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(researchLink) && researchLink.length < 5) {
    return translate['Research Link is wrong']
  }
}

const userEducationInfo = (values, {translate}) => {
  const errors = {}
  const requiredFields = []

  const {title, pageCount, year, publication, url, author, researchLink} = values
  if (title) errors.title = validateTitle(title, translate)
  if (pageCount) errors.pageCount = validatePageCount(pageCount, translate)
  if (year) errors.year = validateYear(year, translate)
  if (publication) errors.publication = validatePublication(publication, translate)
  if (url) errors.url = validateUrl(url, translate)
  if (author) errors.author = validateAuthor(author, translate)
  if (researchLink) errors.researchLink = validateResearchLink(researchLink, translate)

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
