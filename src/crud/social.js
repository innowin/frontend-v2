import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN as token} from "src/consts/data"

export const getFollowings = (identityId, handleError, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/organizations/follows/?follow_followed=${identityId}`,
      result: `/organizations/follows/?follow_followed/${identityId}`,
      token
    }
  );

  const func = (res) => {console.log("crud followings:", res)
    if (res.detail) {
      handleError(res.detail)
    }
    handleResult(res);
    socket.off(`/organizations/follows/?follow_followed/${identityId}`, func)
  };
  socket.on(`/organizations/follows/?follow_followed/${identityId}`, func);
}


export const getFollowers = (identityId, handleError, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/organizations/follows/?follow_follower=${identityId}`,
      result: `/organizations/follows/?follow_follower/${identityId}`,
      token
    }
  );

  const func = (res) => {console.log("crud followers:", res)
    if (res.detail) {
      handleError(res.detail)
    }
    handleResult(res);
    socket.off(`/organizations/follows/?follow_follower/${identityId}`, func)
  };
  socket.on(`/organizations/follows/?follow_follower/${identityId}`, func);
}

export const deleteFollow = (followedIdentityId, handleError, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "del",
      url: `${url}/organizations/follows/?follow_followed=${followedIdentityId}`,
      result: `organizationFollowing-delete/${followedIdentityId}`,
      token
    }
  );

  const func = (res) => {
    if (res.detail) {
      handleError(res.detail)
    }
    handleResult(res);
    socket.off(`organizationFollowing-delete/${followedIdentityId}`, func)
  };
  socket.on(`organizationFollowing-delete/${followedIdentityId}`, func);
}