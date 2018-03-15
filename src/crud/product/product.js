import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN} from 'src/consts/data'

export const getProduct = (productId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/products/${productId}/`,
      result: "products/{id}/-get",
      token: TOKEN,
    }
  );

  socket.on("products/{id}/-get", (res) => {
    if (res.detail) {
      // TODO mohsen: handle error
      return false
    }
    handleResult(res)
  });
};