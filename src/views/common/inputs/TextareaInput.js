/*global __*/
import React, {Component, PropTypes} from 'react'
import cx from 'classnames';

export class TextareaInput extends Component {
    static defaultProps = {
        customValidate: () => false,
        required: false
    };

    static propTypes = {
        customValidate: PropTypes.func,
        value: PropTypes.string,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        required: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {value: this.props.value || '', error: false};
    };

    handleChange = (event) => {
        const value = event.target.value;
        this.setState({value, error: this.validateText(value, false)})
    };

    handleBlur = () => {
        this.validate();
    };

    getValue = () => {
        return this.state.value;
    };


    validateText = (value, final) => {
        if (value === '') {
            if (this.props.required) {
                return __('Required field');
            } else {
                return false;
            }
        }
        return this.props.customValidate(value, final);
    };

    validate = () => {
        const {value} = this.state;
        const error = this.validateText(value, true);
        this.setState({error});
        return error;
    };

    render() {
        return (
            <div className={cx("col-12 form-group", {'has-danger': this.state.error})}>
                <label>{this.props.label}</label>
                <textarea
                    type="text"
                    name={this.props.name}
                    className="form-control"
                    value={this.state.value}
                    ref="TextareaInput"
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                />
                {this.state.error &&
                <div className="form-control-feedback">{this.state.error}</div>}
            </div>
        )
    }
}

