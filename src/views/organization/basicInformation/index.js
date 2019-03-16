//@flow
import * as React from "react";
import { FrameCard, CategoryTitle } from "../../common/cards/Frames";
import { ListGroup } from "../../common/cards/Frames";
import BasicInfo from "./BasicInfo";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getMessages } from "src/redux/selectors/translateSelector";
import { TranslatorType } from "src/consts/flowTypes/common/commonTypes";
import Biography from "./Biography";
import ContactInfo from "./ContactInfo";
import PrivateInfo from "./PrivateInfo";
import CheckOwner from "../../common/CheckOwner";
import { LinkInfo } from "./LinkInfo";
import updateUserByUserIdAction from "../../../redux/actions/user/updateUserByUserIdAction";
import CardContainer from "src/views/organization/cardContainer";

type organizationBasicInformationProps = {
  organizationId : number,
  organization : Object,
  translate : TranslatorType,
  actions : Object,
  organ : Object,
}

class OrganizationBasicInformation extends React.Component<organizationBasicInformationProps> {
  
  render () {
    const { organizationId, organization, translate, actions } = this.props;
    return (
        <div className="about-us">
          <CardContainer>
            <Biography actions={actions} organizationId={organizationId} organization={organization}
                       translate={translate}/>
          </CardContainer>
          <CardContainer>
            <ContactInfo actions={actions} organizationId={organizationId} organization={organization}
                         translate={translate}/>
          </CardContainer>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  translate: getMessages(state)
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    updateUserByUserId: updateUserByUserIdAction.updateUser
  }, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(OrganizationBasicInformation);