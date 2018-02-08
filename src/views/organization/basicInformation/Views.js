/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {userInfoIcon} from "src/images/icons"
import {Link} from 'react-router-dom'
import {defaultImg} from 'src/images/icons'
import {
	Field,
	FieldLabel,
	FieldValue,
	ItemHeader,
	ItemWrapper,
} from '../../common/cards/Frames'
// import {OrganizationMembers} from "./index";

export const OrganizationMembersWrapper = ({children}) => {
	return (
			<ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
	)
};

export const OrganizationMember = ({jobTitle, userID , firstName , lastName}) => {
	return (
			<div className="member-wrapper">
				<div className="image-wrapper"><Link to={`/user/${userID}`}><img className="members-image" src={defaultImg} /></Link></div>
				<div className="details">
					<div className="detail-wrapper">
						<div className="name">{firstName} {lastName}</div>
						<div className="job-title">{jobTitle}</div>
					</div>
					<div className="link-wrapper"><Link to="#">connect</Link></div>
				</div>
			</div>
	)
};

export class OrganizationMembersView extends Component {
	static propsTypes = {
		showEdit: PropTypes.func.isRequired,
		organization: PropTypes.object.isRequired,
	};
	render() {
		const {members, showEdit} = this.props;
		// console.log('organization member is : ', members);
		return (
				<OrganizationMembersWrapper>
					<ItemHeader title={__('Organization members')} showEdit={showEdit}/>
					<div className="members-wrapper">
						{
							members.map((member)=>{
								return (
										<OrganizationMember key={member.id} jobTitle={member.position} firstName={member.staff_user.first_name} lastName={member.staff_user.last_name} userID={member.staff_user.id}/>
								)
							})
						}
					</div>
				</OrganizationMembersWrapper>
		)
	}
}

export const OrganizationInfoItemWrapper = ({children}) => {
	return (
			<ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
	)
};

export class OrganizationInfoView extends Component {
	static propTypes = {
		showEdit: PropTypes.func.isRequired,
		organization: PropTypes.object.isRequired,
	};
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
						<FieldValue value={organization.province}/>
					</Field>
				</OrganizationInfoItemWrapper>
		)
	}
}

