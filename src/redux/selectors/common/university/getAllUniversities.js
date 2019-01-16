import {createSelector} from 'reselect'

const getAllUniversity = (state) => {
  return state.common.university.list
}

export const getAllUniversities = createSelector(
    getAllUniversity,
    uni => uni
)