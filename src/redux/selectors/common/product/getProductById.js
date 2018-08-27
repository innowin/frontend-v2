import {createSelector} from "reselect";


/**
 this function filters the products (that takes from the state of the redux)
 by the wanted id.
 **/
const getProductById = (state, id) => state.common.product.products.list[id]


/**
 this function makes a copy of selector.
 we using this trick to prevent from recomputing when passing props to a selector.
 (according to documentation)
 **/
const makeProductSelectorById = () => createSelector(getProductById, product => product || {})

export default makeProductSelectorById