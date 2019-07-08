import React, {PureComponent} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import {UploadIcon} from "src/images/icons"

class FahadEventPageOne extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orgType: "public",
      isKnowledgeBase: false,
    }
  }

  componentDidMount() {
    if (document.body.clientWidth > 480)
      window.scrollTo({top: 0, behavior: "smooth"})
  }

  setOrgType(orgType) {
    this.setState({...this.state, orgType: orgType})
  }

  setKnowledgeBase(e) {
    this.setState({...this.state, isKnowledgeBase: e.target.checked})
  }

  render() {
    let {orgType, isKnowledgeBase} = this.state
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
              نام مجموعه
              <span className={"secondary-color"}> * </span>
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"نام ثبتی کامل مجموعه"}/>

            <label>
              نام برند
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"نام برند مجموعه"}/>

            <label>
              شعار مجموعه
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شعار مجموعه"}/>

            <label>
              معرفی مختصر مجموعه
            </label>
            <textarea className="organization-leadership-expertise-input"
                      placeholder={"شرکت پایاپژوهان علم و صنعت، ارائۀ خدمات مانیتورینگ و ابزاردقیق"}/>

            <label>
              نوع ثبتی مجموعه
            </label>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("public")} style={{marginTop: "15px"}}>
              <div className={orgType === "public" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>سهامی عام</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("private")}>
              <div className={orgType === "private" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>سهامی خاص</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("limited")}>
              <div className={orgType === "limited" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>مسئولیت محدود</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("cooperative")}>
              <div className={orgType === "cooperative" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>تعاونی</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("other")}>
              <div className={orgType === "other" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>سایر</div>
            </div>
            <div className='event-reg-modal-checkbox-cont' onClick={() => this.setOrgType("none")}>
              <div className={orgType === "none" ? "event-reg-modal-checkbox-selected" : "event-reg-modal-checkbox"}/>
              <div className='event-reg-modal-checkbox-title'>در حال حاضر هویت حقوقی مجموعه ثبت نشده است</div>
            </div>

            {
              orgType === "private" ?
                  <div className="selective-inputs-container">
                    <label>
                      شمارۀ ثبت
                    </label>
                    <input type={"text"} className="organization-leadership-job-input"
                           placeholder={"شمارۀ ثبت در اداره ثبت شرکت ها و موسسات تجاری و غیر تجاری"}/>
                    <label>
                      تاریخ ثبت
                    </label>
                    <input type={"date"} className="organization-leadership-job-input"/>
                  </div> : null
            }
            {
              orgType === "other" ?
                  <div className="selective-inputs-container">
                    <label>
                      توضیح
                    </label>
                    <input type={"text"} className="organization-leadership-job-input"/>
                  </div> : null
            }

            <div className='fahad-modal-card-checkboxes'>
              <form>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)}/>
                    <span className='checkmark'/>
                    <span>دارای گواهی دانش‌بنیان</span>
                  </div>
                </label>
              </form>
            </div>

            {
              isKnowledgeBase ?
                  <div className="selective-inputs-container">
                    <label>
                      تاریخ اعتبار گواهی دانش‌بنیان
                    </label>
                    <input type={"date"} className="organization-leadership-job-input"/>
                  </div> : null
            }

            <label>
              تصویر لوگو
            </label>
            <div className="fahad-modal-upload-svg-con"><UploadIcon className="fahad-modal-upload-svg"/></div>

            <label>
              بارگزاری کاتالوگ مجموعه
            </label>
            <div className="fahad-modal-upload-svg-con"><UploadIcon className="fahad-modal-upload-svg"/></div>

            <label>
              شمارۀ تماس
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"شمارۀ تماس مجموعه"}/>

            <label>
              وبسایت
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"وبسایت"}/>

            <label>
              تلگرام
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"تلگرام"}/>

            <label>
              اینستاگرام
            </label>
            <input type={"text"} className="organization-leadership-job-input" placeholder={"اینستاگرام"}/>

            <label>
              ایمیل
            </label>
            <input type={"email"} className="organization-leadership-job-input" placeholder={"ایمیل"}/>

            <label>
              آدرس
            </label>
            <input type={"email"} className="organization-leadership-job-input" placeholder={"آدرس دفتر مرکزی"}/>

            <div className='fahad-modal-card-checkboxes'>
              <label>
                زمینۀ فعالیت
              </label>
              <form>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)}/>
                    <span className='checkmark'/>
                    <span>تولیدی، خدمات صنعتی و آزمایشگاهی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)}/>
                    <span className='checkmark'/>
                    <span>خدمات بازار و بازرگانی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)}/>
                    <span className='checkmark'/>
                    <span>خدمات رسانه‌ای و تولید محتوا</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)}/>
                    <span className='checkmark'/>
                    <span>خدمات منابع انسانی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)}/>
                    <span className='checkmark'/>
                    <span>خدمات شتاب‌دهی، مالی و سرمایه‌گذاری</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)}/>
                    <span className='checkmark'/>
                    <span>خدمات حقوقی</span>
                  </div>
                </label>
                <label className='fahad-modal-card-checkbox'>
                  <div className="organization-leadership-card-checkbox-title">
                    <input type="checkbox" name="kind" onChange={(e) => this.setKnowledgeBase(e)}/>
                    <span className='checkmark'/>
                    <span>سامانه‌های نوآوری بازار</span>
                  </div>
                </label>
              </form>
            </div>

            <label>
              دستۀ فعالیت
            </label>
            <input type={"email"} className="organization-leadership-job-input" placeholder={"دستۀ فعالیت"}/>

            <label>
              توانمندی‌ها و خدمات مجموعه
            </label>
            <textarea className="organization-leadership-expertise-input"
                      placeholder={"توانمندی‌ها و خدمات اصلی قابل ارائه توسط مجموعه بیان شود"}/>

            <label>
              همکاران و شرکای بین‌المللی
            </label>
            <textarea className="organization-leadership-expertise-input"
                      placeholder={"همکاران و شرکای بین‌المللی"}/>

            <label>
              سوابق و تجارب بین‌المللی
            </label>
            <textarea className="organization-leadership-expertise-input"
                      placeholder={"سوابق و تجارب بین‌المللی"}/>

            <label>
              مجوزها و تأییدیه‌ها
            </label>
            <textarea className="organization-leadership-expertise-input"
                      placeholder={"مجوزها و تأییدیه‌ها"}/>

            <label>
              مستندات مجوزها و تأییدیه‌ها
            </label>
            <div className="fahad-modal-upload-svg-con"><UploadIcon className="fahad-modal-upload-svg"/></div>

            <label>
              افتخارات
            </label>
            <textarea className="organization-leadership-expertise-input"
                      placeholder={"افتخارات"}/>

          </div>
        </React.Fragment>
    )
  }
}

export default FahadEventPageOne