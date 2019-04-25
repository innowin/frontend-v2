import React from 'react'
import ExchangeExplorer from './exchange/explore/Explore'
import ExchangeView from './exchange/Exchange_View'
import PrivateRoute from '../consts/PrivateRoute'
import {Switch} from 'react-router-dom'

const Exchange = (props) => {
  const {path} = props.match
  return (
      <div>
        <div>
          <Switch>
            <PrivateRoute path={`${path}/Exchange_Explorer`} component={ExchangeExplorer}/>
            <PrivateRoute exact path={`${path}/:id`} component={ExchangeView}/>
          </Switch>
        </div>
      </div>
  )
}

export default Exchange