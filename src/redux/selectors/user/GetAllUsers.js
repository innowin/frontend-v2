import {createSelector} from 'reselect'

const getAllUsers = (state) => {
  let allUsers = {...state.users.allUsers}
  delete allUsers[state.auth.client.organization ? state.auth.client.organization.id : state.auth.client.user.id]
  // let searched = state.exchanges.searchByWord ? state.exchanges.searchByWord : []
  // if (searched.length > 0) {
  //   if ((searched[0] !== -1)) {
  //     let users = {}
  //     Object.values(searched).forEach(p => {
  //       users[p] = allUsers[p]
  //     })
  //     return users
  //   }
  //   else
  //   {
  //     return []
  //   }
  // }
  // else {
    return allUsers
  // }
}

export const getUsers = createSelector(
    getAllUsers,
    user => user
)