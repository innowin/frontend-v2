import hashTag from "./hashTag";
import file from "./file";
import badge from "./badge";
import certificate from "./certificate/index";
import location from "./location";
import {combineReducers} from "redux";
import category from "./category";
import product from "./product";
import post from './post'
import social from './social'

export default combineReducers({
    category,
    product,
    certificate,
    file,
    hashTag,
    location,
    badge,
    post,
    social,
})
