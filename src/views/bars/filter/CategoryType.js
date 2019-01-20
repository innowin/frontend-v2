import React,{Component} from 'react';
import FontAwesome from 'react-fontawesome';
import {SOCKET as socket , REST_URL as url} from "src/consts/URLS";
import {REST_REQUEST} from 'src/consts/Events';
// import {Collapse} from 'reactstrap';
import {BeatLoader} from 'react-spinners';

export class CategoryType extends Component {
	constructor (props) {
		super(props);
		this.state = {
			collapse : false,
		}
	}
	componentDidMount(){
		const {setList} = this.props;
		socket.emit(REST_REQUEST,{
			method: 'get',
			url: url+'/products/category/',
			result : 'CATEGORY_TYPE_LIST',
		});
		
		socket.on('CATEGORY_TYPE_LIST', (res) => {
			setList([]);
		})
	}
	
	componentWillUnmount(){
		const {setList} = this.props;
		socket.off('CATEGORY_TYPE_LIST',(res) => {
			setList([]);
		})
	}
	
	_toggle = () => {
		this.setState({...this.state,collapse: !this.state.collapse})
	};
	
	_handleClick = (e) => {
		// alert();
		const {setActiveCategory} = this.props;
		setActiveCategory(e.target.id)
	};
	
	render() {
		const {collapse} = this.state;
		// const {header , categoryList , isLoading , activeCategory} = this.props;
		const {header, isLoading} = this.props;
		return (
				<div className="filter-element">
					<div className="accordion-header">
						<div className="collapse-header" onClick={this._toggle}>
							{header}
							
						</div>
						{(isLoading)? <div className="filter-spinner"><BeatLoader  color="#999" size={8} margin="4px" loading={isLoading}/></div> : <div onClick={this._toggle} className="angle-icon"><FontAwesome name={collapse ? "caret-up" : "caret-down"}/></div>}
					</div>
					<div className="options-wrapper">
						{/*<Collapse isOpen={collapse}>*/}
						{/*{*/}
							{/*categoryList.map( (item , i) => (*/}
									{/*<div className={`categoryItems ${(+activeCategory === item.id) ? 'active':''}`} key={item.id+i+item.name} id={item.id} onClick={this._handleClick}>*/}
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