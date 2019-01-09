// @flow
import React from "react"
import {Component} from "react"

import BadgeActions from "src/redux/actions/commonActions/badgeActions"
import Certificates from "./common/certificates/index"
import ChatBar from "./bars/ChatBar"
import Customers from "./organization/customers/index"
import OrganizationActions from "src/redux/actions/organization/organizationActions"
import Posts from "src/views/common/post/index"
import PostExtendedView from 'src/views/common/post/PostView'
import PrivateRoute from "../consts/PrivateRoute"
import PropTypes from "prop-types"
import Social from "src/views/common/social/index"
import TopBar from "./bars/TopBar"
import type {badgeType} from "src/consts/flowTypes/common/badges"
import type {identityStateObject, listOfIdObject, organStateObject} from "src/consts/flowTypes/stateObjectType"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {ContributionIcon, postIcon, CertificateIcon, InformationIcon, SocialIcon, customerIcon} from "../images/icons"
import OrganizationBasicInformation from "./organization/basicInformation/index"
import {NavLink, Switch, Redirect} from "react-router-dom"
import {OrganSideBar} from "src/views/bars/SideBar"
import {Tabs} from "src/views/common/cards/Frames"
import {VerifyWrapper} from "./common/cards/Frames"
import constants from "../consts/constants";
import ParamActions from "src/redux/actions/paramActions"
import GetIdentityActions from "../redux/actions/identityActions"
import Contributions from "./common/contributions"
import type {fileType} from "../consts/flowTypes/common/fileType";
import Material from 'src/views/common/components/Material'
import { getMessages } from '../redux/selectors/translateSelector'

type PropsOrganization = {
  organObject: organStateObject,
  badgesObject: listOfIdObject,
  badges: Array<badgeType>,
  organBanner: fileType | {},
  organLogo: fileType | {},
  match: {
    [string]: string,
    params: { [string]: string }
  },
  actions: {
    getOrganizationByOrganId: Function,
    getOrganBadges: Function,
    removeParamOrganId: Function,
    setParamOrganId: Function,
    getOrgIdentity: Function,
  },
  identityObject: identityStateObject,
}

export class Organization extends Component<PropsOrganization> {
  static propTypes = {
    organObject: PropTypes.object.isRequired,
    badgesObject: PropTypes.object.isRequired,
    badges: PropTypes.array.isRequired,
    organBanner: PropTypes.object,
    organLogo: PropTypes.object,
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    identityObject: PropTypes.object.isRequired,
  }

  firstGetBadges: boolean

  constructor(props: PropsOrganization) {
    super(props)
    this.firstGetBadges = true
  }


  componentDidUpdate(prevProps: PropsOrganization) {
    const {params} = this.props.match
    const organId: number = +params.id
    const {identityObject, actions} = this.props
    const {getOrganizationByOrganId, getOrgIdentity, setParamOrganId} = actions

    if (+prevProps.match.params.id !== organId) {
      getOrganizationByOrganId(organId)
      getOrgIdentity(organId)
      setParamOrganId({id: organId})
    }

    if (this.firstGetBadges && identityObject.content && prevProps.identityObject !== identityObject) {
      const {params} = this.props.match
      const organId: number = +params.id
      const {getOrganBadges} = actions
      getOrganBadges(organId)
      this.firstGetBadges = false
    }
  }

  componentDidMount() {
    const {params} = this.props.match
    const organId = +params.id
    const {getOrganizationByOrganId, getOrganBadges, setParamOrganId, getOrgIdentity} = this.props.actions
    getOrganizationByOrganId(organId)
    getOrgIdentity(organId)
    getOrganBadges(organId)
    setParamOrganId({id: organId})
  }

  componentWillUnmount() {
    const {removeParamOrganId} = this.props.actions
    removeParamOrganId()
  }

