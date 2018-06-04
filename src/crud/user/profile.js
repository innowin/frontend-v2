import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {TOKEN} from "src/consts/data"

export const getProfile = (userId, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: `${url}/users/profiles/?profile_user=${userId}`,
    result: `/users/profiles/?profile_user=${userId}`,
    token: TOKEN,
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