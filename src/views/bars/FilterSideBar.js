import React,{Component} from 'react';
import PropTypes from 'prop-types';
import {ContributionsType} from './filter/ContributionType';
import {CategoryType} from './filter/CategoryType';
import {ExtraParams} from './filter/ExtraParams';
import {SubcategoryType} from './filter/SubcategoryType';


export default class ProductFilterSidebar extends Component {
	static propTypes = {
    getActiveCategory: PropTypes.func.isRequired,
    getActiveSubcategory: PropTypes.func.isRequired,
    getActiveContribution: PropTypes.func.isRequired,
	};

	constructor(props){
		super(props);
		this.state = {
			isLoading : true,
			contribution: {
				ContributionLabels: ["اشتراک زیرساخت", "تاییدیه", "توانمندی", "محصول"],
				ContributionHeader: "نوع آورده",
			},
			groups: {
				activeCategory: null,
				activeSubcategory:null,
				categoryHeader:"دسته",
				CategoryList:[],
				SubcategoryList:[],
				SubcategoryHeader:"زیردسته",
				jsonData:{},
			},
			extra : {
				extraHeader: "پارامترهای تکمیلی",
				extraLabels:["عرضه شده در بورس",'نمایش آورده های دارای قیمت'],
			},
			
		}
	}
	
	
	_setActiveCategory = (id) => {
		const {groups} = this.state;
		this.setState({...this.state,groups: {...groups , activeCategory: id}});
		this.props.getActiveCategory(+id)
	};
	
	_setActiveSubategory = (id) => {
		const {groups} = this.state;
		this.setState({...this.state,groups: {...groups , activeSubcategory: id}});
    this.props.getActiveSubcategory(+id)
	};

	_setActiveContribution = (lab, checked) => {
    this.props.getActiveContribution(lab, checked)
  };

	_makeTree = (array ,  parent) => {
		let result = {};
		array.filter(c => c.category_parent === parent)
				.forEach(c => result[c.id] = this._makeTree(array , c.id));
		return result
	};
	_setList = (list) => {
		const {groups} =  this.state;
		const catList = [{category_parent: null, id : "999999", title:"همه", name:"همه"}];
		const catListIds = [];
		const subcatListIds = [];
		const subcatList = [];
		const jsonData = {};
		// console.log(list);
		// console.log('result is ',JSON.stringify(this._makeTree(list , null) , null , 2));
		list.map(item => {
			if(item.category_parent === null){
				catList.push(item);
				catListIds.push(item.id);
				jsonData[item.id] = [];
			}
		});
		list.map(item => {
			// console.log('this is in Cat',catListIds);
			if(catListIds.includes(item.category_parent)){
				subcatListIds.push(item.id);
				jsonData[item.category_parent].push(item);
			}
		});
		
		this.setState({...this.state ,isLoading: false, groups: {...groups , SubcategoryList:subcatList , CategoryList: catList , jsonData}});
		// console.log(this.state);
	};
	
	render(){
		const {contribution, groups , extra,isLoading} = this.state;
		const {extraHeader , extraLabels} = extra;
		const {SubcategoryHeader ,categoryHeader , CategoryList , activeSubcategory , activeCategory , jsonData} = groups;
		const SubcatList = jsonData[activeCategory];
		const {ContributionLabels , ContributionHeader} = contribution;
		return(
				<div id="accordionFilter" role="tablist" aria-multiselectable="true" >
					<ContributionsType setActiveContribution={this._setActiveContribution} labels={ContributionLabels} header={ContributionHeader}/>
					<CategoryType header={categoryHeader} categoryList={CategoryList} isLoading={isLoading} activeCategory={activeCategory} setList={this._setList} setActiveCategory={this._setActiveCategory}/>
					<SubcategoryType header={SubcategoryHeader} subcategoryList={SubcatList} isLoading={!activeCategory} activeSubcategory={activeSubcategory} setActiveSubcategory={this._setActiveSubategory}/>
					<ExtraParams header={extraHeader} labels={extraLabels} />
				</div>
		)
	}
}