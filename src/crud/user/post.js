import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN as token} from '../../consts/data'


export const getUserPosts = (userId, updatePosts, handleErrorLoading) => {

  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/base/posts/?post_user=${userId}`,
      result: `userPosts-Posts-get/${userId}`,
      token
    });

  socket.on(`userPosts-Posts-get/${userId}`, (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    updatePosts(res, 'get');
    handleErrorLoading();
  });
};

export const getOrganPosts = (userId, updatePosts, handleErrorLoading) => {

};

export const getExchangePosts = (exchangeId, updatePosts, handleErrorLoading) => {

  socket.emit(REST_REQUEST, {
    method: 'get',
    url: url+`/base/posts/?post_parent=${exchangeId}`,
    result: 'EXCHANGE-LIST-POSTS',
    token,
  });

  socket.on('EXCHANGE-LIST-POSTS',(res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    updatePosts(res, 'get');
    handleErrorLoading();
  });
};


export const createPost = (formValues, updatePosts, handleErrorLoading, hideCreateForm) => {
  socket.emit(REST_REQUEST,
    {
      method: "post",
      url: `${url}/base/posts/`,
      result: 'createPost-post',
      data: {...formValues, post_user: 6, post_parent: 6},
      token
    }
  );

  socket.on('createPost-post', (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    updatePosts(res, 'post');
    handleErrorLoading();
    hideCreateForm();
  });
};

export const updatePost = (formValues, postId, updateView, hideEdit, handleErrorLoading) => {
  socket.emit(REST_REQUEST,
    {
      method: "patch",
      url: `${url}/base/posts/${postId}/`,
      result: `updatePost-patch/${postId}`,
      data: formValues,
      token
    }
  );

  socket.on(`updatePost-patch/${postId}`, (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    updateView(res);
    handleErrorLoading();
    hideEdit();
  });
};

export const deletePost = (posts, post, updatePosts, hideEdit, handleErrorLoading) => {
  const postId = post.id;
  socket.emit(REST_REQUEST,
    {
      method: "del",
      url: `${url}/base/posts/${postId}/`,
      result: `deletePost-delete/${postId}`,
      token
    }
  );

  socket.on(`deletePost-delete/${postId}`, (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    const deletedIndex = posts.indexOf(post);
    updatePosts(null, 'del', deletedIndex);
    handleErrorLoading();
    hideEdit();
  });
};