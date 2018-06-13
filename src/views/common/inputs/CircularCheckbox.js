import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class CircularCheckbox extends Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        checked: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked || false
        }
    };

    _checkHandler = () => this.setState({ ...this.state, checked: !this.state.checked}, () => console.log(this.state));


    render() {
        const { label, name } = this.props;
        const { checked } = this.state;
        return (
            <div onClick={this._checkHandler} className="circular-checkbox">
                <label>{label}</label>
                <div className={checked ? "checkbox checked" : "checkbox"}>
                    <input type="checkbox" className="hidden" checked={checked} name={name} />
                </div>
            </div>
        )
    }
}