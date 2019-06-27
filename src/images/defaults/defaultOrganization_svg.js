import React from 'react';
import * as PropTypes from 'prop-types';

const DefaultOrganIcon = ({className='', onClickFunc= () => null, ...props}) => (
  <svg viewBox="0 0 128 128" className={className} style={{fill: "gray", padding: "12px", }}>
    <g>
      <path fillRule="evenodd" clipRule="evenodd" d="M28,40h-8v8h8V40z M60,32h-8v8h8V32z M76,32h-8v8h8V32z M92,32h-8v8h8V32z
			 M60,16h-8v8h8V16z M76,16h-8v8h8V16z M92,16h-8v8h8V16z M60,64h-8v8h8V64z M76,64h-8v8h8V64z M92,64h-8v8h8V64z M60,80h-8v8h8V80
			z M92,80h-8v8h8V80z M60,96h-8v8h8V96z M92,96h-8v8h8V96z M60,48h-8v8h8V48z M76,48h-8v8h8V48z M92,48h-8v8h8V48z M28,56h-8v8h8
			V56z M28,72h-8v8h8V72z M28,88h-8v8h8V88z M28,104h-8v8h8V104z M76,80h-8v8h8V80z M116,56h-8V8c0-4.422-3.578-8-8-8H44
			c-4.422,0-8,3.578-8,8v16H12c-4.422,0-8,3.578-8,8v88c0,4.422,3.578,8,8,8h104c4.422,0,8-3.578,8-8V64
			C124,59.578,120.422,56,116,56z M36,120H12V32h24V120z M100,120H76V96h-8v24H44V8h56V120z M116,120h-8v-8h8V120z M116,104h-8v-8h8
			V104z M116,88h-8v-8h8V88z M116,72h-8v-8h8V72z"/>
    </g>
  </svg>
)
DefaultOrganIcon.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
  onClickFunc: PropTypes.func,
}

export default DefaultOrganIcon