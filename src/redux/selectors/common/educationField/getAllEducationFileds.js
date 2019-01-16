import {createSelector} from 'reselect'

const getAllEducationField = (state) => {
  return state.common.educationField.list
}

export const getAllEducationFields = createSelector(
    getAllEducationField,
    uni => uni
)