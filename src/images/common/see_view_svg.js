import React, {Component} from 'react';
import * as PropTypes from 'prop-types';

class SeeViewIcon extends Component {

  static propTypes = {
    height: PropTypes.string.isRequired,
    width: PropTypes.string,
    className: PropTypes.string,
    onClickFunc: PropTypes.func,
  };

  render() {
    const {className, onClickFunc, height, width} = this.props;
    return (
      <svg className={className} height={height} width={width} viewBox="0 0 42190 42270" onClick={onClickFunc}>
        <path
          d="M0 2690l0 36970c0,1210 1400,2610 2610,2610l36970 0c1200,0 2610,-1400 2610,-2610l0 -7110c0,-3020 -4480,-3410 -5840,-1570 -490,650 -500,1040 -560,2050 -100,1460 -1020,2840 -2610,2840l-24170 0c-1510,0 -2610,-1510 -2610,-3080l0 -23700c0,-3960 5920,-1250 5920,-5210 0,-4790 -2310,-3790 -9710,-3790 -1390,0 -2610,1220 -2610,2600zm15880 480c0,3980 3530,3310 6160,3310 3000,0 6000,0 9010,0 -650,970 -9930,10050 -11560,11680 -1600,1600 -3370,2640 -3370,4910 0,1650 1570,3090 4020,3090 1630,0 13060,-13200 15650,-14940 0,1590 -180,12330 180,13330 1060,2840 6220,2140 6220,-760l0 -20860c0,-1220 -1630,-2840 -2850,-2840l-20850 0c-1510,0 -2610,1510 -2610,3080z"/>
      </svg>
    )
  }
}

export default SeeViewIcon;