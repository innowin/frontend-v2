import React from 'react'
import {SelectComponent} from "../SelectComponent";

const renderSelectField = ({
    input,  
    label,
    options,
    key,
    changeHandler,
    meta: { touched, error, warning }
  }) => {
    return (
    <div className="signup-field">
      <select {...input} className={touched && error ? 'error' : ''} onChange={(event) => {
        const {value} = event.target
        input.onChange(value)
        changeHandler && changeHandler(event, value)
      }}>
        <option key={`${key}/${label}`} value="">{label}</option>
        {options && options.map(opt => (
          <option key={`${key}/${opt.value}`} value={opt.value}>
            {opt.title}
          </option>
        ))}      
      </select>
      {touched &&
        (error && <span className="error-message">{error}</span>)}
    </div>
    )}

export default renderSelectField