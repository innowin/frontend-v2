import React from 'react'

export const LabelTag = props => {
    let name = props.name;
    let number = props.number;
    return (
      <div className="modal-label">
        <span className="label-tag">{name}</span> 
        <span className="label-number">{number}</span>
      </div>
    )
};
export default LabelTag;
