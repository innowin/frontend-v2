import React from "react"
import PropTypes from "prop-types"

export const RadioButtonGroup = ({label = '', name = '', selected = {}, items = [], handler = () => 1, className}) => {
  return (
    <div className={`${className} radio-button-group`}>
      {(label) ? (<label>{label + " :"}</label>) : ('')}
      <div className="radio-btns-wrapper">
        {items.map(item => (
          <div key={`radio${item.value}`} className="item" onClick={() => handler(item.value)}>
            <span className="title">{item.title}</span>
            <span
              className={item.value === selected ? 'selected radio-btn' : 'radio-btn'}
            >
                        </span>
          </div>
        ))}
      </div>
      <input value={selected} type="hidden" name={name}/>
    </div>
  )
};

RadioButtonGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.oneOfType([
    PropTypes.string, PropTypes.number
  ]),
  items: PropTypes.arrayOf(PropTypes.object),
  handler: PropTypes.func.isRequired
}
