import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

export class CheckBox extends PureComponent {

    static propTypes = {
        checked: PropTypes.bool,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {checked: this.props.checked || false};
    };

    handleChange = (event) => {
        const checkedValue = event.target.checked;
        this.setState({checked:checkedValue});
    };

    getValue = () => {
        return this.state.checked;
    };

    validate = () => {
        return false;
    };

    render() {
        const {label, name} = this.props;
        const {checked} = this.state;
        return (
            <div className="col-12 form-group display-none">
                <label>{label}</label>
                <input
                    type="checkbox"
                    name={name}
                    className="form-control w-auto"
                    onChange={this.handleChange}
                    checked={checked}
                />
            </div>
        )
    }
}