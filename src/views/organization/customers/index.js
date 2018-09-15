/*global __*/
//@flow
import * as React from 'react'
import PropTypes from 'prop-types';
import {Customer, CustomerItemWrapper} from "./view";
import {CustomerCreateForm} from "./forms";
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper, ItemHeader} from "../../common/cards/Frames";
// import {createCustomer, deleteCustomer, updateCustomer} from '../../../crud/organization/customer.js';
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS"
import {REST_REQUEST} from "../../../consts/Events"
import {TOKEN} from "src/consts/data"
import {postIcon} from "src/images/icons";
import OrganizationActions from '../../../redux/actions/organizationActions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
type CustomerContainerProps = { 
	organizationId:number,
	actions:Object,
	customer:Object
}
export class CustomerContainer extends React.Component<CustomerContainerProps> {
	constructor(props:CustomerContainerProps){
		super(props);
	}
	

	update_ = (formValues:Object, customerId:number, updateStateForView:Function, hideEdit:Function) => {//formValues, careerId, updateStateForView, hideEdit
		const {updateCustomer} = this.props.actions
		updateCustomer(formValues,customerId, hideEdit);
	};


	render() {
		const {customer, actions} = this.props;
		return <Customer
			customer={customer}
			actions = {actions}
		/>; 
	}
}

type CustomerListProps = {
	hideCreateForm: Function,
	actions:Object,
	createForm: boolean,
	organizationId:number,
	customers:Array<Object>
}
export class CustomerList extends React.Component<CustomerListProps> {
	static defaultProps = {
		customers:[]
	}
	create = (formValues:Object,hideEdit:Function) => {
			const {organizationId,actions } = this.props;
			const {createCustomer} = actions
			createCustomer(formValues, hideEdit, organizationId);
	};

	render() {
		const {  organizationId, createForm, actions} = this.props;
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
					actions = {actions}
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
	actions:Object,
	organization:Object,
	customers:Object,
	organs:Object

}
export class Customers extends React.Component<CustomersProps,{createForm: boolean, edit:boolean}> {
	static defaultProps = {
		customers:{list:[],isLoading:false,error:false}
	}
	state = { createForm: false, edit:false};
	constructor(props:CustomersProps){
		super(props);
	}
	componentDidMount(){
		const {organizationId } = this.props;
		const {getCustomers} = this.props.actions;
		getCustomers(organizationId)
		
	}
	showCreateForm = () => {
			this.setState({createForm: true});
	};
	hideCreateForm = () => {
			this.setState({createForm: false});
	};


	render() {
		const {organizationId,  organization, actions, organs} = this.props;
		const {isLoading,error} = organization.customers;
		const customers = organization.customers;
		const {createForm} = this.state;
		const organ = organs.list[organizationId].organization.content
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
								<ItemHeader title={"ثبت شده توسط "+organ.official_name}/>
							
							<CustomerList
								customers={customers.content}
								actions ={actions}
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
const mapStateToProps = (state) => ({
	organization:state.organization,
	organs:state.organs,
	auth:state.auth
})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		getCustomers: OrganizationActions.getOrgCustomers ,
		updateCustomer: OrganizationActions.updateCustomer ,
		createCustomer : OrganizationActions.createCustomer,
		deleteCustomer: OrganizationActions.deleteCustomer
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Customers)