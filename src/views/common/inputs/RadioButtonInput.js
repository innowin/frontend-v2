import React from 'react'
import PropTypes from 'prop-types'

export const RadioButtonGroup = ({ label, name, selected, items, handler }) => {
    const changHandler = (value) => handler(value)
    return (
        <div className="radio-button-group">
            <label >{label}</label>
            <div className="radio-btns-wrapper">
                {items.map(item => (
                    <div key={`radio${item.value}`} className="item">
                        <span className="title">{item.title}</span>
                        <span
                            className={item.value === selected ? 'selected radio-btn' : 'radio-btn'}
                            onClick={() => changHandler(item.value)}
                        >
                        </span>
                    </div>
                ))}
            </div>
            <input value={selected} type="hidden" name={name} />
        </div>
    )
}
RadioButtonGroup.PropTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selected: PropTypes.oneOfType([
        PropTypes.string, PropTypes.number
    ]),
    items: PropTypes.arrayOf(PropTypes.object),
    handler: PropTypes.func.isRequired
}