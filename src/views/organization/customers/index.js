/*global __*/
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Customer, CustomerItemWrapper} from "./view";
import {CustomerCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "../../common/cards/Frames";
import {createCustomer, deleteCustomer, updateCustomer} from '../../../crud/organization/customer.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {TOKEN} from "src/consts/data"

export class CustomerContainer extends Component {
	constructor(props){
		super(props);
	}
	componentWillReceiveProps(props){
			const {customer} = props;
			this.setState ({...this.state ,customer:customer || {}});
	}
	delete_ = (customerId, hideEdit) => {	
		const {organizationId, updateStateForView} = this.props;
		updateStateForView(null,null,true);
		return deleteCustomer(customerId, organizationId,()=>{
			updateStateForView(null,false);
		},hideEdit,organizationId);
	};
	update_ = (formValues, customerId, updateStateForView, hideEdit) => {//formValues, careerId, updateStateForView, hideEdit
		updateStateForView(null,null,true);
		return updateCustomer(formValues,customerId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res, error, isLoading) => {
		const {updateStateForView} = this.props;
		updateStateForView({error:error,isLoading:isLoading});
		this.setState({...this.state, customer:res, error:error, isLoading:isLoading});
	};

	render() {
		const {customer} = this.state;
		return <Customer
			customer={customer}
			updateStateForView={this._updateStateForView}
			deleteCustomer={this.delete_}
			updateCustomer={this.update_}
		/>; 
	}
}

export class CustomerList extends Component {
	static propTypes = {
			hideCreateForm: PropTypes.func.isRequired,
			createForm: PropTypes.bool.isRequired,
	};

	create = (formValues,hideEdit) => {
			const {organizationId, customerId, updateStateForView} = this.props;
			return createCustomer(formValues,customerId, updateStateForView, hideEdit, organizationId);
	};

	render() {
		const {  organizationId, createForm, updateStateForView} = this.props;
		var {customers} = this.props ;
		return <ListGroup>
			{createForm &&
			<CustomerItemWrapper>
					<CustomerCreateForm hideEdit={this.props.hideCreateForm} create={this.create} />
			</CustomerItemWrapper>}
			{
				customers.map(cert => <CustomerContainer
					customer={cert}
					updateStateForView = {updateStateForView}
					organizationId={organizationId}
					key={cert.id}
				/>)
			}
		</ListGroup>;
	}
}

export class Customers extends Component {

	constructor(props){
		super(props);
		this.state = {createForm: false,customers:{}, edit:false, isLoading:false, error:null, customers:[]};
	}
	static propTypes = {
		organizationId: PropTypes.string.isRequired
	};

	componentDidMount(){
		const {organizationId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/organizations/customers/${organizationId}`,
					result: `OrganizationCustomers-get/${organizationId}`,
					token: "",
				}
			);

			socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/organizations/${organizationId}/`,
          result: `organization-Posts-get/${organizationId}`,
          token: TOKEN
        }
			);
			
		};

		emitting();

		socket.on(`UserCustomers-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, customers: res instanceof Array ? res : [], isLoading: false};
				this.setState(newState);
			}

		});
		socket.on(`organization-Posts-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			} else {
				const newState = {...this.state, organization: res, isLoading: false};
				this.setState(newState);
			}
		});

		
	}
	showCreateForm = () => {
			this.setState({createForm: true});
	};
	hideCreateForm = () => {
			this.setState({createForm: false});
	};
	updateStateForView = (error,isLoading) =>{
		this.setState({...this.state, error:error, isLoading:isLoading})
	}

	render() {
		const {  organizationId} = this.props;
		const {createForm, customers, isLoading, error} = this.state;
		return (
			<VerifyWrapper isLoading={isLoading} error={error}>
				{
					<div>
						<CategoryTitle
							title={__('Customers')}
							showCreateForm={this.showCreateForm}
							createForm={createForm}
						/>
						<FrameCard>
							<CustomerList
								updateStateForView={this.updateStateForView}
								customers={customers}
								organizationId={organizationId}
								createForm={createForm}
								hideCreateForm={this.hideCreateForm}
							/>
						</FrameCard>
					</div>
				}
			</VerifyWrapper>
		)
	}
}
export default Customers;