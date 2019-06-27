import React, {Component} from 'react';
// import {Collapse} from 'reactstrap';
import * as PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

export class ContributionsType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapse : true,
		}
	}
	
	static propTypes = {
		isOpen: PropTypes.bool,
		labels: PropTypes.array,
		header: PropTypes.string,
    setActiveContribution: PropTypes.func.isRequired,
	};
	
	static defaultProps = {
		labels: [],
		header: '',
	};
	
	_toggle = ()=> {
		const newState = {...this.state,collapse: !this.state.collapse};
		this.setState(newState);
	};

  _handleChange = (e) => {
    const lab = e.target.id;
    const checked = e.target.checked;
    this.props.setActiveContribution(lab, checked)
  };
	
	render(){
	// const {labels, header} = this.props;
		const {header} = this.props;
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
						{/*<Collapse isOpen={collapse}>*/}
							{/*{labels.map((lab, i) => {*/}
										{/*return (*/}
												{/*<label key={i} className="label-wrapper">*/}
													{/*<input type="checkbox" id={lab} onChange={this._handleChange}/>*/}
													{/*<span className="checkmark"></span>*/}
													{/*{lab}*/}
												{/*</label>*/}
										{/*)*/}
									{/*}*/}
							{/*)}*/}
						{/*</Collapse>*/}
					</div>
				</div>
		)
	}
}