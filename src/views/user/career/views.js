/*global __*/
import React, {Component} from 'react';
import PropTypes from "prop-types";
import UserCareerForm from './forms';
import {
	ItemHeader,
	ItemWrapper,
	Field,
	FieldLabel,
	FieldValue
} from "../../common/cards/Frames";
import {workExperienceIcon} from "src/images/icons";

export const CareerItemWrapper = ({children}) => {
	return <ItemWrapper icon={workExperienceIcon}>{children}</ItemWrapper>;
};


export class CareerView extends Component {
	constructor(props){
		super(props);
		const{career} = props;
		this.state={edit:false, career:career}
	}
	componentWillReceiveProps(props){
		const{career} = props;

	}
	static propTypes={
		showEdit: PropTypes.func.isRequired,
		career: PropTypes.object.isRequired
	};

	showEdit = () => {
		this.setState({...this.state, edit: true});
	};
	hideEdit = () => {
			this.setState({...this.state, edit: false});
	};

	updateStateForView = (career, err, isLoading) => {
		const {updateStateForView} = this.props;
		this.setState({...this.state, career:career, error:err, isLoading:isLoading});
		updateStateForView(err,isLoading);
	}

	render(){//TODO amir : correct date format (??)
		const {career} = this.state;
		const {edit} = this.state;

			return (
				(edit) ? (
					<UserCareerForm className="p-2"
						{...this.props}
						hideEdit={this.hideEdit}
						updateStateForView ={this.updateStateForView}
					>
					</UserCareerForm>
				) : (
					<CareerItemWrapper>
						<ItemHeader title={career.name} showEdit={this.showEdit}/>
						<Field>
							<FieldLabel label={__('Position') + ": "}/>
							<FieldValue value={career.position}/>
						</Field>
						<Field>
							<FieldLabel label={__('From date') + ": "}/>
							<FieldValue value={career.from_date}/>
						</Field>
						<Field>
							<FieldLabel label={__('To date') + ": "}/>
							<FieldValue value={career.to_date}/>
						</Field>
					</CareerItemWrapper>
					)
				)
		}
};

