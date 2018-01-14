import React,{Component} from 'react';
import PropTypes from 'prop-types';

export default class Sidebar extends Component {

	static propTypes = {
		organization: PropTypes.object.isRequired
	}
	render() {

			const {children} = this.props;
			// TODO keep ltr and uncomment components
			return(
				<div className="right-sidebar-wrapper">
					<div className="row align-items-center">
						<div className="col text-center">
								<div className="mt-4 mb-4">
									<div style={{padding:10}}>
										{children}
									</div>
								</div>
						</div>
					</div>
				</div>

			)
	}
}

