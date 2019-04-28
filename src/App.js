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
import NotFound from './views/pages/NotFound'
import GetUserData from './views/user/getUserData/GetUserData'


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

  _onRegisterClick = () => this.setState({...this.state, showRegisterModal: true})

  setSignUpFields = (obj) => this.setState({...this.state, signUpFields: obj})

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

            <PropsRoute path="/login" _hideModalClick={this._hideModalClick} _onRegisterClick={this._onRegisterClick} setSignUpFields={this.setSignUpFields} component={Login}/>

            <div className='pages-wrapper global-wrapper'>
              <TopBar path={path} collapseClassName="col user-sidebar-width"/>

              <Switch>
                <PrivateRoute exact={true} path="/" component={Home}/>
                <PrivateRoute path="/user/:id" component={User}/>
                <PrivateRoute path="/organization/:id" component={Organization}/>
                <PrivateRoute path="/exchange" component={Exchange}/>
                <PrivateRoute path="/product" component={Product}/>
                <PrivateRoute path="/users/Users_Explorer" component={User_Explorer}/>

                <PrivateRoute path="*" component={NotFound}/>

              </Switch>
              <ToastContainer/>
            </div>
          </Switch>
        </div>
    )
  }

}

export default App
