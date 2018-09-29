import React from "react"

const InfoSvg = (props) => {
  return (
      <div className={props.containerClass} onClick={() => props.changeView("Info")}>
        <svg width={props.width} height={props.height} className={props.svgClass}
             viewBox="0 0 10040 19230">
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"/>
            <path className="fil0"
                  d="M360 9900c840,0 1980,-2800 3440,-2450 50,210 80,150 80,320 0,990 -3430,7260 -3430,9980 0,1360 1230,1480 2120,1480 1530,0 3120,-1100 4040,-1780l810 -660c350,-310 1600,-1620 1510,-2120 -300,-1480 -2260,2100 -3410,2100 -760,0 170,-1930 290,-2240 330,-820 570,-1560 900,-2370 540,-1350 1590,-3740 1590,-5040 0,-2590 -4140,-1930 -6110,-150 -860,780 -960,800 -1730,1720 -150,190 -490,600 -460,870 20,170 170,340 360,340zm5080 -7530c0,2100 2440,2550 3740,1450 1490,-1260 1040,-3820 -1290,-3820 -1290,0 -2450,1080 -2450,2370z"/>
          </g>
        </svg>
      </div>
  )
}
export default InfoSvg