import types from "../types/index"

const getWorkExperienceByUserId = ({userId}) => ({
  type: types.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID,
  payload: {userId}
})

const updateWorkExperienceByUserId = ({formValues, workExperienceId, userId}) => ({
  type: types.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID,
  payload: {formValues, workExperienceId, userId}
})

const createWorkExperienceByUserId = ({formValues, userId}) => ({
  type: types.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID,
  payload: {formValues, userId}
})

const deleteWorkExperienceByUserId = ({workExperienceId, userId}) => ({
  type: types.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID,
  payload: {workExperienceId, userId}
})

const WorkExperienceActions = {
  getWorkExperienceByUserId,
  updateWorkExperienceByUserId,
  createWorkExperienceByUserId,
  deleteWorkExperienceByUserId,
}

export default WorkExperienceActions