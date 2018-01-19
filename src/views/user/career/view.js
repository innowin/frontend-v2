/*global __*/
import React, {Component} from 'react';
import PropTypes from "prop-types";
import {WorkExperienceEditForm} from './forms';
import {
	ItemHeader,
	ItemWrapper,
	Field,
	FieldLabel,
	FieldValue
} from "../../common/cards/Frames";
import {workExperienceIcon} from "src/images/icons";

export const WorkExperienceItemWrapper = ({children}) => {
	return <ItemWrapper icon={workExperienceIcon}>{children}</ItemWrapper>;
};


export class UserCareerView extends Component {
	constructor(props){
		super(props);
		this.state={edit:false}
	}
	static propTypes={
		showEdit: PropTypes.func.isRequired,
		career: PropTypes.object.isRequired
	}

	showEdit = () => {
		this.setState({...this.state, edit: true});
	};
	hideEdit = () => {
			this.setState({...this.state, edit: false});
	};

	render(){
		const {career} = this.props;
		const {edit} = this.state;
		if (edit) {
			return <div/>
		}else{
			return (
				<WorkExperienceItemWrapper>
					<ItemHeader title={career.name} showEdit={this.showEdit}/>
					<Field>
						<FieldLabel label={__('Position') + ": "}/>
						<FieldValue value={career.position}/>
					</Field>
					<Field>
						<FieldLabel label={__('From date') + ": "}/>
						<FieldValue value={career.fromDate}/>
					</Field>
					<Field>
						<FieldLabel label={__('To date') + ": "}/>
						<FieldValue value={career.toDate}/>
					</Field>
				</WorkExperienceItemWrapper>
			)
		}
	}
};

