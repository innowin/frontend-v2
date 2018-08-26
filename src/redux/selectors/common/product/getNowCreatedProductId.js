import {createSelector} from "reselect";


const getNowCreatedProductId = state => state.common.product.products.nowCreatedId

const nowCreatedProductIdSelector = createSelector(getNowCreatedProductId, id => id)

export default nowCreatedProductIdSelector