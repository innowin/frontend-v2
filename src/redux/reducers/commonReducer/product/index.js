import productPicture from "./productPicture"
import products from "./products"
import {combineReducers} from "redux";
import price from "./price"

export default combineReducers({
  products,
  productPicture,
  price,
})