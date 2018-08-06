import React from 'react'

const adaptFileEventToValue = delegate => e => {delegate(e.target.files[0])}

const FileInput = ({
                       input: {
                           value: omitValue, onChange, onBlur, ...inputProps
                       },
                       meta: omitMeta,
                       ...props
                   }) => {
    const {className, label, id} = props;
    return (
        <div>
            <div className={className}>
                <label htmlFor={id}>{label}</label>
                <input
                    id={id}
                    onChange={onChange}
                    onBlur={adaptFileEventToValue(onBlur)}
                    type="file"
                    {...inputProps}
                    {...props}
                />
            </div>
        </div>
    );
};
export default FileInput;
