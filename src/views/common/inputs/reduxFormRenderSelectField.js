import React from 'react'
import constants from "src/consts/constants";

const renderSelectFieldRedux = (props) => {
  const {input, label, className, placeholder, id, textFieldClass, meta, selected, translate} = props
  const {touched, error} = meta
  let options = []
  for (let grade in constants.SERVER_GRADES) {
    options.push(constants.SERVER_GRADES[grade])
  }
  return (
      <div className={className}>
        <select id={id} className={(touched && error) ? `${textFieldClass} error` : `${textFieldClass}`} {...input}
                placeholder={placeholder || label}
                value={selected}>
          {options.map(option => <option value={option}>{translate[option]}</option>)}
        </select>
        {(touched && error) && <span className="error-message">{error}</span>}
      </div>
  )
}
export default renderSelectFieldRedux

