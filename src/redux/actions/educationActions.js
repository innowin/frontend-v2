import types from "./types"

const getEducationByUserId = ({userId}) => ({
  type: types.EDUCATION.GET_USER_EDUCATION_BY_USER_ID,
  payload: {userId}
})

const createEducationByUserId = ({formValues, userId}) => ({
  type: types.EDUCATION.CREATE_USER_EDUCATION_BY_USER_ID,
  payload: {formValues, userId}
})

const deleteEducationByUserId = ({educationId, userId}) => ({
  type: types.EDUCATION.DELETE_USER_EDUCATION_BY_USER_ID,
  payload: {educationId, userId}
})

const updateEducationByUserId = ({formValues, educationId, userId}) => ({
  type: types.EDUCATION.UPDATE_USER_EDUCATION_BY_USER_ID,
  payload: {formValues, educationId, userId}
})

const EducationActions = {
  getEducationByUserId,
  createEducationByUserId,
  deleteEducationByUserId,
  updateEducationByUserId,
}

export default EducationActions