import React, {Component} from "react";
import PropTypes from "prop-types";

class NoFilterIcon extends Component {
  static propTypes = {
    height: PropTypes.string.isRequired,
    width: PropTypes.string,
    className: PropTypes.string,
    onClickFunc: PropTypes.func,
    dataValue: PropTypes.string
  };

  render() {
    const {className, onClickFunc, dataValue, height, width} = this.props;
    return (
      <svg height={height} width={width} className={className} viewBox="0 0 1280 800">
        <g>
          <path d="M693.3,733.4c0,1.3-0.4,2.3-1.2,3c-0.9,0.8-2.1,1.3-3.3,1.3c-0.8,0-1.6-0.3-2.4-0.8l-97.8-68.5c-1.2-0.8-1.9-2.1-1.9-3.6
            V475.8l-50,50v139.1c0,17.7,8.7,34.4,23.2,44.5l97.8,68.5c9.2,6.4,19.9,9.8,31,9.8c0,0,0,0,0,0c14,0,27.4-5.3,37.6-15
            c10.9-10.3,16.9-24.3,16.9-39.4V525.8l-50-50V733.4z"/>
          <path d="M973.9,145.1c-5.5-13.2-15.7-23.4-28.2-28.9c-1,1.4-2,2.7-3.2,3.9l-41.5,41.5h22.8c0.8,0,2.9,0,4,2.7
            c1.1,2.7-0.4,4.2-0.9,4.7L731,364.8l-45.2-45.2L937,68.4c11-11,11-28.8,0-39.8l-5.7-5.7c-11-11-28.8-11-39.8,0l-88.6,88.6H478
            l-91.8-91.8c-11-11-30.3-9.7-42.9,3l-0.2,0.2c-12.7,12.7-14,31.9-3,43l254.2,254.4l-44.9,44.9L353.2,169c-0.6-0.6-2-2-0.9-4.7
            c1.1-2.7,3.3-2.7,4-2.7h22.8l-41.5-41.5c-1.2-1.2-2.3-2.5-3.2-3.9c-12.5,5.5-22.7,15.7-28.2,29c-8.4,20.4-3.8,43.6,11.8,59.2
            L514,400.5L353.5,561c-11,11-11,28.8,0,39.8l5.7,5.7c11,11,28.8,11,39.8,0l240.8-240.8l243.7,243.9c11,11,30.3,9.7,42.9-3l0.2-0.2
            c12.7-12.7,14-31.9,3-43L766.4,400.1l195.8-195.8C977.7,188.8,982.3,165.5,973.9,145.1z M527.9,161.6h225L640.4,274.1L527.9,161.6z
		        "/>
          <rect className="-rectSvg" data-value={dataValue} width="100%" height="100%" onClick={onClickFunc}/>
        </g>
      </svg>
    )
  }
}

export default NoFilterIcon;