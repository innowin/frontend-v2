/*global __*/
//@flow
import * as React from 'react'
import PropTypes from "prop-types"
import {userInfoIcon} from "src/images/icons"
import {Link} from 'react-router-dom'
import {DefaultUserIcon} from 'src/images/icons'
import {
    Field,
    FieldLabel,
    FieldValue,
    ItemHeader,
    ItemWrapper,
} from '../../common/cards/Frames'

type OrganizationMembersWrapperProps = {
    children:React.Node
}
export const OrganizationMembersWrapper = (props : OrganizationMembersWrapperProps) => {
    return (
        <ItemWrapper icon={userInfoIcon}>{props.children}</ItemWrapper>
    )
};
type OrganizationMemberProps = {
    jobTitle:string,
    userID:number ,
    firstName:string ,
    lastName:string,
    isEdit:boolean
}
export const OrganizationMember = (props:OrganizationMemberProps) => {
    return (
        <div className="member-wrapper">
            <div className="image-wrapper">
                <Link to={`/user/${props.userID}`}>
                    <DefaultUserIcon/>
                </Link>
            </div>
            <div className="details">
                <div>
                    <div className="name">{props.firstName} {props.lastName}</div>
                    <div className="job-title">{props.jobTitle}</div>
                </div>
                {/* {(props.isEdit) ? <button className="btn btn-outline-danger">{__('Delete')}</button>:<Link to="#">connect</Link>} */}
            </div>
        </div>
    )
};

type OrganizationMembersViewProps = {
    showEdit: Function,
    members : Array<Object>,
}
export class OrganizationMembersView extends React.Component<OrganizationMembersViewProps> {
    static defaultProps = {
        members:[]
    }
    render() {
        const {members, showEdit} = this.props;
        return (
            <OrganizationMembersWrapper>
                <ItemHeader title={__('Organization members')} showEdit={showEdit}/>
                <div className="members-wrapper">
                    {
                        members.map((member)=>{
                            return (
                                <OrganizationMember jobTitle={member.position} firstName={member.staff_user.first_name} lastName={member.staff_user.last_name} userID={member.staff_user.id}/>
                            )
                        })
                    }
                </div>
            </OrganizationMembersWrapper>
        )
    }
}

type OrganizationInfoItemWrapperProps = {
    children:React.Node
}
export const OrganizationInfoItemWrapper = (props:OrganizationInfoItemWrapperProps) => {
    return (
        <ItemWrapper icon={userInfoIcon}>{props.children}</ItemWrapper>
    )
};

type OrganizationInfoViewProps = {
    showEdit: Function,
    organization: Object
}
export class OrganizationInfoView extends React.Component<OrganizationInfoViewProps> {

    render() {
        const {organization, showEdit} = this.props;
        return (
            <OrganizationInfoItemWrapper>
                <ItemHeader title={__('Organization info')} showEdit={showEdit}/>
                <Field>
                    <FieldLabel label={__('Username') + ": "}/>
                    <FieldValue value={organization.username}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Official name') + ": "}/>
                    <FieldValue value={organization.official_name}/>
                </Field>
                <Field>
                    <FieldLabel label={__('National code') + ": "}/>
                    <FieldValue value={organization.national_code}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Country') + ": "}/>
                    <FieldValue value={organization.country}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Province') + ": "}/>
                    <FieldValue value={organization.province}/>
                </Field>
                <Field>
                    <FieldLabel label={__('City') + ": "}/>
                    <FieldValue value={organization.city}/>
                </Field>
            </OrganizationInfoItemWrapper>
        )
    }
}

