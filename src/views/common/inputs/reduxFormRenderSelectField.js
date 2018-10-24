import React from 'react'

const renderSelectFieldRedux = ({
                                  input,
                                  label,
                                  className,
                                  placeholder,
                                  id,
                                  textFieldClass,
                                  options,
                                  meta: {touched, error}
                                }) => (
    <div className={className}>
      <select id={id} className={(touched && error) ? `${textFieldClass} error` : `${textFieldClass}`} {...input}
              placeholder={placeholder || label}>
        {options.map(option => <option>{option}</option>)}
      </select>
      {(touched && error) && <span className="error-message">{error}</span>}
    </div>
)
export default renderSelectFieldRedux

