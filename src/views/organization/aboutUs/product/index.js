// @flow
import * as React from 'react'
import CardContainer from '../../cardContainer'
import ProductView from './ProductView'
import ProductForm from './ProductForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {productType} from 'src/consts/flowTypes/user/others'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  products: [productType]
}

type States = {
  isEdit: boolean,
}

class Product extends React.Component<Props, States> {
  state = {
    isEdit: false,
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render() {
    const {owner, translate, products} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            !!isEdit
                ? <ProductForm/>
                : <ProductView products={products} owner={owner} translate={translate} toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default Product