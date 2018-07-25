import React from 'react'

const renderTextArea = ({
                            input,
                            label,
                            type,
                            placeholder,
                            className,
                            value,
                            meta: {touched, error}
                        }) => (
    <div className="signup-field">
        {console.log('the value guy is: ', value)}
        <textarea value={value} {...input} className={touched && error ? `error ${className}` : className}
                  placeholder={placeholder || label}/>
        {(touched && error) && <span className="error-message">{error}</span>}
    </div>
)
export default renderTextArea

