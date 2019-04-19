import * as React from 'react'
import {Component} from 'react'
import FontAwesome from 'react-fontawesome'

import {CloseIconSvg, UploadIcon} from 'src/images/icons'
import type {userProfileType, userType} from 'src/consts/flowTypes/user/basicInformation'
import InteliInput from 'src/views/common/inputs/InteliInput'
import constants from 'src/consts/constants'
import types from 'src/redux/actions/types'
import {createFileFunc} from '../../../common/Functions'


type EventPersonFormProps = {
  profile: userProfileType,
  user: userType,
  cancelForm: Function,
  getProvinces: Function,
  getCities: Function,
  updateUser: Function,
  createFile: Function,
  updateFile: Function,
  removeFileFromTemp: Function,
  cities: {},
  provinces: {},
  selectedEvents: array,
  identityId: number,
  uploadedResume: number,
  createEducation: Function,
  createSkill: Function,
}

type EventPersonFormStates = {|
  cityList: Array<Object>,
  educationCityList: Array<Object>,
  selectedCity: Object | null,
  selectedProvince: Object | null,
  selectedEducationProvince: Object | null,
  selectedEducationCity: Object | null,
  resume: '',
  skills: [],
  ideaAndProduct: boolean,
|}

class EventPersonForm extends Component<EventPersonFormProps, EventPersonFormStates> {

  constructor(props) {
    super(props)
    this.state = {
      cityList: [],
      educationCityList: [],
      selectedCity: null,
      selectedProvince: null,
      selectedEducationCity: null,
      selectedEducationProvince: null,
      resume: '',
      skills: [],
      ideaAndProduct: true,
    }
  }

  componentDidMount(): void {
    const {profile, getProvinces} = this.props

    this.setState({
      ...this.state,
      resume: profile.related_cv,
      selectedCity: profile.profile_related_town,
      selectedProvince: profile.profile_related_province,
    })

    // TODO: mohammad iran provinces, change static id
    getProvinces(2882)
  }

  componentDidUpdate(prevProps: EventPersonFormProps, prevState: EventPersonFormStates): void {
    const {cities, provinces} = this.props
    const {cityList, selectedProvince, educationCityList, selectedEducationProvince} = this.state

    const provinceList = Object.values(provinces.list)

    if (cityList.length < 1 && provinceList.length >= 1) {
      let citsArray: any = Object.values(cities.list).filter(p => p.town_related_province === selectedProvince)
      if (citsArray.length >= 1)
        this.setState({...this.state, cityList: citsArray.slice()})
    }

    if (educationCityList.length < 1 && provinceList.length >= 1) {
      let citsArray: any = Object.values(cities.list).filter(p => p.town_related_province === selectedEducationProvince)
      if (citsArray.length >= 1)
        this.setState({...this.state, educationCityList: citsArray.slice()})
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

  _handleEducationProvince(data) {
    const {getCities, cities} = this.props
    getCities(data.id)
    let cits: any = Object.values(cities.list).filter(p => p.town_related_province === data.id)
    this.setState({
      ...this.state,
      educationCityList: cits.slice(),
      selectedEducationProvince: data.id,
      selectedEducationCity: null
    })
  }

  _handleEducationCity(data) {
    this.setState({...this.state, selectedEducationCity: data.id})
  }

  _onSubmit = (e) => {
    const {
      createEventAssignment, identityId, cancelForm, profile, removeFileFromTemp, updateUser, user, uploadedResume,
      updateFile, selectedEvents, createEducation, createSkill
    } = this.props
    const {selectedCity, selectedProvince, skills} = this.state
    e.preventDefault()

    const form = e.target

    if (uploadedResume) {
      updateFile({
        id: uploadedResume,
        formData: {file_related_parent: profile.id},
        fileParentType: constants.FILE_PARENT.PROFILE,
      })
    }

    let formValueUserWithoutEmail = {
      username: form.username.value,
      first_name: form.first_name.value,
      last_name: form.last_name.value,
      province: selectedProvince,
      town: selectedCity,
      telegram_account: form.telegram_account.value === '' ? '' : constants.LINKS.TELEGRAM + form.telegram_account.value,
      mobile: form.mobile.value,
      related_cv: uploadedResume,
      work_status: form.work_status.value,
      military_serving_status: form.military_serving_status.value,
      gender: form.gender.value.replace("\"", ''),
    }

    let formValuesUser = user.email === form.email.value
        ? formValueUserWithoutEmail
        : {
          ...formValueUserWithoutEmail,
          email: form.email.value,
        }

    updateUser(formValuesUser, user.id)

    let formValuesEducation = {
      grade: form.grade.value,
      university: form.university.value,
      field_of_study: form.field_of_study.value,
      is_in_iran: JSON.parse(form.is_in_iran.value),
      from_date: form.from_date.value + '.1.1',
    }

    if (formValuesEducation.field_of_study && formValuesEducation.university) {
      createEducation({formValues: formValuesEducation, userId: user.id})
    }

    for (let skill of skills) {
      const formValues = {title: skill, skill_related_identity: user.id}
      createSkill({formValues, userId: user.id})
    }

    const reagentDetail = {
      name: form.reagent_name.value,
      mobile: form.reagent_mobile.value,
      telegram: form.reagent_telegram.value,
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
        userId: user && user.id,
      })
    }

    removeFileFromTemp(constants.TEMP_FILE_KEYS.CATALOG)
    cancelForm(e)
  }

