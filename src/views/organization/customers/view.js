//@flow
import * as React from 'react';
import {CustomerEditForm} from './forms';
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import {CertificateIcon, EditIcon} from "src/images/icons";

type CustomerItemWrapperProps = {
    children:React.Node
}
export const CustomerItemWrapper = (props:CustomerItemWrapperProps) => {
    return <ItemWrapper icon={<CertificateIcon/>}>{props.children}</ItemWrapper>;
};

type CustomerViewProps = {
    showEdit: Function,
    customer: Object
}
export class CustomerView extends React.Component<CustomerViewProps> {

    render() {
        const {customer, showEdit} = this.props;
        return (
            <div className="col-4 text-center container-fluid p-1">
                <div className="row">
                    <div className="col customer">
                        <div className="content">
                            <div className="editButton">
                                <div onClick={showEdit}>{<EditIcon/>}</div>
                            </div>
                            <img className="customerImage" alt="" src={customer.picture_media || "/static/media/defaultImg.94a29bce.png"} />
                            <h5>{customer.title}</h5>
                            <span>&nbsp;</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

type CustomerProps = {
    customer:Object,
    updateCustomer: Function,
    deleteCustomer: Function,
    updateStateForView: Function
}
export class Customer extends React.Component<CustomerProps,{edit: boolean, customer:Object}> {
    constructor(props:CustomerProps){
        super(props);
        const {customer} = props;
        this.state = {edit: false, customer:customer};
    }
    componentWillReceiveProps(props:CustomerProps){
        const {customer} = props;
        this.setState({...this.state, customer:customer})
    }

    showEdit = () => {
        this.setState({edit: true});
    };

    hideEdit = () => {
        this.setState({edit: false});
    };

    updateStateForView = (res:Object, error:boolean,isLoading:boolean) =>{
        const {updateStateForView} = this.props;
        this.setState({...this.state,customer:res })
    }

    render() {
        const {customer} = this.state;
        if (this.state.edit) {
            return <CustomerItemWrapper>
                <CustomerEditForm
                    customer = {customer}
                    hideEdit = {this.hideEdit}
                    updateStateForView = {this.updateStateForView}
                    remove = {this.props.deleteCustomer}
                    update = {this.props.updateCustomer}
                />
            </CustomerItemWrapper>;
        }
        return <CustomerView customer={customer} showEdit={this.showEdit}/>;
    }
}
