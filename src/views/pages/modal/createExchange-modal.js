/*global __*/
import React, { Component } from 'react'
import PropTypes from "prop-types"
import FontAwesome from 'react-fontawesome'
import RadioButtonInput from '../../common/inputs/RadioButtonInput'
import SuperTag from './superTag'
import {AgentSvgIcon, TipsIcon, ItemsAndPropertiesIcon, SocialIcon, CongratsTick} from "src/images/icons"
import MemberItem from './member-item'
import {ImageViewerAgent} from './ImageViewerAgent'
import GetUserActions from '../../../redux/actions/user/getUserActions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CircularProgressbar from 'react-circular-progressbar';
class  PageOne extends Component{
  constructor(props){
    super(props)
    this.state= {
      selectedIdx:-1,
      images:[{file:'http://restful.daneshboom.ir/media/75f00defdde44fd4b0d8bee05617e9c7.jpg'},{file:"http://restful.daneshboom.ir/media/a6c0c4fea76d4b96ba6fe17d11a1afd3.jpg"}],
      currentImage:""
    }
    this.changeImage = this.changeImage.bind(this)
  }
  componentDidMount(){

  }
  changeImage(imageSrc,idx){
    this.setState({...this.state,currentImage:imageSrc,selectedIdx:idx}, function () {
      console.log(this.state.value);
    });
  }
  render(){
    const {images} = this.state
    let self = this
    const imgViews = images.map((val,idx)=>{
      return (
      <div className="img-agent-small"><ImageViewerAgent key={idx} idx={idx} selected={self.state.selectedIdx == idx ? true : false} src={val.file} imageSelect={this.changeImage} /></div>)
    })
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
              <div className="col m-2">
                <div className="row">
                  <ImageViewerAgent 
                    imageSelect={()=>{}}
                    src={this.state.currentImage}
                  />
                </div>
              </div>

              <div className="col m-2" dir='rtl'>
                <div className="row">
                  {imgViews}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)
  }
  
}

class PageTwo extends Component{
  constructor(props){
    super(props)
    this.state={tags:[]}
  }
  handleRemoveTag(idx){
    let tags =  this.state.tags
    let index = tags.findIndex(function (cus) { return cus.idx === idx });
    if (index !== -1) {
      tags.splice(index, 1);
    }
    this.setState({tags:tags})
  }
  render(){
    let tagsView = this.state.tags.map((val,idx)=>{
      return <SuperTag
          removeTag = {this.handleRemoveTag.bind(this)}
          name={val.name}
          number={idx}
        />
    })
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
                  <SuperTag
                    removeTag = {this.handleRemoveTag.bind(this)}
                    name="test"
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
  
}

class PageThree extends Component{
  constructor(props){
    super(props)
    this.state ={added:[],selectedUsers:0}

  }
  componentDidMount(){
    const {getUsers} = this.props.actions
    getUsers()
  } 
  handleAddUser(index){
    const added = this.state.added
    let foundIndex = added.findIndex(function (cus) { return cus === index; }) 
    if( foundIndex == -1){
      
      added.push(index)
      let su= this.state.selectedUsers+1
      this.setState({...this.state,added:added,selectedUsers:su})
    }else{
      added.splice(foundIndex,1)
      let su= this.state.selectedUsers-1
      if(su < 0){
        return
      }
      this.setState({...this.state,added:added,selectedUsers:su})
    }
  }
  render(){
    const self = this
    let users = this.props.users.list
    let usersView = users.map((val,idx)=>{
      return <MemberItem added = {self.state.added.findIndex(function (cus) { return cus === idx; }) != -1 ? true : false} 
      index ={idx}
      key={idx}
      onAdd = {this.handleAddUser.bind(this)}
      name={val.first_name + val.last_name} 
      img={val.profile_media}
      skill={val.skill}/>
    })
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
        {usersView}
        </div>
      </div>
      <div className="row">
        <div className="circle-progress">
          <CircularProgressbar
            styles={{
              // Customize the root svg element
              root: {},
              // Customize the path, i.e. the part that's "complete"
              path: {
                // Tweak path color:
                stroke: "#1a2147",
                // Tweak path to use flat or rounded ends:
                strokeLinecap: "butt",
                // Tweak transition animation:
                transition: "stroke-dashoffset 0.5s ease 0s"
              },
              text: {
                // Tweak text color:
                fill: "#a5a5a5",
                // Tweak text size:
                fontSize: "20px"
              }
            }}
            percentage={(this.state.selectedUsers / 50) * 100}
            text={`${this.state.selectedUsers}/50`}
          />
        </div>
      </div>
    </div>)
  }
  
}


