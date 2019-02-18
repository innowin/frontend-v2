import React from 'react';

// user stroke: color for make it color
const CloseIcon = ({className = '',onClick}) => (
    <svg className={className} viewBox="0 0 14.828 14.828">
      <g transform="translate(-1009.086 -413.086)">
        <line fill='none' strokeLinecap='round' strokeWidth='2px' x2="12" y2="12" transform="translate(1010.5 414.5)"/>
        <line fill='none' strokeLinecap='round' strokeWidth='2px' x1="12" y2="12" transform="translate(1010.5 414.5)"/>
      </g>
      <rect x={0} y={0} width={15} height={15} fillOpacity={0} strokeOpacity={0} onClick={onClick}/>
    </svg>
);

export default CloseIcon