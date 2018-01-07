/*global __*/
import React, {Component} from 'react';
import {TOKEN} from '../../../../src/consts/token'


export default class LoginForm extends Component {
    render() {
        return <form action="/login/" method="post">
            <div className="input-group-vertical mb-3">
                <input
                    type="text"
                    name="username"
                    className="form-control form-control-lg"
                    placeholder={__('Username or email')}
                />
                <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg"
                    placeholder={__('Password')}
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">{__('Login')}</button>
            <button type="button" onClick={this.props.showRecovery} className="btn btn-link">
                {__('Password recovery')}
            </button>
        </form>;
    }
}