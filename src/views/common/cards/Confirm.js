/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'


export class Confirm extends Component {
    static propTypes = {
        cancelRemoving: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    {__('Are you sure? Do you want delete it?')}
                </div>
                <div className="col-6">
                    <button className="btn btn-danger btn-block btn-lg" onClick={this.props.remove}>
                        {__('Yes, Do it.')}
                    </button>
                </div>
                <div className="col-6">
                    <button className="btn btn-secondary btn-block btn-lg" onClick={this.props.cancelRemoving}>
                        {__('No, Cancel please.')}
                    </button>
                </div>
            </div>
        )
    }
}