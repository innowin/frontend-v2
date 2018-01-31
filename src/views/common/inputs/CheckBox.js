/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class CheckBox extends Component {

    static propTypes = {
        value: PropTypes.bool,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {value: this.props.value || false};
    };

    handleChange = (event) => {
        const checkedValue = event.target.checked;
        this.setState({value:checkedValue});
    };

    getValue = () => {
        return this.state.value;
    };

    validate = () => {
        return false;
    };

    render() {
        const {label, name} = this.props;
        const {value} = this.state;
        return (
            <div className="col-12 form-group">
                <label>{label}</label>
                <input
                    type="checkbox"
                    name={name}
                    className="form-control"
                    style={{width:"initial"}}
                    onChange={this.handleChange}
                    value={value}
                />
            </div>
        )
    }
}