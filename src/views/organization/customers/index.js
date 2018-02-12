/*global __*/
import React, {Component} from "react";
import {createCustomer, deleteCustomer, updateCustomer} from '../../../crud/user/customers.js';
import {OrganizationCustomers} from "./view";
import {FrameCard, CategoryTitle} from "../../common/cards/Frames";

export class CustomerContainer extends Component {

	constructor(props){
		super(props);
	}
	componentWillReceiveProps(props){
			const {certificate} = props;
			this.setState ({...this.state ,certificate:certificate || {}});
	}
	delete_ = (certificateId) => {
		const {organizationId} = this.props;
		return deleteCustomer({certificateId, organizationId});
	};
	update_ = (formValues, certificateId, updateStateForView, hideEdit) => {//formValues, careerId, updateStateForView, hideEdit
		return updateCustomer(formValues,certificateId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res, error, isLoading) => {
		const {updateStateForView} = this.props;
		updateStateForView({error:error,isLoading:isLoading});
		this.setState({...this.state, certificate:res, error:error, isLoading:isLoading});
	};

	render() {
		const {customer} = this.props;
		return (
			<OrganizationCustomers
					customer={customer}
					updateStateForView={this._updateStateForView}
					deleteCertificate={this.delete_}
					updateCertificate={this.update_}
			/>
		);
	}
}

export class CustomerSection extends Component {
	render() {
		const {customer} = this.props.viewer;
		return (
			<div>
				<CategoryTitle
					title={__('Customers')}
					showCreateForm={this.showCreateForm}
					createForm={true}
				/>
				<FrameCard>
					<CustomerContainer
						customer={customer}
					/>
				</FrameCard>
			</div>
		);
	}
}
