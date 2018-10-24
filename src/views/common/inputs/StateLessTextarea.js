// @flow
import React from 'react'

type Props = {
  name?: string,
  label?: string,
  onChange: (SyntheticEvent<HTMLInputElement>) => void,
  value: string,
  className?: string
}

export default (props: Props) => {
  const {name = '', label = '', onChange = (a) => a, value = '', className = ''} = props
  return (
      <div className={`form-group ${className}`}>
        {label ? <label>{label}</label> : ''}
        <textarea
            name={name}
            className="form-control"
            onChange={onChange}
            dir="auto"
            value={value}
        />
      </div>
  )
}