// @flow
import * as React from 'react'
import PropTypes from 'prop-types'

import CardContainer from '../../../common/cardContainer'
import EducationView from './EducationView'
import EducationForm from './EducationForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import type {userEducationType} from 'src/consts/flowTypes/user/basicInformation'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  educations: [userEducationType],
  createEducation: Function,
  updateEducation: Function,
  getEducations: Function,
}

type States = {
  isEdit: boolean,
}

class Education extends React.Component<Props, States> {
  state = {
    isEdit: false,
  }

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    educations: PropTypes.array.isRequired,
    createEducation: PropTypes.func.isRequired,
    updateEducation: PropTypes.func.isRequired,
    getEducations: PropTypes.func.isRequired,
  }

  componentDidMount(): void {
    const {getEducations, owner} = this.props
    getEducations({
      userId: owner.id,
    })
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render() {
    const {owner, translate, createEducation, updateEducation, educations} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            !!isEdit
                ? <EducationForm createEducation={createEducation} toggleEdit={this._toggleEdit}
                                 translate={translate} owner={owner}/>
                : <EducationView updateEducation={updateEducation} educations={educations} owner={owner}
                                 translate={translate} toggleEdit={this._toggleEdit}/>
          }
        </CardContainer>
    )
  }
}

export default Education