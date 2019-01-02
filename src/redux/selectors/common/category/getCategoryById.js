import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'


const getCategoryById = (state, id) => state.common.category.list[id]


export default  () => createSelector(
    getCategoryById,
    category => category || {}
)