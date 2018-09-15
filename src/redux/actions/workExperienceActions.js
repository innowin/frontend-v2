import types from "./types"

const getWorkExperienceByUserId = ({userId}) => ({
  type: types.WORK_EXPERIENCE.GET_USER_WORK_EXPERIENCES_BY_USER_ID,
  payload: {userId}
})

const updateWorkExperienceByUserId = ({formValues, workExperienceId, userId}) => ({
  type: types.WORK_EXPERIENCE.UPDATE_USER_WORK_EXPERIENCES_BY_USER_ID,
  payload: {formValues, workExperienceId, userId}
})

const createWorkExperienceByUserId = ({formValues, organizationId, userId}) => ({
  type: types.WORK_EXPERIENCE.CREATE_USER_WORK_EXPERIENCES_BY_USER_ID,
  payload: {formValues, organizationId, userId}
})

const deleteWorkExperienceByUserId = ({workExperienceId, organizationId, userId}) => ({
  type: types.WORK_EXPERIENCE.DELETE_USER_WORK_EXPERIENCES_BY_USER_ID,
  payload: {workExperienceId, organizationId, userId}
})

const WorkExperienceActions = {
  getWorkExperienceByUserId,
  updateWorkExperienceByUserId,
  createWorkExperienceByUserId,
  deleteWorkExperienceByUserId,
}

export default WorkExperienceActions