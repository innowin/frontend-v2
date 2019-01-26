import React from 'react'
import {Organization, Product as ProductSvg} from 'src/images/icons'

const ProductSkeleton = () => {
  return (
      <div className='product-model'>
        <div className='product-explorer-skeleton'>
          <div className='product-model-logo'>
            <div><span> </span></div>
          </div>
          <div className='product-model-detail'>
            <div className='product-model-name'>
              <ProductSvg className='product-model-little-svg'/>
              <span style={{backgroundColor: '#f3f3f3'}}>                                            </span>
            </div>
            <div className='product-model-seller-icon'>
              <Organization className='product-model-little-svg'/>
              <span className='product-model-seller' style={{backgroundColor: '#f3f3f3'}}>                                            </span>
            </div>
          </div>
          <div className='product-model-img'/>
          <div className='bright-line'/>
        </div>
      </div>
  )
}

export default ProductSkeleton