const checkUsernameEmail = async (username, email, checkUsername, checkEmail, translator, reject_, resolve_) => {
  let errors
  if (username) {
    const usernamePromise = new Promise((resolve, reject) => {
      checkUsername(username, resolve, reject)
    })
    await usernamePromise.then((res) => {
      if (res === 1) {
        errors = {...errors, username: translator['Username exists']}
      }
    })
  }
  if (email) {
    const emailPromise = new Promise((resolve, reject) => {
      checkEmail(email, resolve, reject)
    })
    await emailPromise.then((res) => {
      if (res === 1) {
        errors = {...errors, email: translator['Email exists']}
      }
    })
  }
  resolve_(errors)
}

export const asyncValidateSignUp = (...validationArguments) => {
  // validationArguments is array of [0:values, 1:f(action), 2:props, 3:field is active]
  const username = validationArguments[0].username && validationArguments[0].username.trim()
  const email = validationArguments[0].email && validationArguments[0].email.trim()
  const checkUsername = validationArguments[2].actions.checkUsername
  const checkEmail = validationArguments[2].actions.checkEmail
  const translator = validationArguments[2].translator

  const errorPromise = new Promise((resolve, reject) =>
    checkUsernameEmail(username, email, checkUsername, checkEmail, translator, reject, resolve)
  )
  return errorPromise.then(e => {
    if (e) {
      throw e
    }
  })
}

// const validateUsername = (username) => {
//   if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
//     return 'نام کاربری غیر قابل قبول است. لطفا تنها از حروف انگلیسی  یا اعداد یا کاراکتر ـ استفاده نمایید.'
//   }
//   else if (username.length < 5) return 'نام کاربری باید حداقل ۵ حرف باشد.'
//   else if (username.length > 32) return 'نام کاربری باید حداکثر ۳۲ حرف باشد.'
// }

const validateEmail = (email) => {
  if (!/^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
    return 'آدرس ایمیل اشتباه است.'
  }
}

const validatePassword = (pass) => {
  // const test1 = "(?=.*[a-z])"
  // const test2 = "(?=.*[A-Z])"
  // const test3 = "(?=.[!@#\\$%\\^&])"
  // const test4 = "(?=.*[0-9])"
  // const level1 = new RegExp(test1)
  // const level2 = new RegExp(test2)
  // const level3 = new RegExp(test3)
  // const level4 = new RegExp(test4)
  // const condition1 = (level1.test(pass) && level2.test(pass))
  // const condition2 = (level1.test(pass) && level3.test(pass))
  // const condition3 = (level1.test(pass) && level4.test(pass))
  // const condition4 = (level2.test(pass) && level1.test(pass))
  // const condition5 = (level2.test(pass) && level3.test(pass))
  // const condition6 = (level2.test(pass) && level4.test(pass))
  // const condition7 = (level3.test(pass) && level1.test(pass))
  // const condition8 = (level3.test(pass) && level2.test(pass))
  // const condition9 = (level3.test(pass) && level4.test(pass))
  // const condition10 = (level4.test(pass) && level1.test(pass))
  // const condition11 = (level4.test(pass) && level2.test(pass))
  // const condition12 = (level4.test(pass) && level3.test(pass))
  // const validate = condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7
  //   || condition8 || condition9 || condition10 || condition11 || condition12
  if (pass.length < 8) return 'رمز ورود باید حداقل ۸ حرف باشد.'
  // else if (!validate) return 'این رمز ضعیف است. رمز ورود حداقل دارای یک عدد یا یک حرف بزرگ یا علامت باشد.'
}

export const validateSignUpForm = values => {
  const errors = {}
  // const requiredFields = ['email', 'password', 'username']
  const requiredFields = ['email', 'password']
  const {/*username,*/ email, password} = values

  // if (username) errors.username = validateUsername(username)
  if (email) errors.email = validateEmail(email)
  if (password) errors.password = validatePassword(password)
  // if (passwordConfirm && passwordConfirm !== password) errors.passwordConfirm = 'دو رمز وارد شده یکسان نیستند.'

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true
      errors._error = "فیلد های ضروری را پر کنید!"
    }
  })
  return errors
}
