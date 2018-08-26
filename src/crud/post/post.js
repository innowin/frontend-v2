import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN as token} from 'src/consts/data'

// done - not usage
export const getPostsByIdentity = (IdentityId, updatePosts, handleErrorLoading) => {

  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/base/posts/?post_identity_id=${IdentityId}`,
      result: `getUserPosts-get/${IdentityId}`,
      token
    });
  const func = (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    updatePosts(res, 'get');
    handleErrorLoading();
    socket.off(`getUserPosts-get/${IdentityId}`, func)
  };
  socket.on(`getUserPosts-get/${IdentityId}`, func);
};

// done - usage
export const createPost = (formValues, updatePosts, handleErrorLoading, hideCreateForm) => {
  socket.emit(REST_REQUEST,
    {
      method: "post",
      url: `${url}/base/posts/`,
      result: '/base/posts/-post',
      data: {...formValues},
      token
    }
  );
  const func = (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }
    updatePosts(res, 'post');
    handleErrorLoading();
    hideCreateForm();
    socket.off('/base/posts/-post', func)
  };
  socket.on('/base/posts/-post', func);
};

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

  const func = (res) => {
    if (res.detail) {
      handleErrorLoading(res.detail);
      return false;
    }

    const deletedIndex = posts.indexOf(post);
    updatePosts(null, 'del', deletedIndex);
    handleErrorLoading();
    hideEdit();
    socket.off(`deletePost-delete/${postId}`, func)
  };
  socket.on(`deletePost-delete/${postId}`, func);
};

export const getPost = (id, handleErrorLoading) => {
  return new Promise((resolve, reject)=>{
    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/base/posts/${id}`,
        result: `getPost-get/${id}`,
        token
      });
    const func = (res) => {
      if (res.detail) {
        reject(res.detail);
        // handleErrorLoading(res.detail);
        // return false;
      }
      // handleErrorLoading();
      socket.off(`ggetPost-get/${id}`, func)
      resolve(res);
    };
    socket.on(`getPost-get/${id}`, func);
  })
  
};