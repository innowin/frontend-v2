import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN as token} from '../../consts/data'

export const getExchangePostComment = (postId)=>{
return new Promise((resolve, reject)=>{
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/base/comments/?comment_parent=${postId}`,
    result: `get-exchange-post/${postId}`,
    token,
  });
  socket.on(`get-exchange-post/${postId}`, res => {
    if (res.detail) {
      reject(res.detail);
    }
    socket.off(`get-exchange-post/${postId}`);
    resolve(res)
  });
})

}

export const getExchangeIdentities = (identity, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/exchanges/identities/?identity_id=${identity}`,
    result: "EXCHANGE_LIST_HOME_SIDEBAR",
    token,
  });
  socket.on("EXCHANGE_LIST_HOME_SIDEBAR", res => {
    if (res.detail) {
      return false;
    }
    handleResult(res)
  });
};

export const getExchange = (exchangeId, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/exchanges/${exchangeId}/`,
    result: `GET_/exchanges/{id}/${exchangeId}`,
    token
  });

  const func = (res) => {
    if (res.detail) {
      return false;
    }
    handleResult(res);
    socket.off(`GET_/exchanges/{id}/${exchangeId}`, func)
  };

  socket.on(`GET_/exchanges/{id}/${exchangeId}`, func)
};