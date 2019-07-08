import React, {Component} from "react"
import FahadEventPageOne from "./FahadEventPageOne"
import FahadEventPageTwo from "./FahadEventPageTwo"
import FahadEventPageThree from "./FahadEventPageThree"
import FahadEventPageFour from "./FahadEventPageFour"
import {connect} from "react-redux"
import {makeCategorySelector} from "src/redux/selectors/common/category/getCategoriesByParentId"
import FahadEventPageFive from "./FahadEventPageFive"

class FahadEventModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      level: 5,
      catsArray: [],
    }
  }

  componentDidMount(): void {
    const {categories} = this.props
    let catsArray: any = Object.values(categories.list).filter(p => p.category_parent === null)
    if (catsArray.length >= 1)
      this.setState({...this.state, catsArray: catsArray.slice()})
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot): void {
    const {categories} = prevProps
    if (categories && categories !== this.props.categories) {
      let catsArray: any = Object.values(categories.list).filter(p => p.category_parent === null)
      if (catsArray.length >= 1)
        this.setState({...this.state, catsArray: catsArray.slice()})
    }
  }


  currentLevel() {
    let {level, catsArray} = this.state
    switch (level) {
      case 1:
        return (
            <FahadEventPageOne/>
        )
      case 2:
        return (
            <FahadEventPageTwo category={catsArray}/>
        )
      case 3:
        return (
            <FahadEventPageThree/>
        )
      case 4:
        return (
            <FahadEventPageFour/>
        )
      case 5:
        return (
            <FahadEventPageFive/>
        )
      default:
        return null
    }
  }

  currentFooter() {
    let {level} = this.state
    let {toggle} = this.props
    switch (level) {
      case 1:
        return (
            <React.Fragment>
              <div className={true ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => true && this.setState({...this.state, level: ++level})}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => toggle()}>
                لغو
              </div>
            </React.Fragment>
        )
      case 2:
        return (
            <React.Fragment>
              <div className={true ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => true && this.setState({...this.state, level: ++level})}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => toggle()}>
                لغو
              </div>
            </React.Fragment>
        )
      case 3:
        return (
            <React.Fragment>
              <div className={true ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => true && this.setState({...this.state, level: ++level})}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => toggle()}>
                لغو
              </div>
            </React.Fragment>
        )
      case 4:
        return (
            <React.Fragment>
              <div className={true ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => true && this.setState({...this.state, level: ++level})}>
                ذخیره و ادامه
              </div>
              <div className="org-leadership-previous-button" onClick={() => toggle()}>
                لغو
              </div>
            </React.Fragment>
        )
      case 5:
        return (
            <React.Fragment>
              <div className={true ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => toggle()}>
                ذخیره
              </div>
              <div className="org-leadership-previous-button" onClick={() => toggle()}>
                لغو
              </div>
            </React.Fragment>
        )
      default:
        return null
    }
  }

  render() {
    let {modalIsOpen} = this.props
    return (
        <div className={modalIsOpen ? "organization-leadership-bg" : "organization-leadership-bg-out"}>
          {modalIsOpen ?
              <React.Fragment>
                <div className="organization-leadership-container">
                  <div className="event-reg-modal-elements">
                    {this.currentLevel()}
                  </div>
                </div>
                <div className="organization-leadership-footer">
                  {this.currentFooter()}
                </div>
              </React.Fragment>
              : null}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  const categorySelector = makeCategorySelector()
  return {
    categories: categorySelector(state),
    clientIdentityId: state.auth.client.identity.content,
  }
}

export default connect(mapStateToProps)(FahadEventModal)