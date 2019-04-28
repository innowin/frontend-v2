import React,{Component} from 'react';
import FontAwesome from 'react-fontawesome';
// import {Collapse} from 'reactstrap';
import {BeatLoader} from 'react-spinners';

export class SubcategoryType extends Component {
	constructor (props) {
		super(props);
		this.state = {
			collapse: false,
		}
	}
	
	static defaultProps = {
		subcategoryList : [],
	};
	
	_toggle = () => {
		this.setState({...this.state , collapse: !this.state.collapse});
	};
	
	// _handleClick = (e) => {
	// 	const {setActiveSubcategory , activeSubcategory} = this.props;
	// 	console.log('id ',e.target.id ,'active ', activeSubcategory);
	// 	setActiveSubcategory(e.target.id );
	// };
	
	render() {
		const {collapse} = this.state;
		// const {header , subcategoryList , isLoading, activeSubcategory} = this.props;
		const {header, isLoading} = this.props;
		// console.log('Hi',subcategoryList);
		return (
				<div className="filter-element">
					<div className="accordion-header">
						<div className="collapse-header" onClick={this._toggle}>
							{header}
						</div>
						{(isLoading)? <div className="filter-spinner"><BeatLoader  color="#999" size={8} margin="4px" loading={isLoading}/></div>  : <div className="angle-icon"><FontAwesome name={collapse ? "caret-up" : "caret-down"}/></div>}
					</div>
					<div className="options-wrapper">
						{/*<Collapse isOpen={collapse}>*/}
							{/*{*/}
								{/*subcategoryList.map( (item , i) => (*/}
										{/*<div className={`categoryItems ${(+activeSubcategory === item.id) ? 'active':''}`} key={item.id+i+item.name} id={item.id} onClick={this._handleClick}>*/}
											{/*{item.title}*/}
										{/*</div>*/}
								{/*))*/}
							{/*}*/}
						{/*</Collapse>*/}
					</div>
				</div>
		)
	}
}