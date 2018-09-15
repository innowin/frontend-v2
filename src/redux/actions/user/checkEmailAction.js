// @flow
import types from "../types"

const checkEmail = (email:string, resolve:Function, reject:Function) => ({
  type:types.USER.EMAIL_CHECK,
  payload:{email, resolve, reject}
})

const CheckEmailAction = {
  checkEmail
}

export default CheckEmailAction