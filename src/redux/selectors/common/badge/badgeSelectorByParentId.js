import {createSelector} from "reselect";




const getBadgesByParentId = (state, parentId) => {
  const files = state.common.file.list || {}
  const badgeCategories = state.common.badges.badgeCategory.list || {}
  const badgesObj = state.common.badges.badge.list || {}
  const badgesList = Object.values(badgesObj).filter((badge= {}) => badge.badge_related_parent === +parentId)
  return badgesList.map(badge => {
    const category = badgeCategories[badge.badge_related_badge_category] || {}
    const fileId = category.badge_related_media
    const file = files[fileId] ? files[fileId].file : ''
    return {
        ...badge,
        fileUrl: file
    }
  })
}

const makeBadgeSelectorByParentId = () => createSelector(getBadgesByParentId, list => list || [])

export default makeBadgeSelectorByParentId