import country from "./country";
import city from "./city";
import province from "./province";
import {combineReducers} from "redux";


export default combineReducers({
    country,
    province,
    city
})