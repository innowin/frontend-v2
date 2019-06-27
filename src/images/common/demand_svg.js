import React, {Component} from 'react';
import * as PropTypes from 'prop-types';

class DemandIcon extends Component {

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
      <svg height={height} width={width} className={className}  viewBox="-15000 -7000 52710 43950">
        <g>
          <path
            d="M0 2150c0,730 430,1290 910,1640 1370,1000 3630,-750 4350,2920 530,2700 1050,5520 1590,8230 1040,5230 1120,10880 8750,10880l9410 0c1730,0 2540,-1050 3310,-2080 420,-550 700,-1010 1070,-1610 960,-1550 4500,-7880 4500,-9360 0,-1460 -2000,-2680 -3400,-1240 -330,330 -600,1020 -790,1500 -400,990 -1000,2040 -1510,3060 -510,1020 -970,1950 -1540,2900 -270,440 -1440,2660 -1910,2660l-10220 0c-2890,0 -2950,-3130 -3350,-5120 -480,-2420 -890,-4760 -1390,-7220 -810,-4030 -1090,-9310 -7760,-9310 -1090,0 -2020,1010 -2020,2150z"/>
          <path
            d="M16940 8200c-3830,0 -5380,-610 -770,4680 310,360 380,520 740,870 390,390 480,510 820,930 1940,2420 2080,1710 3750,-190 320,-360 630,-580 940,-950l2510 -3130c190,-270 670,-930 760,-1140 680,-1470 -1890,-1070 -3500,-1070 0,-590 -250,-5790 -650,-6210 -670,-690 -3270,-670 -3960,-10 -390,380 -510,3530 -500,4070 0,910 -140,1450 -140,2150z"/>
          <path
            d="M13450 33890c4110,0 4560,-5210 1520,-6500 -670,-290 -1190,-370 -1890,-200 -2150,510 -3120,2610 -2440,4530 330,950 1510,2170 2810,2170z"/>
          <path
            d="M22190 30390c0,2070 1360,3500 3360,3500 2730,0 4130,-3670 2230,-5730 -1920,-2060 -5590,-810 -5590,2230z"/>
          <rect className="-rectSvg" data-value={dataValue} width="100%" height="100%"  onClick={onClickFunc}/>
        </g>
      </svg>
    )
  }
}

export default DemandIcon;