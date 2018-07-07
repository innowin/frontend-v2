import React from 'react'
// import cx from "classnames";

const StateLessTextInput = ({label = '', name = '', onChange = () => 1, value = ''}) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            value={value}
            type="text"
            name={name}
            className="form-control"
            onChange={onChange}
            dir="auto"
        />
    </div>
)
export default StateLessTextInput