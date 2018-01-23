import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const updatePost = (formValues, postId, updateStateForView, hideEdit) => {
  let isLoading = false;

  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST,
      {
        method: "patch",
        url: `${url}/users/posts/${postId}/`,
        result: `updatePost-patch/${postId}`,
        data :formValues,
        token: TOKEN
      }
    );
  };

  emitting();

  socket.on(`updatePost-patch/${postId}`, (res) => {
    let error = false;
    isLoading = false;
    if (res.detail) {
      error = res.detail;
    }
    updateStateForView(res, error, isLoading);
    hideEdit();
  });
};


export const createPost = (formValues, postId, updateStateForView, hideEdit) => {
  let isLoading = false;

  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST,
      {
        method: "post",
        url: `${url}/users/posts/${postId}/`,
        result: `createPost-post/${postId}`,
        data :formValues,
        token: TOKEN
      }
    );
  };

  emitting();

  socket.on(`createPost-post/${postId}`, (res) => {
    let error = false;
    isLoading = false;
    if (res.detail) {
      error = res.detail;
    }
    updateStateForView(res, error, isLoading);
    hideEdit();
  });
};

export const deletePost = (formValues, postId, updateStateForView, hideEdit) => {
  let isLoading = false;

  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST,
      {
        method: "delete",
        url: `${url}/users/posts/${postId}/`,
        result: `deletePost-delete/${postId}`,
        data :formValues,
        token: TOKEN
      }
    );
  };

  emitting();

  socket.on(`deletePost-delete/${postId}`, (res) => {
    let error = false;
    isLoading = false;
    if (res.detail) {
      error = res.detail;
    }
    updateStateForView(res, error, isLoading);
    hideEdit();
  });
};