import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN as token} from '../../consts/data'

export const getProductRepresents = (productId, updateRepresents, handleErrorLoading) => {

  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/base/posts/?post_product=${productId}`,
      result: `productRepresents-Represents-get/${productId}`,
      token
    });

  socket.on(`productRepresents-Represents-get/${productId}`, (res) => {
    if (res.data.detail) {
      handleErrorLoading(res.data.detail);
      return false;
    }
    updateRepresents(res.data, 'get');
    handleErrorLoading();
  });
};

export const getOrganRepresents = (productId, updateRepresents, handleErrorLoading) => {

};

export const getExchangeRepresents = (exchangeId, updateRepresents, handleErrorLoading) => {

  socket.emit(REST_REQUEST, {
    method: 'get',
    url: url+`/base/represents/?represent_parent=${exchangeId}`,
    result: 'EXCHANGE-LIST-POSTS',
    token,
  });

  socket.on('EXCHANGE-LIST-POSTS',(res) => {
    if (res.data.detail) {
      handleErrorLoading(res.data.detail);
      return false;
    }
    updateRepresents(res.data, 'get');
    handleErrorLoading();
  });
};


export const createRepresent = (formValues, updateRepresents, handleErrorLoading, hideCreateForm) => {
  socket.emit(REST_REQUEST,
    {
      method: "represent",
      url: `${url}/base/represents/`,
      result: 'createRepresent-represent',
      data: {...formValues},
      token
    }
  );

  socket.on('createRepresent-represent', (res) => {
    if (res.data.detail) {
      handleErrorLoading(res.data.detail);
      return false;
    }
    updateRepresents(res, 'represent');
    handleErrorLoading();
    hideCreateForm();
  });
};

export const updateRepresent = (formValues, representId, updateView, hideEdit, handleErrorLoading) => {
  socket.emit(REST_REQUEST,
    {
      method: "patch",
      url: `${url}/base/represents/${representId}/`,
      result: `updateRepresent-patch/${representId}`,
      data: formValues,
      token
    }
  );

  socket.on(`updateRepresent-patch/${representId}`, (res) => {
    if (res.data.detail) {
      handleErrorLoading(res.data.detail);
      return false;
    }
    updateView(res);
    handleErrorLoading();
    hideEdit();
  });
};

export const deleteRepresent = (represents, represent, updateRepresents, hideEdit, handleErrorLoading) => {
  const representId = represent.id;
  socket.emit(REST_REQUEST,
    {
      method: "del",
      url: `${url}/base/represents/${representId}/`,
      result: `deleteRepresent-delete/${representId}`,
      token
    }
  );

  socket.on(`deleteRepresent-delete/${representId}`, (res) => {
    if (res.data.detail) {
      handleErrorLoading(res.data.detail);
      return false;
    }
    const deletedIndex = represents.indexOf(represent);
    updateRepresents(null, 'del', deletedIndex);
    handleErrorLoading();
    hideEdit();
  });
};