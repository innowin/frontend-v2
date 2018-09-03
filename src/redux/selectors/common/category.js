import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions'


const getCategories = (state, parentId) => {
    const allCategories = state.common.category.categories
    if (parentId) {
        const list = helpers.filterNestedObjByKey(allCategories.list, 'category_parent', parentId)
        return ({...state.category.categories, list: list})
    }
    return allCategories
}


/** this selector selects categories by parentId or without that. **/
export const categorySelector = createSelector(
    getCategories,
    categories => categories
)

