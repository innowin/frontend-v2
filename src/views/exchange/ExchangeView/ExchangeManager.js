import React, {Component} from "react"
import Ticket from "../../../images/common/ticket_svg"

class ExchangeManager extends Component {
  componentDidMount() {
    window.scrollTo({
      top: 0
    })
  }

  render() {
    return (
        <div>
          <div className={"ticket-frame"}>
            <div className={"ticket-header"}>
              <Ticket width="22px" height="22px"
                      containerClass={"svg-container-info-view svg-rotate-neutral"}
                      svgClass={"svg-info-view"}/>
              <span>تیکت</span>
            </div>
          </div>
          <div>

          </div>
        </div>
    )
  }
}

export default ExchangeManager