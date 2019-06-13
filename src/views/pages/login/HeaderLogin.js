import React from 'react'
import {InnoWinLogo} from 'src/images/icons'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router-dom'

const HeaderLogin = ({
                       isLoginPage, isRegisterPage, iosLink, androidLink, address, phoneNumber, translate, onSignUpClick,
                       onSignInClick, onBackClick, signIn
                     }) => {
  return (
      <div className={!(isRegisterPage || isLoginPage) ? 'header' : 'header login-register-page'}>
        {(isRegisterPage || isLoginPage) &&
        <FontAwesome onClick={onBackClick} className='back-button' name='arrow-right'/>}

        <div className="logo-wrapper">
          <div className="logo"><InnoWinLogo containerClass='logoLogin'/></div>
          <div className="company-name">{
            isLoginPage ? translate['Login'] : (
                isRegisterPage ? translate['Register'] : translate['Danesh Boom']
            )
          }</div>
          <div className="divider"/>
          {!(isRegisterPage || isLoginPage) && <div className="logo-caption">{translate['Work Social Media']}</div>}
        </div>
        <div className='links-wrapper'>
          <Link to='/exchange/exchange_explorer'><h1 className='link-item pulse'>پنجره ها</h1></Link>
          <Link to='/users/users_explorer'><h1 className='link-item pulse'>افراد و شرکت ها</h1></Link>
          <Link to='/product/product_explorer'><h1 className='link-item pulse'>محصولات و خدمات</h1></Link>
          {signIn && <h1 className='link-item pulse login-button' onClick={onSignUpClick}>ثبت نام</h1>}
          {!signIn && <h1 className='link-item pulse sign-up-button' onClick={onSignInClick}>ورود</h1>}
        </div>

      </div>
      // <div className="row header mr-0 ml-0">
      //   <div className="logo-wrapper col-lg-6 col-md-12 col-sm-12 mb-4">
      //     <div className="logo"><InnoWinLogo className='logoLogin'/></div>
      //     <div className="company-name">{__('Danesh Boom')}</div>
      //     <div className="divider"/>
      //     <div className="logo-caption">{translate['Danesh Boom Work Social Media']}</div>
      //   </div>
      //   <div className="address-wrapper col-lg-6 col-md-12 col-sm-12">
      //     {/*<div className="address-section ml-5">*/}
      //     {/*<div className='icon phone-icon'>*/}
      //     {/*<div><FontAwesome name="phone"/></div>*/}
      //     {/*</div>*/}
      //     {/*<div className='address-wrapper-text'>*/}
      //     {/*<div className="phone-number">{phoneNumber}</div>*/}
      //     {/*<div className="address">{address}</div>*/}
      //     {/*</div>*/}
      //     {/*</div>*/}
      //     {/* ------------------- commented by ali orooji -----------------*/}
      //     {/*<div className="app-icon-section">*/}
      //     {/*<div className='icon ml-3'>*/}
      //     {/*<a href={androidLink}>*/}
      //     {/*<div><FontAwesome name="android"/></div>*/}
      //     {/*</a>*/}
      //     {/*</div>*/}
      //     {/*<div className='icon'>*/}
      //     {/*<a href={iosLink}>*/}
      //     {/*<div><FontAwesome name="apple"/></div>*/}
      //     {/*</a>*/}
      //     {/*</div>*/}
      //     {/*</div>*/}
      //     {/* ------------------- commented by ali orooji -----------------*/}
      //   </div>
      // </div>
  )
}

export default HeaderLogin