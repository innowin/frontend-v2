import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'


export const getPosts = (userId, updatePosts, handleErrorLoading) => {

  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/base/posts/?post_user=${userId}`,
      result: `userPosts-Posts-get/${userId}`,
      token: TOKEN
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


<<<<<<< HEAD
  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST,
      {
        method: "patch",
        url: `${url}/base/posts/${postId}/`,
        result: `updatePost-patch/${postId}`,
        data :formValues,
        token: TOKEN
      }
    );
  };
=======
export const createPost = (formValues, updatePosts, handleErrorLoading, hideCreateForm) => {
  socket.emit(REST_REQUEST,
    {
      method: "post",
      url: `${url}/base/posts/`,
      result: 'createPost-post',
      data: {...formValues, post_user: 6, post_parent: 6},
      token: TOKEN
    }
  );
>>>>>>> b1afce4cc7a11d27e41c7c4d8bdf7c315cf76ee5

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
      token: TOKEN
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

<<<<<<< HEAD
export const deletePost = (postId, updateStateForView, hideEdit) => {
  let isLoading = false;

  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST,
      {
        method: "delete",
        url: `${url}/base/posts/${postId}/`,
        result: `deletePost-delete/${postId}`,
        data:{},
        token: TOKEN
      }
    );
  };

  emitting();
=======
export const deletePost = (posts, post, updatePosts, hideEdit, handleErrorLoading) => {
  const postId = post.id;
  socket.emit(REST_REQUEST,
    {
      method: "del",
      url: `${url}/base/posts/${postId}/`,
      result: `deletePost-delete/${postId}`,
      token: TOKEN
    }
  );
>>>>>>> b1afce4cc7a11d27e41c7c4d8bdf7c315cf76ee5

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