class PageFour extends Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){

  }
  render(){
    let self = this
    return(
    <div className="row">
      <div className="col-4 center-margin">
        <CongratsTick/>
      </div>
      
    </div>)
  }
}

const steps = [
  {id: 0, component: <PageOne actions={null} />},
  {id: 1, component: <PageTwo actions={null}/>},
  {id: 2, component: <PageThree actions={null}/>},
  {id: 3, component: <PageFour actions={null}/>},
];

class CreateExchangeForm extends Component {
  static propTypes = { 
    hide: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);
    const newCom = React.cloneElement(
      steps[0].component,
      {...this.props},
    )
    this.state = {page:0,pageContent:newCom}
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
      const newCom = React.cloneElement(
        steps[0].component,
        {...this.props},
      )
      this.setState({page:0,pageContent:newCom})
    }
  }

  handleNext(event){
    let page = this.state.page
    if(page < 3){
      page+=1
    }
    let found = steps.find(function(element) {
      return element.id === page;
    });
    let self = this
    // found.component.setProps({ actions: this.props.actions });
    const newCom = React.cloneElement(
      found.component,
      {...self.props},
    )
    this.setState({...this.state,page,pageContent:newCom})
  }

  handleBack(event){
    let page = this.state.page
    if(page > 0){
      page-=1
    }
    let found = steps.find(function(element) {
      return element.id === page;
    });
    const newCom = React.cloneElement(
      found.component,
      {...this.props},
    )
    this.setState({...this.state,page,pageContent:newCom})
  }

  handleShare(event){

  }

  render() {
    return (
      <div className={this.props.active  ? "modal-page" : "modal-page hide" } tabIndex="-1" role="dialog" ref={this.setWrapperRef}>
        <ul className="progressbar" dir="rtl">
            <li className={this.state.page >=0 ? "active": ""}><div className={this.state.page >=0 ? "icon-holder active ": "icon-holder"}><ItemsAndPropertiesIcon className="icon"/></div></li>
            <li className={this.state.page >= 1 ? "active": ""}><div className={this.state.page >=1 ? "icon-holder active ": "icon-holder"}><ItemsAndPropertiesIcon className="icon" /></div></li>
            <li className={this.state.page >= 2 ? "active": ""}><div className={this.state.page >=2 ? "icon-holder active ": "icon-holder"}><SocialIcon className="icon" /></div></li>
        </ul>
        {this.state.pageContent}
        <div className="modal-footers">
          <div className = "row">
            <div className="col">
              <button onClick={this.state.page === 0 ? this.props.hide : this.state.page === 3 ? this.handleShare.bind(this) : this.handleBack.bind(this)} className="modal-button link float-right">
                {this.state.page === 0 ? "لغو" : this.state.page === 3 ? "اشتراک" :"قبلی"}
              </button>
            </div>
            <div className="col">
              <button onClick={this.state.page === 3 ? this.props.hide : this.handleNext.bind(this)}  className="modal-button primary float-left">
                {this.state.page === 2 ? "ارسال" : this.state.page === 3 ? 'پایان': 'بعدی'}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  users: state.users,
 
})
const mapDispatchToProps = dispatch => ({
actions: bindActionCreators({
  getUsers: GetUserActions.getUsers ,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateExchangeForm)