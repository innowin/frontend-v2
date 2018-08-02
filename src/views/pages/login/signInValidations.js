
export const asyncValidateSignIn = (...validationArguments) => {
  // validationArguments is array of [0:values, 1:f(action), 2:props object, 3:field is writing]
  const username = validationArguments[0].username
  const checkUsername = validationArguments[2].actions.checkUsername
  if (username && username.length > 4) {
    const res = new Promise((resolve, reject) => checkUsername(username, resolve, reject)).then((res) => {
      if (res === 0) {
        throw {username: 'کاربری با این نام کاربری وجود ندارد!'}
      }
    })
    return res
  }
}

export const validateSignInForm = values => {
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
    (requiredErrors.includes(true)) ? (errors._error = "فیلد های ضروری را پر کنید!?????") : (errors._error = "")
  })
  return errors
}