  _createFile = () => {
    const {createFile} = this.props
    const {resume} = this.state

    const nextActionType = types.COMMON.FILE.SET_FILE_IDS_IN_TEMP_FILE
    const nextActionData = constants.TEMP_FILE_KEYS.RESUME
    const createArguments = {
      fileIdKey: 'fileId',
      nextActionType,
      nextActionData: {tempFileKeyName: nextActionData}
    }
    createFileFunc(createFile, resume, createArguments, constants.CREATE_FILE_TYPES.FILE,
        constants.CREATE_FILE_CATEGORIES.PROFILE.RESUME)
  }

  _uploadHandler = (fileString: any) => {
    const reader = new FileReader()
    if (fileString) {
      reader.onload = () => {
        this.setState({
          ...this.state,
          resume: reader.result,
        }, this._createFile)
      }
      reader.readAsDataURL(fileString)
    }
  }

  _removeResume = () => {
    this.setState({...this.state, resume: ''})
  }

  _addSkill = () => {
    const {skills} = this.state
    const skill = this.skill.value
    if (skill !== '') {
      this.setState({...this.state, skills: [...skills, skill]})
    }
  }

  _removeSkill = (index) => {
    let {skills} = this.state
    const result = [...skills.slice(0, index), ...skills.slice(index + 1)]

    this.setState({...this.state, skills: result})
  }

  _setIdeaAndProduct = () => {
    this.setState({...this.state, ideaAndProduct: !this.state.ideaAndProduct})
  }

