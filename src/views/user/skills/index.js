/*global __*/
import React from "react";
import {UserSkills} from "./item";
import {FrameCard, CategoryTitle} from "../../common/cards/Frames";
export const UserContainer = (User)=> {
		return(
		<UserSkills
				User={User}
		/>
		)
};

export const UserSection = ({User})=>{
				return (
					<div>
							<CategoryTitle
									title={__('Basic information')}
									showCreateForm={this.showCreateForm}
									createForm={true}
							/>
							<FrameCard>
									<UserContainer
											User={User}
									/>
							</FrameCard>
					</div>
				);
		}
export default UserSection;
