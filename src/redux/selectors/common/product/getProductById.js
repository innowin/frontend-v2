import {createSelector} from "reselect";

const getProductById = (state, id) => state.common.product.products.list[id]

export default () => createSelector(getProductById, product => product || {})