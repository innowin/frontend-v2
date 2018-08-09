// @flow
import types from "../types"

const createUserPerson = (formValues:{}, resolve:Function, reject:Function) => ({
  type:types.USER.CREATE_USER_PERSON,
  payload:{formValues, resolve, reject}
})

const createUserOrgan = (formValues:{}, resolve:Function, reject:Function) => ({
  type:types.USER.CREATE_USER_ORGAN,
  payload:{formValues, resolve, reject}
})

const CreateUserActions = {
  createUserPerson,
  createUserOrgan
}

export default CreateUserActions