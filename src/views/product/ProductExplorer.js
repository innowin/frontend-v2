// @flow
import * as React from 'react'
import {Component} from 'react'
import ProductFilterSidebar from "../bars/FilterSideBar"
import ProductExplorerContent from "./ProductExplorerContent"
import type {ContributionType} from "src/consts/flowTypes/product/productTypes"

type ProductExplorerProps = {
}
type ProductExplorerState = {
    activeCategory: ?number,
    activeSubcategory: ?number,
    activeContribution: Array<ContributionType>
}

export default class ProductExplorer extends Component<ProductExplorerProps, ProductExplorerState> {
    static propTypes = {
    }

    constructor() {
        super()
        this.state = {
            activeCategory: null,
            activeSubcategory: null,
            activeContribution: []
        }
    }

    _getActiveCategory = (id: number) => {
        const {activeCategory} = this.state
        if (+id !== activeCategory) {
            this.setState({...this.state, activeCategory: id, activeSubcategory: null})
        }
    }

    _getActiveSubcategory = (id: number) => {
        const {activeSubcategory} = this.state
        if (id !== activeSubcategory) {
            this.setState({...this.state, activeSubcategory: id})
        }
    }

    _getActiveContribution = (lab: ContributionType /* what is the lab guy exactly?*/ , checked: boolean) => {
        let {activeContribution} = this.state
        if (checked) {
            activeContribution = [...activeContribution, lab]
            this.setState({...this.state, activeContribution: activeContribution})
        } else {
            const index = activeContribution.indexOf(lab)
            activeContribution = activeContribution.slice(0, index).concat(activeContribution.slice(index + 1))
            this.setState({...this.state, activeContribution: activeContribution})
        }
    }

    render(){
        const {activeCategory, activeSubcategory, activeContribution} = this.state
        return (
            <div className="product-explorer">
                <div className={`col-md-3 col-sm-2 -right-sidebar-wrapper`}>
                    <ProductFilterSidebar getActiveCategory={this._getActiveCategory}
                                          getActiveSubcategory={this._getActiveSubcategory}
                                          getActiveContribution={this._getActiveContribution}
                    />
                </div>
                <div className="col-md-9 col-sm-10 -content-wrapper pr-14-percent">
                    <ProductExplorerContent
                        activeCategory={activeCategory}
                        activeSubcategory={activeSubcategory}
                        activeContribution={activeContribution}
                    />
                </div>
            </div>
        )
    }
}
