// @flow
import * as React from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {productType} from 'src/consts/flowTypes/user/others'
import CardRowContainer from 'src/views/common/components/CardRowContainer'
import {LinkedInIcon} from '../../../../images/icons'

type ProductProps = {
  owner: identityType,
  translate: TranslatorType,
  products: [productType],
  showModal: Function,
}

const ProductView = (props: ProductProps) => {
  const {translate, products, showModal} = props
  return (
      <React.Fragment>
        <div className="card-header">
          <div className="header-title">
            {translate['Product']}
          </div>
          <div className='add-button pulse' onClick={showModal}>
            + {translate['Add']}
          </div>
        </div>
        <div className="content">
          {products.map(product =>
              <CardRowContainer title='ceritificate' svgImage={<LinkedInIcon/>}>
                <div className='card-row-content-right'>
                  asdasdasd
                </div>
                <img src='' className='card-row-content-image'/>
              </CardRowContainer>
          )}
        </div>
      </React.Fragment>
  )
}

export default ProductView