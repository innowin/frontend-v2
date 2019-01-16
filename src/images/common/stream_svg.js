import React from "react"

class StreamSvg extends React.Component {
  render() {
    return (
        <div className={this.props.containerClass ? this.props.containerClass : null} onClick={() => {
          if (this.props.changeView) this.props.changeView("Stream")
        }}>
          <svg width={this.props.width} height={this.props.height}
               className={this.props.svgClass ? this.props.svgClass : null}
               viewBox="0 0 136790 136370">
            <g>
              <metadata id="CorelCorpID_0Corel-Layer"/>
              <path
                  d="M5110 0l21660 0c2810,0 5110,2300 5110,5110l0 21660c0,2810 -2300,5110 -5110,5110l-21660 0c-2810,0 -5110,-2300 -5110,-5110l0 -21660c0,-2810 2300,-5110 5110,-5110zm0 104490l21660 0c2810,0 5110,2300 5110,5110l0 21670c0,2800 -2300,5100 -5110,5100l-21660 0c-2810,0 -5110,-2300 -5110,-5100l0 -21670c0,-2810 2300,-5110 5110,-5110zm42290 210l89390 0 0 10630 -89390 0 0 -10630zm0 20940l78550 0 0 10630 -78550 0 0 -10630zm-42290 -73870l21660 0c2810,0 5110,2290 5110,5100l0 21670c0,2810 -2300,5100 -5110,5100l-21660 0c-2810,0 -5110,-2290 -5110,-5100l0 -21670c0,-2810 2300,-5100 5110,-5100zm42290 200l89390 0 0 10630 -89390 0 0 -10630zm0 20940l78550 0 0 10630 -78550 0 0 -10630zm0 -72700l89390 0 0 10620 -89390 0 0 -10620zm0 20940l78550 0 0 10620 -78550 0 0 -10620z"/>
            </g>
          </svg>
        </div>
    )
  }
}

export default StreamSvg