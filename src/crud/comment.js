import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN} from 'src/consts/data'

export const getCommentsByParent = (parentId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/base/comments/?comment_parent=${parentId}`,
      result: `/base/comments/> list-${parentId}`,
      token: TOKEN,
    }
  );

  const func = (res) => {
    if (res.data.detail) {
      // TODO mohsen: handle error
      return false
    }
    res.sort(function (a, b) {
      const dateA = new Date(a.created_time);
      const dateB = new Date(b.created_time);
      return dateB - dateA;
    });
    handleResult(res.data);
    socket.off(`/base/comments/> list-${parentId}`, func)
  };
  socket.on(`/base/comments/> list-${parentId}`, func);
};