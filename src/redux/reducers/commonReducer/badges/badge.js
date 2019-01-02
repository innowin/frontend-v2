import initialState from '../../initialState/index'
import types from '../../../actions/types/index'
import appendListToStateList from '../../sliceReducers/utilsSlices/appendListToStateList'
// this badge function just set received success badges in user or organ or ...

const badge = (state = initialState.common.badges.badge, action) => {
  const {data} = action.payload || []
  // data's structure is : {[id]:{}}
  switch (action.type) {
      /** --------------------  get user badges --------------------- **/
      // parentId in this section is user identityId
    case types.SUCCESS.COMMON.GET_USER_BADGES:
      return {
        ...state,
        list: {
          ...data
        }
      }
    case types.SUCCESS.COMMON.GET_BADGES:
      return appendListToStateList.success(state, action)
      /** --------------------  get organ badges --------------------- **/
      // parentId in this section is organId
    case types.SUCCESS.COMMON.GET_ORG_BADGES:
      return {
        ...state,
        list: {
          ...data
        }
      }

      /** --------------------  get all badges for About tab --------------------- **/
    case types.SUCCESS.COMMON.GET_ALL_BADGES:
      let allBadges = []
      const {loading} = action.payload
      for (let i = 0; i < data.length; i++) {
        let addBadge = {}
        addBadge.title = data[i].badge_related_badge_category.badge_title
        addBadge.description = data[i].badge_related_badge_category.badge_description
        addBadge.media = data[i].badge_related_badge_category.badge_related_media.file
        allBadges.push(addBadge)
      }
      return {
        ...state,
        allBadges: allBadges.slice(),
        loading: loading
      }

      /** ----------------- reset -----------------> **/
    case types.RESET:
      return initialState.common.badges.badge
    default:
      return state
  }
}
export default badge