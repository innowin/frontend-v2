import React from 'react'


type Props = {
    input: HTMLInputElement,
    label: string,
    id: string,
    className: string,
}

const renderTextField = (props: Props) => {
    const {input, label, id, className, meta: {touched, error}} = props
    return (
        <div className={className}>
            <label htmlFor={id}>{label}</label>
            <div id={id} className="redux-form-file-field">
                <input className={touched && error ? 'error' : ''} {...input} type="file"/>
            </div>
            {(touched && error) && <span className="error-message">{error}</span>}
        </div>
    )
}

export default renderTextField

