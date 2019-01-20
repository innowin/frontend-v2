import {createSelector} from 'reselect'

const getAllProducts = (state) => {
  let allProducts = state.common.product.products.list
  const searchWord = state.common.product.products.search
  if (searchWord)
    return Object.values(allProducts).filter(product => product.name.includes(searchWord) || product.description.includes(searchWord))
  else return allProducts
}

export const getProducts = createSelector(
    getAllProducts,
    product => product
)