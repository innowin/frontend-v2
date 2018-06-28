/*global __*/
//@flow
import * as React from 'react'
import PropTypes from 'prop-types';
import {Customer, CustomerItemWrapper} from "./view";
import {CustomerCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper, ItemHeader} from "../../common/cards/Frames";
import {createCustomer, deleteCustomer, updateCustomer} from '../../../crud/organization/customer.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {TOKEN} from "src/consts/data"

type CustomerContainerProps = { 
	customer:Object,
	organizationId:number, 
	updateStateForView: Function
}
export class CustomerContainer extends React.Component<CustomerContainerProps,{customer:Object, error:boolean, isLoading:boolean}> {
	constructor(props:CustomerContainerProps){
		super(props);
		this.state={...this.state, customer:props.customer}
	}
	componentWillReceiveProps(props:CustomerContainerProps){
			const {customer} = props;
			this.setState ({...this.state ,customer:customer || {}});
	}
	delete_ = (customerId:number, hideEdit:Function) => {	
		const {organizationId, updateStateForView} = this.props;
		updateStateForView(null,true,true);
		return deleteCustomer(customerId, updateStateForView,hideEdit,organizationId);
	};
	update_ = (formValues:Object, customerId:number, updateStateForView:Function, hideEdit:Function) => {//formValues, careerId, updateStateForView, hideEdit
		updateStateForView(null,null,true);
		return updateCustomer(formValues,customerId, updateStateForView, hideEdit);
	};
	_updateStateForView = (res:Object, error:boolean, isLoading:boolean) => {
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

type CustomerListProps = {
	hideCreateForm: Function,
	createForm: boolean,
	organizationId:number,
	updateStateForView:Function,
	customers:Array<Object>
}
export class CustomerList extends React.Component<CustomerListProps> {

	create = (formValues:Object,hideEdit:Function) => {
			const {organizationId,  updateStateForView} = this.props;
			return createCustomer(formValues, updateStateForView, hideEdit, organizationId);
	};

	render() {
		const {  organizationId, createForm, updateStateForView} = this.props;
		var {customers} = this.props ;
		return <ListGroup>
			{createForm &&
			<CustomerItemWrapper>
					<CustomerCreateForm hideEdit={this.props.hideCreateForm} create={this.create} />
			</CustomerItemWrapper>}
			<div className="row align-items-left">
			{
				customers.map(customer => <CustomerContainer
					customer={customer}
					updateStateForView = {updateStateForView}
					organizationId={organizationId}
					key={customer.id}
				/>)
			}
			</div>
		</ListGroup>;
	}
}

type CustomersProps = { 
	organizationId:number,
}
export class Customers extends React.Component<CustomersProps,{organization:Object, createForm: boolean,customers:Object, edit:boolean, isLoading:boolean, error:boolean, customers:Array<Object>}> {
	state = {organization:{}, createForm: false,customers:{}, edit:false, isLoading:false, error:false, customers:[]};
	constructor(props:CustomersProps){
		super(props);
	}
	componentDidMount(){
		const {organizationId } = this.props;
		const emitting = () => {
			const newState = {...this.state, isLoading: true};
			this.setState(newState);
			socket.emit(REST_REQUEST,
				{
					method: "get",
					url: `${url}/organizations/customers/?customer_organization=${organizationId}`,
					result: `OrganizationCustomers-get/${organizationId}`,
					token: TOKEN,
				}
			);

			socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/organizations/${organizationId}/`,
          result: `organization-Customers-get/${organizationId}`,
          token: TOKEN
        }
			);
			
		};

		emitting();

		socket.on(`OrganizationCustomers-get/${organizationId}`, (res) => {
			if (res.detail) {
				const newState = {...this.state, error: res.detail, isLoading: false};
				this.setState(newState);
			}else{
				const newState = {...this.state, customers: res instanceof Array ? res : [], isLoading: false};
				this.setState(newState);
			}

		});
		socket.on(`organization-Customers-get/${organizationId}`, (res) => {
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
	updateStateForView = (error:boolean,isLoading:boolean) =>{
		this.setState({...this.state, error:error, isLoading:isLoading})
	}

	render() {
		const {  organizationId, } = this.props;
		const {createForm, customers, isLoading, error,organization} = this.state;
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
							<CustomerItemWrapper>
								<ItemHeader title={"ثبت شده توسط "+organization.official_name}/>
							
							<CustomerList
								updateStateForView={this.updateStateForView}
								customers={customers}
								organizationId={organizationId}
								createForm={createForm}
								hideCreateForm={this.hideCreateForm}
							/>
							</CustomerItemWrapper>
						</FrameCard>
					</div>
				}
			</VerifyWrapper>
		)
	}
}
export default Customers;