import React, {Component} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"

class FahadEventPageThree extends Component {

  componentDidMount() {
    if (document.body.clientWidth > 480)
      window.scrollTo({top: 0, behavior: "smooth"})
  }

  render() {
    return (
        <React.Fragment>
          <div className="event-reg-modal-header">
            فحاد
            &nbsp;&nbsp;&nbsp;
            <RightArrowSvg className="small-event-arrow"/>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <b>
              ثبت نام رویداد زیست‌فناوری
            </b>
          </div>
          <div className="event-reg-modal-body">

            <label>
              نام مدیرعامل
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"نام مدیرعامل"}/>

            <label>
              شمارۀ همراه
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ همراه مدیرعامل"}/>

            <label>
              شماره در پیام‌رسان
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ همراه مدیرعامل در پیام‌رسان‌ها"}/>

            <label>
              شمارۀ مستقیم دفتر
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ مستقیم دفتر مدیرعامل"}/>

            <label>
              ایمیل
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"آدرس ایمیل مدیرعامل"}/>

            <label>
              نام عضو هیئت مدیره
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"نام عضو هیئت مدیره"}/>

            <label>
              شمارۀ همراه
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ همراه عضو هیئت مدیره"}/>

            <label>
              سمت در مجموعه
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"سمت در مجموعه"}/>

            <label>
              شمارۀ مستقیم دفتر
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ مستقیم دفتر عضو هیئت مدیره"}/>

            <label>
              ایمیل
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"آدرس ایمیل عضو هیئت مدیره"}/>

          </div>

        </React.Fragment>
    )
  }
}

export default FahadEventPageThree