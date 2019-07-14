import React, {PureComponent} from "react"
import RightArrowSvg from "src/images/common/right_arrow_svg"
import {Product as ProductSvg, UploadIcon} from "src/images/icons"
import InteliInput from "src/views/common/inputs/InteliInput"
import axios from "axios"
import urls, {REST_URL} from "src/consts/URLS"

let successes = 0
let errors = 0

class FahadEventPageTwo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      haveProduct: true,
      selectedCategory: null,
      selectedImage: [],

      product_name: "",
      product_certificates: "",
      product_features: "",
      product_market_target: "",
      product_business_plan: "",
      product_abilities: "",
      product_is_knowledge_base: false,

      validationError: false,
      serverError: false,
    }
  }

  componentDidMount() {
    if (document.body.clientWidth > 480) {
      let modalCon = document.getElementById("fahadModalContainerDiv")
      modalCon.scrollTo({top: 0, behavior: "smooth"})
    }
  }

  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    let {verification} = nextProps
    if (verification === 0) {
      this.checkValidations()
    }
  }

  checkValidations() {
    let {
      selectedCategory,

      product_name,
      product_certificates,
      product_features,
      product_market_target,
      product_business_plan,
      product_abilities,
      product_is_knowledge_base,
    } = this.state

    if (
        selectedCategory !== null &&
        product_name.length >= 2
    ) {
      successes = 0
      errors = 0
      this.sendData(34, product_name)
      this.sendData(44, product_certificates)
      this.sendData(45, product_features)
      this.sendData(46, product_market_target)
      this.sendData(47, product_business_plan)
      this.sendData(35, selectedCategory)
      this.sendData(48, product_abilities)
      this.sendData(37, product_is_knowledge_base)
    }
    else {
      let modalCon = document.getElementById("fahadModalContainerDiv")
      modalCon.scrollTo({top: 0, behavior: "smooth"})
      this.setState({...this.state, validationError: true},
          this.props._changeIsLoading(),
      )
    }
  }

  sendData(fieldId, fieldData) {
    const {token, clientIdentityId} = this.props

    axios.post(REST_URL + "/" + urls.FORMS + "/",
        JSON.stringify({
          entry_value: fieldData ? fieldId === 37 || fieldId === 35 ? JSON.stringify(fieldData) : fieldData : "",
          entry_field: fieldId,
          entry_identity: clientIdentityId,
        }),
        {
          headers: {
            "Authorization": `JWT ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          const {_nextLevel} = this.props
          console.log(response)
          response.statusText === "Created" && successes++
          // eslint-disable-next-line no-unused-expressions
          successes === 8 ? _nextLevel() : errors > 0 && this.serverError()
        })
        .catch((err) => {
          console.log(fieldId, err)
          console.log(fieldData)
          errors++
        })
  }

  serverError() {
    let modalCon = document.getElementById("fahadModalContainerDiv")
    modalCon.scrollTo({top: 0, behavior: "smooth"})
    this.setState({...this.state, serverError: true})
    const {_changeIsLoading} = this.props
    _changeIsLoading()
  }

  handleCatChange(data) {
    this.setState({...this.state, selectedCategory: data})
  }

  setHaveProduct() {
    this.setState({...this.state, haveProduct: true})
  }

  setKnowledgeBase(e) {
    this.setState({...this.state, product_is_knowledge_base: e.target.checked})
  }

  render() {
    let {haveProduct, selectedImage, validationError, serverError} = this.state
    let {category} = this.props
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
          {
            haveProduct ?
                <div className="event-reg-modal-body">

                  <div className={validationError ? "validation-error-fahad" : "validation-error-fahad-hide"}>
                    لطفاً فیلد های اجباری را به صورت صحیح پر کنید
                  </div>
                  <div className={serverError ? "validation-error-fahad" : "validation-error-fahad-hide"}>
                    مشکل برقراری ارتباط با سرور، لطفاً اینترنت خود را برسی کنید و دوباره تلاش کنید
                  </div>

                  <label>
                    نام محصول یا پروژه
                    <span className={"secondary-color"}> * </span>
                  </label>
                  <input type={"text"} className="organization-leadership-job-input" placeholder={"نام محصول یا پروژه"}
                         maxLength="50" title="حداقل 2 کاراکتر، حداکثر 50"
                         onChange={(e) => this.setState({...this.state, product_name: e.target.value})}/>

                  <label>
                    مجوزها و تاییدیه‌ها
                  </label>
                  <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                            onChange={(e) => this.setState({...this.state, product_certificates: e.target.value})}
                            placeholder={"مجوزها و تاییدیه‌ها"}/>

                  <label>
                    ویژگی‌ها و مزیت رقابتی
                  </label>
                  <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                            onChange={(e) => this.setState({...this.state, product_features: e.target.value})}
                            placeholder={"ویژگی‌ها و مزیت رقابتی"}/>

                  <label>
                    بازار هدف و حوزۀ کاربرد
                  </label>
                  <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                            onChange={(e) => this.setState({...this.state, product_market_target: e.target.value})}
                            placeholder={"بازار هدف و حوزۀ کاربرد"}/>

                  <label>
                    وضعیت تجاری‌سازی محصول
                  </label>
                  <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                            onChange={(e) => this.setState({...this.state, product_business_plan: e.target.value})}
                            placeholder={"وضعیت تجاری‌سازی محصول"}/>

                  <label>
                    دستۀ محصول
                    <span className={"secondary-color"}> * </span>
                  </label>
                  <InteliInput handleChange={(data) => this.handleCatChange(data)}
                               list={category} placeholder="انتخاب دسته بندی" className="inteli-input-light-border"/>

                  <label>
                    امکانات و تسحیلات خرید
                  </label>
                  <textarea className="organization-leadership-expertise-input" maxLength="700" title="حداکثر 700 کاراکتر"
                            onChange={(e) => this.setState({...this.state, product_abilities: e.target.value})}
                            placeholder={"امکانات و تسحیلات خرید"}/>

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

                  <label>
                    تصاویر محصول یا پروژه
                  </label>
                  <div className="fahad-modal-upload-svg-con"><UploadIcon className="fahad-modal-upload-svg"/></div>

                  <div className={"fahad-product-gallery-container"}>
                    <div className={"fahad-product-gallery-item-container"}>
                      {selectedImage[0] ?
                          <div>
                            <img src={selectedImage[0]} alt={"در حال بارگذاری تصویر محصول"} className={"product-gallery-item"}/>
                            <div className={"product-gallery-cancel-item"} onClick={() => this._deleteImage(0)}>✕</div>
                          </div>
                          :
                          null
                      }
                    </div>
                    <div className={"fahad-product-gallery-item-container"}>
                      {selectedImage[1] ?
                          <div>
                            <img src={selectedImage[1]} alt={"در حال بارگذاری تصویر محصول"} className={"product-gallery-item"}/>
                            <div className={"product-gallery-cancel-item"} onClick={() => this._deleteImage(1)}>✕</div>
                          </div>
                          :
                          null
                      }
                    </div>
                    <div className={"fahad-product-gallery-item-container"}>
                      {selectedImage[2] ?
                          <div>
                            <img src={selectedImage[2]} alt={"در حال بارگذاری تصویر محصول"} className={"product-gallery-item"}/>
                            <div className={"product-gallery-cancel-item"} onClick={() => this._deleteImage(2)}>✕</div>
                          </div>
                          :
                          null
                      }
                    </div>
                    <div className={"fahad-product-gallery-item-container"}>
                      {selectedImage[3] ?
                          <div>
                            <img src={selectedImage[3]} alt={"در حال بارگذاری تصویر محصول"} className={"product-gallery-item"}/>
                            <div className={"product-gallery-cancel-item"} onClick={() => this._deleteImage(3)}>✕</div>
                          </div>
                          :
                          null
                      }
                    </div>
                  </div>

                </div>
                :
                <div className="have-product-container">
                  <div className="fahad-modal-product-svg-con">
                    <ProductSvg className='fahad-modal-product-svg'/>
                  </div>
                  <p>
                    افزودن محصول یا پروژه
                  </p>
                  <p className="disabled-text">
                    در صورتی که محصول یا پروژه ندارید، میتوانید از این مرحله بگذرید
                  </p>
                  <div className="add-product-button" style={{marginTop: "25px"}} onClick={() => this.setHaveProduct()}>
                    افزودن محصول
                  </div>
                </div>
          }

        </React.Fragment>
    )
  }
}

export default FahadEventPageTwo