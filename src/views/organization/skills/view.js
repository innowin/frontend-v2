import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import Moment from "react-moment";
import {EditIcon, defaultImg} from "src/images/icons";
import {NEW_VIEW, GET_VIEWS_COUNT} from "src/consts/Events";
import {SOCKET as socket} from "src/consts/URLS";
import {TOKEN} from "src/consts/data";
import {VerifyWrapper} from "src/views/common/cards/Frames";


export class AbilityItemWrapper extends Component {
  render() {
		const {showEdit} = this.props;
    return (
      <div className="-itemWrapperSkill">
				<div className="-itemEditBtn" onClick={showEdit}><EditIcon /></div>
        {this.props.children}
      </div>
    )
  }
}

export class AbilityBody extends Component {
  static propTypes = {
    description: PropTypes.string.isRequired
  };

  render() {
		const {description} = this.props;
    return (
				<p className="skillDescription">
					{description}
				</p>
		)
  }
}

export class AbilityFooter extends Component {
   render() {
		const {viewerCount, addViewer} = this.props;
		
    return (
      <div className="skillTags">
				
			</div>
    )
  }
}

export class AbilityView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    ability: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    organization: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {viewerCount: 0, isLoading: false, error: false};
  };

  componentDidMount() {
  };

  componentWillUnmount() {
  }

  render() {
		const {showEdit, ability, organization, profile, isLoading, error} = this.props;
    const {viewerCount} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <AbilityItemWrapper showEdit = {showEdit}>
					<h6>{ability.title}</h6> 
					<AbilityBody description={ability.text}/>
					<AbilityFooter abilityId={ability.id}/>
        </AbilityItemWrapper>
      </VerifyWrapper>
    )
  }
}
