import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {REST_REQUEST} from "src/consts/Events"
import {TOKEN} from 'src/consts/data'

export const getProducts = (limit, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/products/?limit=${limit}`,
      result: "products/>list-get",
      token: TOKEN,
    }
  );
  const func = (res) => {
    socket.off("products/>list-get", func)
    if (res.detail) {
      // TODO mohsen: handle error
      return false
    }
    handleResult(res.results);
    
  };
  socket.on("products/>list-get", func)
};

export const getProduct = (productId, handleResult) => {
  if(!handleResult){
    return new Promise((resolve,reject)=>{
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/products/${productId}/`,
          result: `products/{id}/-get/${productId}`,
          token: TOKEN,
        }
      );
      const func = (res) => {
        socket.off(`products/{id}/-get/${productId}`, func)
        if (res.detail) {
          // TODO mohsen: handle error
          reject(res.detail)
        }
        resolve(res);
        
      };
      socket.on(`products/{id}/-get/${productId}`, func)
    })
  }
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/products/${productId}/`,
      result: `products/{id}/-get/${productId}`,
      token: TOKEN,
    }
  );
  const func = (res) => {
    socket.off(`products/{id}/-get/${productId}`, func)
    if (res.detail) {
      // TODO mohsen: handle error
      return false
    }
    handleResult(res);
    
  };
  socket.on(`products/{id}/-get/${productId}`, func)
};