//@flow
import * as React from 'react';
import {CustomerEditForm} from './forms';
import {ItemHeader, ItemWrapper} from "../../common/cards/Frames";
import {CertificateIcon, EditIcon} from "src/images/icons";
import {ImageViewer} from '../../common/ImageViewer';
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
    constructor(props:Object){
        super(props)
    }
    handleShowEdit(){
        this.props.showEdit()
    }
    render() {
        const {customer, showEdit} = this.props;
        return (
            <div className="col-4 text-center container-fluid p-1">
                <div className="row">
                    <div className="col customer">
                        <div className="content">
                            <div className="editButton" onClick={this.handleShowEdit.bind(this)}>
                                <EditIcon/>
                            </div>
                            <ImageViewer  
                                className="customerImage"
                                mediaId ={customer.customer_picture}
                                label={'تصویر'} />
                                {/* <img className="customerImage" alt="" src={customer.picture_media || "/static/media/defaultImg.94a29bce.png"} /> */}
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
    actions:Object
}
export class Customer extends React.Component<CustomerProps,{edit: boolean}> {
    constructor(props:CustomerProps){
        super(props);
        const {customer} = props;
        this.state = {edit: false};
    }

    showEdit = () => {
        this.setState({edit: true});
    };

    hideEdit = () => {
        this.setState({edit: false});
    };

    render() {
        const {customer, actions} = this.props;
        if (this.state.edit) {
            return <CustomerItemWrapper>
                <CustomerEditForm
                    customer = {customer}
                    hideEdit = {this.hideEdit}
                    actions = {actions}
                />
            </CustomerItemWrapper>;
        }
        return <CustomerView customer={customer} showEdit={this.showEdit.bind(this)}/>;
    }
}
