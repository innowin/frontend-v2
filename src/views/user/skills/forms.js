// @flow
import * as React from "react"
import {Component} from "react"
import PropTypes from "prop-types"
import type {skillType} from "src/consts/flowTypes/user/others"
import {Confirm} from "../../common/cards/Confirm"
import {TextareaInput} from "../../common/inputs/TextareaInput"
import {TextInput} from "../../common/inputs/TextInput"

type PropsSkillForm = {
  onSubmit: Function,
  skill?: skillType,
  translate: { [string]: string },
  children?: React.Node
}
type StateSkillForm = {
  tag: (string)[]
}

export class SkillForm extends Component<PropsSkillForm, StateSkillForm> {
  constructor(props: PropsSkillForm) {
    super(props)
    this.state = {tag: []}
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    skill: PropTypes.object,
    translate: PropTypes.object.isRequired
  }

  _deleteTag(tagIndex: number) {
    const {tag} = this.state
    tag.splice(tagIndex, 1)
    this.setState({...this.state, tag: tag})
  }

  _addTag(tagInput: React.ElementRef<typeof TextInput>) {
    const {tag} = this.state
    tag.push(tagInput.getValue())
    this.setState({...this.state, tag: tag})
  }

  skillTitleInput: React.ElementRef<typeof TextInput>
  skillDescriptionInput: React.ElementRef<typeof TextareaInput>
  tagNameInput: React.ElementRef<typeof TextInput>
  tags: ?HTMLDivElement

  _getValues = (): {} => {
    const {tag} = this.state
    return {
      title: this.skillTitleInput.getValue(),
      description: this.skillDescriptionInput.getValue(),
      tag: tag
    }
  }

  _formValidate = (): boolean => {
    let result: boolean = true
    const validates = [
      this.skillTitleInput.validate(),
      this.skillDescriptionInput.validate(),
    ]
    for (let i = 0; i < validates.length; i++) {
      if (validates[i]) {
        result = false
        break
      }
    }
    return result
  }

  componentDidMount() {
    const {skill} = this.props
    if (skill) {
      this.setState({...this.state, tag: skill.tag})
    }
  }


  render() {
    const {onSubmit, translate} = this.props
    const skill = this.props.skill || {}
    const {tag} = this.state
    const tags = tag.map((tag, index) => {
      return (
        <div className="tagEdit m-1">
          <button className="tagCross btn btn-danger btn-sm" onClick={() => {
            this._deleteTag(index)
          }}>x
          </button>
          <span className="badge badge-secondary skillTag m-1">{tag}</span>
        </div>
      )
    })
    return (
      <form onSubmit={onSubmit} className="row w-100">
        <div className="descriptionBox">
          <TextInput
            name="title"
            label={translate['Title'] + ": "}
            value={skill.title}
            ref={skillTitleInput => {
              this.skillTitleInput = skillTitleInput
            }}
          />
          <TextareaInput
            name="description"
            label={translate['Description'] + ": "}
            value={skill.description}
            ref={skillDescriptionInput => {
              this.skillDescriptionInput = skillDescriptionInput
            }}
          />
          {/*//FixMe mohsen: handle below div*/}
          <div className="skillTags m-1" name="tags" ref={input => {
            this.tags = input
          }}>
            {tags}
          </div>
          <div className="skillAddTagInput">
            <input type="button" className="btn btn-primary m-2" value={translate['Add Tag']} onClick={() => {
              this._addTag(this.tagNameInput)
            }}/>
            <TextInput
              name="tagName"
              label={translate['Tag Name'] + ": "}
              ref={tagNameInput => {
                this.tagNameInput = tagNameInput
              }}
            />
          </div>
        </div>
        {this.props.children}
      </form>
    )
  }
}


type PropsSkillCreateForm = {
  create: Function,
  hideCreateForm: Function,
  translate: { [string]: string }
}

export class SkillCreateForm extends Component<PropsSkillCreateForm> {

  static propTypes = {
    create: PropTypes.func.isRequired,
    hideCreateForm: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired
  }

  form: ?React.ElementRef<typeof SkillForm>

  _save = () => {
    const {create, hideCreateForm} = this.props
    if(this.form){
      const formValues = this.form._getValues()
      create(formValues, hideCreateForm)
    }
  }

  _onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (this.form && this.form._formValidate()) {
      this._save()
    }
    return false
  }

  render() {
    const {hideCreateForm, translate} = this.props
    return <SkillForm onSubmit={this._onSubmit} ref={form => {
      this.form = form
    }} translate={translate}>
      <div className="col-12 d-flex justify-content-end">
        <button type="button" className="btn btn-secondary mr-2" onClick={hideCreateForm}>
          {translate['Cancel']}
        </button>
        <button type="submit" className="btn btn-success">{translate['Create']}</button>
      </div>
    </SkillForm>
  }
}



type PropsSkillEditForm = {
  skill: skillType,
  translate: { [string]: string },
  update: Function,
  remove: Function,
  hideEdit: Function,
  updateStateForView: Function
}

type StateSkillEditForm = {
  confirm: boolean
}

export class SkillEditForm extends Component<PropsSkillEditForm, StateSkillEditForm> {

  static propTypes = {
    update: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    hideEdit: PropTypes.func.isRequired,
    skill: PropTypes.object.isRequired,
    updateStateForView: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired
  }

  constructor(props:PropsSkillEditForm) {
    super(props)
    this.state = {confirm: false}
  }

  _showConfirm = () => {
    this.setState({confirm: true})
  }

  _cancelConfirm = () => {
    this.setState({confirm: false})
  }

  _remove = () => {
    const {skill, updateStateForView, hideEdit} = this.props
    return this.props.remove(skill.id, updateStateForView, hideEdit)
  }

  form: ?React.ElementRef<typeof SkillForm>

  _save = () => {
    const {skill, updateStateForView, hideEdit} = this.props
    const skillId = skill.id
    if(this.form){
      const formValues = this.form._getValues()
      this.props.update(formValues, skillId, updateStateForView, hideEdit)
    }
  }

  _onSubmit = (e:SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (this.form && this.form._formValidate()){
      this._save()
    }
    return null
  }

  render() {
    const {confirm} = this.state
    const {hideEdit, skill, translate} = this.props
    if (confirm) {
      return <Confirm cancelRemoving={this._cancelConfirm} remove={this._remove}/>
    }
    return <SkillForm onSubmit={this._onSubmit} skill={skill}
                      ref={form => {
                        this.form = form
                      }} translate={translate}>
      <div className="col-12 d-flex justify-content-end">
        <button type="button" className="btn btn-outline-danger mr-auto" onClick={this._showConfirm}>
          {translate['Delete']}
        </button>
        <button type="button" className="btn btn-secondary mr-2" onClick={hideEdit}>
          {translate['Cancel']}
        </button>
        <button type="submit" className="btn btn-success">{translate['Save']}</button>
      </div>
    </SkillForm>
  }
}