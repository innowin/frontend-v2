import {createSelector} from 'reselect'

const getAllUsers = (state) => {
  let allUsers = {...state.identities.list}
  delete allUsers[state.auth.client.identity.content]
  if (state.identities.search) {
    return Object.values(allUsers).filter(
        user =>
            (user.username.includes(state.identities.search)) ||
            ((user.first_name + ' ' + user.last_name).includes(state.identities.search)) ||
            ((user.official_name + ' ' + user.nike_name).includes(state.identities.search)),
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
  delete allUsers[state.auth.client.identity.content]
  const allUsersArray = Object.values(allUsers)
  if (state.identities.search)
    return allUsersArray.filter(
        user =>
            (user.username.includes(state.identities.search)) ||
            ((user.first_name + ' ' + user.last_name).includes(state.identities.search)) ||
            ((user.official_name + ' ' + user.nike_name).includes(state.identities.search)),
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