  render = () => {
    const {profile, cancelForm, provinces, cities, user} = this.props
    const {cityList, educationCityList, resume, skills, selectedEducationProvince, selectedEducationCity, ideaAndProduct} = this.state
    const provinceList = Object.values(provinces.list)
    const {
      profile_related_province: province, profile_related_town: city,
      birth_date, gender, mobile, telegram_account
    } = profile

    const {username, first_name, last_name, email} = user
    const telegramAccount = telegram_account.replace(constants.LINKS.TELEGRAM, '')

    return (
        <React.Fragment>
          <form method='POST' className='event-modal-content' id='event_person_form' onSubmit={this._onSubmit}>
            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام <span
                    className='required-start'>*</span></label>
                <input defaultValue={first_name} name='first_name' className='modal-text-field' placeholder='نام'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام خانوادگی <span className='required-start'>*</span></label>
                <input defaultValue={last_name} name='last_name' className='modal-text-field'
                       placeholder='نام خانوادگی'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام کاربری <span className='required-start'>*</span></label>
                <input name='username' defaultValue={username} className='modal-text-field ltr-text-field'
                       placeholder='نام کاربری'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>تاریخ تولد <span className='required-start'>*</span></label>
                <input name='birth_date' defaultValue={birth_date}
                       className='modal-text-field ltr-text-field modal-date-field' placeholder='روز / ماه / سال'/>
                <FontAwesome name='calendar' className='calendar-icon'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>جنسیت <span className='required-start'>*</span></label>
                <div className='radio-half-container'>
                  <label className="container-checkmark">
                    <input defaultChecked={gender === constants.GENDER.MALE} name='gender' type="radio"
                           value={constants.GENDER.MALE}/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>مذکر</p>
                  </label>
                  <label className="container-checkmark">
                    <input defaultChecked={gender !== constants.GENDER.MALE} name='gender' type="radio"
                           value={constants.GENDER.FEMALE}/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>مونث</p>
                  </label>
                </div>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شماره تماس <span className='required-start'>*</span></label>
                <input name='mobile' defaultValue={mobile} className='modal-text-field ltr-text-field'
                       placeholder='شماره تماس'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام کاربری تلگرام <span
                    className='required-start'>*</span></label>
                <input name='telegram_account' defaultValue={telegramAccount} className='modal-text-field'
                       placeholder='نام کاربری تلگرام'/>
              </div>
            </div>

            <div className='half-text-fields-container'>

              <div className='text-field-container'>
                <label className='modal-text-field-label'>استان محل سکونت <span
                    className='required-start'>*</span></label>

                <div className='inteli-area modal-text-field'>
                  <InteliInput defaultValue={provinces.list[province] && provinces.list[province].name}
                               list={provinceList} handleChange={(data) => this._handleProvince(data)}/>
                </div>
              </div>

              <div className='text-field-container'>
                <label className='modal-text-field-label'>شهر محل سکونت <span
                    className='required-start'>*</span></label>
                <div className='inteli-area modal-text-field'>
                  <InteliInput defaultValue={cities.list[city] && cities.list[city].name} list={cityList}
                               handleChange={(data) => this._handleCity(data)}/>
                </div>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>ایمیل <span className='required-start'>*</span></label>
                <input name='email' defaultValue={email} className='modal-text-field ltr-text-field'
                       placeholder='ایمیل'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>محل تحصیل <span className='required-start'>*</span></label>
                <select name='is_in_iran' className='modal-text-field' placeholder='انتخاب کنید'>
                  <option value={true}>داخل کشور</option>
                  <option value={false}>خارج کشور</option>
                </select>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>وضعیت نظام وظیفه <span
                    className='required-start'>*</span></label>
                <select name='military_serving_status' className='modal-text-field' placeholder='انتخاب کنید'>
                  <option value={constants.MILITARY_SERVING_STATUS.EDUCATION_PARDON}>
                    {constants.MILITARY_SERVING_STATUS_FA.EDUCATION_PARDON}
                  </option>
                  <option value={constants.MILITARY_SERVING_STATUS.SERVING}>
                    {constants.MILITARY_SERVING_STATUS_FA.SERVING}
                  </option>
                  <option value={constants.MILITARY_SERVING_STATUS.THE_END_OF_SERVING}>
                    {constants.MILITARY_SERVING_STATUS_FA.THE_END_OF_SERVING}
                  </option>
                  <option value={constants.MILITARY_SERVING_STATUS.PERMANENT_EXEMPTION}>
                    {constants.MILITARY_SERVING_STATUS_FA.PERMANENT_EXEMPTION}
                  </option>
                  <option value={constants.MILITARY_SERVING_STATUS.APPLYING}>
                    {constants.MILITARY_SERVING_STATUS_FA.APPLYING}
                  </option>
                </select>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>وضعیت اشتغال <span className='required-start'>*</span></label>
                <select name='work_status' className='modal-text-field' placeholder='انتخاب کنید'>
                  <option value={constants.WORK_STATUS.UNEMPLOYED}>
                    {constants.WORK_STATUS_FA.UNEMPLOYED}
                  </option>
                  <option value={constants.WORK_STATUS.EMPLOYED}>
                    {constants.WORK_STATUS_FA.EMPLOYED}
                  </option>
                  <option value={constants.WORK_STATUS.SEARCH_FOR_A_BETTER_JOB}>
                    {constants.WORK_STATUS_FA.SEARCH_FOR_A_BETTER_JOB}
                  </option>
                </select>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>وضعیت تحصیلی <span className='required-start'>*</span></label>
                <select name='graduated' className='modal-text-field' placeholder='انتخاب کنید'>
                  <option value={false}>دانشجو</option>
                  <option value={true}>دانش آموخته</option>
                </select>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>مقطع <span className='required-start'>*</span></label>
                <select name='grade' className='modal-text-field' placeholder='انتخاب کنید'>
                  <option value={constants.SERVER_GRADES.BACHELOR}>کارشناسی</option>
                  <option value={constants.SERVER_GRADES.MASTER}>کارشناسی ارشد</option>
                  <option value={constants.SERVER_GRADES.PHD}>دکتری</option>
                </select>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>رشته(عنوان درج شده در کارت دانشجویی) <span
                    className='required-start'>*</span></label>
                <input name='field_of_study' className='modal-text-field' placeholder='رشته'/>
              </div>

              <div className='text-field-container'>
                <label className='modal-text-field-label'>دانشگاه<span
                    className='required-start'>*</span></label>
                <input name='university' className='modal-text-field' placeholder='دانشگاه'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>سال ورود <span className='required-start'>*</span></label>
                <input name='from_date' className='modal-text-field ltr-text-field' placeholder='سال ورود'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>پایان نامه</label>
                <input name='thesis' className='modal-text-field' placeholder='عنوان پایان نامه'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نوع دانشگاه <span className='required-start'>*</span></label>
                <select name='university_type' className='modal-text-field' placeholder='انتخاب کنید'>
                  <option value='public'>دولتی</option>
                  <option value='free'>آزاد</option>
                  <option value='technical'>فنی حرفه ای</option>
                </select>
              </div>
            </div>


            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>استان محل تحصیل <span
                    className='required-start'>*</span></label>

                <div className='inteli-area modal-text-field'>
                  <InteliInput
                      defaultValue={selectedEducationProvince && provinces.list[selectedEducationProvince].name}
                      list={provinceList} handleChange={(data) => this._handleEducationProvince(data)}/>
                </div>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شهر محل تحصیل <span
                    className='required-start'>*</span></label>
                <div className='inteli-area modal-text-field'>
                  <InteliInput defaultValue={selectedEducationCity && cities.list[selectedEducationCity].name}
                               list={educationCityList}
                               handleChange={(data) => this._handleEducationCity(data)}/>
                </div>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>مهارت یا توانمندی <span
                    className='required-start'>*</span></label>
                <input ref={e => this.skill = e} className='modal-text-field' placeholder='عنوان مهارت'/>
              </div>
              <div className='add-context-container'>
                <div onClick={this._addSkill} className='add-context'>
                  + افزودن موضوع بیشتر
                </div>
                {
                  skills.map((skill, index) =>
                      <div key={'skill' + index} className='context'>
                        {skill}
                        <CloseIconSvg onClick={() => this._removeSkill(index)} className='close-icon pulse'/>
                      </div>)
                }
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>بارگزاری رزومه به زبان فارسی</label>
              </div>
            </div>
            <div className='half-text-fields-container'>
              {resume
                  ? <div className='upload-again-file'>
                    کاتالوگ آپلود شده
                    <CloseIconSvg className='remove-catalog pulse' onClick={this._removeResume}/>
                  </div>
                  : <div className='upload-resume-container'>
                    <UploadIcon className='upload-resume'/>
                    <input type="file" onChange={e => this._uploadHandler(e.currentTarget.files[0])}/>
                  </div>
              }
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>عضویت در گروه مجازی فحاد <span
                    className='required-start'>*</span></label>
                <div className='radio-half-container'>
                  <label className="container-checkmark">
                    <input defaultChecked name='membership' type="radio"/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>بله</p>
                  </label>
                  <label className="container-checkmark">
                    <input name='membership' type="radio"/>
                    <span className="checkmark"/>
                    <p className='modal-text-field-label title-checkmark'>خیر</p>
                  </label>
                </div>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>نام معرف</label>
                <input name='reagent_name' className='modal-text-field' placeholder='نام معرف'/>
              </div>
            </div>

            <div className='half-text-fields-container'>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شماره همراه معرف</label>
                <input name='reagent_mobile' className='modal-text-field ltr-text-field' placeholder='شماره تماس'/>
              </div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>شماره همراه معرف در پیام رسان ها</label>
                <input name='reagent_telegram' className='modal-text-field ltr-text-field' placeholder='شماره تماس'/>
              </div>
            </div>

            <label className="container-checkmark">
              <input onChange={this._setIdeaAndProduct} defaultChecked type="checkbox"/>
              <span className="checkmark"/>
              <p className='modal-text-field-label title-checkmark'>محصول آزمایشگاهی، طرح و ایده مکتوب</p>
            </label>

            {ideaAndProduct &&
            <div>
              <div className='text-field-container'>
                <label className='modal-text-field-label'>حضور در تیم کسب و کار</label>
                <input className='modal-text-field' placeholder='توضیح کوتاه'/>
              </div>

              <div className='text-field-container'>
                <label className='modal-text-field-label'>دارای طرح و ایده مکتوب</label>
                <input className='modal-text-field' placeholder='توضیح کوتاه'/>
              </div>

              <div className='text-field-container'>
                <label className='modal-text-field-label'>دارای نمونه محصول اولیه</label>
                <input className='modal-text-field' placeholder='توضیح کوتاه'/>
              </div>

              <div className='text-field-container'>
                <label className='modal-text-field-label'>دارای اختراع ثبت شده</label>
                <input className='modal-text-field' placeholder='توضیح کوتاه'/>
              </div>
            </div>
            }

            <label className='modal-text-field-label'>علاقه مند به همکاری با فحاد در</label>
            <div className='half-text-fields-container'>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه مسجد</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>رایزن های علمی اقتصادی</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه دانش آموزی</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه کتاب خوانی</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه رسانه</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه زبان های خارجی</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>نماینده دانشگاهی</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه منابع انسانی و استعدادها</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>طراحی و توسعه سایت و اپلیکیشن</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه حقوقی</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه توسعه بازار (مجازی، حقیقی)</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه بین الملل</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه تولید و تدوین محتوا</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه آموزش</p>
                </label>
              </div>
              <div className='checkbox-fields text-field-container'>
                <label className="container-checkmark">
                  <input type="checkbox"/>
                  <span className="checkmark"/>
                  <p className='modal-text-field-label title-checkmark'>کارگروه حسابداری و مالیاتی</p>
                </label>
              </div>
            </div>
          </form>

          <div className="buttons">
            <input form='event_person_form' type='submit' className="button save" value='ثبت'/>
            <div onClick={cancelForm} className="button cancel">لغو</div>
          </div>
        </React.Fragment>
    )
  }
}

export default EventPersonForm