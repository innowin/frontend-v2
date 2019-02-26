import React from "react"

const st0 = {
  fill: "#F9F9F9",
}
const st1 = {
  fill: "#EAEAE9",
}
const st2 = {
  fill: "#E8E8E8",
}
const st3 = {
  fill: "#E1E1E1",
}
const st4 = {
  fill: "#E1E1E1",
}
const st5 = {
  fill: "#D5D5D5",
}
const st6 = {
  fill: "#BBBBBB",
}

const desertSvg = (props) => {
  return (
      <div style={{position: "relative", width: "120%", textAlign: "center", zIndex: "0", transform: "scale(1.1)"}}>
        {/*<div style={{position: 'relative', width: '100%', textAlign: 'center', zIndex: '0'}}>*/}
        {
          props.text ?
              <div style={{
                fontSize: "12px",
                margin: "auto",
                position: "absolute",
                top: "30%",
                right: "50%",
                transform: "translateX(45%)",
                color: "#a1a1a1",
              }}>
                {props.text}
              </div>
              : null
        }
        <svg width={props.width} height={props.width} className={props.className}
             viewBox="0 0 1920 1080" style={{enableBackground: "new 0 0 1920 1080"}} x="0px" y="0px">
          <g id="Layer_6">
            <circle style={st0} cx="934.5" cy="543.5" r="286"/>
          </g>
          <g id="Layer_6_copy_2">
            <path style={st1} d="M672.36,658c44.16,100.95,144.9,171.5,262.14,171.5s217.98-70.55,262.14-171.5H672.36z"/>
          </g>
          <g id="Layer_5">
            <path style={st2} d="M899.5,610.5l1-16l5-11h7l1,17l2-17l12,2l-1,14l17,29l9-17c0,0,6-23,7-30s1-18,1-18h11l-2,31l3,28l3-22l3-3v11
		l3-11h4l2,13v-40h9l1,11l2-17l8-2v27l2-23l4-1l2,47c0,0-61,35-62,35s-56-11-56-12S899.5,610.5,899.5,610.5z"/>
          </g>
          <g id="Layer_4">
            <circle style={st3} cx="777" cy="510" r="63.5"/>
            <path style={st4} d="M705.5,613.5c-20.01,0-41.66,9.09-45.42,10.74c0.64,2.18,1.3,4.35,1.99,6.5l11.43,27.76h51l26-28
		C750.5,630.5,727.5,613.5,705.5,613.5z"/>
            <path style={st4} d="M835.5,600.5c0,0,14-14,25-13s48,32,54,32c13.12,0,16.23-16.75,27-16c10.93,0.76,18.98,17.26,24.5,33.5
		c-32.52-2.64-46.79-2.91-53.5-2.5c-1.74,0.1-7.36,0.45-14.6-0.89c-3.13-0.58-6.45-1.53-10.4-3.11
		C867.98,622.69,835.54,600.53,835.5,600.5L835.5,600.5z"/>
          </g>
          <g id="Layer_2">
            <path style={st5} d="M1196.42,658.5c7.03-15.98,12.65-32.71,16.67-50.06c-5.33-1.77-17.85-5.21-36.37-5.94
		c-25.18-1-76.54,23-91.65,25c-32.6,4.32-38.05-30.11-68.48-31c-26.17-0.77-52.87,30.5-62.95,34s-12.89,2.9-23.16,3.5
		c-12.71,0.74-24.44,0.22-32.23-1.5c-51.36-16.5-53.88-40-90.14-40s-86.61,66-86.61,66H1196.42z"/>
          </g>
          <g id="Layer_3">
            <path style={st6} d="M1105.5,705.5h-14c0,0-16-9-21-100S1110,515,1112,515s15.5,2.5,15.5,16.5s-25,58.5-31,86.5
		S1105.5,705.5,1105.5,705.5z"/>
            <path style={st6} d="M1126.5,604.5c5-2,20,7,1,31s-32.71,11.61-32.71,11.61v-6.23c0,0,5.71,1.62,11.71-1.38s4-2,8-7
		S1121.5,606.5,1126.5,604.5z"/>
            <path style={st6} d="M1127.5,567.5c5-2,13-12,13-12s3-3,7,0s1,8,1,8s-5,7-13,10s-21.94-4.09-21.94-4.09l1.37-3.11
		C1114.93,566.3,1122.5,569.5,1127.5,567.5z"/>
            <path style={st6} d="M1054.5,535.5c1,0,6,1,7,5s-5,24-2,33s11,9,11,9l-0.37,7.62c0,0-10.63-2.62-11.63-3.62s-10-5-12-14s-2-7-1-23
		C1048.5,535.5,1053.5,535.5,1054.5,535.5z"/>
          </g>
        </svg>
      </div>
  )
}
export default desertSvg