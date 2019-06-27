// @flow
import * as React from 'react'
import * as PropTypes from 'prop-types'

import CardContainer from '../../../common/cardContainer'
import CatalogForm from './CatalogForm'
import CatalogView from './CatalogView'
import type {fileType} from 'src/consts/flowTypes/common/fileType'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'

type Props = {
  owner: identityType,
  translate: TranslatorType,
  deleteFile: Function,
  updateUser: Function,
  files: { [number]: fileType },
}

type States = {
  isEdit: boolean,
}

class Hashtags extends React.Component<Props, States> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    deleteFile: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateProduct: PropTypes.func,
    files: PropTypes.object.isRequired,
  }

  state = {
    isEdit: false,
  }

  _toggleEdit = () => {
    const {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  render() {
    const {owner, translate, files, deleteFile, updateUser, updateProduct} = this.props
    const {isEdit} = this.state

    return (
        <CardContainer>
          {
            isEdit
                ? <CatalogForm updateProduct={updateProduct} updateUser={updateUser} owner={owner} toggleEdit={this._toggleEdit}
                               translate={translate} deleteFile={deleteFile}/>
                : <CatalogView updateProduct={updateProduct} updateUser={updateUser} owner={owner} toggleEdit={this._toggleEdit}
                               translate={translate} deleteFile={deleteFile} files={files}/>
          }
        </CardContainer>
    )
  }
}

export default Hashtags