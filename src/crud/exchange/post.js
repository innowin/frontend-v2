import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN as token} from 'src/consts/data'

export const updatePost = (formValues, postId, updateView, hideEdit, handleErrorLoading) => {
  socket.emit(REST_REQUEST,
    {
      method: "patch",
      url: `${url}/base/posts/${postId}/`,
      result: `/base/posts/-patch/${postId}`,
      data: formValues,
      token
    }
  );

  const func = (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    updateView(res);
    handleErrorLoading();
    hideEdit();
    socket.off(`/base/posts/-patch/${postId}`, func)
  };
  socket.on(`/base/posts/-patch/${postId}`, func);
};

export const deletePost = ( post, hideEdit, handleErrorLoading) => {
  const postId = post.id;
  socket.emit(REST_REQUEST,
    {
      method: "del",
      url: `${url}/base/posts/${postId}/`,
      result: `deletePost-delete/${postId}`,
      token
    }
  );

  const func = (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    handleErrorLoading();
    hideEdit();
    socket.off(`deletePost-delete/${postId}`, func)
  };
  socket.on(`deletePost-delete/${postId}`, func);
};