import type {skillType} from "../../../consts/flowTypes/user/others";
import {Component} from "react";
import PropTypes from "prop-types";
import {REST_URL as url, SOCKET as socket} from "../../../consts/URLS";
import {REST_REQUEST} from "../../../consts/Events";
import {TOKEN} from "../../../consts/data";
import {createSkill} from "../../../crud/user/skills";
import {ItemWrapper} from "../../common/cards/Frames";
import SkillInfoCreateForm from "./SkillInfoCreateForm";
import {bindActionCreators} from "redux";
import SkillActions from "../../../redux/actions/skillActions";
import connect from "react-redux/es/connect/connect";
import * as React from "react";
import SkillInfo from './SkillInfo'
import {SkillIcon} from "../../../images/icons";
import {makeGetSkills} from "../../../redux/selectors/user/userGetSkillSelector";

type PropsSkills = {
  userId: number,
  translate: { [string]: string },
  skills: (skillType)[],
  actions: {
    getSkillByUserId: Function,
    updateSkillByUserId: Function,
    deleteSkillByUserId: Function,
  },
  isLoading: boolean,
  error: {} | string | null,
}

type StateSkills = {
  createForm: boolean,
  products: [],
}

class SkillInfoContainer extends Component<PropsSkills, StateSkills> {

  static propTypes = {
    userId: PropTypes.number.isRequired,
    translate: PropTypes.object.isRequired,
    skills: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool,
    error: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      createForm: false,
      products: [],
    }
  }

  _showCreateForm = () => {
    this.setState({createForm: true})
  }

  _hideCreateForm = () => {
    this.setState({createForm: false})
  }

  _updateSkills = (res: skillType, type: string, deletedIndex: ?number = null) => {
    const {skills} = this.state
    if (type === 'get') {
      this.setState({...this.state, skills: [...skills, ...res]})
      return false
    }
    if (type === 'post') {
      this.setState({...this.state, skills: [res, ...skills]})
      return false
    }
    if (type === 'del' && deletedIndex) {
      const remainSkills = skills.slice(0, deletedIndex).concat(skills.slice(deletedIndex + 1))
      this.setState({...this.state, skills: remainSkills})
    }
  }

  _create = (formValues, hideCreateForm) => {
    const {skill, skills} = this.state
    return createSkill(formValues, skills, skill, this._updateSkills, hideCreateForm)
  }

  componentDidMount() {
    const {userId, actions} = this.props
    const {getSkillByUserId} = actions
    getSkillByUserId({userId})

    const emitting = () => {
      //products
      socket.emit(REST_REQUEST,
          {
            method: "get",
            url: `${url}/products/?product_owner=${userId}`,
            result: `userSkills-Products-get/${userId}`,
            token: TOKEN
          }
      )
    }

    emitting()
    socket.on(`userSkills-Products-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.data.detail}
        this.setState(newState)
      } else {
        const newState = {...this.state, products: res.data}
        this.setState(newState)
      }
    })
  }

  render() {
    const {translate, skills, userId, actions} = this.props
    const {updateSkillByUserId, deleteSkillByUserId} = actions
    const {createForm} = this.state
    return (
        //<VerifyWrapper isLoading={isLoading} error={error}>
        <div>
          {
            createForm &&
            <ItemWrapper icon={SkillIcon}>
              <SkillInfoCreateForm hideCreateForm={this._hideCreateForm} create={this._create} translate={translate}
                                   userId={userId}/>
            </ItemWrapper>
          }
          {
            skills.map((skill, index) => (
                <SkillInfo
                    userId={userId}
                    updateSkillByUserId={updateSkillByUserId}
                    deleteSkillByUserId={deleteSkillByUserId}
                    skill={skill}
                    key={index + "SkillInfo"}
                    translate={translate}
                />
            ))
          }
        </div>
        //</VerifyWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const getSkills = makeGetSkills(state, ownProps)

  return (state, props) => {
    const {userId} = props
    const stateUser = state.users[userId]
    const defaultObject = {content: [], isLoading: false, error: null}
    const skillObject = (stateUser && stateUser.skills) || defaultObject

    return {
      skills: getSkills(state, props),
      isLoading: skillObject.isLoading,
      error: skillObject.error,
    }
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getSkillByUserId: SkillActions.getSkillByUserId,
    updateSkillByUserId: SkillActions.updateSkillByUserId,
    deleteSkillByUserId: SkillActions.deleteSkillByUserId,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(SkillInfoContainer)