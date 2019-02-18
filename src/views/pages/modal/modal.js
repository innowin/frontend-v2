import * as React from 'react'
import ReactDOM from 'react-dom'
import {CloseIconSvg} from "src/images/icons"

export default ({children,open, closer}) => open ? ReactDOM.createPortal(
		<React.Fragment>
			<div className="modal-wrapper">
				<div className="modal-content-wrapper">
					<CloseIconSvg className='close-button pulse' onClick={closer}/>
					{children}
				</div>
				<div className="closer" onClick={closer}/>
			</div>
		</React.Fragment>
		, document.getElementById("modal_container")) : null