import hashTag from "./hashTag";
import file from "./fileReducer";
import badges from "./badge";
import certificate from "./certificate";
import location from "./location";
import {combineReducers} from "redux";
import category from "./category";
import product from "./product";

export default combineReducers({
    category,
    product,
    certificate,
    file,
    hashTag,
    location,
    badges
})
