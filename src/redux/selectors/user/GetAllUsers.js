import {createSelector} from 'reselect'

const getAllUsers = (state) => {
  let allUsers = {...state.identities.list}
  delete allUsers[state.auth.client.identity.content]
  if (state.identities.search) {
    return Object.values(allUsers).filter(
        user =>
            user.id &&
            ((user.username && user.username.includes(state.identities.search)) ||
                ((user.first_name + ' ' + user.last_name).includes(state.identities.search)) ||
                ((user.official_name + ' ' + user.nike_name).includes(state.identities.search))),
    )
  }
  else return allUsers
}

export const getUsers = createSelector(
    getAllUsers,
    user => user,
)