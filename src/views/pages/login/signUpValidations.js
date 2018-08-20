import {SOCKET as socket, REST_URL as url} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"


const checkExist = (username, resolve) => {
  socket.emit(REST_REQUEST, {
    method: "post",
    url: `${url}/users/user_exist/`,
    data: {username: username},
    result: "USERNAME_CHECK"
  })
  const func = (res) => {
    resolve(res)
    socket.off("USERNAME_CHECK", func)
  }
  socket.on("USERNAME_CHECK", func)
}

const checkUsername = username => new Promise(resolve => checkExist(username, resolve))

export const asyncValidate = values => {
  return checkUsername(values.username).then((res) => {
    if (res.data === 1) {
      throw {username: 'این کاربر قبلا وجود داشته است!'}
    }
  })
}

const validateUsername = (username) => {
  if (!/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/.test(username)) {
    return 'نام کاربری غیر قابل قبول است. لطفا تنها از حروف انگلیسی  یا اعداد یا کاراکتر ـ استفاده نمایید.'
  }
  else if (username.length < 5) return 'نام کاربری باید حداقل ۵ حرف باشد.'
  else if (username.length > 32) return 'نام کاربری باید حداکثر ۳۲ حرف باشد.'
}

const validateEmail = (email) => {
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) || email.length < 5) {
    return 'آدرس ایمیل اشتباه است.'
  }
}

const validatePassword = (pass) => {
  const test1 = "(?=.*[a-z])"
  const test2 = "(?=.*[A-Z])"
  const test3 = "(?=.[!@#\\$%\\^&])"
  const test4 = "(?=.*[0-9])"
  const level1 = new RegExp(test1)
  const level2 = new RegExp(test2)
  const level3 = new RegExp(test3)
  const level4 = new RegExp(test4)
  const condition1 = (level1.test(pass) && level2.test(pass))
  const condition2 = (level1.test(pass) && level3.test(pass))
  const condition3 = (level1.test(pass) && level4.test(pass))
  const condition4 = (level2.test(pass) && level1.test(pass))
  const condition5 = (level2.test(pass) && level3.test(pass))
  const condition6 = (level2.test(pass) && level4.test(pass))
  const condition7 = (level3.test(pass) && level1.test(pass))
  const condition8 = (level3.test(pass) && level2.test(pass))
  const condition9 = (level3.test(pass) && level4.test(pass))
  const condition10 = (level4.test(pass) && level1.test(pass))
  const condition11 = (level4.test(pass) && level2.test(pass))
  const condition12 = (level4.test(pass) && level3.test(pass))
  const validate = condition1 || condition2 || condition3 || condition4 || condition5 || condition6 || condition7
    || condition8 || condition9 || condition10 || condition11 || condition12
  if (pass.length < 8) return 'رمز ورود باید حداقل ۸ حرف باشد.'
  else if (!validate) return 'این رمز ضعیف است. رمز ورود حداقل دارای یک عدد یا یک حرف بزرگ یا علامت باشد.'
}

export const validateSignUpForm = values => {
  const errors = {}
  const requiredFields = ['username', 'email', 'password', 'passwordConfirm']
  const {username, email, password, passwordConfirm} = values

  if (username) errors.username = validateUsername(username)
  if (email) errors.email = validateEmail(email)
  if (password) errors.password = validatePassword(password)
  if (passwordConfirm && passwordConfirm !== password) errors.passwordConfirm = 'دو رمز وارد شده یکسان نیستند.'

  let requiredErrors = []
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = true
      requiredErrors.push(true)
    } else {
      requiredErrors.push(false)
    }
    (requiredErrors.includes(true)) ? (errors._error = "فیلد های ضروری را پر کنید!") : (errors._error = "")
  })
  return errors
}
