import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const getFile = (mediaId, mediaResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/files/${mediaId}/`,
      result: `files/${mediaId}-get`,
      token: TOKEN
    }
  );
  const func = (res) => {
    if (res.data.detail) {
      // TODO mohsen: handle error
      return false;
    }
    mediaResult(res.data)
    socket.off(`files/${mediaId}-get`, func)
  }
  socket.on(`files/${mediaId}-get`, func);
  //TODO mohsen: remove duplicate when equal file requested from product picture
};

export const createFile = (fileString, mediaResult) => {

  const data = {file_string: fileString};
  const randomNumber = Math.random();
  socket.emit(REST_REQUEST,
    {
      method: "post",
      url: `${url}/files/`,
      result: `createFile-post-${randomNumber}`,
      data: data,
      token: TOKEN
    }
  );

  const func = (res) => {
    if (res.data.detail) {
      // TODO mohsen: handle error
      return false;
    }
    mediaResult(res.data);
    socket.off(`createFile-post-${randomNumber}`, func)
  };
  socket.on(`createFile-post-${randomNumber}`, func);

};