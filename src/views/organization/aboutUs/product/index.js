// @flow
import * as React from 'react'
import CardContainer from '../../cardContainer'
import ProductView from './ProductView'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {productType} from 'src/consts/flowTypes/user/others'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  products: [productType],
  showModal: Function,
}

const Product = (props: Props) => {

  const _showModal = () => {
    const {showModal} = props
    showModal({modalKey: 'productModal'})
  }

  const {owner, translate, products} = props
  return (
      <CardContainer>
        <ProductView products={products} owner={owner} translate={translate} showModal={_showModal}/>
      </CardContainer>
  )
}

export default Product