import React from 'react';
import FontAwesome from 'react-fontawesome';

const SocialLogin = () => {
    return (
        <div className="social-login-wrapper">
            <div className="social-icon-wrapper twitter">
                <FontAwesome className="social-button circle-border twitter" name="twitter"/>
            </div>
            <div className="social-icon-wrapper google">
                <FontAwesome className="social-button circle-border google" name="google"/>
            </div>
            <div className="social-icon-wrapper facebook">
                <FontAwesome className="social-button circle-border facebook" name="facebook"/>
            </div>
        </div>
    )
}

export default SocialLogin;
