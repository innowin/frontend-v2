import React,{Component} from 'react';
import {Collapse} from 'reactstrap';
import FontAwesome from 'react-fontawesome';

export class ExtraParams extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse: false,
		}
	}
	
	_toggle = () => {
		this.setState({...this.state,collapse: !this.state.collapse})
	};
	
	
	render() {
		const {labels, header} = this.props;
		const {collapse} = this.state;
		return (
				<div className="filter-element">
					<div className="accordion-header">
						<div className="collapse-header" onClick={this._toggle}>
							{header}
						</div>
						<div className="angle-icon"><FontAwesome name={collapse ? "angle-double-up" : "angle-double-down"}/></div>
					</div>
					<div className="options-wrapper">
						<Collapse isOpen={collapse}>
							{labels.map((lab, i) => {
										return (
												<label key={i} className="label-wrapper">
													<input type="checkbox"/>
													<span className="checkmark"></span>
													{lab}
												</label>
										)
									}
							)}
						</Collapse>
					</div>
				</div>
		)
	}
}