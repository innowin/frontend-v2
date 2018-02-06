/*global __*/
import React,{Component} from 'react';
import PropTypes from "prop-types";
import {
	ItemWrapper,
	ItemHeader
} from '../../common/cards/Frames';
import {
	userInfoIcon
} from '../../../images/icons';


export const OrganItemWrapper = ({children}) => {
	return <ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>;
};


export class UserSkillView extends Component {
	static propTypes={
		skill: PropTypes.object.isRequired,
		edit: PropTypes.bool.isRequired,
		showEdit: PropTypes.func.isRequired,
		skillIndex:PropTypes.number.isRequired
	}
	constructor(props){
		super(props);
	}

	render(){
		const {skill, showEdit} = this.props;
			return (
				<OrganItemWrapper>
            <ItemHeader title={skill.title} showEdit={showEdit}/>
            <div className="p-0">
                {skill.text}
            </div>
        </OrganItemWrapper>
			)
	}
}
