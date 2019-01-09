import { createSelector } from 'reselect'

const getAllUsers = (state) => {
  let allUsers = state.users.list
  delete allUsers[state.auth.client.organization ? state.auth.client.organization.id : state.auth.client.user.id]
  if (state.users.search) {
    return Object.values(allUsers).filter(
        user =>
            user.profile &&
            user.profile.content &&
            user.profile.content.profile_user &&
            user.profile.content.profile_user.username &&
            (
                user.profile.content.profile_user.username.includes(state.users.search) ||
                user.profile.content.profile_user.first_name.includes(state.users.search) ||
                user.profile.content.profile_user.last_name.includes(state.users.search)
            )
    )
  }
  else return allUsers
}

export const getUsers = createSelector(
    getAllUsers,
    user => user
)


const getSearchedUsers_ = (state) => {
  const allUsers = state.users.list
  const { search } = state.users
  delete allUsers[state.auth.client.organization ? state.auth.client.organization.id : state.auth.client.user.id]
  const allUsersArray = Object.values(allUsers)
  if (state.users.search)
    return allUsersArray.filter(
        user =>
            user.profile &&
            user.profile.content &&
            user.profile.content.profile_user &&
            user.profile.content.profile_user.username &&
            (
                user.profile.content.profile_user.username.includes(search)
                || user.profile.content.profile_user.first_name.includes(search)
                || user.profile.content.profile_user.last_name.includes(search)
            )
    )
  else return []
}

export const getSearchedUsers = createSelector(
    getSearchedUsers_,
    user => user
)

const getSearchWord_ = state => {
  const { search, isLoading } = state.users
  return { search, isLoading }
}

export const getSearchWord = createSelector(getSearchWord_, search => search)