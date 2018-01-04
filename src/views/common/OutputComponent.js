import React from 'react';

export const outputComponent = ({value, onRemove}) => {
    // TODO KEEP LTR
    return (
        <span className="badge badge-success mr-1 dir-rtl">
        <span className="d-inline-block">{value}</span>
        <span className="badge-remove-btn mr-1" onClick={onRemove}>x</span>
        </span>
    )
};
