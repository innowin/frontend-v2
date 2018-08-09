import React, {Component} from "react";

import Certificates from "./organization/certificates/index";
import ChatBar from "./bars/ChatBar";
import Customers from "./organization/customers/index";
import OrganizationActions from "src/redux/actions/organizationActions"
import Posts from "src/views/common/post/index";
import PrivateRoute from "../consts/PrivateRoute"
import Products from "./organization/products/index";
import PropTypes from "prop-types";
import Social from "src/views/organization/social/index";
import TopBar from "./bars/TopBar";
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {ContributionIcon, postIcon, CertificateIcon, InformationIcon, SocialIcon, customerIcon} from "../images/icons";
import {default as BasicInformation} from "./organization/basicInformation/index";
import {getMessages} from "../redux/selectors/translateSelector";
import {NavLink, Switch, Redirect} from "react-router-dom";
import {OrganSideBar} from "src/views/bars/SideBar";
import {Tabs} from "src/views/common/cards/Frames";

export class Organization extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    organObject: PropTypes.object.isRequired,
    translate: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  }

  componentDidMount(){
    const {params} = this.props.match
    const organId = +params.id
    const {getOrganizationByOrganId} = this.props.actions
    getOrganizationByOrganId(organId)
  }

  render() {
    const {organObject, translate} = this.props
    const {path, url, params} = this.props.match
    const organizationId = params.id
    const widthOfRightBar = "col-md-2 col-sm-1"
    return (
      <div className="-tabbed-pages -userOrganBackgroundImg">
        <TopBar collapseWidthCol={widthOfRightBar}/>
        <main className="row">
          <div className={`${widthOfRightBar} -right-sidebar-wrapper pr-0 pl-0`}>
            <OrganSideBar translate={translate} organObject={organObject}/>
          </div>
          <div className="col-md-8 col-sm-10 -content-wrapper">
            <Tabs>
              <NavLink className="-tab" to={`${url}/Products`} activeClassName="-active">
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
            <Switch>
              <Redirect exact from={`${url}/`} to={`${url}/Products`}/>
              <PrivateRoute path={`${path}/Products`} component={Products} organizationId={organizationId}/>
              <PrivateRoute path={`${path}/Posts`} component={Posts} id={organizationId} identityType='organization'/>
              <PrivateRoute exact path={`${path}/basicInformation`} component={BasicInformation}
                            organizationId={organizationId}/>
              <PrivateRoute path={`${path}/Customers`} component={Customers} organizationId={organizationId}/>
              <PrivateRoute path={`${path}/SocialConnections`} component={Social} organizationId={organizationId}/>
              <PrivateRoute path={`${path}/Certificates`} component={Certificates} organizationId={organizationId}/>
            </Switch>
          </div>
          <div className="col-md-2 col-sm-1 -left-sidebar-wrapper">
            <ChatBar/>
          </div>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {params} = ownProps.match
  const organId = +params.id
  const organ = state.organsInfo.organId || {
    // this object is default value for organ object
    content: {},
    isLoading: false,
    error: {
      message: null
    }
  }
  return {
    organObject: organ,
    translate: getMessages(state)
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getOrganizationByOrganId: OrganizationActions.getOrganization
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Organization)