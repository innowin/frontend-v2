import React, {PureComponent} from 'react'
import Ticket from "../../../images/common/ticket_svg"
import MemberRequest from "./ManagementComponents/MemberRequest"
import Log from "./ManagementComponents/Log"
import Medal from "../../../images/common/medal_svg"

class ExchangeManager extends PureComponent {

  componentDidMount() {
    if (document.body.clientWidth > 480)
      window.scrollTo({top: 0, behavior: "smooth"})
  }

  render() {
    return (
        <div className="standard-exchange-margin-top">
          <div className={"ticket-frame"}>
            <div className={"ticket-header"}>
              <Ticket width="22px" height="22px"
                      containerClass={"svg-container-info-view svg-rotate-neutral"}
                      svgClass={"svg-info-view"}/>
              <span>تیکت (در حال طراحی)</span>
            </div>
          </div>

          <MemberRequest
              logo={<Medal containerClass='ticket-body-frame-logo-container' svgClass='ticket-body-frame-logo'/>}
              title={'درخواست عضویت'}
              userImage={null}
              name={'امین رحیمی پور'}
              description={'کارشناسی نرم افزار کارشناسی نرم افزار کارشناسی امین رحیمی پور'}
              dateTime={'97/02/02'}
              isFollowed={false}
          />

          <Log
              logo={<Medal containerClass='ticket-body-frame-logo-container' svgClass='ticket-body-frame-logo'/>}
              title={'درخواست عضویت'}
              name={'امین رحیمی پور'}
              dateTime={'97/02/02'}
          />

        </div>
    )
  }
}

export default ExchangeManager