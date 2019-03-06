import * as React from 'react'
import FontAwesome from 'react-fontawesome'

import {UploadIcon} from 'src/images/icons'
import type {organizationType} from 'src/consts/flowTypes/organization/organization'
import InteliInput from 'src/views/common/inputs/InteliInput'
import {CloseIconSvg} from 'src/images/icons'
import type {userProfileType} from 'src/consts/flowTypes/user/basicInformation'
import types from 'src/redux/actions/types'
import {createFileFunc} from '../../../common/Functions'
import constants from 'src/consts/constants'

type EventOrganFormProps = {|
  organization: organizationType,
  updateOrganization: Function,
  cancelForm: Function,
  getProvinces: Function,
  getCities: Function,
  createFile: Function,
  updateFile: Function,
  removeFileFromTemp: Function,
  profile: userProfileType,
  uploadedCatalog: number,
  createEventAssignment: Function,
  cities: {},
  provinces: {},
  selectedEvents: array,
  identityId: number,
|}

type EventOrganFormStates = {|
  cityList: Array<Object>,
  selectedCity: Object | null,
  selectedProvince: Object | null,
  contexts: Array<string>,
  catalog: string,
|}

class EventOrganForm extends React.Component<EventOrganFormProps, EventOrganFormStates> {

  constructor(props) {
    super(props)
    this.state = {
      cityList: [],
      selectedCity: null,
      selectedProvince: null,
      contexts: [],
      catalog: ''
    }
  }

  componentDidMount(): void {
    const {organization, getProvinces} = this.props

    this.setState({
      ...this.state, catalog: organization.related_catalog,
      selectedCity: organization.city,
      selectedProvince: organization.province
    })

    // TODO: mohammad iran provinces, change static id
    getProvinces(2882)
  }

  componentDidUpdate(prevProps: EventOrganFormProps, prevState: EventOrganFormStates): void {
    const {cities, provinces} = this.props
    const {cityList, selectedProvince,} = this.state
    const provinceList = Object.values(provinces.list)

    if (cityList.length < 1 && provinceList.length >= 1) {
      let citsArray: any = Object.values(cities.list).filter(p => p.town_related_province === selectedProvince)
      if (citsArray.length >= 1)
        this.setState({...this.state, cityList: citsArray.slice()})
    }
  }

  _handleProvince(data) {
    const {getCities, cities} = this.props
    getCities(data.id)
    let cits: any = Object.values(cities.list).filter(p => p.town_related_province === data.id)
    this.setState({...this.state, cityList: cits.slice(), selectedProvince: data.id, selectedCity: null})
  }

  _handleCity(data) {
    this.setState({...this.state, selectedCity: data.id})
  }

  _onSubmit = (e) => {
    const {
      updateOrganization, organization, cancelForm, updateFile, profile, uploadedCatalog,
      removeFileFromTemp, createEventAssignment, selectedEvents, user, identityId
    } = this.props
    const {selectedCity, selectedProvince, contexts} = this.state
    e.preventDefault()

    const form = e.target

    const ceoDetail = {
      name: form.ceo_name.value,
      mobile: form.ceo_mobile.value,
      membership: JSON.parse(form.ceo_membership.value),
    }

    const agentDetail = {
      name: form.agent_name.value,
      role: form.agent_role.value,
      membership: JSON.parse(form.agent_membership.value),
    }

    const contextsArray = contexts.join(', ')
    let categoryDetails = []

    for (let category of form.category_detail) {
      if (category.checked) {
        categoryDetails.push(category.value)
      }
    }
    let formValues = {
      username: form.username.value,
      nike_name: form.nike_name.value,
      national_code: form.national_code.value,
      biography: form.biography.value,
      established_year: form.established_year.value,
      phone: form.phone.value,
      web_site: form.web_site.value,
      address: form.address.value,
      province: selectedProvince,
      city: selectedCity,
      related_catalog: uploadedCatalog,
      is_knowledge_base: form.is_knowledge_base.value,
      ceo_detail: JSON.stringify(ceoDetail),
      agent_detail: JSON.stringify(agentDetail),
      description: contextsArray ? organization.description + '\n' + contextsArray : organization.description,
      category_detail: JSON.stringify(categoryDetails),
    }

    if (uploadedCatalog) {
      updateFile({
        id: uploadedCatalog,
        formData: {file_related_parent: profile.id},
        fileParentType: constants.FILE_PARENT.PROFILE,
      })
    }

    const reagentDetail = {
      name: form.reagent_name.value,
      mobile: form.reagent_mobile.value,
    }

    for (let eventId of selectedEvents) {
      const eventAssignmentFormValues = {
        event_assignment_related_event: eventId,
        event_assignment_related_identity: identityId,
        reagent_detail: JSON.stringify(reagentDetail)
      }

      createEventAssignment({
        formValues: eventAssignmentFormValues,
        eventId,
        organization: organization && organization.id
      })
    }

    updateOrganization({formValues, organizationId: organization.id})
    removeFileFromTemp(constants.TEMP_FILE_KEYS.CATALOG)
    cancelForm(e)
  }

