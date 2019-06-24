import React from 'react'
import * as PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import {Product as ProductSvg} from '../../../images/icons'
import {ClipLoader} from 'react-spinners'

class ProductInfoView extends React.PureComponent {

  render() {
    const {product} = this.props
    if (product && product.product_owner) {
      const {onClick, selected, identities} = this.props
      const pictures_array = product.product_media ? product.product_media.filter(p => p.type === 'image') : []
      const id = product.product_owner.id ? product.product_owner.id : product.product_owner
      const product_owner = identities[id]

      if (onClick) {
        return (
            <div className={selected ? 'selected-props product-instant-view' : 'product-instant-view'} onClick={onClick}>
              <div className='product-instant-logo'>محصول</div>
              <div className='product-instant-detail'>
                <div className='product-instant-name'>
                  {product.name}
                </div>
                <span className='product-instant-seller'>فروشنده: </span>
                <span className='product-instant-seller-name'>
                   {
                     product_owner ? product_owner.official_name ? product_owner.official_name : product_owner.nike_name ? product_owner.nike_name : product_owner.first_name || product_owner.last_name ? product_owner.first_name + ' ' + product_owner.last_name
                         : <span style={{color: 'red'}}>فاقد نام</span> : <div style={{verticalAlign: 'top', display: 'inline-block', marginTop: '3px'}}><ClipLoader size={15}/></div>
                   }
                </span>
              </div>
              <img className='product-instant-img' src={(pictures_array.length > 0) ? pictures_array[0].file : ''} alt=''/>
            </div>
        )
      }
      else {
        return (
            <div className={selected ? 'selected-props product-instant-view' : 'product-instant-view'}>
              <Link className='product-instant-link' to={`/product/${product.id}`}>
                <div className='product-instant-logo'>
                  <ProductSvg className='product-instant-svg'/>
                  <div>محصول</div>
                </div>
                <div className='product-instant-detail'>
                  <div className='product-instant-name'>
                    {product.name}
                  </div>
                  <span className='product-instant-seller'>فروشنده: </span>
                  <span className='product-instant-seller-name'>
                   {
                     product_owner ? product_owner.official_name ? product_owner.official_name : product_owner.nike_name ? product_owner.nike_name : product_owner.first_name || product_owner.last_name ? product_owner.first_name + ' ' + product_owner.last_name
                         : <span style={{color: 'red'}}>فاقد نام</span> : <div style={{verticalAlign: 'top', display: 'inline-block', marginTop: '3px'}}><ClipLoader size={15}/></div>
                   }
                </span>
                </div>
                <img className='product-instant-img' src={(pictures_array.length > 0) ? pictures_array[0].file : ''} alt=''/>
              </Link>
            </div>
        )
      }
    }
    else return null
  }
}

ProductInfoView.propTypes = {
  product: PropTypes.object,
  showEdit: PropTypes.func,
  ownerId: PropTypes.number,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  identities: state.identities.list,
})

export default connect(mapStateToProps, null)(ProductInfoView)