import hashTag from "./hashTag";
import file from "./fileReducer";
import badges from "./badge";
import certificate from "./certificate";
import location from "./location";
import {combineReducers} from "redux";
import category from "./category";
import product from "./product";
import posts from './post'

export default combineReducers({
    category,
    product,
    certificate,
    file,
    hashTag,
    location,
    badges,
    posts,
})
