import React,{Component} from 'react';
import {ContributionsType} from './filter/ContributionType';


export default class ProductFilterSidebar extends Component {
	constructor(props){
		super(props);
		this.state = {
			ContributionLabels:["اشتراک زیرساخت","تاییدیه","توانمندی","محصول"]
		}
	}
	
	render(){
		const {ContributionLabels} = this.state;
		return(
				<div>
					<ContributionsType labels={ContributionLabels}/>
				</div>
		)
	}
}