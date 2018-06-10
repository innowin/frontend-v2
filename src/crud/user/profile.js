import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {TOKEN as token} from "src/consts/data"

export const getProfile = (userId, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: `${url}/users/profiles/?profile_user=${userId}`,
    result: `/users/profiles/?profile_user=${userId}`,
    token,
  });

  const func = (res) => {
    if (res.detail) {
      // TODO mohsen: handle error
      return false
    }
    handleResult(res[0]);
    socket.off(`/users/profiles/?profile_user=${userId}`, func)
  };

  socket.on(`/users/profiles/?profile_user=${userId}`, func);
};

export const updateProfile = (formValues, profileId, updateStateForView, hideEdit) => {
  let isLoading = false;
  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST, {
      method: "patch",
      url: `${url}/users/profiles/${profileId}/`,
      result: `updateProfile-patch-${profileId}`,
      token,
      data: {
        "public_email": formValues.public_email,
        "national_code": formValues.national_code,
        "birth_date": formValues.birth_date,
        "web_site": formValues.web_site,
        "phone": formValues.phone,
        "mobile": formValues.mobile,
        "fax": formValues.fax,
        "telegram_account": formValues.telegram_account,
        "description": formValues.description,
        "profile_user": formValues.profile_user
      }
    })
  };

  emitting();

  socket.on(`updateProfile-patch-${profileId}`, (res) => {
    let error = false;
    isLoading = false;
    if (res.detail) {
      error = res.detail;
    }
    updateStateForView(res, error, isLoading);
    hideEdit();
  });
};