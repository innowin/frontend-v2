import React from 'react'
import * as PropTypes from 'prop-types'
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

class renderTextField extends React.Component <renderProps> {
  render(): React.ReactNode {
    const {onChangeForm, input, label, type, className, placeholder, id, meta, isNew, tipText, ltr, nextText, myRef, myKeyDown} = this.props
    const {error, touched, active, initial, visited} = meta
    const {onChange} = input
    return (!isNew ? (
            <div className={className}>
              <input id={id} className={(touched && error) ? `form-control error` : `form-control`} {...input}
                     placeholder={placeholder || label} type={type}
                     onChange={(e) => {
                       onChange(e)
                       onChangeForm && onChangeForm(e)
                     }}
                     ref={myRef}
                     onKeyDown={myKeyDown}
              />
              {(touched && error) && <span className="error-message">{error}</span>}
            </div>
        ) : (
            <div className={
              (this.textField &&
                  (this.textField.value !== '' || active || (!visited && initial !== '' && initial !== undefined))
              )
                  ? 'render-text-field-container open-render-text-field-container'
                  : 'render-text-field-container'
            }>
              <div className='render-text-field-div'>
                <input ref={myRef ? myRef : e => this.textField = e} id={id}
                       className={(ltr ? ((touched && error) ? `error ltr` : `ltr`) : (touched && error) ? `error` : ``)} {...input}
                       placeholder={placeholder} type={type}
                       onChange={(e) => {
                         onChange(e)
                         onChangeForm && onChangeForm(e)
                       }}
                       onKeyDown={myKeyDown}
                />
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

  