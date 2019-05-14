import React, {Component} from "react"
import PropTypes from "prop-types"

export default class OrganizationLeadershipModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  static proptypes = {
    toggle: PropTypes.func.isRequired,
    modalIsOpen: PropTypes.bool.isRequired
  }

  render() {
    let {modalIsOpen, toggle} = this.props
    return (
        <React.Fragment>
          <div className={modalIsOpen ? "organization-leadership-bg" : "organization-leadership-bg-out"}>
            <div className="organization-leadership-container">
              <div className="organization-leadership-elements">

                <div className="organization-leadership-header">
                  ارسال پست موقعیت شغلی
                </div>

                <div className="organization-leadership-body">
                  <label>
                    عنوان شغلی
                    <span className={"secondary-color"}> * </span>
                  </label>
                  <input type={"text"} className="organization-leadership-job-input" placeholder={"عنوان محصول"}
                         onChange={(e) => this.setState({...this.state, productName: e.target.value})}/>
                  <div className="organization-leadership-job-desc">
                    مثال:<br/>
                    - برنامه نویس<br/>
                    - طراح گرافیک<br/>
                    - کارشناس بازاریابی<br/>
                    - کارشناس تولید محتوا<br/>
                    - مدیر پروژه<br/>
                    - مدیر محصول<br/>
                    - پژوهشگر<br/>
                  </div>
                  <div>
                    <div style={{marginBottom: "10px", marginTop: "20px"}}>
                      نوع همکاری
                    </div>
                    <div className="organization-leadership-hashtags-container">
                      <div className="organization-leadership-job-hashtags"
                           onClick={(e) => e.target.className = "organization-leadership-job-hashtags-selected"}>
                        تمام‌وقت
                      </div>
                      <div className="organization-leadership-job-hashtags"
                           onClick={(e) => e.target.className = "organization-leadership-job-hashtags-selected"}>
                        پاره‌وقت
                      </div>
                      <div className="organization-leadership-job-hashtags"
                           onClick={(e) => e.target.className = "organization-leadership-job-hashtags-selected"}>
                        کارآموزی
                      </div>
                      <div className="organization-leadership-job-hashtags"
                           onClick={(e) => e.target.className = "organization-leadership-job-hashtags-selected"}>
                        فریلنسینگ
                      </div>
                      <div className="organization-leadership-job-hashtags"
                           onClick={(e) => e.target.className = "organization-leadership-job-hashtags-selected"}>
                        هم‌تیمی/هم‌بنیان‌گذار
                      </div>
                      <div className="organization-leadership-job-hashtags"
                           onClick={(e) => e.target.className = "organization-leadership-job-hashtags-selected"}>
                        پروژه‌ای
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="organization-leadership-footer">
              <div className="org-leadership-next-button" onClick={() => toggle()}>
                بعدی
              </div>
              <div className="org-leadership-previous-button" onClick={() => toggle()}>
                لغو
              </div>
            </div>

          </div>
        </React.Fragment>
    )
  }
}