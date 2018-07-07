// @flow
import * as React from 'react'

export const list_of_badge = (myValue:(?string)[]):(?React.Element<'span'>)[] => {
    if (Array.isArray(myValue)) {
        myValue.map((item, i) => {
            return (
                <div key={i} className="badge badge-success mr-2">{item}</div>
            )
        })
    }
    return []
};
