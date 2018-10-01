import React from "react"

const TicketSvg = (props) => {
  return (
      <div className={props.containerClass ? props.containerClass : null}
           onClick={() => props.changeView ? props.changeView("Exchange Manager") : null}>
        <svg width={props.width} height={props.height}
             className={props.svgClass ? props.svgClass + " svg-rotate" : null}
             viewBox="0 0 159740 100890">
          <g id="Layer_x0020_1">
            <metadata id="CorelCorpID_0Corel-Layer"/>
            <path className="fil0"
                  d="M6610 0l42410 0 0 100890 -42410 0c-3640,0 -6610,-2980 -6610,-6610l0 -26980c550,50 1100,80 1670,80 9270,0 16800,-7520 16800,-16800 0,-9280 -7530,-16800 -16800,-16800 -570,0 -1120,30 -1670,90l0 -27260c0,-3640 2970,-6610 6610,-6610zm74730 31950l40020 0c3640,0 6610,2970 6610,6610l0 0c0,3630 -2970,6610 -6610,6610l-40020 0c-3640,0 -6610,-2980 -6610,-6610l0 0c0,-3640 2970,-6610 6610,-6610zm0 23500l40020 0c3640,0 6610,2970 6610,6610l0 0c0,3630 -2970,6610 -6610,6610l-40020 0c-3640,0 -6610,-2980 -6610,-6610l0 0c0,-3640 2970,-6610 6610,-6610zm-19100 -55450l90890 0c3630,0 6610,2970 6610,6610l0 27600c-1210,-280 -2470,-430 -3770,-430 -9280,0 -16800,7520 -16800,16800 0,9280 7520,16800 16800,16800 1300,0 2560,-140 3770,-420l0 27320c0,3630 -2980,6610 -6610,6610l-90890 0 0 -100890z"/>
          </g>
        </svg>
      </div>
  )
}
export default TicketSvg