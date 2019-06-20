// @flow
import * as React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import constants from 'src/consts/constants'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import Modal from '../../../pages/modal/modal'
import TempActions from 'src/redux/actions/tempActions'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import UploadFile from '../../../common/components/UploadFile'

type Props = {
  toggleEdit: Function,
  translate: TranslatorType,
  owner: identityType,
  actions: {
    removeFileFromTemp: Function,
    updateFile: Function,
  },
  newCatalog: Object,
}

type States = {
  modalIsOpen: boolean,
}

class CatalogForm extends React.Component<Props, States> {

  static propTypes = {
    toggleEdit: PropTypes.func.isRequired,
    translate: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }

  state = {
    modalIsOpen: true,
  }

  _toggle = () => {
    const {toggleEdit, actions} = this.props
    const {removeFileFromTemp} = actions
    const fileKey = constants.TEMP_FILE_KEYS.CATALOG
    removeFileFromTemp(fileKey)
    this.setState({...this.state, modalIsOpen: false})
    toggleEdit()
  }

  _onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    const {owner, actions, newCatalog, updateUser, updateProduct, deleteFile} = this.props
    const {updateFile} = actions
    e.preventDefault()
    e.stopPropagation()

    const newCatalogId = newCatalog && newCatalog.uploadedFileId
    const removedCatalogId = newCatalog && newCatalog.removedId
    let formValues = {
      related_catalog: newCatalogId ? newCatalogId
          : (removedCatalogId ? '' : owner.related_catalog),
    }

    let formProductValues = {
      product_catalog: newCatalogId ? newCatalogId
          : (removedCatalogId ? '' : owner.product_catalog),
    }

    updateUser && updateUser(formValues, owner.id)
    updateProduct && updateProduct({formValues: formProductValues, productId: owner.id})

    newCatalogId && updateFile({
      id: newCatalogId,
      formData: {file_related_parent: owner.id},
      fileParentType: updateProduct ? constants.FILE_PARENT.PRODUCT : constants.FILE_PARENT.PROFILE,
    })
    removedCatalogId && deleteFile({
      fileId: removedCatalogId,
      fileParentId: owner.id,
      fileParentType: updateProduct ? constants.FILE_PARENT.PRODUCT : constants.FILE_PARENT.PROFILE,
    })
    this._toggle()
  }

  render() {
    const {modalIsOpen} = this.state
    const {translate, owner} = this.props

    return (
        <div className="event-card">
          <Modal open={modalIsOpen} closer={this._toggle}>
            <form method='POST' onSubmit={this._onSubmit} className="event-modal edit-modal">
              <div className="head">
                <div className="title">{translate['Upload Catalog File']}</div>
              </div>
              <div className='our-modal-body'>
                <div className='detail-row'>
                  <p className='title'>{translate['Upload Attach File']}</p>
                  <UploadFile fileParentId={owner && owner.id}
                              fileId={owner && (owner.related_catalog || owner.product_catalog)}
                              fileCategory={constants.CREATE_FILE_CATEGORIES.ORGAN_PROFILE.CATALOG}
                              fileType={constants.CREATE_FILE_TYPES.FILE}
                              fileKey={constants.TEMP_FILE_KEYS.CATALOG}/>
                </div>

                <div className='detail-row'>
                  <p className='title'>{translate['Complete the profile with catalog']}</p>
                  <div className='modal-tip resume-modal'>{translate['Upload catalog tip']}</div>
                  <label className="container-checkmark">
                    <input defaultChecked type="checkbox" name="fill_profile"/>
                    <span className="checkmark"/>
                    <p className='fill-resume-text'>{translate['Complete the profile with catalog']}</p>
                  </label>

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

const mapStateToProps = (state) => ({
  newCatalog: state.temp.file[constants.TEMP_FILE_KEYS.CATALOG],
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    removeFileFromTemp: TempActions.removeFileFromTemp,
    updateFile: FileActions.updateFile,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(CatalogForm)