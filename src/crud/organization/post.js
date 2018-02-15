import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN} from '../../consts/data'

export const createPost = (formValues, organizationId, userId, updateStateForView, hideCreateForm) => {
    let isLoading = true;
    updateStateForView({}, null, isLoading);
    const emitting = () => {
        isLoading = true;
        socket.emit(REST_REQUEST,
            {
                method: "post",
                url: `${url}/base/posts/`,
                result: 'createPost-post',
                data :{...formValues, post_user:userId, post_parent:organizationId},
                token: TOKEN
            }
        );
    };

    emitting();

    socket.on('createPost-post', (res) => {
        let error = false;
        isLoading = false;
        if (res.detail) {
          updateStateForView(res, error, isLoading);
			
          return;
        }
        hideCreateForm();
        socket.emit(REST_REQUEST,
          {
            method: "get",
            url: `${url}/base/posts/?post_parent=${organizationId}`,
            result: `organizationPosts-Posts-get/${organizationId}`,
            token: TOKEN
          }
        );
    });
};

export const updatePost = (formValues, postId, updateStateForView, hideEdit) => {
  let isLoading = false;

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

export const deletePost = (postId,organizationId, updateStateForView, hideEdit) => {
  let isLoading = false;
  updateStateForView({}, null, isLoading);
  const emitting = () => {
    isLoading = true;
    socket.emit(REST_REQUEST,
      {
        method: "delete",
        url: `${url}/base/posts/${postId}/`,
        result: `deletePost-delete/${postId}`,
        token: TOKEN
      }
    );    
  };

  emitting();

  socket.on(`deletePost-delete/${postId}`, (res) => {
    let error = false;
    isLoading = false;
    if (res.detail) {
      updateStateForView(res, error, isLoading);
			
			return;
		}
		hideEdit();
		socket.emit(REST_REQUEST,
			{
				method: "get",
				url: `${url}/base/post/?post_parent=${organizationId}`,
				result: `organizationPosts-Posts-get/${organizationId}`,
				token: TOKEN
			}
		);


  });
};