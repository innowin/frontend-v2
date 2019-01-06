/*global __*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import StickersMenu from '../components/StickersMenu'

export class TextareaInput extends Component {
  static defaultProps = {
    customValidate: () => false,
    required: false
  }

  static propTypes = {
    customValidate: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = { value: this.props.value || '', error: false }
  };

  handleChange = (event) => {
    const value = event.target.value
    this.setState({ value, error: this.validateText(value, false) })
  }

  handleBlur = () => {
    this.validate()
  }

  getValue = () => {
    return this.state.value
  }


  validateText = (value, final) => {
    if (value === '') {
      if (this.props.required) {
        return __('Required field')
      }
      else {
        return false
      }
    }
    return this.props.customValidate(value, final)
  }

  validate = () => {
    const { value } = this.state
    const error = this.validateText(value, true)
    this.setState({ error })
    return error
  }

  handleEmoji = (emoji) => {
    this.setState({ ...this.state, value: this.state.value + emoji }, () => this.TextareaInput.focus())
  }

  render() {
    return (
        <div className={cx('position-relative', { 'has-danger': this.state.error })}>


          <div className='emoji-open-edit'
               style={this.state.value.length > 0 && new RegExp('^[A-Za-z]*$').test(this.state.value[0]) ? { right: '10px' } : { left: '10px' }}>
            <StickersMenu ltr={this.state.value.length > 0 && new RegExp('^[A-Za-z]*$').test(this.state.value[0])}
                          output={this.handleEmoji}/>
          </div>


          <textarea
              name={this.props.name}
              className="post-edit-textarea-open"
              value={this.state.value}
              ref={e => this.TextareaInput = e}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              style={
                this.state.value && this.state.value.length > 0 && new RegExp('^[A-Za-z]*$').test(this.state.value[0]) ?
                    { direction: 'ltr', padding: '13px 23px 9px 15px' } :
                    { direction: 'rtl', padding: '13px 15px 9px 23px' }
              }
          />
          {
            this.state.error &&
            <div className="form-control-feedback">{this.state.error}</div>
          }
        </div>
    )
  }
}

