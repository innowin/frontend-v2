import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN as token} from '../../consts/data'



export const getExchangePosts = (exchangeId, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/base/posts/?post_parent=${exchangeId}`,
    result: "exchangePosts-Posts-get",
    token,
  });
  socket.on("exchangePosts-Posts-get", res => {
    if (res.detail) {
      return false;
    }
    handleResult(res)
  });
};