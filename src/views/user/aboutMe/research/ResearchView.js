// @flow
import * as React from "react"
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
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
}

type ResearchStates = {
  isEdit: { [number]: boolean },
}

class ResearchView extends React.Component <ResearchProps, ResearchStates> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    researches: PropTypes.array.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    updateResearch: PropTypes.func.isRequired,
  }

  state = {
    isEdit: {},
  }

  _toggleEditResearch(id: number) {
    let {isEdit} = this.state
    if (!isEdit[id]) {
      isEdit[id] = false
    }
    this.setState({...this.state, isEdit: {...isEdit, [id]: !isEdit[id]}})
  }

  render() {
    const {translate, researches, owner, toggleEdit, updateResearch} = this.props
    const {isEdit} = this.state
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
                          ? <CardRowContainer key={'research ' + research.id} title={translate['Scientific Research']}
                                              svgImage={<EducationIcon/>} createdTime={research.created_time}
                          >
                            <div className='card-row-content-right card-row-entity'>
                              <CheckOwner id={owner.id}>
                                <EditIcon className='edit-icon pulse'
                                          clickHandler={() => this._toggleEditResearch(research.id)}/>
                              </CheckOwner>
                              <p className='text'>{research.title}</p>
                              <p className='text'>{research.author}</p>
                              <a className='blue-text' href={research.url}><FontAwesome name='link'/> {translate['Link']}</a>
                            </div>
                          </CardRowContainer>
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