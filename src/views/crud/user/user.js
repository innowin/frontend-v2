import {REST_REQUEST} from "../../../consts/Events"
import {REST_URL as url } from "../../../consts/URLS"
import {SOCKET as socket} from "../../../consts/URLS"

export const updateUser = (formValues, userId, hideEditFunc ) => {
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
  });

  // TODO mohsen: check username is not already exist when change
  socket.on(`updateUser-patch-${userId}`, (res) => {
    console.log('patched user: ', res);
    let error = false;
    let isLoading = false;
    if (res.detail) {
      console.log(res.detail);
      error = true;
      isLoading = true;
    }
    hideEditFunc(res, error, isLoading);
  });
};

export const updateProfile = (formValues, profileId, hideEditFunc) => {
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
  });

  socket.on(`updateProfile-patch-${profileId}`, (res) => {
    console.log('patched profile: ', res);
    let error = false;
    let isLoading = false;
    if (res.detail) {
      console.log(res.detail);
      error = true;
      isLoading = true;
    }
    hideEditFunc(res, error, isLoading);
  });
};