  _addContext = () => {
    const {contexts} = this.state
    const context = this.context.value
    if (context !== '') {
      this.setState({...this.state, contexts: [...contexts, context]})
    }
  }

  _removeContext = (index) => {
    let {contexts} = this.state
    const result = [...contexts.slice(0, index), ...contexts.slice(index + 1)]

    this.setState({...this.state, contexts: result})
  }

  _createFile = () => {
    const {createFile} = this.props
    const {catalog} = this.state

    const nextActionType = types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionData = constants.TEMP_FILE_KEYS.CATALOG
    const createArguments = {
      fileIdKey: 'fileId',
      nextActionType,
      nextActionData: {tempFileKeyName: nextActionData}
    }
    createFileFunc(createFile, catalog, createArguments, constants.CREATE_FILE_TYPES.FILE,
        constants.CREATE_FILE_CATEGORIES.ORGAN_PROFILE.CATALOG)
  }

  _uploadHandler = (fileString: any) => {
    const reader = new FileReader()
    if (fileString) {
      reader.onload = () => {
        this.setState({
          ...this.state,
          catalog: reader.result,
        }, this._createFile)
      }
      reader.readAsDataURL(fileString)
    }
  }

  _removeCatalog = () => {
    this.setState({...this.state, catalog: ''})
  }

  renderCheckboxText = (categoryDetail, title) => {
    return (
        <label className="container-checkmark">
          <input defaultChecked={categoryDetail.includes(title)} name='category_detail' value={title} type="checkbox"/>
          <span className="checkmark"/>
          <p className='modal-text-field-label title-checkmark'>{title}</p>
        </label>
    )
  }

