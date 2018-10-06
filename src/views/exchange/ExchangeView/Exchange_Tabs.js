import React, {Component} from "react"
import {connect} from "react-redux"
import {getMessages} from "src/redux/selectors/translateSelector"
import {Stream, Info, Statistic, Contacts, Medal, Ticket,} from "src/images/icons"
import Exchange_Info from "./Exchange_Info"
import "src/styles/components/exchange/posts.scss"
import "src/styles/components/exchange/info.scss"

class Exchange_Tabs extends Component {
  constructor(props) {
    super(props)
    this.state =
        {
          selectedTab: "Stream",
          // selectedTab: "Members", // DEVELOP
        }
    this.setTab = this.setTab.bind(this)
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      clickedSvgStyle: "svg-tabs-clicked",
      clickedSvgContainerStyle: "svg-container-clicked",
      normalSvgStyle: "svg-tabs",
      normalSvgContainerStyle: "svg-container"
    })
  }

  setTab(data) {
    this.setState({...this.state, selectedTab: data})
  }

  render() {
    const {translate, exchangeId} = this.props
    return (
        <div style={{width: "99%"}}>
          <div className={"exchange-center-background"}/>
          <div className={`exchange-navbar-center`}>
            <Stream width="27px" height="27px"
                    containerClass={this.state.selectedTab === "Stream" ? this.state.clickedSvgContainerStyle : this.state.normalSvgContainerStyle}
                    svgClass={this.state.selectedTab === "Stream" ? this.state.clickedSvgStyle : this.state.normalSvgStyle}
                    changeView={(data) => this.setTab(data)}/>
            <Info width="27px" height="27px"
                  containerClass={this.state.selectedTab === "Info" ? this.state.clickedSvgContainerStyle : this.state.normalSvgContainerStyle}
                  svgClass={this.state.selectedTab === "Info" ? this.state.clickedSvgStyle : this.state.normalSvgStyle}
                  changeView={(data) => this.setTab(data)}/>
            <Statistic width="27px" height="27px"
                       containerClass={this.state.selectedTab === "Statistic" ? this.state.clickedSvgContainerStyle : this.state.normalSvgContainerStyle}
                       svgClass={this.state.selectedTab === "Statistic" ? this.state.clickedSvgStyle : this.state.normalSvgStyle}
                       changeView={(data) => this.setTab(data)}/>
            <Contacts width="28px" height="28px"
                      containerClass={this.state.selectedTab === "Members" ? this.state.clickedSvgContainerStyle : this.state.normalSvgContainerStyle}
                      svgClass={this.state.selectedTab === "Members" ? this.state.clickedSvgStyle : this.state.normalSvgStyle}
                      changeView={(data) => this.setTab(data)}/>
            <Medal width="27px" height="27px"
                   containerClass={this.state.selectedTab === "Medals" ? this.state.clickedSvgContainerStyle : this.state.normalSvgContainerStyle}
                   svgClass={this.state.selectedTab === "Medals" ? this.state.clickedSvgStyle : this.state.normalSvgStyle}
                   changeView={(data) => this.setTab(data)}/>
            <Ticket width="27px" height="27px"
                    containerClass={this.state.selectedTab === "Exchange Manager" ? this.state.clickedSvgContainerStyle : this.state.normalSvgContainerStyle}
                    svgClass={this.state.selectedTab === "Exchange Manager" ? this.state.clickedSvgStyle : this.state.normalSvgStyle}
                    changeView={(data) => this.setTab(data)}/>
          </div>
          <div className={`under-exchange-navbar-center`}>
            {translate[this.state.selectedTab]}
          </div>
          <div className={`line-under-exchange-navbar-center`}/>
          <div className={`exchange-content-view-frame`}>
            <Exchange_Info activeTab={this.state.selectedTab} exchangeId={exchangeId}/>
          </div>
        </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    translate: getMessages(state)
  }
}
export default connect(mapStateToProps)(Exchange_Tabs)