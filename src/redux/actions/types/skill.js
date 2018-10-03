const BASE = {
  GET_SKILL_BY_USER_ID: 'GET_SKILL_BY_USER_ID',
  DELETE_SKILL_BY_USER_ID: 'DELETE_SKILL_BY_USER_ID',
  UPDATE_SKILL_BY_USER_ID: 'UPDATE_SKILL_BY_USER_ID',
  CREATE_SKILL: "USER@CREATE_USER_SKILL_REQUEST",
  ADD_HASH_TAG_ID_TO_Skill: 'USER@ADD_HASH_TAG_ID_TO_SKILL_REQUEST'

}

const SUCCESS = {
  GET_SKILL_BY_USER_ID: 'GET_SKILL_BY_USER_ID_SUCCESS',
  DELETE_SKILL_BY_USER_ID: 'DELETE_SKILL_BY_USER_ID_SUCCESS',
  UPDATE_SKILL_BY_USER_ID: 'UPDATE_SKILL_BY_USER_ID_SUCCESS',
  CREATE_SKILL: "USER@CREATE_USER_SKILL_SUCCESS"
}

const ERROR = {
  GET_SKILL_BY_USER_ID: 'GET_SKILL_BY_USER_ID_ERROR',
  DELETE_SKILL_BY_USER_ID: 'DELETE_SKILL_BY_USER_ID_ERROR',
  UPDATE_SKILL_BY_USER_ID: 'UPDATE_SKILL_BY_USER_ID_ERROR',
  CREATE_SKILL: "USER@CREATE_USER_SKILL_ERROR"
}


export default {
  BASE,
  ERROR,
  SUCCESS,
}