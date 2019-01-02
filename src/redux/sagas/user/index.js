import types from "../../actions/types"
import {createUserOrgan, createUserPerson} from "./createUserSagas"
import {emailCheck} from "./checkEmailSaga"
import {getProfileByUserId, getUserByUserId, getUsers, getAllUsers} from "./getUserSagas"
import {takeLatest, takeEvery} from "redux-saga/effects"
import {updateProfileByProfileId} from "./updateProfileByProfileIdSaga"
import {updateUserByUserId} from './updateUserByUserIdSaga'
import {usernameCheck} from "./checkUsernameSaga"
import {resetPasswordBySmsRequest, resetPasswordBySmsCheckCode, resetPasswordBySms} from "./resetPasswordBySms"
import {searchUser} from './searchUser'
import {resetPasswordByEmailRequest} from './resetPasswordByEmail'


// check username exist
function* watchUsernameCheck() {
  yield takeLatest(types.USER.USERNAME_CHECK, usernameCheck)
}

// check email exist
function* watchEmailCheck() {
  yield takeLatest(types.USER.EMAIL_CHECK, emailCheck)
}

// check username is exist already
function* watchGetUserByUserId() {
  yield takeEvery(types.USER.GET_USER_BY_USER_ID, getUserByUserId)
}

// get profile by userId
function* watchGetProfileByUserId() {
  yield takeEvery(types.USER.GET_PROFILE_BY_USER_ID, getProfileByUserId)
}

// get users
function* watchGetUsers() {
  yield takeEvery(types.USER.GET_USERS, getUsers)
}

// get All users
function* watchGetAllUsers() {
  yield takeEvery(types.USER.GET_ALL_USERS, getAllUsers)
}

// watchCreateUserPerson
function* watchCreateUserPerson() {
  yield takeEvery(types.USER.CREATE_USER_PERSON, createUserPerson)
}

// watchCreateUserOrgan
function* watchCreateUserOrgan() {
  yield takeEvery(types.USER.CREATE_USER_ORGAN, createUserOrgan)
}

// update user by user id
function* watchUpdateUserByUserId() {
  yield takeEvery(types.USER.UPDATE_USER_BY_USER_ID, updateUserByUserId)
}

// update profile by profile id
function* watchUpdateProfileByProfileId() {
  yield takeEvery(types.USER.UPDATE_PROFILE_BY_PROFILE_ID, updateProfileByProfileId)
}

function* watchResetPasswordBySmsRequest(){
  yield takeEvery(types.USER.PASSWORD_RESET_BY_SMS_REQUEST, resetPasswordBySmsRequest)
}

function* watchResetPasswordBySmsCheckCode(){
  yield takeEvery(types.USER.PASSWORD_RESET_BY_SMS_CHECK_CODE, resetPasswordBySmsCheckCode)
}

function* watchResetPasswordBySms(){
  yield takeEvery(types.USER.PASSWORD_RESET_BY_SMS, resetPasswordBySms)
}

function* watchResetPasswordByEmailRequest(){
  yield takeEvery(types.USER.PASSWORD_RECOVERY_BY_EMAIL, resetPasswordByEmailRequest)
}

function* watchSearchUser(){
  yield takeEvery(types.USER.SEARCH_USER, searchUser)
}

export default [
  // create user
  watchCreateUserOrgan(),
  watchCreateUserPerson(),
  // check username and email
  watchUsernameCheck(),
  watchEmailCheck(),
  // get user
  watchGetProfileByUserId(),
  watchGetUserByUserId(),
  watchGetUsers(),
  watchGetAllUsers(),
  // update user
  watchUpdateProfileByProfileId(),
  watchUpdateUserByUserId(),
  // reset password by sms
  watchResetPasswordBySmsRequest(),
  watchResetPasswordBySmsCheckCode(),
  watchResetPasswordBySms(),
  watchSearchUser(),
  watchResetPasswordByEmailRequest(),
]