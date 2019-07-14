import React from 'react'
import ProductInfoView from '../../../common/contributions/ProductInfoView'
import CardContainer from '../../../common/cardContainer'

const Products = (props) => {
  const {translate, products} = props
  return (
      <CardContainer>
        <div className="card-header">
          <div className="header-title">
            {translate['Products']}
          </div>
        </div>
        {
          products && Object.values(products).map((pro, i) =>
              <ProductInfoView key={'pro' + i} product={pro}/>,
          )
        }
      </CardContainer>
  )
}

export default Products