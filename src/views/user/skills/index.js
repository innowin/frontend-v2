// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {createSkill, deleteSkill, updateSkill} from 'src/crud/user/skills'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {getMessages} from "src/redux/selectors/translateSelector"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {SkillCreateForm, SkillEditForm} from "./forms"
import {SkillItemWrapper, SkillView} from "./view"
import {TOKEN} from "src/consts/data"
import type {skillType} from "src/consts/flowTypes/user/others"
import type {skillFormValuesType} from "../../../consts/flowTypes/user/others"

type PropsSkillInfo = {
  skill: skillType,
  updateSkill: Function,
  deleteSkill: Function,
  updateStateForView: Function,
  translate: { [string]: string },
}
type StateSkillInfo = {
  edit: boolean,
  skill: skillType,
  error: boolean | string,
  isLoading: boolean
}

class SkillInfo extends Component<PropsSkillInfo, StateSkillInfo> {
  static propTypes = {
    skill: PropTypes.object.isRequired,
    updateSkill: PropTypes.func.isRequired,
    deleteSkill: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    const {skill} = props
    this.state = {edit: false, skill: skill, error: false, isLoading: false}
    this._updateStateForView = this._updateStateForView.bind(this)
    this._showEdit = this._showEdit.bind(this)
    this._showEdit = this._showEdit.bind(this)
  }

  _showEdit = () => {
    this.setState({edit: true})
  }

  _hideEdit = () => {
    this.setState({edit: false})
  }

  _updateStateForView = (res: skillType, error: boolean, isLoading: boolean) => {
    //FixME mohsen: remove skill From state and handle by redux
    this.setState({...this.state, skill: res, error: error, isLoading: isLoading})
  }

  render() {
    const {skill, edit} = this.state
    const {translate} = this.props
    if (edit) {
      return <SkillItemWrapper>
        <SkillEditForm
          skill={skill}
          hideEdit={this._hideEdit}
          updateStateForView={this._updateStateForView}
          remove={this.props.deleteSkill}
          update={this.props.updateSkill}
          translate={translate}
        />
      </SkillItemWrapper>
    }
    return <SkillView skill={skill} showEdit={this._showEdit}/>
  }
}

type PropsSkill = {
  skill: skillType,
  skills:(skillType)[],
  updateSkills:Function,
  updateStateForView:Function,
  translate: { [string]: string }
}

type StateSkill = {
  skill:?skillType,
  isLoading: boolean,
  error: boolean | string
}

class Skill extends Component<PropsSkill, StateSkill> {

  static propTypes = {
    skill: PropTypes.object.isRequired,
    skills: PropTypes.object.isRequired,
    updateSkills: PropTypes.func.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired
  }

  constructor(props:PropsSkill) {
    super(props)
    this.state = {skill:null, isLoading: false, error: false}
  }

  _handleErrorLoading = (error:boolean|string = false) => {
    this.setState({...this.state, isLoading: false, error: error})
  }

  _delete = (skillId, updateStateForView, hideEdit) => {
    const {skill, skills, updateSkills} = this.props
    deleteSkill(skill, skills, updateSkills, hideEdit, this._handleErrorLoading)
  }

  _update = (formValues:skillFormValuesType, skillId:number, updateStateForView:Function, hideEdit:Function) => {
    const {updateSkills} = this.props
    updateSkill(formValues, skillId, updateSkills, hideEdit)
  }


  _updateStateForView = (res, error, isLoading) => {
    const {updateStateForView} = this.props
    updateStateForView({error: error, isLoading: isLoading})
    this.setState({...this.state, skill: res, error: error, isLoading: isLoading})
  }

  componentDidMount(){
    const {skill} = this.props
    this.setState({...this.state, skill:skill})
  }

  render() {
    const {skill, translate} = this.props
    return (
      <SkillInfo
        skill={skill}
        updateStateForView={this._updateStateForView}
        deleteSkill={this._delete}
        updateSkill={this._update}
        translate={translate}
      />
    )
  }
}


type PropsSkills = {
  userId: number,
  translate: { [string]: string }
}

type StateSkills = {
  createForm: boolean,
  edit: boolean,
  isLoading: boolean,
  error: boolean|string,
  products: [],
  skills: (skillType)[],
  skill:?skillType
}
class Skills extends Component<PropsSkills ,StateSkills> {

  constructor(props) {
    super(props)
    this.state = {
      createForm: false,
      edit: false,
      isLoading: false,
      error: false,
      products: [],
      skills: [],
      skill: null
    }
  }

  static propTypes = {
    userId: PropTypes.string.isRequired,
    translate: PropTypes.object.isRequired
  }

  componentDidMount() {
    const {userId} = this.props
    const emitting = () => {
      const newState = {...this.state, isLoading: true}
      this.setState(newState)

      //skills
      socket.emit(REST_REQUEST,
        {
          method: "get",
          url: `${url}/users/skills/?skill_user=${userId}`,
          result: `userSkills-Skills-get/${userId}`,
          token: TOKEN
        }
      )
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
        const newState = {...this.state, error: res.detail, isLoading: false}
        this.setState(newState)
      } else {
        const newState = {...this.state, products: res, isLoading: false}
        this.setState(newState)
      }
    })
    socket.on(`userSkills-Skills-get/${userId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false}
        this.setState(newState)
      } else {
        const newState = {...this.state, skills: res, isLoading: false}
        this.setState(newState)
      }
    })
  }

  _showCreateForm = () => {
    this.setState({createForm: true})
  }

  _hideCreateForm = () => {
    this.setState({createForm: false})
  }

  _updateStateForView = (res, error, isLoading) => {
    this.setState({...this.state, skill: res, error: error, isLoading: isLoading})
  }

  _updateSkills = (res:skillType, type:string, deletedIndex:?number = null) => {
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

  render() {
    const {translate} = this.props
    const {createForm, skills, isLoading, error} = this.state
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={translate['Skills']}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard className="-frameCardSkill">
          <ListGroup>
            {
              createForm &&
              <SkillItemWrapper>
                <SkillCreateForm hideCreateForm={this._hideCreateForm} create={this._create} translate={translate}/>
              </SkillItemWrapper>
            }
            {
              skills.map((skill, i) => (
                <Skill
                  skill={skill}
                  skills={skills}
                  updateSkills={this._updateSkills}
                  translate={translate}
                  key={i}
                />
              ))
            }
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

const mapStateToProps = state => ({
  translate: getMessages(state)
})
export default connect(mapStateToProps)(Skills)