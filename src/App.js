import React from 'react'
import 'src/fontawesome/css/font-awesome.min.css'
import 'src/styles/global.scss'
import Login from 'src/views/pages/Login'
import PropsRoute from 'src/consts/PropsRoute'
import {Switch} from 'react-router-dom'
import TopBar from './views/bars/TopBar'
import Home from './views/pages/Home'
import User from './views/pages/User'
import Organization from './views/pages/Organization'
import User_Explorer from './views/user/explore/Explore'
import PrivateRoute from './consts/PrivateRoute'
import ToastContainer from './views/common/components/ToastContainer'
import NotFound from './views/pages/NotFound'
import GetUserData from './views/user/getUserData/GetUserData'
import ProductExplorer from './views/product/explore/Explore'
import ProductView from './views/product/productView/ProductView'
import ExchangeExplorer from './views/exchange/explore/Explore'
import ExchangeView from './views/exchange/Exchange_View'
import Notifications from './views/pages/Notifications'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showRegisterModal: false,
      signUpFields: {
        password: '',
        email: '',
      },
    }
  }

  _hideModalClick = () => this.setState({...this.state, showRegisterModal: false})

  _onRegisterClick = () => {
    const {email, password} = this.state.signUpFields
    if (email && password && password !== '' && email !== '')
      this.setState({...this.state, showRegisterModal: true})
  }

  setSignUpFields = (value) => this.setState({...this.state, signUpFields: value})

  render() {
    const path = this.props.location.pathname
    const {showRegisterModal, signUpFields} = this.state
    return (
        <div>

          <GetUserData showRegisterModal={showRegisterModal}
                       hideRegisterModal={this._hideModalClick}
                       password={signUpFields.password}
                       email={signUpFields.email}
          />

          <Switch>

            <PropsRoute path='/login' _hideModalClick={this._hideModalClick} _onRegisterClick={this._onRegisterClick} setSignUpFields={this.setSignUpFields} component={Login}/>

            <React.Fragment>
              <div className='pages-wrapper global-wrapper'>
                <TopBar path={path}/>

                <Switch>
                  <PrivateRoute exact path='/' component={Home}/>
                  <PrivateRoute path='/user/:id' component={User}/>
                  <PrivateRoute path='/organization/:id' component={Organization}/>
                  <PrivateRoute path='/exchange/exchange_explorer' component={ExchangeExplorer}/>
                  <PrivateRoute path='/exchange/:id' component={ExchangeView}/>
                  <PrivateRoute path='/product/product_explorer' component={ProductExplorer}/>
                  <PrivateRoute path='/product/:id' component={ProductView}/>
                  <PrivateRoute path='/users/users_explorer' component={User_Explorer}/>
                  <PrivateRoute path='/notifications' component={Notifications}/>

                  <PrivateRoute path='*' component={NotFound}/>
                </Switch>
                <ToastContainer/>
              </div>
            </React.Fragment>

          </Switch>
        </div>
    )
  }

}

export default App
