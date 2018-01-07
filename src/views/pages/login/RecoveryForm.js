/*global __*/
import React, {Component} from 'react';

export default class LoginForm extends Component {
    render() {
        return <form>
            <div className="input-group-vertical mb-3">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder={__('Username or email')}
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">{__('Recovery')}</button>
        </form>;
    }
}