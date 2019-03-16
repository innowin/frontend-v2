//@flow
import * as React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getMessages } from "src/redux/selectors/translateSelector";
import { TranslatorType } from "src/consts/flowTypes/common/commonTypes";
import Description from "./description";

type OrganAboutUsProps = {
  organizationId : number,
  organization : Object,
  translate : TranslatorType,
  actions : Object,
  organ : Object,
}

type OrganAboutUsStates = {
  description: {
    isEdit: boolean
  }
}

class OrganAboutUs extends React.Component<OrganAboutUsProps, OrganAboutUsStates> {
  state = {
    description: {
      isEdit: false,
    }
  }
  
  render () {
    const {description} = this.state
    const {isEdit} = description
    return (
        <div className="about-us">
          <Description isEdit={isEdit}/>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  translate: getMessages(state)
});
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({}, dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(OrganAboutUs);