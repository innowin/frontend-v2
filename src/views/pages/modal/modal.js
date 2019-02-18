import * as React from 'react'
import ReactDOM from 'react-dom'

export default ({children,open, closer}) => open ? ReactDOM.createPortal(
		<React.Fragment>
			<div className="modal-wrapper">
				<div className="modal-content-wrapper">{children}</div>
				<div className="closer" onClick={closer}></div>
			</div>
		</React.Fragment>
		, document.getElementById("modal_container")) : null