import {REST_REQUEST} from "../../consts/Events"
import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {TOKEN} from "src/consts/data"

export const getOrganization = (organId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/organizations/${organId}/`,
      result: "/organizations/{id}/-get",
      token: TOKEN,
    }
  );

  socket.on("/organizations/{id}/-get", (res) => {
    if (res.detail) {
      // TODO mohsen: handle error
      return false
    }
    handleResult(res)
  });
};

export const getMetaDataOrganization = (handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/organizations/get_meta_data/`,
      result: "getMetaDataOrganization",
    }
  );

  socket.on("getMetaDataOrganization", (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res)
  });
};