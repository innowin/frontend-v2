import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN} from 'src/consts/data'
import {getFile} from "../media/media";

export const getPictureProduct = (productId, handleResult) => {
    socket.emit(REST_REQUEST,
      {
        method: "get",
        url: `${url}/products/pictures/?picture_product=${productId}`,
        result: "products/pictures/?picture_product-get",
        token: TOKEN,
      }
    );
    socket.on("products/pictures/?picture_product-get", (res) => {
      if (res.detail) {
        // TODO mohsen: handle error
        return false
      }
      res.map((picture) => {
        return getFile(picture.picture_media, handleResult);
      });
    });
};