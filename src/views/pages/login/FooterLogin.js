/*global __*/
import React from 'react';

const FooterLogin = ({year}) => {
    return (
        <div className='footer-wrapper'>
            <p> {year} {__('All rights are reserved for Danesh Boom')}</p>
        </div>
    )
}

export default FooterLogin;