import {createSelector} from 'reselect'
import helpers from 'src/consts/helperFunctions/helperFunctions'
import constants from "../../../../consts/constants";

const getProducts = state => state.common.product.products.list
const getUserProducts = (state, props) => {
  const id = props.ownerId
  const identityType = props.identityType
  if (identityType === constants.USER_TYPES.USER) {
    const usersList = state.identities.list
    if (usersList[id] && usersList[id].products)
      return usersList[id].products.content
  } else if (identityType === constants.USER_TYPES.ORG) {
    const organsList = state.identities.list
    if (organsList[id] && organsList[id].products)
      return organsList[id].products.content
  }
  return undefined
}
const getOwnerId = (state, props) => props.ownerId
const getIdentities = state => state.identities.list

/** this selector selects products by productIdentity or without that. **/
export const getProductsSelector = createSelector(
    [getProducts, getUserProducts, getOwnerId, getIdentities],
    (products, userProducts, ownerId, identities) => {
      if (products && Object.keys(products).length !== 0 && products.constructor === Object && userProducts && ownerId) {
        let arrayProduct = helpers.getObjectOfArrayKeys(userProducts, products)
        arrayProduct = arrayProduct.map(product => {
          return identities[product.product_owner]
              ? {...product, product_owner: identities[product.product_owner]}
              : product
        })
        return [...arrayProduct]
      }
      return []
    }
)