  render() {
    const {organObject, badgesObject, badges, organLogo, organBanner, identityObject,translate} = this.props
    const {path, url, params} = this.props.match
    const organizationId = +params.id
    const isLoading = organObject.isLoading || badgesObject.isLoading //TODO mohsen: added get files isLoading
    const errorMessage = organObject.error || badgesObject.error //TODO mohsen:added get files error
    return (
        <div className="-userOrganBackgroundImg">
          {/*<TopBar collapseClassName="col user-sidebar-width"/>*/}
          <VerifyWrapper isLoading={isLoading} error={errorMessage} className="-main page-content">
            {(!identityObject.content) ? '' : (
                <OrganSideBar
                              organ={organObject.content}
                              badges={badges}
                              organLogo={organLogo}
                              organBanner={organBanner}
                              className="col-md-3 col-sm-1 -right-sidebar-wrapper pr-0 pl-0"
                              paramId={organizationId}
                              identityId={identityObject.content}
                />
            )}
            <div className="col-md-6 col-sm-10 center-column">
              {/*<Tabs>*/}
                {/*<NavLink className="-tab" to={`${url}/contributions`} activeClassName="-active">*/}
                  {/*<ContributionIcon/>*/}
                {/*</NavLink>*/}
                {/*<NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">*/}
                  {/*{postIcon}*/}
                {/*</NavLink>*/}
                {/*<NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">*/}
                  {/*<InformationIcon/>*/}
                {/*</NavLink>*/}
                {/*<NavLink className="-tab" to={`${url}/SocialConnections`} activeClassName="-active">*/}
                  {/*<SocialIcon/>*/}
                {/*</NavLink>*/}
                {/*<NavLink className="-tab" to={`${url}/Customers`} activeClassName="-active">*/}
                  {/*{customerIcon()}*/}
                {/*</NavLink>*/}
                {/*<NavLink className="-tab" to={`${url}/Certificates`} activeClassName="-active">*/}
                  {/*<CertificateIcon/>*/}
                {/*</NavLink>*/}
              {/*</Tabs>*/}


              <div className='header-container'>

                <NavLink to={`${url}/contributions`} className='header-container-item' activeClassName='header-container-item-active'>
                  <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material-first' content={translate['Contributions']}/>
                </NavLink>

                <NavLink to={`${url}/Posts`} className='header-container-item' activeClassName='header-container-item-active'>
                  <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Stream']}/>
                </NavLink>

                <NavLink to={`${url}/basicInformation`} className='header-container-item' activeClassName='header-container-item-active'>
                  <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['About Me']}/>
                </NavLink>

                <NavLink to={`${url}/SocialConnections`} className='header-container-item' activeClassName='header-container-item-active'>
                  <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Socials']}/>
                </NavLink>

                <NavLink to={`${url}/Customers`} className='header-container-item' activeClassName='header-container-item-active'>
                  <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Customers']}/>
                </NavLink>

                <NavLink to={`${url}/Certificates`} className='header-container-item' activeClassName='header-container-item-active'>
                  <Material backgroundColor='rgba(66,172,151,0.4)' className='header-container-item-material' content={translate['Certificates']}/>
                </NavLink>

              </div>

              {
                (!identityObject.content) ? '' : (
                    <Switch>
                      <Redirect exact from={`${url}/`} to={`${url}/contributions`}/>
                      <PrivateRoute path={`${path}/contributions`}
                                    component={Contributions}
                                    ownerId={organizationId}
                                    identityId={identityObject.content}
                                    identityType={constants.USER_TYPES.ORG}
                                    isUser={false}
                      />
                      <PrivateRoute exact={true} path={`${path}/Posts`} component={Posts} id={organizationId}
                                    identityType={constants.USER_TYPES.ORG}
                                    postIdentity={identityObject.content}
                      />
                      <PrivateRoute path={`${path}/Posts/:id`} component={PostExtendedView}
                                    postIdentity={identityObject.content}
                                    extendedView={true}
                                    commentParentType= {constants.COMMENT_PARENT.POST}/>
                      <PrivateRoute exact path={`${path}/basicInformation`}
                                    component={OrganizationBasicInformation}
                                    organizationId={organizationId}
                                    organization={organObject.content}
                      />
                      <PrivateRoute path={`${path}/SocialConnections`} component={Social}
                                    ownerId={organizationId}
                                    identityId={identityObject.content}
                                    identityType={constants.USER_TYPES.ORG}
                      />
                      <PrivateRoute path={`${path}/Customers`}
                                    component={Customers}
                                    organizationId={organizationId}
                      />
                      <PrivateRoute path={`${path}/Certificates`}
                                    component={Certificates}
                                    ownerId={organizationId}
                                    identityId={identityObject.content}
                                    identityType={constants.USER_TYPES.ORG}
                      />
                    </Switch>
                )
              }
            </div>
            <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
              <ChatBar/>
            </div>
          </VerifyWrapper>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {params} = ownProps.match
  const organId = +params.id
  const stateOrgan = state.organs.list[organId]
  const defaultObject = {content: {}, isLoading: false, error: null}
  const defaultObject2 = {content: [], isLoading: false, error: null}
  const identity = (stateOrgan && stateOrgan.identity) || {content: null, isLoading: false, error: null}
  const bannerId = (stateOrgan && stateOrgan.organBannerId) || null
  const logoId = (stateOrgan && stateOrgan.organLogoId) || null
  const organBanner = (bannerId && state.common.file.list[bannerId]) || {}
  const organLogo = (logoId && state.common.file.list[logoId]) || {}
  const badgesObjectInOrgan = (stateOrgan && stateOrgan.badges) ? stateOrgan.badges : defaultObject2
  const allBadges = state.common.badges.badge.list
  const badges = badgesObjectInOrgan.content.map(badgeId => allBadges[badgeId])
  return {
    organObject: (stateOrgan && stateOrgan.organization) || defaultObject,
    badgesObject: badgesObjectInOrgan,
    badges,
    organBanner,
    organLogo,
    identityObject: identity,
    translate: getMessages(state),
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getOrganizationByOrganId: OrganizationActions.getOrganizationByOrganId,
    getOrganBadges: BadgeActions.getOrganBadges,
    setParamOrganId: ParamActions.setParamOrganId,
    removeParamOrganId: ParamActions.removeParamOrganId,
    getOrgIdentity: GetIdentityActions.getOrgIdentity
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Organization)