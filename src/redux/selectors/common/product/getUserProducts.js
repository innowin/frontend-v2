import {createSelector} from "reselect"

const getProducts = state => state.common.product.products.list
const userProducts = (state, props) => {
  const id = props.ownerId
  const products = state.common.product.products.list

  return Object.values(products).filter(p => p.product_owner === id)

}

export const getUserProducts = createSelector(
    [getProducts, userProducts],
    (products, userProducts) => {
      if (products && Object.keys(products).length !== 0 && products.constructor === Object && userProducts)
        return userProducts.reverse()
      else return []
    },
)

