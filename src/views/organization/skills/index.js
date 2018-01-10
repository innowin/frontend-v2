/*global __*/
import React, {Component} from "react";
import {OrganizationSkills} from "./Item";
import {FrameCard, CategoryTitle} from "../../common/cards/Frames";
export const OrganizationContainer = ()=> {

		updateOrganization_ = (formValues, organizationId) => {
				const revisedOrganization = {...formValues, id: organizationId};
				return updateOrganization({revisedOrganization});
		};
		const {organization} = this.props;
		const {allUsers} = this.props;

		return(
		<OrganizationSkills
				organization={organization}
				allUsers={allUsers}
				updateOrganization={this.updateOrganization_}
		/>
		)
};

const OrganizationSection = ()=>{
				const {organization} = this.props;
				const {allUsers} = this.props;
				return (
					<div>
							<CategoryTitle
									title={__('Basic information')}
									showCreateForm={this.showCreateForm}
									createForm={true}
							/>
							<FrameCard>
									<OrganizationContainer
											organization={organization}
											allUsers={allUsers}
									/>
							</FrameCard>
					</div>
				);
		}
export default OrganizationSection;

// export default ({organization, allUsers}) => {
//     const organizationId = organization.id;
//     return renderer(organizationId, allUsers, OrganizationSection, __('Basic information'));
// };
