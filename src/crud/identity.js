import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN} from 'src/consts/data'

export const getIdentity = (identityId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/users/identities/${identityId}/`,
      result: "users/identities/{id}/-get",
      token: TOKEN,
    }
  );

  const func = (res) => {
    if (res.detail) {
      // TODO mohsen: handle error
      return false
    }
    console.log(res, 2);
    handleResult(res);
    s_off()
  };
  socket.on("users/identities/{id}/-get", func);

  function s_off() {
    socket.off("users/identities/{id}/-get", func)
  }
};