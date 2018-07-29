import React from 'react'

const renderTextField = ({
                           input,
                           label,
                           type,
                           meta: {touched, error}
                         }) => (
  <div className="signup-field">
    <input className={touched && error ? 'error' : ''} {...input} placeholder={label} type={type}/>
    {touched &&
    (error && <span className="error-message">{error}</span>)}
  </div>
)
export default renderTextField

  