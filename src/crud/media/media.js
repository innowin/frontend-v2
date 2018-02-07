import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const getFile = (mediaId, mediaResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/files/${mediaId}/`,
      result: `getFile-get/${mediaId}`,
      token: TOKEN
    }
  );

  socket.on(`getFile-get/${mediaId}`, (res) => {
    if (res.detail) {
      // TODO mohsen: handle error
      return false
    }
    mediaResult(res)
  });
};

export const createFile = (fileString, mediaResult) => {

  const data = {file_string: fileString};
  socket.emit(REST_REQUEST,
    {
      method: "post",
      url: `${url}/files/`,
      result: "createFile-post",
      data: data,
      token: TOKEN
    }
  );

  socket.on("createFile-post", (res) => {
    if (res.detail) {
      // TODO mohsen: handle error
      return false;
    }
    mediaResult(res)
  });

};