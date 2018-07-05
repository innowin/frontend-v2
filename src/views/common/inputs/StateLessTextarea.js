import React from 'react'

const StateLessTextarea = ({name = '', label = '', onChange = () => 1, value = ''}) => (
    <div className="form-group">
        <label>{label}</label>
        <textarea
            name={name}
            className="form-control"
            onChange={onChange}
            dir="auto"
            value={value}
        />
    </div>
)
export default StateLessTextarea