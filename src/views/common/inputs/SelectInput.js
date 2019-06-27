import React, {Component} from 'react'
import * as PropTypes from 'prop-types'


const HIDDEN_OPTS = 'hidden-options'
const SHOWED_OPTS = 'showed-options'

export class SelectInput extends Component {

    static propTypes = {
        options: PropTypes.array,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        selected: PropTypes.object,
        placeholder: PropTypes.string,
    };

    constructor(props) {
        super(props);
        const { selected, placeholder } = this.props;
        this.state = {
            selected: selected || { title: (placeholder || '') , value: '' },
            classes: HIDDEN_OPTS
        }
    };

    _handleChange = (option) => this.setState({ ...this.state, selected:option});

    _optionsDisplayHandler = () => {
        let className = this.state.classes;
        className = ((className === SHOWED_OPTS) && HIDDEN_OPTS) || SHOWED_OPTS
        this.setState({ ...this.state, classes: className})   
    }

    render() {
        const { label, name, options } = this.props;
        const { selected, classes } = this.state;
        return (
            <div className="select-input-wrapper">
                <label>{label}</label>
                <div className={`select ${classes}`}>
                    <div className="value" onClick={this._optionsDisplayHandler}>
                        {selected && selected.title}
                        <input type="hidden" name={name} value={selected && selected.value} />
                    </div>
                    <div className="options" ref={options => this.options = options}>
                        {options.map(option => (
                            <div key={option.value} onClick={this._handleChange.bind(this, option)} className="option">{option.title}</div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}
export const StateLessSelect = ({onChange = () => 1, label = '', name = '', options = [], selected = {}}) => {
    let classes = HIDDEN_OPTS
    const optionsDisplayHandler = () => {
        if (classes === SHOWED_OPTS) classes = HIDDEN_OPTS
        else classes = SHOWED_OPTS
        // classes = ((classes === SHOWED_OPTS) && HIDDEN_OPTS) || SHOWED_OPTS
        console.log(classes)
    }
    return (
        <div className="select-input-wrapper">
            <label>{label}</label>
            <div className={`select ${classes}`}>
                <div className="value" onClick={optionsDisplayHandler}>
                    {selected && selected.title}
                </div>
                <div className="options">
                    {options.map(option => (
                        <div key={option.value} onClick={() => onChange(option)} className="option">{option.title}</div>
                    ))}
                </div>
            </div>
        </div>
    )
}