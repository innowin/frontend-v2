const detectUserAgent = () => {
  let html = document.documentElement
  html.setAttribute('data-useragent',  navigator.userAgent)
  html.setAttribute('data-platform', navigator.platform )
  html.className += ((!!('ontouchstart' in window) || !!('onmsgesturechange' in window))?' touch':'')
}

// example

// html[data-useragent*='Chrome/40.0'] body {
//   background-color: tan;
// }
// html[data-useragent*='Firefox/35.0'] body {
//   background-color: salmon;
// }
// html[data-useragent*='Safari/600.3'] body {
//   background-color: deepskyblue;
// }
// html[data-useragent*='Android'] body {
//   background-color: silver;
// }
// html[data-useragent*='Android/2.1'] body {
//   background-color: peachpuff;
// }
// html[data-platform*='MacIntel']  {
//   border-top: 1em solid khaki;
// }
// html[data-platform*='Win32']  {
//   border-top: 1em solid blue;
// }
// html[data-platform*='Win16']  {
//   border-top: 1em solid green;
// }
// html[data-platform*='WinCE']  {
//   border-top: 1em solid black;
// }
// html[data-platform*='Linux i686']  {
//   border-top: 1em solid teal;
// }
// html[data-platform*='Linux armv7l']  {
//   border-top: 1em solid darkturquoise;
// }
// html[data-platform*='Mac68K']  {
//   border-top: 1em solid lime;
// }
// html[data-platform*='MacPPC']  {
//   border-top: 1em solid cyan;
// }
// html[data-platform='iPad'] body {
//   background-color: limegreen;
// }
// html[data-platform='iPhone'] body {
//   background-color: #a0b99d;
// }
// /* combine useragent and platform selector */
// html[data-useragent*='Chrome/40.0'][data-platform='MacIntel'] h1 {
//   font-size: 5em;
// }
// html[data-useragent*='Firefox'][data-platform='MacIntel'] h1 {
//   background-color: limegreen;
// }
//
// html[data-useragent*='NT 6.0']  {
//   border-top: 1em solid seagreen;
// }/* Windows Vista? */
// .touch h1::after {
//   content: "toch device detected" ;
//   position: absolute;
//   top: 100%;
//   left: 0;right:0;
//   font-size: 2em;
// }

export default detectUserAgent