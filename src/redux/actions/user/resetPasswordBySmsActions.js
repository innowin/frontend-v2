// @flow
import types from "../types"

const resetPasswordBySmsRequest = (phoneNumber: number) => ({
  type: types.USER.PASSWORD_RESET_BY_SMS_REQUEST,
  payload: {phoneNumber}
})

const resetPasswordBySmsCheckCode = (userId: number, VerificationCode: number) => ({
  type: types.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE,
  payload: {userId, VerificationCode}
})

const resetPasswordBySms = (userId: number, VerificationCode: number, password: string, passwordConfirm: string) => ({
  type: types.USER.PASSWORD_RESET_BY_SMS,
  payload: {userId, VerificationCode, password, passwordConfirm}
})

const resetRecoveryPasswordReduxState = () => ({type: types.USER.RESET_RECOVERY_PASSWORD_REDUX_STATE, payload: {}})

const searchUser = ({input}) => ({
  type: types.USER.SEARCH_USER,
  payload: {input}
})

const ResetPassword = {
  resetPasswordBySmsRequest,
  resetPasswordBySmsCheckCode,
  resetPasswordBySms,
  resetRecoveryPasswordReduxState,
  searchUser,
}

export default ResetPassword