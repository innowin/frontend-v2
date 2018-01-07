/*global __*/
import React, {Component} from 'react';
import 'src/styles/components/auth-btn.scss';
import cx from 'classnames';
import FontAwesome from 'react-fontawesome';

export default class GoogleBtn extends Component {
    render() {
        let {className, ...props} = this.props;
        return <a
            href="/soc/login/google-oauth2/"
            className={cx("btn-google", className)}
            role="button"
            {...props}
        >
            <FontAwesome size="2x" name="google"/>
        </a>;
    }
}