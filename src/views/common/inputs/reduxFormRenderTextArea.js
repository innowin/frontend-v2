import React from 'react'

const renderTextArea = ({
                            input,
                            label,
                            type,
                            placeholder,
                            className,
                            textFieldClass,
                            meta: {touched, error}
                        }) => (
    <div className={className}>
        <textarea {...input} className={(touched && error) ? `${textFieldClass} error` : `${textFieldClass}`}
                  placeholder={placeholder || label}/>
        {(touched && error) && <span className="error-message">{error}</span>}
    </div>
)
export default renderTextArea

