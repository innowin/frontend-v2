import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {TOKEN as token} from "src/consts/data"

export const getProfile = (userId, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: `${url}/users/profiles/?profile_user=${userId}`,
    result: `/users/profiles/?profile_user=${userId}`,
    token,
  })

  const func = (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res.data[0])
    socket.off(`/users/profiles/?profile_user=${userId}`, func)
  }

  socket.on(`/users/profiles/?profile_user=${userId}`, func)
}

// export const updateProfile = (formValues, profileId, updateStateForView, hideEdit) => {
//   socket.emit(REST_REQUEST, {
//     method: "patch",
//     url: `${url}/users/profiles/${profileId}/`,
//     result: `updateProfile-patch-${profileId}`,
//     token,
//     data: {
//       "public_email": formValues.public_email,
//       "national_code": formValues.national_code,
//       "birth_date": formValues.birth_date,
//       "web_site": formValues.web_site,
//       "phone": formValues.phone,
//       "mobile": formValues.mobile,
//       "fax": formValues.fax,
//       "telegram_account": formValues.telegram_account,
//       "description": formValues.description,
//       "profile_user": formValues.profile_user
//     }
//   })
//
//   const func = (res) => {
//     if (res.detail) {
//       return false
//     }
//     updateStateForView(res)
//     hideEdit()
//     socket.off(`updateProfile-patch-${profileId}`, func)
//   }
//   socket.on(`updateProfile-patch-${profileId}`, func)
// }