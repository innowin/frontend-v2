import {createSelector} from 'reselect'

const getCategoryById = (state, id) => state.common.category.list[id]

export default () => createSelector(
    getCategoryById,
    category => category || {}
)