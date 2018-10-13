import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'


const getCategories = (state, parentId) => {
    const allCategories = state.common.category
    if (parentId) {
        const list = helpers.filterNestedObjByKey(allCategories.list, 'category_parent', parentId)
        return ({...state.category, list: list})
    }
    return allCategories
}


/** this selector selects categories by parentId or without that. **/
export const makeCategorySelector = () => createSelector(
    getCategories,
    categories => categories
)

