// @flow
import * as React from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {productType} from 'src/consts/flowTypes/user/others'
import CardRowContainer from 'src/views/common/components/CardRowContainer'
import {LinkedInIcon} from '../../../../images/icons'
import CheckOwner from '../../../common/CheckOwner'

type ProductProps = {
  owner: identityType,
  translate: TranslatorType,
  products: [productType],
  showModal: Function,
}

const ProductView = (props: ProductProps) => {
  const {translate, products, showModal, owner} = props
  return (
      <React.Fragment>
        <div className="card-header">
          <div className="header-title">
            {translate['Product']}
          </div>
          <CheckOwner id={owner.id}>
            <div className='add-button pulse' onClick={showModal}>
              + {translate['Add']}
            </div>
          </CheckOwner>
        </div>
        <div className="content">
          {products.map(product =>
              <CardRowContainer title='product' svgImage={<LinkedInIcon/>}>
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