import types from "../types"

const getResearchByUserId = ({userId}) => ({
  type: types.RESEARCH.GET_USER_RESEARCH_BY_USER_ID,
  payload: {userId}
})

const createResearchByUserId = ({formValues, userId}) => ({
  type: types.RESEARCH.CREATE_USER_RESEARCH_BY_USER_ID,
  payload: {formValues, userId}
})

const deleteResearchByUserId = ({researchId, userId}) => ({
  type: types.RESEARCH.DELETE_USER_RESEARCH_BY_USER_ID,
  payload: {researchId, userId}
})

const updateResearchByUserId = ({formValues, researchId, userId}) => ({
  type: types.RESEARCH.UPDATE_USER_RESEARCH_BY_USER_ID,
  payload: {formValues, researchId, userId}
})


const ResearchActions = {
  getResearchByUserId,
  createResearchByUserId,
  deleteResearchByUserId,
  updateResearchByUserId,
}

export default ResearchActions