import initialState from '../../initialState';
import types from '../../../actions/types';


const products = (state = initialState.common.product.products, action) => {
    const {list} = state
    switch (action.type) {

        /** <-------------- getProduct -------------- **/
        case types.COMMON.GET_PRODUCT_INFO:
            return {
                ...state
            }

        case types.SUCCESS.COMMON.GET_PRODUCT_INFO: {
            const {data} = action
            return {
                list: {
                    ...list,
                    [data.id]: {...data, viewed: true}
                }
            }
        }
        case types.ERRORS.COMMON.GET_PRODUCT_INFO:
            return {
                ...state,
            }
        /** --------------- getProduct -------------- **/


        /** <-------------- updateProduct ----------- **/
        case types.COMMON.UPDATE_PRODUCT:
            return {
                ...state,
            }

        case types.SUCCESS.COMMON.UPDATE_PRODUCT: {
            const productData = action.data
            const {id} = productData
            const newList = {
                ...list,
                [id]: {
                    ...list[id],
                    ...productData
                }
            }
            return {
                ...state,
                list: newList,
            }
        }
        case types.ERRORS.COMMON.UPDATE_PRODUCT:
            return {
                ...state,
            }
        /** --------------- updateProduct ----------> **/


        /** --------------- createProduct ----------> **/
        case types.COMMON.CREATE_PRODUCT:
            return {
                ...state,
                nowCreatedId: null
            }

        case types.SUCCESS.COMMON.CREATE_PRODUCT: {
            const newProduct = action.data
            const {id} = newProduct
            return {
                ...state,
                list: {
                    ...list,
                    [id]: {
                        ...newProduct,
                    }
                },
                nowCreatedId: id
            }
        }

        case types.ERRORS.COMMON.CREATE_PRODUCT:
            return {
                ...state,
            }
        /** --------------- createProduct ----------> **/


        /** < ---------------- addPictureIdToProduct -------------- **/
        case types.COMMON.ADD_PICTURE_ID_TO_PRODUCT: {
            const {productId, pictureId} = action.payload
            const oldProduct = list[productId]
            const newProduct = oldProduct.pictures ? {
                ...oldProduct,
                pictures: [...oldProduct.pictures, pictureId]
            } : {
                ...oldProduct,
                pictures: [pictureId]
            }
            return {
                ...state,
                list: {
                    ...list,
                    [productId]: newProduct
                }
            }
        }
        /**  ---------------- addPictureIdToProduct -------------- > **/


        /**  <----------------addCertificateIdToProduct --------------  **/
        case types.COMMON.ADD_HASH_TAG_ID_TO_PRODUCT: {
            const {hashTagId, parentId} = action.payload
            const oldProduct = list[parentId]

            const newProduct = oldProduct.hashTags? {
                ...oldProduct,
                hashTags: [...oldProduct.hashTags, hashTagId]
            }: {
                ...oldProduct,
                hashTags: [hashTagId]
            }

            return {
                ...state,
                list: {
                    ...list,
                    [parentId]: newProduct
                }
            }
        }
        /**  ---------------- addCertificateIdToProduct -------------- > **/


        /**  <--------------- setNowCreatedProductToNull --------------  **/
        // case types.COMMON.SET_NOW_CREATED_PRODUCT_TO_NULL:
        //     return {
        //         ...state,
        //         nowCreatedId: null
        //     }
        /**  ---------------- setNowCreatedProductToNull -------------- > **/

        default:
            return state
    }
}

export default products