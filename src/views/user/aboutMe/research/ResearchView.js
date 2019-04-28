// @flow
import * as React from "react"
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal'
import CheckOwner from '../../../common/CheckOwner'
import ResearchForm from './ResearchForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {researchType} from 'src/consts/flowTypes/user/others'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {EditIcon, EducationIcon} from 'src/images/icons'

type ResearchProps = {
  owner: identityType,
  translate: TranslatorType,
  researches: [researchType],
  toggleEdit: Function,
  updateResearch: Function,
  deleteResearch: Function,
}

type ResearchStates = {
  isEdit: { [number]: boolean },
  isDelete: { [number]: boolean },
  isLoading: { [number]: boolean },
}

class ResearchView extends React.Component <ResearchProps, ResearchStates> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    researches: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateResearch: PropTypes.func.isRequired,
    deleteResearch: PropTypes.func.isRequired,
  }

  state = {
    isEdit: {},
    isDelete: {},
    isLoading: {},
  }

  _toggleEditResearch(id: number) {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
  }

  _toggleDeleteResearch(id: number) {
    let {isDelete} = this.state
    if (!isDelete[id]) {
      isDelete[id] = false
    }
    this.setState({...this.state, isDelete: {...isDelete, [id]: !isDelete[id]}})
  }

  _deleteResearch = (id: number) => {
    const {deleteResearch, owner} = this.props
    const {isLoading} = this.state
    !isLoading[id] && deleteResearch({researchId: id, userId: owner.id})

    this.setState({...this.state, isLoading: {...isLoading, [id]: true}})
  }

  render() {
    const {translate, researches, owner, toggleEdit, updateResearch} = this.props
    const {isEdit, isDelete} = this.state
    return (
        <React.Fragment>
          <div className="card-header">
            <div className="header-title">
              {translate['Research']}
            </div>
            <CheckOwner id={owner.id}>
              <div className='add-button pulse' onClick={toggleEdit}>
                + {translate['Add']}
              </div>
            </CheckOwner>
          </div>

          <div className="content">
            {researches.map(research => {
                  return (
                      !isEdit[research.id]
                          ? <React.Fragment key={'research ' + research.id}>
                            <CardRowContainer title={translate['Scientific Research']} svgImage={<EducationIcon/>}
                                              createdTime={research.created_time}
                            >
                              <div className='card-row-content-right card-row-entity'>
                                <CheckOwner id={owner.id}>
                                  <EditIcon className='edit-icon pulse'
                                            clickHandler={() => this._toggleEditResearch(research.id)}/>
                                  <FontAwesome className='trash-icon pulse' name='trash'
                                               onClick={() => this._toggleDeleteResearch(research.id)}/>
                                </CheckOwner>
                                <p className='text'>{research.title}</p>
                                <p className='text'>{research.author}</p>
                                <a className='blue-text' href={research.url}><FontAwesome name='link'/> {translate['Link']}</a>
                              </div>
                            </CardRowContainer>
                            <ConfirmDeleteModal key={'delete research ' + research.id} translate={translate}
                                                closer={() => this._toggleDeleteResearch(research.id)}
                                                deleteEntity={() => this._deleteResearch(research.id)}
                                                open={isDelete[research.id]}/>
                          </React.Fragment>
                          : <ResearchForm key={'research form' + research.id} updateResearch={updateResearch}
                                          translate={translate} owner={owner} research={research}
                                          toggleEdit={() => this._toggleEditResearch(research.id)}/>
                  )
                }
            )}
          </div>
        </React.Fragment>
    )
  }
}

export default ResearchView