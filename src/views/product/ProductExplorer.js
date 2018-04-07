import React, {Component} from 'react';
import ProductFilterSidebar from "../bars/FilterSideBar";
import ProductExplorerContent from "./ProductExplorerContent";

export default class ProductExplorer extends Component {

  constructor(props) {
    super(props);
    this.state = {activeCategory: null, activeSubcategory: null, activeContribution: []}
  }

  _getActiveCategory = (id) => {
    const {activeCategory} = this.state;
    if (+id !== activeCategory) {
      this.setState({...this.state, activeCategory: id, activeSubcategory:null})
    }
  };

  _getActiveSubcategory = (id) => {
    const {activeSubcategory} = this.state;
    if (id !== activeSubcategory) {
      this.setState({...this.state, activeSubcategory: id})
    }
  };

  _getActiveContribution = (lab, checked) => {
    let {activeContribution} = this.state;
    if(checked){
      activeContribution = [...activeContribution, lab];
      this.setState({...this.state, activeContribution: activeContribution})
    }else {
      const index = activeContribution.indexOf(lab);
      activeContribution = activeContribution.slice(0, index).concat(activeContribution.slice(index+1));
      this.setState({...this.state, activeContribution:activeContribution})
    }
  };

  render() {
    const {activeCategory, activeSubcategory, activeContribution} = this.state;
    return (
      <div className="product-explorer">
        <div className="col-md-2 col-sm-1 -right-sidebar-wrapper">
          <ProductFilterSidebar getActiveCategory={this._getActiveCategory}
                                getActiveSubcategory={this._getActiveSubcategory}
                                getActiveContribution={this._getActiveContribution}/>
        </div>
        <div className="col-md-8 col-sm-10 -content-wrapper">
          <ProductExplorerContent activeCategory={activeCategory} activeSubcategory={activeSubcategory}
                                  activeContribution={activeContribution}/>
        </div>
      </div>
    )
  }
}