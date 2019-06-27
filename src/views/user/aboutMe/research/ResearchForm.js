// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import Modal from '../../../pages/modal/modal'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {userResearchType} from 'src/consts/flowTypes/user/basicInformation'
import Validations from 'src/helpers/validations/validations'
import numberCorrection from '../../../../helpers/numberCorrection'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  research?: userResearchType,
  createResearch?: Function,
  updateResearch?: Function,
  owner: identityType,
}

type States = {
  modalIsOpen: boolean,
  title: string,
  author: string,
  research_link: string,
  errors: {
    title: boolean,
    research_link: boolean,
  }
}

class ResearchForm extends React.Component<Props, States> {

  static propTypes = {
    toggleEdit: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    research: PropTypes.object,
    createResearch: PropTypes.func,
    updateResearch: PropTypes.func,
    owner: PropTypes.object.isRequired,
  }

  state = {
    modalIsOpen: true,
    title: '',
    author: '',
    research_link: '',
    errors: {
      title: false,
      research_link: false,
    }
  }

  componentDidMount(): void {
    const {research, translate} = this.props
    if (research) {
      this.setState({
        ...this.state,
        title: research.title,
        author: research.author,
        research_link: research.research_link,
      })
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          title: Validations.validateRequired({value: this.state.title, translate}),
        }
      })
    }
  }

  _toggle = () => {
    const {toggleEdit} = this.props
    this.setState({...this.state, modalIsOpen: false})
    toggleEdit()
  }

  _onChangeFields = (event: SyntheticEvent<HTMLInputElement>) => {
    const {translate} = this.props
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : numberCorrection(target.value)
    const name = target.name
    let error = false
    if (name === 'title') {
      error = Validations.validateRequired({value, translate})
    } else if (name === 'research_link') {
      error = Validations.validateURL({value, translate})
    }

    this.setState({
      ...this.state,
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: error
      }
    })
  }

  _onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const {createResearch, owner, updateResearch, research} = this.props
    const {errors} = this.state
    const {title: titleError, research_link: researchLinkError} = errors
    e.preventDefault()
    e.stopPropagation()

    const form = e.target

    let formValues = {
      title: form.title.value,
      author: form.author.value,
      research_link: numberCorrection(form.research_link.value),
      research_related_identity: owner.id,
    }

    if (Boolean(titleError || researchLinkError) === false) {
      if (updateResearch && research) {
        updateResearch({formValues, researchId: research.id, userId: owner.id})
      } else if (createResearch) {
        createResearch({formValues, userId: owner.id})
      }
      this._toggle()
    }
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, research} = this.props
    let title = '', author = '', researchLink = ''
    if (research) {
      title = research.title
      author = research.author
      researchLink = research.research_link
    }
    const {errors} = this.state
    const {title: titleError, research_link: researchLinkError} = errors

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal edit-modal">
              <div className="head">
                <div className="title">{translate['Add research']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Title']} <span className='required-star'>*</span></p>
                  <input defaultValue={title} onChange={this._onChangeFields} name='title'
                         className='edit-text-fields' placeholder={translate['Title']}/>
                  {titleError && <div className='text-field-error'>{titleError}</div>}
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Author']}</p>
                  <input defaultValue={author} onChange={this._onChangeFields} name='author'
                         className='edit-text-fields' placeholder={translate['Author']}/>
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Research Link']}</p>
                  <input defaultValue={researchLink} onChange={this._onChangeFields} name='research_link'
                         className='edit-text-fields' placeholder={translate['Research Link']}/>
                  {researchLinkError && <div className='text-field-error'>{researchLinkError}</div>}
                </div>
              </div>
              <div className="buttons">
                <input type='submit' className="button save" value={translate['Submit']}/>
                <div onClick={this._toggle} className="button cancel">{translate['Cancel']}</div>
              </div>
            </form>
          </Modal>
        </div>
    )
  }
}

export default ResearchForm