import React, {Component} from "react";
import PropTypes from "prop-types";
import "moment/locale/fa";
import Moment from "react-moment";
import {EditIcon, defaultImg} from "src/images/icons";
import {NEW_VIEW, GET_VIEWS_COUNT} from "src/consts/Events";
import {SOCKET as socket} from "src/consts/URLS";
import {TOKEN} from "src/consts/data";
import {VerifyWrapper} from "src/views/common/cards/Frames";


export class SkillItemWrapper extends Component {
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


export class SkillBody extends Component {
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

export class SkillFooter extends Component {
   render() {
		const {viewerCount, addViewer, tags} = this.props;
		
    
    return (
      <div className="skillTags">
				{tags}
			</div>
    )
  }
}

export class SkillView extends Component {
  static propTypes = {
    showEdit: PropTypes.func.isRequired,
    skill: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
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
		const {showEdit, skill, user, profile, isLoading, error} = this.props;
		const tags = skill.tag.map((tag,index)=>{
			return(<span className="badge badge-secondary skillTag m-1">{tag}</span>)
		});
    const {viewerCount} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <SkillItemWrapper showEdit = {showEdit}>
					<h6>{skill.title}</h6>
					<SkillBody description={skill.description}/>
					<SkillFooter skillId={skill.id} tags={tags}/>
        </SkillItemWrapper>
      </VerifyWrapper>
    )
  }
}
