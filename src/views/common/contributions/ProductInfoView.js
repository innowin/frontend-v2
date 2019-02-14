// @flow
import * as React from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {bindActionCreators} from 'redux'
import FileActions from '../../../redux/actions/commonActions/fileActions'
import connect from 'react-redux/es/connect/connect'
import constants from '../../../consts/constants'
import {Product as ProductSvg} from '../../../images/icons'
// import CheckOwner from "../CheckOwner"
// import {EditIcon /*,BookmarkIcon, RightArrow*/} from "src/images/icons"
// import constants from 'src/consts/constants'
// import type {ProductGetType} from "src/consts/flowTypes/product/productTypes"


// type PropsProductInfo = {
//   product: ProductGetType,
//   showEdit?: Function,
//   ownerId: number,
//   onClick?: Function,
//   translate: { [string]: string },
//   selected?: boolean,
// }

class ProductInfoView extends React.Component {
  componentDidMount(): void {
    if (this.props.product) {
      const {product, actions} = this.props
      actions.getFileByFileRelatedParentId({
        fileRelatedParentId: product.id,
        fileParentType: constants.FILE_PARENT.PRODUCT
      })
    }
  }

  render() {
    const {product} = this.props
    if (product && product.product_owner) {
      const {product, onClick, selected /*,translate, showEdit, ownerId*/} = this.props
      const {product_owner, product_user, pictures_array} = product
      const {identity_user} = product_owner
      const name = identity_user && identity_user.first_name ? identity_user.first_name + ' ' + identity_user.last_name : product_user && product_user.first_name ? product_user.first_name + ' ' + product_user.last_name : ''

      if (onClick) {
        return (
            <div className={selected ? 'selected-props product-instant-view' : 'product-instant-view'}
                 onClick={onClick}>
              {/*<CheckOwner id={ownerId}>*/}
              {/*{*/}
              {/*showEdit &&*/}
              {/*<div className='product-instant-edit' onClick={showEdit}>*/}
              {/*<EditIcon/>*/}
              {/*</div>*/}
              {/*}*/}
              {/*</CheckOwner>*/}
              <div className='product-instant-logo'>محصول</div>
              <div className='product-instant-detail'>
                <div className='product-instant-name'>
                  {product.name}
                </div>
                <span className='product-instant-seller'>فروشنده: </span><span
                  className='product-instant-seller-name'>{name}</span>
              </div>
              <img className='product-instant-img'
                   src={(pictures_array && pictures_array.length > 0) ? pictures_array[0].file : ''} alt=''/>
            </div>
        )
      } else {
        return (
            <div className={selected ? 'selected-props product-instant-view' : 'product-instant-view'}>
              {/*<CheckOwner id={ownerId}>*/}
              {/*{*/}
              {/*showEdit &&*/}
              {/*<div className='product-instant-edit' onClick={showEdit}>*/}
              {/*<EditIcon/>*/}
              {/*</div>*/}
              {/*}*/}
              {/*</CheckOwner>*/}
              <Link className='product-instant-link' to={`/product/${product.id}`}>
                <div className='product-instant-logo'>
                  <ProductSvg className='product-instant-svg'/>
                  <div>محصول</div>
                </div>
                <div className='product-instant-detail'>
                  <div className='product-instant-name'>
                    {product.name}
                  </div>
                  <span className='product-instant-seller'>فروشنده: </span><span
                    className='product-instant-seller-name'>{name}</span>
                </div>
                <img className='product-instant-img'
                     src={(pictures_array && pictures_array.length > 0) ? pictures_array[0].file : ''} alt=''/>
              </Link>
            </div>
        )
      }
    } else return null
  }
}

// let url = '', productOwner = product.product_owner
// if (product) {
//   if (productOwner) {
//     if (productOwner.identity_user) {
//       url = `/user/${productOwner.identity_user && (productOwner.identity_user.id || productOwner.identity_user)}`
//     } else {
//       url = `/organization/${productOwner.identity_organization && (productOwner.identity_organization.id || productOwner.identity_organization)}`
//     }
//   }
// }
// FixMe: mohammad isLoading and error come from redux
// TODO: mohammad show modal for show more button
// FixMe: product image need to change attribute
// FixMe: product price need to change attribute
// FixMe: product skill need to get from server
// <div className={selected ? 'selected-props contribution-view-container product-view-container'
//     : 'contribution-view-container product-view-container'} onClick={onClick}>
//   <CheckOwner id={ownerId}>
//     <div className={product.img && 'product-edit-container'}>
//       {showEdit &&
//       <div className="product-edit contribution-edit -item-edit-btn pulse" onClick={showEdit}>
//         <EditIcon/>
//       </div>
//       }
//     </div>
//   </CheckOwner>
//   <div className='product-content-container'>
//     <div className='product-content'>
//       <BookmarkIcon
//           className={product.img ? 'contribution-bookmark product-bookmark' : 'contribution-bookmark product-bookmark-without-image'}/>
//       <div className={'contribution-title-container'}>
//         <Link className={'contribution-title-link'} to={`/product/${product.id}`}>
//           <p className='contribution-title'>{product.name}</p>
//         </Link>
//       </div>
//       <Link to={url} className='product-owner-name'>
//         <p>{productOwner && productOwner.name}</p>
//       </Link>
//       <div className='price-show-container'>
//         <p>{translate['Price'] + ': '}
//           {product.product_price_type === constants.PRODUCT.PRICE_TYPE.CALL
//               ? <span>{translate['Call']}</span>
//               : <span>{product.price_amount}<span>{translate['Toman']}</span></span>
//
//           }
//         </p>
//         <div className='show-more'>{translate['Show more']}<RightArrow className='product-more-icon'/></div>
//       </div>
//       <div className="skill-tags">
//         {['ویژگی 1', 'ویژگی 2', 'ویژگی 3'].map((tag, index) => <span key={'hashtag ' + index}
//                                                                      className="badge badge-secondary skill-tag">{tag}</span>)}
//       </div>
//     </div>
//     {product.img &&
//     <div className='product-img-container'>
//       <Link className={'contribution-title-link'} to={`/product/${product.id}`}>
//         <img alt="" className='product-img' src={product.img}/>
//       </Link>
//     </div>
//     }
//   </div>
//   <div className='description-container'>
//     <p className="skill-description">
//       {product.description}
//     </p>
//   </div>
// </div>

ProductInfoView.propTypes = {
  product: PropTypes.object,
  showEdit: PropTypes.func,
  ownerId: PropTypes.number,
  translate: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getFileByFileRelatedParentId: FileActions.getFileByFileRelatedParentId
  }, dispatch)
})

export default connect(null, mapDispatchToProps)(ProductInfoView)