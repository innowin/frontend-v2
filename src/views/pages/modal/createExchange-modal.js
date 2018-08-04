/*global __*/
import React, { Component } from 'react'
import PropTypes from "prop-types"
import FontAwesome from 'react-fontawesome'
import RadioButtonInput from '../../common/inputs/RadioButtonInput'
import LabelTag from '../../common/tag-label.js'
import {AgentSvgIcon, TipsIcon} from "src/images/icons"
import MemberItem from './member-item'
const  PageOne = ()=>{
  return(<div>
    <div className="modal-hint ">
      <div className="row">
        <div className="col-2">
          <TipsIcon className="hint-icon"/>
        </div>
        <div className="col-10 text-right">
        توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس توضیح مختصر از بورس 
        </div>
      </div>
    </div>
    <div className="modal-body-create-exchange">
      <div className="row">
        <div className="col m-2" dir="ltr">
          <div className="row" dir="rtl">
            <div className="col">
              <label className="label float-right"><strong>عنوان بورس:</strong></label>
              <input type="text " className="form-control white-text-input"/>
            </div>
          </div>
          <div className="row create-exchange-options">
            <div className="col">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1"/>
                <label className="form-check-label" htmlFor="inlineRadio2"><strong>عمومی</strong></label>
              </div>
            </div>
            <div className="col">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
                <label className="form-check-label" htmlFor="inlineRadio1"><strong>خصوصی</strong></label>
              </div>
            </div>   
            <div className="col">
              <label className="form-check-label float-right" dir="rtl"><strong>عمومیت:</strong></label>
            </div>         
          </div>
          <div className="row create-exchange-options" dir="ltr" >
              <label htmlFor="exchangeUser" className="col-sm-2 exchangeUser-label"><strong>http://dbm.ir/</strong></label>
              <div className="col-sm-10">
                
                <input type="text" className="form-control  white-text-input" id="exchangeUser" placeholder="نام کاربری بورس" dir='rtl'/>
              </div>
          </div>
        </div>
        <div className="col m-2" dir="ltr">
          <div className="row" dir="rtl">
            <div className="col">
              <label className="label float-right" ><strong>انتخاب تصویر</strong></label>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div style={{backgroundColor:'lightgray',width:'100%',height:'100%'}} />
            </div>
            <div className="col">
            <div style={{backgroundColor:'lightgray',width:'100%',height:'100%'}}/>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>)
}
const  PageTwo = ()=>{
  return (<div>
    <div className="modal-hint create-exchange-modal">
      <div className="row">
        <div className="col-2">
          <TipsIcon className="hint-icon"/>
        </div>
        <div className="col-10 text-right">
        اهمیت توصیف بورس و برچسب ها اهمیت توصیف بورس و برچسب ها اهمیت توصیف بورس و برچسب ها اهمیت توصیف بورس و برچسب ها اهمیت توصیف بورس و برچسب ها 
        </div>
      </div>
    </div>
    <div className="modal-body-create-exchange">
      <div className="row ">
        <div className="col m-2" dir="ltr">
          <div className="row full-height" dir="rtl">
            <div className="col">
              <label className="label float-right"><strong>توصیف بورس:</strong></label>
              <textarea className="form-control white-text-input exchange-description full-height" id="" rows="3"></textarea>
            </div>
          </div>
          <div className="row create-exchange-options" >
            <div className="col">
            </div>
            <div className="col">
            </div>            
          </div>
          <div className="row create-exchange-options" dir="ltr" >
             
          </div>
        </div>
        <div className="col m-2" dir="ltr">
          <div className="row" dir="rtl">
            <div className="col">
              <div className="input-group gray-text-input search-label-create-exchange">
                <input type="text " placeholder="جستو جو برچسب" className="form-control " />
                <span>
                  <i className="fa fa-search" aria-hidden="true"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="row mt-2 full-height">
            <div className="col">
              <div className="modal-labels-create-exchange">
                <LabelTag
                  name="تست"
                  number="2"
                />
                <LabelTag
                  name="تست"
                  number="2"
                />
                <LabelTag
                  name="تست"
                  number="2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>)
}
const PageThree = ()=>{
  return (<div>
    <div className="modal-top-friends">
      <div className="row">
        <div className="col modal-hint-friends">
          <div className="row">
            <div className="col-2">
              <TipsIcon className="hint-icon"/>
            </div>
            <div className="col-10 text-right">
            شما می توانید در ابتدا تا سقف 50 نفر را مستقیما عضو بورس کنید
            </div>
          </div>
        </div>
        <div className='col'>
          <div className="input-group gray-text-input search-label-create-exchange">
            <input type="text " placeholder="جستو جو افراد" className="form-control " />
            <span>
              <i className="fa fa-search" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
      
    </div>
    <div className="modal-body-create-exchange">
      <div className="row m-2 invite-member-box">
        <MemberItem added={true} name="رضا موسوی پور" skill="مهندس خط و سازه"/>
        <MemberItem added={true} name="رضا موسوی پور" skill="مهندس خط و سازه"/>
        <MemberItem added={false} name="صابر منادی نوری" skill="مدیرعامل شرکت نوکاوان"/>
      </div>
    </div>
  </div>)
}

const steps = [
  {id: 0, component: <PageOne/>},
  {id: 1, component: <PageTwo/>},
  {id: 2, component: <PageThree/>},
];

class CreateExchangeForm extends Component {
  static propTypes = { 
    hide: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {page:0,pageContent:steps[0].component}
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.hide();
    }
  }

  handleNext(event){
    let page = this.state.page
    if(page < 2){
      page+=1
    }
    let found = steps.find(function(element) {
      return element.id === page;
    });
    this.setState({...this.state,page,pageContent:found.component})
  }

  handleBack(event){
    let page = this.state.page
    if(page > 0){
      page-=1
    }
    let found = steps.find(function(element) {
      return element.id === page;
    });
    this.setState({...this.state,page,pageContent:found.component})
  }

  render() {
    return (
      <div className={this.props.active  ? "modal-page" : "modal-page hide" } tabIndex="-1" role="dialog" ref={this.setWrapperRef}>
        <ul className="progressbar" dir="rtl">
            <li className={this.state.page >=0 ? "active": ""}>1</li>
            <li className={this.state.page >= 1 ? "active": ""}>2</li>
            <li className={this.state.page >= 2 ? "active": ""}>3</li>
        </ul>
        {this.state.pageContent}
        <div className="modal-footers">
          <div className = "row">
            <div className="col">
              <button onClick={this.state.page === 0 ? this.props.hide : this.handleBack.bind(this)} className="modal-button link float-right">
                {this.state.page === 0 ? "لغو" : "قبلی"}
              </button>
            </div>
            <div className="col">
              <button onClick={this.state.page === 3 ? this.props.hide : this.handleNext.bind(this)}  className="modal-button primary float-left">
                {this.state.page === 3 ? "ارسال" : 'بعدی'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
export default CreateExchangeForm
