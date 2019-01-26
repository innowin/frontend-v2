import React from 'react'
import {InnoWinLogo} from 'src/images/icons'

const HeaderLogin = ({iosLink, androidLink, address, phoneNumber, translate, onSignUpClick}) => {
  return (
      <div className='header'>
        <div className="logo-wrapper">
          <div className="logo"><InnoWinLogo containerClass='logoLogin'/></div>
          <div className="company-name">{translate['Danesh Boom']}</div>
          <div className="divider"/>
          <div className="logo-caption">{translate['Work Social Media']}</div>
        </div>
        <div className='links-wrapper'>
          <h1 className='link-item pulse'>پنجره ها</h1>
          <h1 className='link-item pulse'>افراد و شرکت ها</h1>
          <h1 className='link-item pulse'>محصولات و خدمات</h1>
          <h1 className='link-item pulse login-button' onClick={onSignUpClick}>ثبت نام</h1>
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