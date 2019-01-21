import * as React from 'react'
import Product from './Product'
import {makeCategorySelector} from 'src/redux/selectors/common/category/getCategoriesByParentId'
import connect from 'react-redux/es/connect/connect'
import ProductSkeleton from './ProductSkeleton'
// import ExchangeSkeleton from './Exchange_Skeleton'

type appProps =
    {|
      products: { products: {} },
      justFollowing: boolean,
      loading: boolean
    |}

const loadingArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const Products = (props: appProps) => {
  let {products, catLevel1, catLevel2, catLevel3, categories} = props
  const list = Object.values(categories.list)

  products = Object.values(products).filter(pro => pro.id)

  if (catLevel1 !== 0) {
    if (catLevel3 !== 0) {
      products = products.filter(cat => cat.product_category && cat.product_category.id === catLevel3)
    }
    else if (catLevel2 !== 0) {
      let categories = {}
      list.forEach(cat => {
        if (cat.category_parent === catLevel2) {
          categories[cat.id] = true
        }
      })
      products = products.filter(cat => categories[cat.product_category && cat.product_category.id])
    }
    else if (catLevel1 !== 0) {
      let categories = {}
      list.forEach(cat => {
        if (cat.category_parent === catLevel1) {
          categories[cat.id] = true
        }
      })
      list.forEach(cat => {
        if (categories[cat.category_parent]) {
          categories[cat.id] = true
        }
      })
      products = products.filter(cat => categories[cat.product_category && cat.product_category.id])
    }
  }

  if (products.length > 0) {
    return <React.Fragment>
      {
        products.map((product, i): any =>
            <Product key={i} data={product}/>
        )
      }
    </React.Fragment>
  }
  else if (!props.loading) {
    return <div className='exchanges-explore-not-found'>محصولی یافت نشد!</div>
  }
  else return <React.Fragment>
      {
        loadingArr.map((index:number): any =>
            <ProductSkeleton key={index}/>
        )
      }
    </React.Fragment>
}

const mapStateToProps = (state) => {
  const categorySelector = makeCategorySelector()
  return {
    categories: categorySelector(state)
  }
}

export default connect(mapStateToProps)(Products)
