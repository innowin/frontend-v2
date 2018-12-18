import React from 'react'
import PropTypes from 'prop-types'
import {InformationIcon} from "../../../images/icons";

type renderProps = {
  input: string,
  label: string,
  type: string,
  className: string,
  placeholder: string,
  id: number,
  meta: {
    error: boolean,
    touched: boolean,
    active: boolean,
    initial: string,
    visited: boolean,
  },
  isNew: boolean,
  tipText: string,
  ltr: boolean,
  nextText: string,
}
const renderTextField = (props: renderProps) => {
  const {input, label, type, className, placeholder, id, meta, isNew, tipText, ltr, nextText} = props
  const {error, touched, active, initial, visited} = meta
  return (!isNew ? (
          <div className={className}>
            <input id={id} className={(touched && error) ? `form-control error` : `form-control`} {...input}
                   placeholder={placeholder || label} type={type}/>
            {(touched && error) && <span className="error-message">{error}</span>}
          </div>
      ) : (
          <div className={
            (this.textField &&
                (this.textField.value !== '' || active || (!visited && initial !== ''))
            )
                ? 'render-text-field-container open-render-text-field-container'
                : 'render-text-field-container'
          }>
            <div className='render-text-field-div'>
              <input ref={e => this.textField = e} id={id}
                     className={(ltr ? ((touched && error) ? `error ltr` : `ltr`) : (touched && error) ? `error` : ``)} {...input}
                     placeholder={placeholder} type={type}/>
              <span className={
                (this.textField &&
                    (this.textField.value !== '' || active || (!visited && initial !== ''))
                )
                    ? 'label-top'
                    : ''
              }>
                {label}
              </span>
            </div>
            {tipText &&
            <div className='tooltip-container'>
              <InformationIcon className='info-icon'/>
              <p>{tipText}</p>
            </div>
            }
            {nextText &&
            <span className='next-text'>{nextText}</span>
            }
            <span className={(touched && error) ? "form-error" : 'no-error'}>{error ? error : ''}</span>
          </div>
      )
  )
}

renderTextField.proptypes = {
  input: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  meta: PropTypes.object.isRequired,
  isNew: PropTypes.bool.isRequired,
  tipText: PropTypes.string.isRequired,
  ltr: PropTypes.bool.isRequired,
}
export default renderTextField

  