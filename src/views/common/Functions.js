// @flow
import * as React from 'react'

export const list_of_badge = (myValue: (?string)[]): (?React.Element<'span'>)[] => {
  if (Array.isArray(myValue)) {
    return (
        myValue.map((item, i) => {
          return (
              <span key={i} className="badge badge-success badge-success-style">{item}</span>
          )
        })
    )
  }
  else {
    return []
  }
};
