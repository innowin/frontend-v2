// @flow
import * as React from 'react'


type Props = {
  label?: string,
  name?: string,
  onChange: Function,
  value: string,
  extraContent?: React.Node,
  className?: string,
  dir?: string
}
const StateLessTextInput = (props: Props) => {
  const {
    label = '',
    name = '',
    onChange = () => 1,
    value = '',
    dir="auto",
    className,
    extraContent
  } = props
  return (
      <div className={`${className || ''} form-group`}>
        <label>{label}</label>
        <div className="input-wrapper">
          {extraContent || ''}
          <input
              value={value}
              type="text"
              name={name}
              className="form-control"
              onChange={onChange}
              dir={dir}
          />
        </div>
      </div>
  )
}
export default StateLessTextInput