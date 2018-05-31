import React, {Component} from 'react';
import PropTypes from "prop-types";

class RefreshIcon extends Component {

  static propTypes = {
    height: PropTypes.string.isRequired,
    width: PropTypes.string,
    className: PropTypes.string,
    onClickFunc: PropTypes.func,
  };

  render() {
    const {className, onClickFunc, height, width} = this.props;
    return (
      <svg className={className} height={height} width={width} viewBox="0 0 46760 50440" onClick={onClickFunc}>
        <path
          d="M19420 13930c-480,-1770 -4920,-4160 -5070,-5910 1590,-370 3670,-2320 9290,-2320 2520,0 5780,880 7530,1750 8210,4120 12270,12150 10590,21860 -190,1130 -730,2190 -820,3190 920,490 3010,2030 4010,2110 220,-950 580,-1780 870,-2710 870,-2780 1130,-6620 790,-9710 -390,-3600 -2110,-7780 -4060,-10710 -5560,-8350 -16850,-12820 -26390,-9250 -2400,890 -3420,1580 -5400,2620 -130,-200 -4030,-4630 -4850,-4850 0,1550 -170,13180 100,13610 550,880 5200,320 6440,320 2320,0 4640,0 6970,0zm-19420 10970c0,19510 20560,30940 35880,20680 320,490 4320,4670 4850,4860l0 -13930 -13290 0c340,1280 4760,4780 5060,5910 -2220,520 -3690,2320 -9500,2320 -5380,0 -9890,-2760 -12720,-5430 -2470,-2330 -5640,-7830 -5640,-12510 0,-6740 830,-5640 1060,-8440l-3940 -2430c-140,990 -950,2900 -1220,4240 -310,1560 -540,2960 -540,4730z"/>
      </svg>
    )
  }
}

export default RefreshIcon;