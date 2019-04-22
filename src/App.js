import React from 'react'
import 'src/fontawesome/css/font-awesome.min.css'
import 'src/styles/global.scss'
import Login from 'src/views/pages/Login'
import PropsRoute from 'src/consts/PropsRoute'
import {Switch} from 'react-router-dom'
import TopBar from './views/bars/TopBar'
import Home from './views/pages/Home'
import User from './views/User'
import Organization from './views/Organization'
import Exchange from './views/Exchange'
import Product from './views/Product'
import User_Explorer from './views/user/explore/Explore'
import PrivateRoute from './consts/PrivateRoute'
import ToastContainer from './views/common/components/ToastContainer'


const App = (props) => {
  const path = props.location.pathname
  return (
      <Switch>
        <PropsRoute path="/login" component={Login}/>

        <div className='pages-wrapper global-wrapper'>
          <TopBar path={path} collapseClassName="col user-sidebar-width"/>

          <Switch>
            <PrivateRoute exact={true} path="/" component={Home}/>
            <PrivateRoute path="/user/:id" component={User}/>
            <PrivateRoute path="/organization/:id" component={Organization}/>
            <PrivateRoute path="/exchange" component={Exchange}/>
            <PrivateRoute path="/product" component={Product}/>
            <PrivateRoute path="/users/Users_Explorer" component={User_Explorer}/>

            {/*Prevent wrong paths*/}
            {/*<PrivateRoute path="*" component={Home}/> // TODO:Abel */}

          </Switch>
          <ToastContainer/>
        </div>
      </Switch>
  )
}

export default App
