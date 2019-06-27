import React, {Component} from 'react'
import cx from 'classnames'
import * as PropTypes from 'prop-types'

export class CustomInput extends Component {
    static defaultProps = {
        customValidate: () => false,
        required: false
    };

    static propTypes = {
        customValidate: PropTypes.func,
        value: PropTypes.any,
        label: PropTypes.string.isRequired,
        required: PropTypes.bool,
        inputComponent: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {error: false};
    };


    getValue = () => {
        return this.refs.inputComponent.getValue();
    };

    validateInput = () => {
        return this.refs.inputComponent.validate();
    };

    validate = () => {
        const error = this.validateInput();
        this.setState({error});
        return error;
    };

    render() {
        const {inputComponent: InputComponent, value, required} = this.props;
        return (
            <div className={cx("form-group", {'has-danger': this.state.error})}>
                {/*TO DO : keep-ltr*/}
                <label>{this.props.label}</label>
                <InputComponent ref="inputComponent" value={value} required={required}/>
                {this.state.error &&
                <div className="form-control-feedback">{this.state.error}</div>}
            </div>
        )
    }
}

