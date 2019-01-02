import React from 'react'

const renderSelectM = (props) => {
  const {input, options, key, changeHandler, meta} = props
  const {touched, error} = meta
  return (
      <React.Fragment>
        <select {...input} className={touched && error ? 'error select-field-m' : 'select-field-m'}
                onChange={(event) => {
                  const {value} = event.target
                  input.onChange(value)
                  changeHandler && changeHandler(event, value)
                }}>
          {options && options.map(opt => (
              <option key={`${key}/${opt}`} value={opt.value}>{opt}</option>
          ))}
        </select>
        {touched && (error && <span className="error-message">{error}</span>)}
      </React.Fragment>
  )
}

export default renderSelectM