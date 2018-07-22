import React from 'react';
import PropTypes from "prop-types";

const DefaultUserIcon = ({className = '', onClickFunc = () => null, ...props}) => {
  return (
    <svg viewBox="0 0 53 53" className={className} height={props.height} width={props.width}>
      <g className="cursor-pointer">
        <path fill="#FFFFFF" d="M18.6,41.6l-7.9,4.3c-0.5,0.3-0.9,0.6-1.3,0.9C14,50.7,20,53,26.5,53c6.5,0,12.4-2.3,17-6.1
          c-0.4-0.4-0.9-0.7-1.4-0.9l-8.5-4.2c-1.1-0.5-1.8-1.7-1.8-2.9v-3.3c0.2-0.3,0.5-0.6,0.8-1c1.2-1.6,2-3.4,2.6-5.3
          c1.1-0.3,1.9-1.3,1.9-2.5v-3.5c0-0.8-0.3-1.5-0.9-2V16c0,0,1.1-8-9.8-8s-9.8,8-9.8,8v5.1c-0.5,0.5-0.9,1.2-0.9,2v3.5
          c0,0.9,0.5,1.8,1.2,2.2c0.9,3.9,3.2,6.6,3.2,6.6v3.2C20.3,39.9,19.6,41,18.6,41.6z"/>
        <path fill="#C2B9BD" d="M27,0C12.3-0.2,0.3,11.4,0,26c-0.1,8.3,3.6,15.8,9.4,20.7c0.4-0.3,0.8-0.6,1.3-0.9l7.9-4.3
          c1-0.6,1.7-1.7,1.7-2.8v-3.2c0,0-2.3-2.8-3.2-6.6c-0.7-0.5-1.2-1.3-1.2-2.2v-3.5c0-0.8,0.3-1.5,0.9-2V16c0,0-1.1-8,9.8-8
          s9.8,8,9.8,8v5.1c0.5,0.5,0.9,1.2,0.9,2v3.5c0,1.2-0.8,2.2-1.9,2.5c-0.6,1.9-1.5,3.7-2.6,5.3c-0.3,0.4-0.6,0.8-0.8,1v3.3
          c0,1.2,0.7,2.3,1.8,2.9l8.5,4.2c0.5,0.3,1,0.6,1.4,0.9C49.2,42.1,52.9,35,53,27C53.2,12.3,41.6,0.3,27,0z"/>
      </g>
      <rect className="-rectSvg" width="100%" height="100%" onClick={onClickFunc}/>
    </svg>
  )
}
DefaultUserIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  onClickFunc: PropTypes.func,
}

export default DefaultUserIcon