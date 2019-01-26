import React from 'react'

const PhoneSvg = ({className = ''}) => (
    <svg className={className} viewBox="0 0 1920 1080">
      <style type="text/css" dangerouslySetInnerHTML={{__html: `
        .st0{display:none;}
        .st1{fill:#D4EDFE;}
        .st2{fill:#30A1ED;}
        .st3{fill:#84C7F4;}
        .st4{fill:#2487CE;}
        .st5{fill:none;stroke:#84CEFF;stroke-miterlimit:10;}
        .st6{fill:#84CEFF;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;}
        .st7{fill:none;stroke:#FFFFFF;stroke-width:2;stroke-miterlimit:10;}
        .st8{fill:#5DBDFD;}
        .st9{fill:#84CEFF;}
        .st10{fill:none;stroke:#FFFFFF;stroke-width:4;stroke-miterlimit:10;}
        .st11{fill:#F7A024;}
        .st12{fill:#87C8F4;}
        .st13{fill:none;stroke:#D4EDFE;stroke-width:5;stroke-miterlimit:10;}
        .st14{fill:none;stroke:#FFFFFF;stroke-width:5;stroke-miterlimit:10;}
        .st15{fill:#FFFFFF;}
        .st16{fill:none;stroke:#D4EDFE;stroke-width:3;stroke-miterlimit:10;}
        .st17{fill:#3BA6EE;stroke:#3BA6EE;stroke-miterlimit:10;}
        .st18{fill:none;stroke:#D4EDFE;stroke-width:2;stroke-miterlimit:10;}
      `}}></style>
      <g id="Layer_1" className="st0">

        <image style={{display:'inline', overflow:'visible'}} width="179" height="170" xlinkHref="data:image/png;base64,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" transform="matrix(4.3059 0 0 4.3059 576 167)">
        </image>
      </g>
      <g id="Layer_1_copy">
      </g>
      <g id="Layer_6">
        <circle className="st1" cx="1205" cy="357" r="143"/>
        <ellipse className="st1" cx="988.5" cy="878.5" rx="240.5" ry="13.5"/>
        <circle className="st1" cx="1061" cy="565" r="243"/>
        <circle className="st1" cx="728.5" cy="514.5" r="152.5"/>
        <polygon className="st1" points="692.25,662.65 871.09,716.61 845,597 	"/>
        <polygon className="st1" points="699.77,364.48 867,325.01 865.11,443.24 	"/>
      </g>
      <g id="Layer_3">
        <path className="st2" d="M1066.66,714H886.34c-16.76,0-30.34-13.58-30.34-30.34V246.34c0-16.76,13.58-30.34,30.34-30.34h180.32
		c16.76,0,30.34,13.58,30.34,30.34v437.32C1097,700.42,1083.42,714,1066.66,714z"/>
        <path className="st3" d="M1062.67,710H890.33c-16.2,0-29.33-13.13-29.33-29.33V247.33c0-16.2,13.13-29.33,29.33-29.33h172.34
		c16.2,0,29.33,13.13,29.33,29.33v433.34C1092,696.87,1078.87,710,1062.67,710z"/>
        <path className="st2"
              d="M1091,263H863v-14.67c0-16.2,13.13-29.33,29.33-29.33h169.34c16.2,0,29.33,13.13,29.33,29.33V263z"/>
        <path className="st2"
              d="M863,650h228v28.67c0,16.2-13.13,29.33-29.33,29.33H892.33c-16.2,0-29.33-13.13-29.33-29.33V650z"/>
        <rect x="934" y="231" className="st4" width="84" height="7"/>
        <circle className="st4" cx="902.5" cy="235.5" r="4.5"/>
        <circle className="st4" cx="974" cy="679" r="21"/>
        <rect x="863" y="263" className="st4" width="228" height="387"/>
        <path className="st5" d="M1059.04,407H889.96c-4.95,0-8.96-4.01-8.96-8.96v-57.08c0-4.95,4.01-8.96,8.96-8.96h169.08
		c4.95,0,8.96,4.01,8.96,8.96v57.08C1068,402.99,1063.99,407,1059.04,407z"/>
        <path className="st5" d="M1059.04,615H889.96c-4.95,0-8.96-4.01-8.96-8.96V453.96c0-4.95,4.01-8.96,8.96-8.96h169.08
		c4.95,0,8.96,4.01,8.96,8.96v152.08C1068,610.99,1063.99,615,1059.04,615z"/>
      </g>
      <g id="Layer_2">
        <path className="st6" d="M1090.5,747.5c0,0,123,16,140-153c0-6,0.5-32.5-3-65s-106-197-123-209s-21,13-20,31s49,121,51,139
		c-16,24-57,49-58,119c-4,48,22,61,22,61s5,30,1,38s-57,32-57,32s0.5,6.5,26,7S1090.5,747.5,1090.5,747.5z"/>
        <path className="st7"
              d="M1109,360l24-2.53c0,0-28-37.47-29-37.47s-3.96-1-7.48,0s-5.52,2-5.52,8S1109,360,1109,360z"/>
        <polygon className="st8" points="1097,444 1132,491.01 1097,534.1 	"/>
        <path className="st9" d="M856,370c0,0-56.28-3.5-73.31,0s-22.2,9.5-21.68,15s0.52,8.5,14.46,15s50.6,14,62.47,14.5S856,417,856,417V370
		z"/>
        <path className="st9"
              d="M853,438c0,0-59.5-2.5-71,0s-9.5,2.5-12,11s8.5,15.5,22,20s33.5,9.5,48,10s16,0,16,0v-41H853z"/>
        <path className="st9" d="M856,491c0,0-33.5-2.5-54,0s-21.5,7.5-25,16s32,19,32,19s17.5,4.5,29,5s18,0,18,0V491z"/>
        <path className="st9" d="M856,537c0,0-51.5-3.5-63,0s-12.5,2.5-12,12s32,21,32,21s7.5,0.5,24,3s19,1,19,1V537z"/>
        <path className="st8" d="M988.04,714c0,0,45.96,31,61.96,30c14-7,48-30,51-32s2.55-17.02,2-22.5c0.41-5.31-0.36-13.78-2.29-17.79
		c-0.43-0.9-2.34-0.16-2.71-0.71c-2-3-1,16.08-1,16.08s-1,7.92-7.5,16.42s-20.1,10.5-20.1,10.5H988.04z"/>
      </g>
      <g id="Layer_5">
        <circle className="st10" cx="970.5" cy="534.5" r="38.5"/>
        <path className="st11" d="M970,487c0,0,35-42,54-61s47-38,57-38s-48,55-56,68s-54,84-54,84s-46-62-51-69s4.5-9.5,4.5-9.5l7.5,2.5
		L970,487z"/>
        <path className="st12" d="M1065.5,221h-182c-1.38,0-2.5-1.12-2.5-2.5l0,0c0-1.38,1.12-2.5,2.5-2.5h182c1.38,0,2.5,1.12,2.5,2.5l0,0
		C1068,219.88,1066.88,221,1065.5,221z"/>
      </g>
      <g id="Layer_7">
        <circle className="st13" cx="1066.5" cy="809.5" r="25.5"/>
        <circle className="st14" cx="652.75" cy="451.25" r="21.75"/>
        <circle className="st15" cx="692.25" cy="596.75" r="13.25"/>
        <circle className="st14" cx="1279.75" cy="395.25" r="18.75"/>
        <circle className="st16" cx="775.75" cy="795.25" r="12.75"/>
        <g>
          <path className="st15"
                d="M898.35,423h-0.06c0.02,0.41,0.03,0.83,0.03,1.24C898.32,423.83,898.33,423.41,898.35,423z"/>
          <path className="st15" d="M924.82,450.74c-14.64,0-26.5-11.86-26.5-26.5c0,14.58-11.77,26.4-26.32,26.5v0.01
			c14.14,0.09,25.64,11.25,26.29,25.25h0.06C899,461.94,910.6,450.74,924.82,450.74z"/>
          <path className="st15"
                d="M924.82,450.74c0.06,0,0.12,0,0.18,0v-0.01C924.94,450.74,924.88,450.74,924.82,450.74z"/>
        </g>
        <g>
          <path className="st17"
                d="M798.24,294h-0.11c0.03,0.72,0.06,1.45,0.06,2.18C798.19,295.45,798.21,294.72,798.24,294z"/>
          <path className="st17" d="M798.19,296.18c0,25.58-20.65,46.32-46.19,46.49v0.02c24.81,0.16,45,19.74,46.13,44.31h0.11
			c1.14-24.67,21.5-44.32,46.44-44.32C819.01,342.68,798.19,321.87,798.19,296.18z M797.34,312c-0.02,0.44-0.03,0.89-0.03,1.34
			c0-0.45-0.01-0.89-0.03-1.34H797.34z M826,341.83L826,341.83c-0.06,0.01-0.13,0-0.19,0C825.87,341.84,825.94,341.83,826,341.83z
			 M797.34,369h-0.07c-0.7-15.05-13.07-27.06-28.27-27.16v-0.01c15.65-0.1,28.31-12.82,28.31-28.5c0,15.74,12.76,28.5,28.5,28.5
			C810.52,341.84,798.04,353.88,797.34,369z"/>
          <path className="st17"
                d="M844.69,342.68c0.1,0,0.21,0.01,0.31,0.01v-0.02C844.9,342.68,844.79,342.68,844.69,342.68z"/>
        </g>
        <g>
          <path className="st15"
                d="M941.38,378h-0.05c0.02,0.35,0.03,0.7,0.03,1.06C941.35,378.7,941.36,378.35,941.38,378z"/>
          <path className="st15" d="M963.85,401.56c-12.43,0-22.5-10.07-22.5-22.5c0,12.38-9.99,22.41-22.35,22.5v0.01
			c12,0.08,21.77,9.55,22.32,21.44h0.05C941.93,411.06,951.78,401.56,963.85,401.56z"/>
          <path className="st15"
                d="M963.85,401.56c0.05,0,0.1,0,0.15,0v-0.01C963.95,401.55,963.9,401.56,963.85,401.56z"/>
        </g>
        <path className="st18" d="M836.17,178.67h-4.94v-5.83c0-3.22-2.61-5.83-5.83-5.83h0c-3.22,0-5.83,2.61-5.83,5.83v5.83h-6.73
		c-3.22,0-5.83,2.61-5.83,5.83c0,3.22,2.61,5.83,5.83,5.83h6.73v5.83c0,3.22,2.61,5.83,5.83,5.83h0c3.22,0,5.83-2.61,5.83-5.83
		v-5.83h4.94c3.22,0,5.83-2.61,5.83-5.83C842,181.28,839.39,178.67,836.17,178.67z"/>
        <path className="st15" d="M1191,330.5L1191,330.5c-3.59,0-6.5-2.91-6.5-6.5v-26c0-3.59,2.91-6.5,6.5-6.5l0,0c3.59,0,6.5,2.91,6.5,6.5
		v26C1197.5,327.59,1194.59,330.5,1191,330.5z"/>
        <path className="st15" d="M1170.5,311L1170.5,311c0-3.59,2.91-6.5,6.5-6.5h26c3.59,0,6.5,2.91,6.5,6.5l0,0c0,3.59-2.91,6.5-6.5,6.5h-26
		C1173.41,317.5,1170.5,314.59,1170.5,311z"/>
      </g>
    </svg>
)

export default PhoneSvg