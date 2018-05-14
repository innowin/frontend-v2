import {SOCKET as socket} from "src/consts/URLS"
import {GET_VIEWS_COUNT, NEW_VIEW} from "../../consts/Events";
import {TOKEN} from "../../consts/data";

export const getPostViewerCount = (postId, handleResult) => {
  socket.emit(GET_VIEWS_COUNT, {
    id: `post-${postId}`,
    result: `${postId}-getPostViewerCount`
  });
  const func = (res) => {
    if (res.detail) {
      return false;
    }
    handleResult(res);
    socket.off(`${postId}-getPostViewerCount`, func)
  };
  socket.on(`${postId}-getPostViewerCount`, func)
};

export const setPostViewer = (postId, getAddedView = () => null) => {
  socket.emit(NEW_VIEW, {
    id: `post-${postId}`,
    token: TOKEN,
    result: `${postId}-addViewerForThisPost`
  });
  const func = (res) => {
    if (res.detail) {
      return false;
    }
    getAddedView();
    socket.off(`${postId}-addViewerForThisPost`, func)
  };
  socket.on(`${postId}-addViewerForThisPost`, func)
};