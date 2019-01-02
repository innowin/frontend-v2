import {createSelector} from 'reselect'

const getAllFollowList = (state) => {
  return state.common.social.follows.list
}

export const getFollowList = createSelector(
    getAllFollowList,
    follow => follow
)