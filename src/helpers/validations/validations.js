const validatePhone = ({value, translate}) => {
  if (!/^\d{11}$/.test(value)) {
    return translate['Phone number is wrong']
  }
}

const validateEmail = ({value, translate}) => {
  if (!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) || value.length < 5) {
    return translate['Email is wrong']
  }
}

const validateWebSite = ({value, translate}) => {
  if (!/^https|http:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}$/.test(value)) {
    return translate['Url is wrong']
  }
}

const validateBiography = ({value, translate}) => {
  if (value.length > 700) {
    return translate['Biography length is wrong']
  }
}

const Validations = {
  validateEmail,
  validatePhone,
  validateWebSite,
  validateBiography,
}

export default Validations