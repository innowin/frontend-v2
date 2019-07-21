import {createSelector} from 'reselect'

const getAllBadges = (state) => {
  return {
    badges: state.common.badges.badge.allBadges,
    loading: state.common.badges.badge.loading,
  }
}

export const getBadges = createSelector(
    getAllBadges,
    badge => badge,
)
