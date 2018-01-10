import io from "socket.io-client";
import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET_URL} from "../../consts/URLS"

const socket = io(SOCKET_URL);

export const updateUser = (formValues, userId, hideEditFunc) => {
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