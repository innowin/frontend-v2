import React from 'react'

const renderTextField = ({
                           input,
                           label,
                           type,
                           className,
                           placeholder,
                           id,
                           textFieldClass,
                           meta: {touched, error}
                         }) => (
  <div className={className}>
    <input id={id} className={(touched && error) ? `${textFieldClass} error` : `${textFieldClass}`} {...input}
           placeholder={placeholder || label} type={type}/>
    {(touched && error) && <span className="error-message">{error}</span>}
  </div>
)
export default renderTextField

  