  render = () => {
    const {organization, cancelForm, provinces, cities} = this.props
    const {cityList, contexts, catalog} = this.state
    const provinceList = Object.values(provinces.list)
    const {category_detail, is_knowledge_base, ceo_detail, agent_detail, province, city, nike_name, username, national_code, biography, established_year, address, web_site, phone,} = organization
    const ceoDetail = ceo_detail ? JSON.parse(ceo_detail) : {}
    const agentDetail = agent_detail ? JSON.parse(agent_detail) : {}
    const categoryDetail = category_detail ? JSON.parse(category_detail) : []
    return (
        <React.Fragment>
          <form method='POST' className='event-modal-content' id='event_organ_form' onSubmit={this._onSubmit}>
            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام مجموعه <span
                    className='required-start'>*</span></label>
                <input name='nike_name' defaultValue={nike_name} className='modal-text-field' placeholder='نام مجموعه'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام کاربری <span className='required-start'>*</span></label>
                <input name='username' defaultValue={username} className='modal-text-field ltr-text-field'
                       placeholder='نام کاربری'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شماره ثبت <span className='required-start'>*</span></label>
                <input name='national_code' defaultValue={national_code} className='modal-text-field ltr-text-field'
                       placeholder='شماره ثبت'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شعار مجموعه</label>
                <input name='biography' defaultValue={biography} className='modal-text-field'
                       placeholder='شعار مجموعه'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>گواهی دانش بنیان معتبر <span
                    className='required-start'>*</span></label>
                <div className='radio-half-container'>
                  <label className="container-checkmark">
                    <input defaultChecked={is_knowledge_base} name='is_knowledge_base' type="radio" value='true'/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>بله</p>
                  </label>
                  <label className="container-checkmark">
                    <input defaultChecked={!is_knowledge_base} name='is_knowledge_base' type="radio" value='false'/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>خیر</p>
                  </label>
                </div>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام مدیر عامل <span
                    className='required-start'>*</span></label>
                <input defaultValue={ceoDetail.name ? ceoDetail.name : ''} name='ceo_name' className='modal-text-field'
                       placeholder='نام مدیر عامل'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>تاریخ تاسیس مجموعه <span
                    className='required-start'>*</span></label>
                <input name='established_year' defaultValue={established_year}
                       className='modal-text-field ltr-text-field modal-date-field' placeholder='روز / ماه / سال'/>
                <FontAwesome name='calendar' className='calendar-icon'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شماره همراه مدیر عامل (نتیجه به ایشان پیامک می شود) <span
                    className='required-start'>*</span></label>
                <input defaultValue={ceoDetail.mobile ? ceoDetail.mobile : ''} name='ceo_mobile'
                       className='modal-text-field ltr-text-field' placeholder='شماره تماس'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>عضویت مدیر عامل در گروه مجازی فحاد <span
                    className='required-start'>*</span></label>
                <div className='radio-half-container'>
                  <label className="container-checkmark">
                    <input defaultChecked={ceoDetail.membership} name='ceo_membership' type="radio" value='true'/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>بله</p>
                  </label>
                  <label className="container-checkmark">
                    <input defaultChecked={!ceoDetail.membership} name='ceo_membership' type="radio" value='false'/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>خیر</p>
                  </label>
                </div>
              </div>
            </div>

            <label className='modal-text-field-label'>دسته <span className='required-start'>*</span></label>
            <div className='half-text-fields-container'>
              <div className='checkbox-fields text-field-container'>
                {this.renderCheckboxText(categoryDetail, 'تولیدی، خدمات فنی - مهندسی')}
              </div>
              <div className='checkbox-fields text-field-container'>
                {this.renderCheckboxText(categoryDetail, 'شتابدهی و سرمایه گذار')}
              </div>
              <div className='checkbox-fields text-field-container'>
                {this.renderCheckboxText(categoryDetail, 'بازار و بازرگانی')}
              </div>
              <div className='checkbox-fields text-field-container'>
                {this.renderCheckboxText(categoryDetail, 'حقوقی، حسابداری، بیمه و مالیاتی')}
              </div>
              <div className='checkbox-fields text-field-container'>
                {this.renderCheckboxText(categoryDetail, 'تولید محتوا چند رسانه ای')}
              </div>
              <div className='checkbox-fields text-field-container'>
                {this.renderCheckboxText(categoryDetail, 'طراحی و پیاده سازی سایت و اپلیکیشن')}
              </div>
              <div className='checkbox-fields text-field-container'>
                {this.renderCheckboxText(categoryDetail, 'چاپ و نشر')}
              </div>
              <div className='checkbox-fields text-field-container'>
                {this.renderCheckboxText(categoryDetail, 'واسط')}
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>موضوع فعالیت <span
                    className='required-start'>*</span></label>
                <input ref={e => this.context = e} className='modal-text-field' placeholder='موضوع فعالیت'/>
              </div>
              <div className='add-context-container'>
                <div onClick={this._addContext} className='add-context'>
                  + افزودن موضوع بیشتر
                </div>
                {
                  contexts.map((context, index) =>
                      <div key={'context ' + index} className='context'>
                        {context}
                        <CloseIconSvg onClick={() => this._removeContext(index)} className='close-icon pulse'/>
                      </div>)
                }
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شماره تماس مجموعه <span
                    className='required-start'>*</span></label>
                <input name='phone' defaultValue={phone} className='modal-text-field ltr-text-field'
                       placeholder='شماره تماس'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>تارنما <span className='required-start'>*</span></label>
                <input name='web_site' defaultValue={web_site} className='modal-text-field ltr-text-field'
                       placeholder='تارنما'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>استان <span
                    className='required-start'>*</span></label>

                <div className='inteli-area modal-text-field'>
                  <InteliInput defaultValue={provinces.list[province] && provinces.list[province].name}
                               list={provinceList} handleChange={(data) => this._handleProvince(data)}/>
                </div>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شهر <span
                    className='required-start'>*</span></label>
                <div className='inteli-area modal-text-field'>
                  <InteliInput defaultValue={cities.list[city] && cities.list[city].name} list={cityList}
                               handleChange={(data) => this._handleCity(data)}/>
                </div>
              </div>
            </div>

            <div className='text-field-container'>
              <label className='modal-text-field-label'>آدرس مجموعه</label>
              <input name='address' defaultValue={address} className='modal-text-field' placeholder='آدرس'/>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام نماینده مجموعه در فحاد <span
                    className='required-start'>*</span></label>
                <input defaultValue={agentDetail.name ? agentDetail.name : ''} name='agent_name'
                       className='modal-text-field' placeholder='نام نماینده'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نقش/سمت نماینده در مجموعه <span
                    className='required-start'>*</span></label>
                <input defaultValue={agentDetail.role ? agentDetail.role : ''} name='agent_role'
                       className='modal-text-field' placeholder='سمت نماینده'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>عضویت نماینده در گروه مجازی فحاد <span
                    className='required-start'>*</span></label>
                <div className='radio-half-container'>
                  <label className="container-checkmark">
                    <input defaultChecked={agentDetail.membership} name='agent_membership' type="radio" value='true'/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>بله</p>
                  </label>
                  <label className="container-checkmark">
                    <input defaultChecked={!agentDetail.membership} name='agent_membership' type="radio" value='false'/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>خیر</p>
                  </label>
                </div>
              </div>

              <div className='text-field-container'>
                <label className='modal-text-field-label'>بارگزاری کاتالوگ مجموعه</label>
                {catalog
                    ? <div className='upload-again-file'>
                      کاتالوگ آپلود شده
                      <CloseIconSvg className='remove-catalog pulse' onClick={this._removeCatalog}/>
                    </div>
                    : <div className='upload-resume-container'>
                      <UploadIcon className='upload-resume'/>
                      <input type="file" onChange={e => this._uploadHandler(e.currentTarget.files[0])}/>
                    </div>
                }

              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام معرف فحاد به مجموعه</label>
                <input name='reagent_name' className='modal-text-field' placeholder='نام معرف فحاد'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شماره همراه معرف</label>
                <input name='reagent_mobile' className='modal-text-field ltr-text-field' placeholder='شماره تماس'/>
              </div>
            </div>
          </form>

          <div className="buttons">
            <input form='event_organ_form' type='submit' className="button save" value='ثبت'/>
            <div onClick={cancelForm} className="button cancel">لغو</div>
          </div>
        </React.Fragment>
    )
  }
}

export default EventOrganForm