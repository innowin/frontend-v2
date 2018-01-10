/*global __*/
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {userInfoIcon} from "src/images/icons"
import {
		ItemHeader,
		ItemWrapper,
		Field,
		FieldLabel,
		FieldValue,
		ListGroup
} from "../../common/cards/Frames";
import {str_to_option, optionLabel, list_of_badge} from "../../common/Functions"

export const OrganItemWrapper = ({children}) => {
		return <ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>;
};

export const OrganizationView =({showEdit,skill})=> {
		// TODO keep ltr
			return (
				<OrganItemWrapper>
					<ItemHeader title={skill.title} showEdit={showEdit}/>
					<div className="p-0">
						{skill.description}
					</div>
				</OrganItemWrapper>
			)
};
OrganizationView.propTypes={
	showEdit: PropTypes.func.isRequired,
	skill: PropTypes.object.isRequired,
}

export class OrganizationInfo extends Component {
		state = {edit: false};
		showEdit = () => {
				this.setState({edit: true});
		};
		hideEdit = () => {
				this.setState({edit: false});
		};

		render() {
			const {organization, updateOrganization} = this.props;
			const skills = organization.skills.map((skill,index)=>{
				return <OrganizationView skill={skill.node} key={index} showEdit={this.showEdit}/>
			})
			// if (this.state.edit) {
			// 	return (
			// 		<OrganItemWrapper>
			// 						<OrganizationEditForm
			// 							organization={organization}
			// 							hideEdit={this.hideEdit}
			// 							update={updateOrganization}
			// 						/>
			// 		</OrganItemWrapper>
			// 	)
			// }
			return (
				<div>
				{skills}
				</div>
			)
		}
}
OrganizationInfo.propTypes = {
	updateOrganization: PropTypes.func.isRequired,
	organization: PropTypes.object.isRequired,
};

export const OrganizationSkills = ({updateOrganization,organization}) => {
	return (
	<ListGroup>
		<OrganizationInfo {...{organization}} {...{updateOrganization}} />
	</ListGroup>
	)
};

OrganizationSkills.propTypes = {
	updateOrganization: PropTypes.func.isRequired,
	organization: PropTypes.object.isRequired,
	allUsers: PropTypes.array,
}
