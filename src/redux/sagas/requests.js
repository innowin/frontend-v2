import api from "../../consts/api";
import {apply} from "redux-saga/effects";

function* postRequest(request, result, data, param) {
    yield apply({}, api.post, [request, result,data,param])
}

export default {
    postRequest,
}