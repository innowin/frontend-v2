// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import CardContainer from '../../../common/cardContainer'
import ResearchView from './ResearchView'
import ResearchForm from './ResearchForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {researchType} from 'src/consts/flowTypes/user/others'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  getResearches: Function,
  researches: [researchType],
  createResearch: Function,
  updateResearch: Function,
}

type States = {
  isEdit: boolean,
}

class Research extends React.Component<Props, States> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    getResearches: PropTypes.func.isRequired,
    researches: PropTypes.array.isRequired,
    createResearch: PropTypes.func.isRequired,
    updateResearch: PropTypes.func.isRequired,
  }

  state = {
    isEdit: false,
  }

  componentDidMount(): void {
    const {getResearches, owner} = this.props
    getResearches({
      userId: owner.id,
    })
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render() {
    const {owner, translate, createResearch, updateResearch, researches} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            !!isEdit
                ? <ResearchForm createResearch={createResearch} toggleEdit={this._toggleEdit}
                                translate={translate} owner={owner}/>
                : <ResearchView updateResearch={updateResearch} researches={researches} owner={owner}
                                translate={translate}
                                toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default Research