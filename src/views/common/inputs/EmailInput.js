/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames';

export class EmailInput extends Component {
    static defaultProps = {
        required: false
    };

    static propTypes = {
        value: PropTypes.string,
        label: PropTypes.string.isRequired,
        required: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {value: this.props.value || '', error: false};
    };

    handleChange = (event) => {
        this.setState({value: event.target.value})
    };

    handleBlur = () => {
        this.validate()
    };

    getValue = () => {
        return this.state.value;
    };

    validateEmail = (value) => {
        if (value === '') {
            if (this.props.required) {
                return __('Required field');
            } else {
                return false;
            }
        }
        const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!re.test(value)) {
            return __('Invalid email');
        }
    };

    validate = () => {
        const {value} = this.state;
        const error = this.validateEmail(value);
        this.setState({error});
        return error;
    };

    render() {
        return (
            <div className={cx("col-12 form-group", {'has-danger': this.state.error})}>
                <label>{this.props.label}</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={this.state.value}
                    ref="EmailInput"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                {this.state.error &&
                <div className="form-control-feedback">{this.state.error}</div>}
            </div>
        )
    }
}

