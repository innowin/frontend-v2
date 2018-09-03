import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN} from 'src/consts/data'

export const getIdentity = (identityId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/identities/${identityId}`,
      result: `users/identities/{id}/-get/getIdentity/${identityId}`,
      token: TOKEN,
    }
  );

  const func = (res) => {
    if (res.data.detail) {
      // TODO mohsen: handle error
      return false
    }
    handleResult(res.data)
    socket.off(`users/identities/{id}/-get/getIdentity/${identityId}`, func)
  };
  socket.on(`users/identities/{id}/-get/getIdentity/${identityId}`, func)
};

export const getIdentityByUser = (userId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/identities/?identity_user=${userId}`,
      result: `users/identities/{id}_get_getIdentityByUser_${userId}`,
      token: TOKEN,
    }
  );

  const func = (res) => {
    if (res.data.detail) {
      // TODO mohsen: handle error
      return false
    }
    handleResult(res.data[0]);
    socket.off(`users/identities/{id}_get_getIdentityByUser_${userId}`, func)
  };
  socket.on(`users/identities/{id}_get_getIdentityByUser_${userId}`, func)
};

export const getIdentityByOrgan = (organId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/identities/?identity_organization=${organId}`,
      result: `users/identities/{id}_get_getIdentityByOrgan_${organId}`,
      token: TOKEN,
    }
  );

  const func = (res) => {
    if (res.data.detail) {
      // TODO mohsen: handle error
      return false
    }
    handleResult(res.data[0]);
    socket.off(`users/identities/{id}_get_getIdentityByOrgan_${organId}`, func)
  };
  socket.on(`users/identities/{id}_get_getIdentityByOrgan_${organId}`, func);
};