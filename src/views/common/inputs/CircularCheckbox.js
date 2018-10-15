import React from 'react'
import {TickSvgIcon} from 'src/images/icons'


export const CircularCheckbox = ({onCheck = () => 1, label = '', name = '', checked = false}) => (
    <div onClick={onCheck} className="circular-checkbox">
        <label>{label}</label>
        <div className={checked ? "checkbox checked" : "checkbox"}>
            <TickSvgIcon className="tick"/>
        </div>
    </div>
)