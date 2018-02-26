import {REST_URL as url, SOCKET as socket} from "../../consts/URLS"
import {REST_REQUEST} from "../../consts/Events"
import {TOKEN as token} from '../../consts/data'


export const getExchanges = (identity, handleResult) => {
  socket.emit(REST_REQUEST, {
    method: "get",
    url: url + `/exchanges/identities/?identities_exchange=${identity}`,
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