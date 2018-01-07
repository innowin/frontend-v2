/*global __*/
import React, {Component} from 'react';
import {FORM_ERROR , ALL} from "src/consts/error-codes";
import {LoadingCard} from "src/views/components/common/cards/LoadingCard";
import {ErrorCard} from "src/views/components/common/cards/ErrorCard";

export class SignUpForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
		
		}
	}
    state = {errors: [], success: false, sending: false};

    validatePasswords = (password1, password2) => {
        if (password1 === '') {
            return __('Password is required');
        }
        if (password1 !== password2) {
            return __('Different password');
        }
        return false;
    };
    validateUsername = (username) => {
        if (username === '') {
            return __('Username is required');
        }
        if (!/^[\w.+-]+$/.test(username)) {
            return __('Invalid username');
        }
        return false;
    };

    validateEmail = (email) => {
        const p = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (email === '') {
            return __('Email is required');
        }
        if (!p.test(email)) {
            return __('Invalid email')
        }
        return false;
    };

    formatFormError = (field, {code} = {}) => {
        if (field === 'username' && code === 'username-exists') {
            return [
                [ALL, [__('Username exists')]],
            ];
        }
        if (field === 'email' && code === 'email-exists') {
            return [
                [ALL, [__('Email exists')]],
            ];
        }

        return [];
    };
	
    onSubmit = async (e) => {
        e.preventDefault();
        const username = this.refs.username.value.trim();
        const email = this.refs.email.value.toLowerCase().trim();
        const password1 = this.refs.password1.value;
        const password2 = this.refs.password2.value;
        const usernameError = this.validateUsername(username);
        const emailError = this.validateEmail(email);
        const passwordError = this.validatePasswords(password1, password2);
        const errors = [usernameError, emailError, passwordError].filter(err => err)
      
        if (errors.length > 0) {
            this.setState({errors});
            return;
        }
        try {
            this.setState({errors: [], sending: true});
            await this.register({username, email, password: password1});
            this.setState({errors: [], sending: false, success: true});
        } catch (e) {
            if (e) {
                const errors = this.formatServerErrors(e);
                this.setState({errors: errors[ALL] || [__('Some error occurred')], sending: false});
            }
        }
    };

    render() {
        const {errors, success, sending} = this.state;

        if (success) {
            return <div className="alert alert-success">
                {__('Activation email sent to your email')}
                <button type="button" onClick={this.props.showLogin} className="btn btn-success btn-sm float-right">
                    {__('Login')}
                </button>
            </div>;
        }
        return <form onSubmit={this.onSubmit}>
            <div className="input-group-vertical mb-2">
                <input
                    type="text"
                    name="username"
                    ref="username"
                    className="form-control form-control-lg"
                    placeholder={__('Username')}
                />
                <input
                    type="text"
                    name="email"
                    ref="email"
                    className="form-control form-control-lg"
                    placeholder={__('Email')}
                />
            </div>
            <div className="input-group-vertical mb-3">
                <input
                    type="password"
                    name="password1"
                    ref="password1"
                    className="form-control form-control-lg"
                    placeholder={__('Password')}
                />
                <input
                    type="password"
                    name="password2"
                    ref="password2"
                    className="form-control form-control-lg"
                    placeholder={__('Repeat password')}
                />
            </div>
            <div>
                {
                    errors.map((error, i) => <div className="text-danger" key={i}>{error}</div>)
                }
            </div>
            {sending && <div className="text-muted">{__('Sending')}</div>}
            <button type="submit" className="btn btn-primary btn-block btn-lg">{__('Register')}</button>
        </form>;
    }
}


export default SignUpForm;
