import React from 'react'
import ProductView from './product/ProductView'
import ProductExplorer from './product/explore/Explore'
import PrivateRoute from '../consts/PrivateRoute'
import {Switch} from 'react-router-dom'

const Product = (props) => {
  const {path} = props.match
  return (
      <Switch>
        <PrivateRoute exact path={`${path}/Product_Explorer`} component={ProductExplorer}/>
        <div className="-main">
          <PrivateRoute path={`${path}/:id`} component={ProductView}/>
        </div>
      </Switch>
  )
}

export default Product