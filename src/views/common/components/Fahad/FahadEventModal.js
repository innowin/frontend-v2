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
      level: 1,
      catsArray: [],
      verification: -1,
      isLoading: false,
    }
    this.nextLevel = this.nextLevel.bind(this)
    this.changeIsLoading = this.changeIsLoading.bind(this)
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

  nextLevel() {
    const {level} = this.state
    this.setState({...this.state, verification: -1, level: level + 1}, this.changeIsLoading())
  }

  checkValidation() {
    this.setState({...this.state, verification: 0, isLoading: true})
  }

  changeIsLoading() {
    this.setState({...this.state, isLoading: !this.state.isLoading, verification: -1})
  }


  currentLevel() {
    let {level, catsArray, verification} = this.state
    let {clientIdentityId, token} = this.props
    switch (level) {
      case 1:
        return (
            <FahadEventPageOne verification={verification} clientIdentityId={clientIdentityId} token={token}
                               _nextLevel={this.nextLevel} _changeIsLoading={this.changeIsLoading}/>
        )
      case 2:
        return (
            <FahadEventPageTwo verification={verification} category={catsArray} clientIdentityId={clientIdentityId} token={token}
                               _nextLevel={this.nextLevel} _changeIsLoading={this.changeIsLoading}/>
        )
      case 3:
        return (
            <FahadEventPageThree verification={verification} _nextLevel={this.nextLevel}/>
        )
      case 4:
        return (
            <FahadEventPageFour verification={verification} _nextLevel={this.nextLevel}/>
        )
      case 5:
        return (
            <FahadEventPageFive verification={verification} _nextLevel={this.nextLevel}/>
        )
      default:
        return null
    }
  }

  currentFooter() {
    let {level, isLoading} = this.state
    let {toggle} = this.props
    switch (level) {
      case 1:
        return (
            <React.Fragment>
              <div className={!isLoading ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => !isLoading ? this.checkValidation() : null}>
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
              <div className={!isLoading ? "org-leadership-next-button" : "org-leadership-hidden-button"}
                   onClick={() => !isLoading ? this.checkValidation() : null}>
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
        <div className={modalIsOpen ? "organization-leadership-bg" : "organization-leadership-bg-out"} id={"fahadModalContainerDiv"}>
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
    token: state.auth.client.token,
  }
}

export default connect(mapStateToProps)(FahadEventModal)