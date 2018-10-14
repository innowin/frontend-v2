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
import {getMessages} from "../redux/selectors/translateSelector"
import {NavLink, Switch, Redirect} from "react-router-dom"
import {OrganSideBar} from "src/views/bars/SideBar"
import {Tabs} from "src/views/common/cards/Frames"
import {TranslatorType} from "src/consts/flowTypes/common/commonTypes"
import {VerifyWrapper} from "./common/cards/Frames"
import constants from "../consts/constants";
import ParamActions from "src/redux/actions/paramActions"
import GetIdentityActions from "../redux/actions/identityActions"
import Contributions from "./common/contributions"

type PropsOrganization = {
  organObject: organStateObject,
  badgesObject: listOfIdObject,
  badges: Array<badgeType>,
  organBanner: ?string,
  organLogo: ?string,
  translate: TranslatorType,
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
    organBanner: PropTypes.string,
    organLogo: PropTypes.string,
    translate: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    identityObject: PropTypes.object.isRequired,
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
    const {organObject, badgesObject, badges, organLogo, organBanner, translate, identityObject} = this.props
    const {path, url, params} = this.props.match
    const organizationId = +params.id
    const isLoading = organObject.isLoading || badgesObject.isLoading //TODO mohsen: added get files isLoading
    const errorMessage = organObject.error || badgesObject.error //TODO mohsen:added get files error
    return (
        <div className="-userOrganBackgroundImg">
          <TopBar collapseClassName="col user-sidebar-width"/>
          <VerifyWrapper isLoading={isLoading} error={errorMessage} className="-main row">
            {(!identityObject.content) ? '' : (
                <OrganSideBar translate={translate}
                              organ={organObject.content}
                              badges={badges}
                              organLogo={organLogo}
                              organBanner={organBanner}
                              className="-right-sidebar-wrapper user-sidebar-width pr-0 pl-0"
                              paramId={organizationId}
                              identityId={identityObject.content}
                />
            )}
            <div className="col-md-6 col-sm-10 -content-wrapper">
              <Tabs>
                <NavLink className="-tab" to={`${url}/contributions`} activeClassName="-active">
                  <ContributionIcon/>
                </NavLink>
                <NavLink className="-tab" to={`${url}/Posts`} activeClassName="-active">
                  {postIcon}
                </NavLink>
                <NavLink className="-tab" to={`${url}/basicInformation`} activeClassName="-active">
                  <InformationIcon/>
                </NavLink>
                <NavLink className="-tab" to={`${url}/SocialConnections`} activeClassName="-active">
                  <SocialIcon/>
                </NavLink>
                <NavLink className="-tab" to={`${url}/Customers`} activeClassName="-active">
                  {customerIcon()}
                </NavLink>
                <NavLink className="-tab" to={`${url}/Certificates`} activeClassName="-active">
                  <CertificateIcon/>
                </NavLink>
              </Tabs>
              {
                (!identityObject.content) ? '' : (
                    <Switch>
                      <Redirect exact from={`${url}/`} to={`${url}/contributions`}/>
                      <PrivateRoute path={`${path}/contributions`}
                                    component={Contributions}
                                    ownerId={organizationId}
                                    identityId={identityObject.content}
                                    identityType={constants.USER_TYPES.ORG}
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
                      <PrivateRoute path={`${path}/Customers`}
                                    component={Customers}
                                    organizationId={organizationId}
                      />
                      <PrivateRoute path={`${path}/SocialConnections`} component={Social}
                                    ownerId={organizationId}
                                    identityId={identityObject.content}
                                    identityType={constants.USER_TYPES.ORG}
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
  const organ = (stateOrgan && stateOrgan.organization) || defaultObject
  const identity = (stateOrgan && stateOrgan.identity) || {content: null, isLoading: false, error: null}
  const bannerId = organ.content.organization_banner
  const logoId = organ.content.organization_logo
  const organBanner = (bannerId && state.common.file.list[bannerId] && state.common.file.list[bannerId].file) || null
  const organLogo = (logoId && state.common.file.list[logoId] && state.common.file.list[logoId].file) || null
  const badgesObjectInOrgan = (stateOrgan && stateOrgan.badges) ? stateOrgan.badges : defaultObject2
  const allBadges = state.common.badges.badge.list
  const badges = badgesObjectInOrgan.content.map(badgeId => allBadges[badgeId])
  return {
    organObject: organ,
    badgesObject: badgesObjectInOrgan,
    badges,
    organBanner,
    organLogo,
    identityObject: identity,
    translate: getMessages(state)
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