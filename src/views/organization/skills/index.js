/*global __*/
import React from "react";
import {OrganizationSkills} from "./item";
import {FrameCard, CategoryTitle} from "../../common/cards/Frames";
export const OrganizationContainer = (organization,allUsers)=> {
		return(
		<OrganizationSkills
				organization={organization}
				allUsers={allUsers}
		/>
		)
};

export const OrganizationSection = ({organization,allUsers})=>{
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
