// @flow
import * as React from "react"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"

import type {ProductGetType} from "../../../consts/flowTypes/product/productTypes"
import CheckOwner from "../CheckOwner"
import {EditIcon, BookmarkIcon, RightArrow} from "../../../images/icons"
import constants from 'src/consts/constants'

type PropsProductInfo = {
  product: ProductGetType,
  showEdit?: Function,
  ownerId: number,
  onClick?: Function,
  translate: { [string]: string },
  selected?: boolean,
}

const ProductInfoView = (props: PropsProductInfo) => {
  const {product, showEdit, ownerId, translate, onClick, selected} = props
  let url = '', productOwner = product.product_owner
  if (product) {
    if (productOwner) {
      if (productOwner.identity_user) {
        url = `/user/${productOwner.identity_user && (productOwner.identity_user.id || productOwner.identity_user)}`
      } else {
        url = `/organization/${productOwner.identity_organization && (productOwner.identity_organization.id || productOwner.identity_organization)}`
      }
    }
  }
  // FixMe: mohammad isLoading and error come from redux
  // TODO: mohammad show modal for show more button
  // FixMe: product image need to change attribute
  // FixMe: product price need to change attribute
  // FixMe: product skill need to get from server
  return (

      <div className={selected ? 'selected-props contribution-view-container product-view-container'
          : 'contribution-view-container product-view-container'} onClick={onClick}>
        <CheckOwner id={ownerId}>
          <div className={product.img && 'product-edit-container'}>
            {showEdit &&
            <div className="product-edit contribution-edit -item-edit-btn pulse" onClick={showEdit}>
              <EditIcon/>
            </div>
            }
          </div>
        </CheckOwner>
        <div className='product-content-container'>
          <div className='product-content'>
            <BookmarkIcon
                className={product.img ? 'contribution-bookmark product-bookmark' : 'contribution-bookmark product-bookmark-without-image'}/>
            <div className={'contribution-title-container'}>
              <Link className={'contribution-title-link'} to={`/product/${product.id}`}>
                <p className='contribution-title'>{product.name}</p>
              </Link>
            </div>
            <Link to={url} className='product-owner-name'>
              <p>{productOwner && productOwner.name}</p>
            </Link>
            <div className='price-show-container'>
              <p>{translate['Price'] + ': '}
                {product.product_price_type === constants.PRODUCT.PRICE_TYPE.CALL
                    ? <span>{translate['Call']}</span>
                    : <span>{product.price_amount}<span>{translate['Toman']}</span></span>

                }
              </p>
              <div className='show-more'>{translate['Show more']}<RightArrow className='product-more-icon'/></div>
            </div>
            <div className="skill-tags">
              {['ویژگی 1', 'ویژگی 2', 'ویژگی 3'].map((tag, index) => <span key={'hashtag ' + index}
                  className="badge badge-secondary skill-tag">{tag}</span>)}
            </div>
          </div>
          {product.img &&
          <div className='product-img-container'>
            <Link className={'contribution-title-link'} to={`/product/${product.id}`}>
              <img className='product-img' src={product.img}/>
            </Link>
          </div>
          }
        </div>
        <div className='description-container'>
          <p className="skill-description">
            {product.description}
          </p>
        </div>
      </div>
  )
}

ProductInfoView.propTypes = {
  product: PropTypes.object.isRequired,
  showEdit: PropTypes.func,
  ownerId: PropTypes.number.isRequired,
  translate: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
}

export default ProductInfoView