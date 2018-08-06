export const asyncValidateSignIn = (...validationArguments) => {
  // validationArguments is array of [0:values, 1:f(action), 2:props object, 3:field is writing]
  const username = validationArguments[0].username.trim()
  const checkUsername = validationArguments[2].actions.checkUsername
  const translator = validationArguments[2].translator
  //TODO mohsen: set async check email not exist
  return new Promise(resolve => {
    if (username) {
      checkUsername(username, resolve)
    }
  }).then((res) => {
    if (res === 0) {
      throw {username: translator['This username does not exist']}
    }
  })
}

export const validateSignInForm = (...validationArguments) => {
  const translator = validationArguments[1].translator
  const values = validationArguments[0]
  const errors = {}
  const requiredFields = ['username', 'password']
  let requiredErrors = []
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true
      requiredErrors.push(true)
    } else {
      requiredErrors.push(false)
    }
    (requiredErrors.includes(true)) ? (errors._error =translator['Fill required fields']) : (errors._error = "")
  })
  return errors
}