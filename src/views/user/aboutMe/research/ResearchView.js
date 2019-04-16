// @flow
import * as React from "react";
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {researchType} from 'src/consts/flowTypes/user/others'
import CardRowContainer from 'src/views/common/components/CardRowContainer'
import {EditIcon, EducationIcon} from 'src/images/icons'
import CheckOwner from '../../../common/CheckOwner'
import ResearchForm from './ResearchForm'

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
    console.log(researches)
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
                              <a className='blue-text' href={research.url}>{translate['Link']}</a>
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