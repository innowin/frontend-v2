import * as React from 'react'
import {Component} from 'react'
import {bindActionCreators} from 'redux'

import constants from 'src/consts/constants'
import EventActions from 'src/redux/actions/eventActions'
import EventOrganForm from './EventsModal/EventOrganForm'
import EventPersonForm from './EventsModal/EventPersonForm'
import EventsList from './EventsModal/EventsList'
import FileActions from 'src/redux/actions/commonActions/fileActions'
import {getEventsSelector} from 'src/redux/selectors/event/event'
import Modal from './modal'
import OrganizationActions from 'src/redux/actions/organization/organizationActions'
import TempActions from 'src/redux/actions/tempActions'
import type {organizationType} from 'src/consts/flowTypes/organization/organization'
import type {userProfileType} from 'src/consts/flowTypes/user/basicInformation'
import UpdateProfileAction from 'src/redux/actions/user/updateProfileByProfileIdAction'
import UpdateUserAction from 'src/redux/actions/user/updateUserByUserIdAction'
import {connect} from 'react-redux'
import {getProvinces, getCities} from 'src/redux/actions/commonActions/location'
import EventAssignmentActions from 'src/redux/actions/eventAssignmentActions'
import EducationActions from 'src/redux/actions/user/educationActions'
import SkillActions from 'src/redux/actions/user/skillActions'

type Event = {|
  id: number,
  title: string,
  detail: [string],
  showDetails: boolean
|}

type EventModalProps = {
  identityId: number,
  isUser: boolean,
  organization: organizationType,
  cities: { list: {} },
  events: { [string]: Event },
  provinces: { list: {} },
  profile: userProfileType,
  actions: {|
    createEventAssignment: Function,
    createFile: Function,
    createSkill: Function,
    getCities: Function,
    getEvents: Function,
    getProvinces: Function,
    updateFile: Function,
    updateOrganization: Function,
  |}
}

type EventModalStates = {|
  events: { [string]: Event },
  selectedEvents: array,
  activeState: number
|}

class EventModal extends Component<EventModalProps, EventModalStates> {
  constructor(props: EventModalProps) {
    super(props)
    this.state = {
      events: this.props.events || {},
      selectedEvents: [],
      activeState: 0,
    }
  }


  componentDidMount(): void {
    const {actions, events} = this.props
    const {getEvents} = actions
    // getEvents()
  }

  componentDidUpdate(prevProps: Readonly<EventModalProps>, prevState: Readonly<EventModalStates>, snapshot: any): void {
    if (prevProps.events !== this.props.events) {
      this.setState({...this.state, events: {...this.props.events}})
    }
  }

  _toggleActiveEventId = (id: string, addIt: boolean) => {
    if (!!addIt) {
      this.setState({...this.state, selectedEvents: [...new Set([...this.state.selectedEvents, id])]})
    } else if (!addIt) {
      let currentList = this.state.selectedEvents
      // eslint-disable-next-line
      let [id, ...rest] = currentList
      this.setState({...this.state, selectedEvents: [...rest]})
    }
  }

  _toggle = (e) => {
    e.stopPropagation();
    this.setState({...this.state, activeState: 0})
    this.props.toggle()
  }

  _setOrganForm = () => {
    this.setState({...this.state, activeState: 2})
  }

  _setPersonForm = () => {
    this.setState({...this.state, activeState: 1})
  }

  render = () => {
    const {activeState, events, selectedEvents} = this.state
    const {isUser, organization, actions, cities, provinces, profile, uploadedCatalog, user, identityId, uploadedResume} = this.props
    const {
      updateOrganization, createFile, updateFile, removeFileFromTemp, getProvinces, getCities, updateProfile,
      updateUser, createEventAssignment, createEducation, createSkill
    } = actions
    const setForm = isUser ? this._setPersonForm : this._setOrganForm
    return (
        <React.Fragment>
          <Modal open={this.props.isOpen} closer={this._toggle}>
            <div className="event-modal">
              <div className="head">
                <div className="title">ثبت نام در رویداد های شبکهٔ نخبگان علمی - فناوری | فحاد</div>
                <div className="description">{
                  activeState === 0 ? 'مایل به شرکت در کدام رویداد ها هستید؟'
                      : activeState === 1 ? 'برای ثبت نام در رویداد فحاد، فیلدهای زیر را پر کنید. بعضی از این داده ها در پروفایل اینوین شما هم ذخیره می گردد.'
                      : activeState === 2 ? 'برای ثبت نام در رویداد فحاد، فیلدهای زیر را پر کنید. بعضی از این داده ها در پروفایل اینوین شما هم ذخیره می گردد.'
                          : ''
                }
                </div>
              </div>
              {activeState === 0 ?
                  <EventsList setForm={setForm} cancelForm={this._toggle} events={events}
                              toggleActiveEvent={this._toggleActiveEventId}
                  />
                  : activeState === 1 ?
                      <EventPersonForm createSkill={createSkill} createEducation={createEducation}
                                       uploadedResume={uploadedResume} identityId={identityId}
                                       createEventAssignment={createEventAssignment} selectedEvents={selectedEvents}
                                       updateUser={updateUser} getCities={getCities}
                                       getProvinces={getProvinces}
                                       removeFileFromTemp={removeFileFromTemp}
                                       updateFile={updateFile} createFile={createFile} profile={profile}
                                       provinces={provinces} cities={cities}
                                       cancelForm={this._toggle} user={user}
                                       updateProfile={updateProfile}/>
                      : activeState === 2 ?
                          <EventOrganForm identityId={identityId} selectedEvents={selectedEvents}
                                          removeFileFromTemp={removeFileFromTemp}
                                          createEventAssignment={createEventAssignment}
                                          uploadedCatalog={uploadedCatalog || organization.related_catalog}
                                          updateFile={updateFile} profile={profile} createFile={createFile}
                                          getCities={getCities} getProvinces={getProvinces}
                                          cities={cities}
                                          provinces={provinces} updateOrganization={updateOrganization}
                                          organization={organization} cancelForm={this._toggle} active={activeState}/>
                          : ''
              }
            </div>
          </Modal>
        </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const isUser = !state.auth.client.organization
  return {
    cities: state.common.location.city,
    events: getEventsSelector(state),
    isUser,
    organization: state.auth.client.organization,
    profile: state.auth.client.profile,
    provinces: state.common.location.province,
    identityId: state.auth.client.identity.content,
    uploadedCatalog: state.temp.file[constants.TEMP_FILE_KEYS.CATALOG],
    user: state.auth.client.user,
    uploadedResume: state.temp.file[constants.TEMP_FILE_KEYS.RESUME],
  }
}
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    createFile: FileActions.createFile,
    getEvents: EventActions.getEvents,
    updateOrganization: OrganizationActions.updateOrganization,
    updateProfile: UpdateProfileAction.updateProfile,
    getProvinces,
    getCities,
    updateFile: FileActions.updateFile,
    updateUser: UpdateUserAction.updateUser,
    removeFileFromTemp: TempActions.removeFileFromTemp,
    createEventAssignment: EventAssignmentActions.createEventAssignment,
    createEducation: EducationActions.createEducationByUserId,
    createSkill: SkillActions.createSkill
  }, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EventModal)