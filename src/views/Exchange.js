import React, {Component} from 'react'
import ExchangeExplorer from './exchange/explore/Explore'
import ExchangePost from './exchange/ExchangeView/post/index'
import ExchangeView from './exchange/Exchange_View'
import PrivateRoute from "../consts/PrivateRoute"
import {Switch} from 'react-router-dom'

class Exchange extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {path} = this.props.match
    return (
        <div>
          <div>
            <Switch>
              <PrivateRoute path={`${path}/Exchange_Explorer`} component={ExchangeExplorer}/>
              <PrivateRoute exact path={`${path}/:id`} component={ExchangeView}/>
              <PrivateRoute exact path={`${path}/:exchangeId/post/:postId`} component={ExchangePost}/>
            </Switch>
          </div>
        </div>
    )
  }
}

export default Exchange