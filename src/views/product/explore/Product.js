import React, {PureComponent} from 'react'
import {Link} from 'react-router-dom'
import {Product as ProductSvg} from 'src/images/icons'
import {Organization} from 'src/images/icons'
import {ClipLoader} from 'react-spinners'

class Product extends PureComponent {
  render() {
    const {data, identity} = this.props
    const pictures_array = data.product_media ? data.product_media.filter(p => p.type === 'image') : []

    return (
        <Link to={`/product/${data.id}`} className='product-model'>
          <div className='product-model-logo'>
            <ProductSvg className='product-model-svg'/>
            <div>محصول</div>
          </div>
          <div className='product-model-detail'>
            <div className='product-model-name'>
              <ProductSvg className='product-model-little-svg'/>
              <div>{data.name}</div>
            </div>
            <div className='product-model-seller-icon'>
              <Organization className='product-model-little-svg'/>
              <span className='product-model-seller'>فروشنده: </span>
              <div className='product-model-seller-name'>
                {
                  identity ?
                      identity.official_name ? identity.official_name : identity.nike_name ? identity.nike_name : identity.first_name || identity.last_name ? identity.first_name + ' ' + identity.last_name
                          : <span style={{color: 'red'}}>فاقد نام</span> : <div style={{verticalAlign: 'top', display: 'inline-block', marginTop: '3px'}}><ClipLoader size={15}/></div>
                }
              </div>
            </div>
          </div>
          <img className='product-model-img' src={pictures_array.length > 0 ? pictures_array[0].file : ''} alt=''/>
        </Link>
    )
  }
}

export default Product

