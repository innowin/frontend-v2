import React, {Component} from 'react'
import PropTypes from 'prop-types'

export class RadioButtonGroup extends Component {

    static propTypes = {
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        defaultValue: PropTypes.oneOfType([
            PropTypes.string, PropTypes.number
        ]),
        items: PropTypes.arrayOf(PropTypes.object)
    };

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
        }
    };

    _handleChange = (value) => this.setState({ ...this.state, selected: value }, () => console.log(this.state));


    render() {
        const { label, name, items } = this.props;
        const { selected } = this.state;
        return (
            <div className="radio-button-group">
                <label>{label}</label>
                <div className="radio-btns-wrapper">
                    {items.map(item => (
                        <div className="item">
                            <span className="title">{item.title}</span>
                            <span className={item.value === selected ? 'selected radio-btn' : 'radio-btn'} onClick={this._handleChange.bind(this, item.value)}>

                            </span>
                        </div>
                    ))}
                </div>
                <input value={selected} type="hidden" name={name} />
            </div>
        )
    }
}