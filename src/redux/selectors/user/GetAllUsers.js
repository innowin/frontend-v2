import {createSelector} from 'reselect'

const getAllUsers = (state) => {
  let allUsers = {...state.identities.list}
  delete allUsers[state.auth.client.identity.content]
  if (state.identities.search) {
    return Object.values(allUsers).filter(
        user =>
            user.list &&
            (
                user.list.username.includes(state.identities.search) ||
                user.first_name.includes(state.identities.search) ||
                user.last_name.includes(state.identities.search)
            ),
    )
  }
  else return allUsers
}

export const getUsers = createSelector(
    getAllUsers,
    user => user,
)


const getSearchedUsers_ = (state) => {
  let allUsers = {...state.identities.list}
  const {search} = state.identities
  delete allUsers[state.auth.client.identity.content]
  const allUsersArray = Object.values(allUsers)
  if (state.identities.search)
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
            ),
    )
  else return []
}

export const getSearchedUsers = createSelector(
    getSearchedUsers_,
    user => user,
)

const getSearchWord_ = state => {
  const {search, isLoading} = state.identities
  return {search, isLoading}
}

export const getSearchWord = createSelector(getSearchWord_, search => search)