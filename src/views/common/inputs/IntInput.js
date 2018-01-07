/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

export class IntInput extends Component {
    static defaultProps = {
        customValidate: () => false,
        required: false
    };

    static propTypes = {
        customValidate: PropTypes.func,
        value: PropTypes.number,
        required: PropTypes.bool,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {value: this.props.value || '', error: false};
    };

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({error: this.validateInt(value), value})
    };
    handleBlur = () => {
        let {value} = this.state;
        if (value !== '' && value !== '-') {
            value = '' + this.normalize(value);
        }
        const error = this.validateInt(value, true);
        this.setState({error, value})
    };

    getValue = () => {
        const {value} = this.state;
        if (value === '') {
            return null
        }
        return this.normalize(value);
    };

    normalize = (value) => {
        return Math.floor(Number(value));
    };

    validateInt = (value, final = false) => {
        if (value === '') {
            if (this.props.required) {
                return __('Required field');
            } else {
                return false;
            }
        }
        if (!final && value === '-') {
            return false;
        }
        const num = this.normalize(value);
        if (isNaN(num)) {
            return __('Invalid number');
        }
        return this.props.customValidate(num, final);
    };

    validate = () => {
        const {value} = this.state;
        const error = this.validateInt(value, true);
        this.setState({error});
        return error;
    };

    render() {
        const {error, value} = this.state;
        return (
            <div className={cx("col-12 form-group ", {'has-danger': error})}>
                <div className="row">
                    <label className="col-12">{this.props.label}</label>
                    <div className="col-12">
                        {/* TODO keep ltr*/}
                        <input
                            type="text"
                            name={this.props.name}
                            className="form-control dir-rtl"
                            value={value}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        />
                        {error && <div className="form-control-feedback">{error}</div>}
                    </div>
                </div>
            </div>
        )
    }
}

