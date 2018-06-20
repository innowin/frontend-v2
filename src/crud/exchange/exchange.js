import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN as token} from '../../consts/data'

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

export const getExchangesByMemberIdentity = (identityOfMember, handleError, handleResult) => {
  // get exchanges that this identity is member of it
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/exchanges/identities/?identity_id=${identityOfMember}`,
    result: "EXCHANGE_LIST_HOME_SIDEBAR",
    token,
  });
  socket.on("EXCHANGE_LIST_HOME_SIDEBAR", res => {
    if (res.detail) {
      handleError(res.detail)
    }
    handleResult(res)
  });
};

export const getExchangesByOwnerIdentity = (identityOfOwner, handleError, handleResult) => {
  // get exchanges that this identity is owner of it
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/exchanges/?owner=${identityOfOwner}`,
    result: `/exchanges/?owner=${identityOfOwner}`,
    token,
  });

  const func = (res) => {
    if (res.detail) {
      handleError(res.result)
    }
    handleResult(res);
    socket.off(`/exchanges/?owner=${identityOfOwner}`, func)
  };

  socket.on(`/exchanges/?owner=${identityOfOwner}`, func)
};


export const getExchangePostComment = (postId) => {
  return new Promise((resolve, reject) => {
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

export const getExchangeMembers = (exchangeId, handleError, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/exchanges/identities/?exchange_id=${exchangeId}`,
    result: `get-exchange-members-${exchangeId}`,
    token,
  });

  const func = (res) => {
    if (res.detail) {
      handleError(res.result)
    }
    handleResult(res);
    socket.off(`get-exchange-members-${exchangeId}`, func)
  };
  socket.on(`get-exchange-members-${exchangeId}`, func)
}
export const getExchangeMember = (memberId, handleError, handleResult)=>{
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/users/${memberId}`,
    result: `get-member-${memberId}`,
    token,
  });

  const func = (res) => {
    if (res.detail) {
      handleError(res.result)
    }
    handleResult(res);
    socket.off(`get-member-${memberId}`, func)
  };
  socket.on(`get-member-${memberId}`, func)
}
export const getExchangeMemberIdentity = (memberIdentity, handleError, handleResult)=>{
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/users/identities/${memberIdentity}`,
    result: `get-exchange-member-${memberIdentity}`,
    token,
  });

  const func = (res) => {
    if (res.detail) {
      handleError(res.result)
    }
    handleResult(res);
    socket.off(`get-exchange-member-${memberIdentity}`, func)
  };
  socket.on(`get-exchange-member-${memberIdentity}`, func)
}

export const deleteExchange = (exchangeId, handleError, handleResult = () => null) => {
  socket.emit(REST_REQUEST, {
    method: "del",
    url: url + `/exchanges/${exchangeId}/`,
    result: `deleteExchange-${exchangeId}`,
    token,
  });

  const func = (res) => {
    if (res.detail) {
      handleError(res.result)
      return false
    }
    handleResult(res)
    socket.off(`deleteExchange-${exchangeId}`, func)
  };
  socket.on(`deleteExchange-${exchangeId}`, func)
}

export const removeExchangeMembership = (id, handleError, handleResult = () => null) => {
  // id is id of /exchanges/identities/{id}/ table not exchangeId or not identityId
  socket.emit(REST_REQUEST, {
    method: "del",
    url: url + `/exchanges/identities/${id}/`,
    result: `removeExchangeMembership-${id}`,
    token,
  });

  const func = (res) => {
    if (res.detail) {
      handleError(res.result)
      return false
    }
    handleResult(res)
    socket.off(`removeExchangeMembership-${id}`, func)
  };
  socket.on(`removeExchangeMembership-${id}`, func)
}
