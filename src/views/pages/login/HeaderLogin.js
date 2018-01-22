/*global __*/
import React from 'react'
import FontAwesome from 'react-fontawesome'
import {logoDaneshBoom} from 'src/images/icons'

const HeaderLogin = ({iosLink, androidLink, address, phoneNumber, logoCaption}) => {
	return (
			<div className="header">
				<div className="logo-wrapper">
					<div className="logo"><img src={logoDaneshBoom} alt="" /></div>
					<div className="company-name">{__('Danesh Boom')}</div>
					<div className="divider"></div>
					<div className="logo-caption">{logoCaption}</div>
				</div>
				<div className="address-wrapper">
					<div className="address-section">
						<div className='icon phone-icon'>
							<FontAwesome name="phone"/>
						</div>
						<div className='address-wrapper-text'>
							<div className="phone-number">{phoneNumber}</div>
							<div className="address">{address}</div>
						</div>
					</div>
					<div className="app-icon-section">
						<div className='icon android-icon'>
							<a href={androidLink}>
								<div><FontAwesome name="android"/></div>
							</a>
						</div>
						<div className='icon ios-icon'>
							<a href={iosLink}>
								<div><FontAwesome name="apple"/></div>
							</a>
						</div>
					</div>
				</div>
			</div>
	)
}

export default HeaderLogin;