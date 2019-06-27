// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import CardContainer from '../../../common/cardContainer'
import ResumeForm from './ResumeForm'
import ResumeView from './ResumeView'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  deleteFile: Function,
  updateUser: Function,
}

type States = {
  isEdit: boolean,
}

class Certificate extends React.Component<Props, States> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    deleteFile: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
  }

  state = {
    isEdit: false,
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render() {
    const {owner, translate, deleteFile, updateUser} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            isEdit
                ? <ResumeForm toggleEdit={this._toggleEdit} translate={translate} owner={owner}/>
                : <ResumeView updateUser={updateUser} owner={owner} translate={translate}
                              toggleEdit={this._toggleEdit} deleteFile={deleteFile}/>
          }
        </CardContainer>
    )
  }
}

export default Certificate