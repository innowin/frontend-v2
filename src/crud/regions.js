import {REST_URL as url, SOCKET as socket} from "../consts/URLS";
import {REST_REQUEST} from "../consts/Events";

export const getCountries = (handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/base/countries/`,
      result: "getCountries",
    }
  );
  socket.on("getCountries", (res) => {
    if (res.detail) {
      return false
    }
    handleResult(res)
  });
};

export const getProvinces = (countryId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/base/provinces/?province_related_country=${countryId}`,
      result: "getProvinces",
    }
  );
  socket.on("getProvinces", (res) => {console.log("getProvinces:", res)
    if (res.detail) {
      return false
    }
    handleResult(res)
  });
};

export const getTowns = (provinceId, handleResult) => {
  socket.emit(REST_REQUEST,
    {
      method: "get",
      url: `${url}/base/towns/?town_related_province=${provinceId}`,
      result: "getTowns",
    }
  );
  socket.on("getTowns", (res) => {console.log("getTowns:", res)
    if (res.detail) {
      return false
    }
    handleResult(res)
  });
};

