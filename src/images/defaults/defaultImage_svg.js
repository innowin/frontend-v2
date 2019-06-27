import React from 'react';
import * as PropTypes from 'prop-types';

const DefaultImageIcon = ({className='', onClickFunc= () => null, ...props}) => (
  <svg viewBox="0 0 32 32" className={className} height={props.height} width={props.width}>
    <g>
      <path d="M28.713,2.422H3.287c-0.57,0-1.037,0.468-1.037,1.038v25.079c0,0.57,0.467,1.038,1.037,1.038h25.426   c0.57,0,1.037-0.468,1.037-1.038V3.46C29.75,2.89,29.283,2.422,28.713,2.422z M26.822,22.971H4.875V5.221h21.947V22.971z" fill="#515151"/>
      <circle cx="9.104" cy="9.75" fill="#515151" r="3.048"/>
      <path d="M20.002,11.301c-0.536-0.96-1.453-0.983-2.037-0.05l-2.871,4.587c-0.584,0.933-1.747,1.229-2.585,0.658   c-0.839-0.571-2.106-0.352-2.818,0.486l-2.86,3.371c-0.712,0.84-0.394,1.525,0.706,1.525h16.378c1.1,0,1.561-0.785,1.024-1.746   L20.002,11.301z" fill="#515151"/>
      <rect className="-rectSvg" width="100%" height="100%" onClick={onClickFunc}/>
    </g>
  </svg>
)
DefaultImageIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  onClickFunc: PropTypes.func,
}

export default DefaultImageIcon