import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"

export const updateUser = (formValues, userId, updateStateForView, hideEdit) => {
  let isLoading = false;
  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST, {
      method: "patch",
      url: `${url}/users/${userId}/`,
      result: `updateUser-patch-${userId}`,
      token: "",
      data: {
        "username": formValues.username,
        "first_name": formValues.first_name,
        "last_name": formValues.last_name,
        "email": formValues.email,
      }
    })
  };

  emitting();

  socket.on(`updateUser-patch-${userId}`, (res) => {
    let error = false;
    isLoading = false;
    if (res.detail) {
      error = res.detail;
    }
    updateStateForView(res, error, isLoading);
    hideEdit();
  });
};

export const updateProfile = (formValues, profileId, updateStateForView, hideEdit) => {
  let isLoading = false;
  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST, {
      method: "patch",
      url: `${url}/users/profiles/${profileId}/`,
      result: `updateProfile-patch-${profileId}`,
      token: "",
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