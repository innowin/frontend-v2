/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class ErrorCard extends Component {
    static propTypes = {
        retry: PropTypes.func.isRequired,
        header: PropTypes.string.isRequired
    };

    render() {
        const {retry, header} = this.props;
        return (
            <div className="card mt-3">
                <div className="card-block">
                    <h3>{header}</h3>
                    {__('Error')}
                    <button className="btn btn-secondary" onClick={retry}>{__('Retry')}</button>
                </div>
            </div>
        )
    }
}
