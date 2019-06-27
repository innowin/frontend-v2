// @flow
import * as React from 'react'
import FontAwesome from 'react-fontawesome'
import * as PropTypes from 'prop-types'

import CardRowContainer from 'src/views/common/components/CardRowContainer'
import CheckOwner from '../../../common/CheckOwner'
import ConfirmDeleteModal from '../../../common/ConfirmDeleteModal'
import constants from 'src/consts/constants'
import CatalogForm from './CatalogForm'
import type {identityType} from 'src/consts/flowTypes/identityType'
import type {TranslatorType} from 'src/consts/flowTypes/common/commonTypes'
import {EditIcon, LinkedInIcon} from 'src/images/icons'

type CatalogProps = {
  owner: identityType,
  translate: TranslatorType,
  toggleEdit: Function,
  deleteFile: Function,
  updateUser: Function,
}

type CatalogStates = {
  isEdit: boolean,
  isDelete: boolean,
  isLoading: boolean,
}

class CatalogView extends React.Component <CatalogProps, CatalogStates> {

  static propTypes = {
    owner: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    toggleEdit: PropTypes.func.isRequired,
    deleteFile: PropTypes.func.isRequired,
  }

  state = {
    isEdit: false,
    isDelete: false,
    isLoading: false,
  }

  _toggleEditCatalog() {
    let {isEdit} = this.state
    this.setState({...this.state, isEdit: !isEdit})
  }

  _toggleDeleteCatalog() {
    let {isDelete} = this.state
    this.setState({...this.state, isDelete: !isDelete})
  }

  _deleteCatalog = () => {
    const {deleteFile, owner, updateUser, updateProduct} = this.props
    const {isLoading} = this.state

    if (!isLoading) {
      deleteFile({
        fileId: owner.related_catalog || owner.product_catalog,
        fileParentId: owner.id,
        fileParentType: updateProduct ? constants.FILE_PARENT.PRODUCT : constants.FILE_PARENT.PROFILE,
      })

      const formValues = {
        related_catalog: '',
      }
      const formProductValues = {
        product_catalog: '',
      }
      updateUser && updateUser(formValues, owner.id)
      updateProduct && updateProduct({formValues: formProductValues, productId: owner.id})
    }

    this.setState({...this.state, isLoading: true})
  }

  render() {
    const {translate, owner, toggleEdit} = this.props
    const {isEdit, isDelete} = this.state
    const catalog = (owner.related_catalog) || (owner.product_catalog)
    return (
        <React.Fragment>
          <div className="card-header">
            <div className="header-title">
              {translate['Upload Catalog']}
            </div>
            {
              (!owner.related_catalog || !owner.product_catalog) &&
              <CheckOwner id={owner.product_owner ? owner.product_owner.id ? owner.product_owner.id : owner.product_owner : owner.id}>
                <div className='add-button pulse' onClick={toggleEdit}>
                  + {translate['Add']}
                </div>
              </CheckOwner>
            }
          </div>

          <div className="content">
            {!isEdit
                ? catalog &&
                <React.Fragment>
                  <CardRowContainer title={translate['Catalog']} svgImage={<LinkedInIcon/>}
                                    createdTime={catalog.created_time}
                  >
                    <div className='card-row-content-right card-row-entity'>
                      <CheckOwner id={owner.id}>
                        <EditIcon className='edit-icon pulse'
                                  clickHandler={() => this._toggleEditCatalog()}/>
                        <FontAwesome className='trash-icon pulse' name='trash'
                                     onClick={() => this._toggleDeleteCatalog()}/>
                      </CheckOwner>
                      <a className='attach-file' href={catalog.file}>
                        <FontAwesome className='attach-file-icon' name='paperclip'/>
                        {translate['Attached file']}
                      </a>
                    </div>
                  </CardRowContainer>

                  <ConfirmDeleteModal translate={translate} closer={() => this._toggleDeleteCatalog()}
                                      deleteEntity={() => this._deleteCatalog()} open={isDelete}/>
                </React.Fragment>
                : <CatalogForm translate={translate} owner={owner} toggleEdit={() => this._toggleEditCatalog()}/>
            }
          </div>
        </React.Fragment>
    )
  }
}

export default CatalogView