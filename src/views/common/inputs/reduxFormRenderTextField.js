import React from 'react'

const renderTextField = (props) => {
  const {input, label, type, className, placeholder, id, textFieldClass, meta, labelName, isNew} = props
  const {error, touched, active, initial} = meta
  if (this.textFiled) console.log(this.textFiled, this.textFiled.value, typeof (this.textFiled.value), 'vvvvvv')
  return(!isNew ?
          <div className={className}>
            <input id={id} className={(touched && error) ? `${textFieldClass} error` : `${textFieldClass}`} {...input}
                   placeholder={placeholder || label} type={type}/>
            {(touched && error) && <span className="error-message">{error}</span>}
          </div>
          : (<div className={className}>
            <input ref={e => this.textFiled = e} id={id}
                   className={(touched && error) ? `${textFieldClass} error` : `${textFieldClass}`} {...input}
                   placeholder={placeholder || label} type={type}/>
            <label
                className={
                  (this.textFiled &&
                      (this.textFiled.value !== '' || active || (active && this.textFiled.value !== initial))
                  )
                      ? 'label-top'
                      : ''
                }>
              {labelName}
            </label>
            {(touched && error) && <span className="error-message">{error}</span>}
          </div>)

  )
}
export default renderTextField

  