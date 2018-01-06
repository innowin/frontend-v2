/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames';

export class FloatInput extends Component {
    static defaultProps = {
        customValidate: () => false,
        required: false,
    };

    static propTypes = {
        customValidate: PropTypes.func,
        value: PropTypes.number,
        required: PropTypes.bool,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        digits: PropTypes.number,
    };

    constructor(props) {
        super(props);
        this.state = {value: this.props.value || '', error: false};
    };

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({error: this.validateFloat(value, false), value})
    };

    getValue = () => {
        const value = this.state.value;
        if (value === '') {
            return null;
        }
        const v = Number(value);
        if (isNaN(v)) {
            return null;
        }
        if (this.props.digits === undefined) {
            return v;
        }
        return Number(v.toFixed(this.props.digits));
    };
    normalizeInput = (value) => {
        const v = Number(value);
        if (isNaN(v)) {
            return 0;
        }
        const m = value.match(/^\d+(\.0*)$/);
        if (m) {
            return v + m[1];
        }
        return v;
    };

    validateFloat = (value, final) => {
        if (this.props.required && value === '') {
            return __('Required field');
        }
        const v = Number(value);
        if (isNaN(v)) {
            return __('Invalid number');
        }
        return this.props.customValidate(v, final);
    };

    handleBlur = () => {
        this.validate()
    };


    validate = () => {
        const {value} = this.state;
        const error = this.validateFloat(value, true);
        this.setState({error});
        return error;
    };

    render() {
        const {error} = this.state;
        // TODO keep ltr
        return (
            <div className={cx("col-12 form-group ", {'has-danger': error})}>
                <div className="row">
                    <label className="col-12">{this.props.label}</label>
                    <div className="col-10">
                        <input
                            type="text"
                            name={this.props.name}
                            className="form-control dir-rtl"
                            value={this.state.value}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                        />
                        {error && <div className="form-control-feedback">{error}</div>}
                    </div>
                    <span className="col-2 col-form-label">{!error && this.getValue()}</span>
                </div>
            </div>
        )
    }
}
