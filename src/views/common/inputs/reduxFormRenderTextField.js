import React from 'react'

const renderTextField = ({
                             input,
                             label,
                             type,
                             className,
                             placeholder,
                             id,
                             meta: {touched, error}
                         }) => (
    <div>
        <input id={id} className={touched && error ? `error ${className}` : className} {...input}
               placeholder={placeholder || label} type={type}/>
        {(touched && error) && <span className="error-message">{error}</span>}
    </div>
)
export default renderTextField

  