// @flow
import types from "../types"

const resetPasswordBySmsRequest= (phoneNumber: number) => ({
  type: types.USER.GET_USER_BY_USER_ID,
  payload: {phoneNumber}
})

const resetPasswordBySmsCheckCode = (userId:number, VerificationCode: number) => ({
  type: types.USER.GET_PROFILE_BY_USER_ID,
  payload: {userId, VerificationCode}
})

const resetPasswordBySms = (userId:number, VerificationCode:number, password:string, passwordConfirm:string) => ({
  type: types.USER.GET_USERS,
  payload: {userId, VerificationCode, password, passwordConfirm}
})

const ResetPassword = {
  resetPasswordBySmsRequest,
  resetPasswordBySmsCheckCode,
  resetPasswordBySms,
}

export default ResetPassword