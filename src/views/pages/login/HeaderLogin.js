/*global __*/
import React from 'react'
import FontAwesome from 'react-fontawesome'
import {logoDaneshBoom, LogoWhiteSvg, LogoColorSvg} from 'src/images/icons'

const HeaderLogin = ({iosLink, androidLink, address, phoneNumber, logoCaption}) => {
	return (
			<div className="row header mr-0 ml-0">
				<div className="logo-wrapper col-lg-6 col-md-12 col-sm-12 mb-4">
					<div className="logo"><LogoColorSvg className='logoLogin'/></div>
					<div className="company-name">{__('Danesh Boom')}</div>
					<div className="divider"/>
					<div className="logo-caption">{logoCaption}</div>
				</div>
				<div className="address-wrapper col-lg-6 col-md-12 col-sm-12">
					<div className="address-section ml-5">
						<div className='icon phone-icon'>
							<div><FontAwesome name="phone"/></div>
						</div>
						<div className='address-wrapper-text'>
							<div className="phone-number">{phoneNumber}</div>
							<div className="address">{address}</div>
						</div>
					</div>
          {/* ------------------- commented by ali orooji -----------------*/}
					{/*<div className="app-icon-section">*/}
						{/*<div className='icon ml-3'>*/}
							{/*<a href={androidLink}>*/}
								{/*<div><FontAwesome name="android"/></div>*/}
							{/*</a>*/}
						{/*</div>*/}
						{/*<div className='icon'>*/}
							{/*<a href={iosLink}>*/}
								{/*<div><FontAwesome name="apple"/></div>*/}
							{/*</a>*/}
						{/*</div>*/}
					{/*</div>*/}
          {/* ------------------- commented by ali orooji -----------------*/}
				</div>
			</div>
	)
}

export default HeaderLogin;