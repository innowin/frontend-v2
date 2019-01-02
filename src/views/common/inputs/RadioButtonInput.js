// @flow
import * as React from "react"

export type StrNumBool = string | number | boolean
type ItemType = {
  value: StrNumBool,
  title: string
}

type Props = {
  label?: string,
  name: string,
  selected: StrNumBool,
  items: Array<ItemType>,
  handler: (value: StrNumBool) => void,
  className?: string
}
export const RadioButtonGroup = (props: Props) => {
  const {
    label = '',
    name = '',
    selected = {},
    items = [],
    handler = (value) => 1,
    className,
    contribution
  } = props
  return (
    <div className={`radio-button-group ${className || ''}`}>
      {(label) ? (<label>{label + " :"}</label>) : ('')}
      <div className="radio-btns-wrapper">
        {items.map(item => (
          <div
              key={`radio${String(item.value)}`}
              className="item" onClick={() => handler(item.value)}
          >
            <span className={`title ${contribution || ''}`}>{item.title}</span>
            <span
              className={item.value === selected ? 'selected radio-btn' : 'radio-btn'}
            >
                        </span>
          </div>
        ))}
      </div>
      <input value={selected} type="hidden" name={name}/>
    </div>
  )
}