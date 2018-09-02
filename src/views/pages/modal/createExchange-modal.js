/*global __*/
import React, { Component } from 'react'
import PropTypes from "prop-types"
import FontAwesome from 'react-fontawesome'
import RadioButtonInput from '../../common/inputs/RadioButtonInput'
import {FileInput} from '../../common/inputs/FileInput'
import SuperTag from './superTag'
import {AgentSvgIcon, TipsIcon, ItemsAndPropertiesIcon, SocialIcon, CongratsTick} from "src/images/icons"
import MemberItem from './member-item'
import {ImageViewerAgent} from './ImageViewerAgent'
import GetUserActions from '../../../redux/actions/user/getUserActions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import CircularProgressbar from 'react-circular-progressbar';
import {createFile, getFile} from "src/crud/media/media";
import exchange from '../../../redux/actions/types/exchange';
import ExchangeActions from '../../../redux/actions/exchangeActions';
import MenuProgressive from '../progressive/penu-progressive'
import {ClipLoader} from "react-spinners"
import {
  WRAPPER_CLASS_NAMES,
  PROGRESSIVE_STATUS_CHOICES,
} from './createExchangeData'
import NextPrevBtns from '../adding-contribution/nextAndPrevBtns'
class  PageOne extends Component{
  constructor(props){
    super(props)
    this.state= {
      selectedIdx:-1,
      images:[{file:'http://restful.daneshboom.ir/media/75f00defdde44fd4b0d8bee05617e9c7.jpg',id:1},{file:"http://restful.daneshboom.ir/media/a6c0c4fea76d4b96ba6fe17d11a1afd3.jpg",id:2}],
      currentImage:"",
      isLoading:false,
      private:props.private ||false,
      name:props.name ||"" ,
      link:props.link ||"",
      exchange_image:props.exchange_image ||null // TODO amir change to default image
    }
    this.changeImage = this.changeImage.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
  }
  handleNext(){
    this.props.saveState({name:this.state.name,link:this.state.link,exchange_image:this.state.exchange_image,private:this.state.private}).then(()=>{
      this.props.handleNext()
    })
    
  }
  handleBack(){
    this.props.saveState({name:"",link:"",exchange_image:null,private:false}).then(()=>{
      this.props.handleBack()
    })
  }
  changeImage(imageSrc,idx){
    this.setState({...this.state,currentImage:imageSrc.file,selectedIdx:idx,exchange_image:imageSrc.id}, function () {
      console.log(this.state.value);
    });
  }
  showOpenFileDlg = () => {
    this.inputOpenFileRef.click()
  }
  _handleChangeImage = (event) =>{
    event.preventDefault();
    const file = event.target.files[0]; 
    if (file) {
      // TODO mohsen: check maximum file-size with attention to fileType
      let reader = new FileReader();
      reader.onloadstart = () => {
        this.setState({isLoading: true});
      };
      reader.onloadend = () => {
        const fileName = file.name;
        this._createFile(reader.result, fileName);
      };
      reader.readAsDataURL(file);
    }
  }
  _createFile = (fileString, fileName) => {
    const mediaResult = (res) => {
      this.setState({...this.state, isLoading: false, currentImage:res.file, currentMedia: res, exchange_image:res.id})
    };
    createFile(fileString, mediaResult);
  };

  render(){
    const {images,isLoading} = this.state
    let self = this
    const imgViews = images.map((val,idx)=>{
      return (
      <div className="img-agent-small"><ImageViewerAgent key={idx} idx={idx} selected={self.state.selectedIdx == idx ? true : false} src={val} imageSelect={this.changeImage} /></div>)
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
                <input type="text " onChange={(e)=>{this.setState({name:e.target.value})}} defaultValue={this.state.name} className="form-control white-text-input"/>
              </div>
            </div>
            <div className="row create-exchange-options">
              <div className="col">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" onChange={(e)=>{this.setState({private:!e.target.checked})}} type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option1" checked={!this.state.private}/>
                  <label className="form-check-label" htmlFor="inlineRadio2"><strong>عمومی</strong></label>
                </div>
              </div>
              <div className="col">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" onChange={(e)=>{this.setState({private:e.target.checked})}} type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked={this.state.private}/>
                  <label className="form-check-label"  htmlFor="inlineRadio1"><strong>خصوصی</strong></label>
                </div>
              </div>   
              <div className="col">
                <label className="form-check-label float-right" dir="rtl" ><strong>عمومیت:</strong></label>
              </div>         
            </div>
            <div className="row create-exchange-options" dir="ltr" >
                <label htmlFor="exchangeUser" className="col-sm-2 exchangeUser-label"><strong>http://dbm.ir/</strong></label>
                <div className="col-sm-10">
                  
                  <input type="text" onChange={(e)=>{this.setState({link:"http://dbm.ir/"+e.target.value})}} defaultValue={this.state.link.replace("http://dbm.ir/","")} className="form-control  white-text-input" id="exchangeUser" placeholder="نام کاربری بورس" dir='rtl'/>
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
                {
                isLoading == true ? 
                  <span>{__('Uploading...')}</span>
                :
                  <ImageViewerAgent 
                  imageSelect={()=>{}}
                  src={this.state.currentImage}
                  />
                }
                  
                </div>
              </div>

              <div className="col m-2" dir='rtl'>
                <div className="row">
                  <div className="img-agent-small">
                    <input type="file" 
                    style={{display:'none'}}  
                    ref={(inputOpenFileRef)=>{this.inputOpenFileRef = inputOpenFileRef}}
                    onChange={this._handleChangeImage}/>
                    {/* <FileInput type="file" style={{display:"none"}}  ref={(inputOpenFileRef)=>{this.inputOpenFileRef = inputOpenFileRef}}/> */}
                    <ImageViewerAgent key={'chooser'} idx={-1} selected={false} src="http://www.arcdocendi.com/Forms/images/upload.png" imageSelect={this.showOpenFileDlg.bind(this)} />
                  </div>
                  {imgViews}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footers">
        <NextPrevBtns
            prevBtnTitle="لغو"
            nextBtnTitle="بعدی "
            goToNextStep={this.handleNext}
            isGoToNextBtnDisabled={false}
            goToPrevStep={this.handleBack}
        />
      </div>
    </div>)
  }
  
}

class PageTwo extends Component{
  constructor(props){
    super(props)
    this.state={
      tags:props.exchang_hashtag || []  ,
      description:props.description ||""}
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
  }
  handleRemoveTag(idx){
    let tags =  this.state.tags
    let index = tags.findIndex(function (cus) { return cus.idx === idx });
    if (index !== -1) {
      tags.splice(index, 1);
    }
    this.setState({tags:tags})
  }
  handleNext(){
    this.props.saveState({exchang_hashtag:this.state.tags,description:this.state.description}).then(()=>{
      this.props.handleNext()
    })
    
  }
  handleBack(){
    this.props.saveState({exchang_hashtag:this.state.tags,description:this.state.description}).then(()=>{
      this.props.handleBack()
    })
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
                <textarea className="form-control white-text-input exchange-description full-height" id="" rows="3" onChange={(e)=>{this.setState({...this.state,description:e.target.value})}}>{this.state.description}</textarea>
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
                  {/* <SuperTag
                    removeTag = {this.handleRemoveTag.bind(this)}
                    name="test"
                    number="2"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footers">
        <NextPrevBtns
            prevBtnTitle="قبل"
            nextBtnTitle="بعدی"
            goToNextStep={this.handleNext}
            isGoToNextBtnDisabled={false}
            goToPrevStep={this.handleBack}
        />
      </div>
    </div>)
  }
  
}

class PageThree extends Component{
  constructor(props){
    super(props)
    this.state ={added:props.addedUsers || [],selectedUsers:props.addedUsers ? props.addedUsers.length : 0}
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)

  }
  componentDidMount(){
    const {getUsers} = this.props.actions
    getUsers()
  } 
  changePage(){
    this.props.saveState({})
  }
  handleAddUser(index,user){
    this.props.handleAddUser(user)
    const added = this.state.added
    let foundIndex = added.findIndex(function (cus) { return cus.idx === index; }) 
    if( foundIndex == -1){
      added.push({idx:index,user:user})
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

  handleNext(){
    const {added} = this.state
    this.props.saveState({addedUsers:added}).then(()=>{
      
      this.props.createExchange()
    })
    
  }
  handleBack(){
    const {added} = this.state
    this.props.saveState({addedUsers:added}).then(()=>{
      this.props.handleBack()
    })
  }
  render(){
    const self = this
    let users = this.props.users.list
    let usersView = users.map((val,idx)=>{
      return <MemberItem added = {self.state.added.findIndex(function (cus) { return cus.idx === idx; }) != -1 ? true : false} 
      index ={idx}
      key={idx}
      user={val}
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
      <div className="modal-footers">
        <NextPrevBtns
            prevBtnTitle="قبل"
            nextBtnTitle="ارسال"
            goToNextStep={this.handleNext}
            isGoToNextBtnDisabled={false}
            goToPrevStep={this.handleBack}
        />
      </div>
    </div>
    )
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
      <div className="modal-footers">
        <NextPrevBtns
            prevBtnTitle="پایان"
            nextBtnTitle="اشتراک"
            goToNextStep={this.props.handleShare}
            isGoToNextBtnDisabled={false}
            goToPrevStep={this.props.finishForm}
        />
      </div>
    </div>)
  }
}



class CreateExchangeForm extends Component {
  static propTypes = { 
    hide: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);

    this.saveState = this.saveState.bind(this)
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this)
    this.createExchange = this.createExchange.bind(this)
    this.handleAddUser = this.handleAddUser.bind(this) 
    this.handleShare = this.handleShare.bind(this)
    this.finishForm = this.finishForm.bind(this)

    this.state = {page:1,
      isLoading:false,
      exchangeObj:{},
      progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
      progressSteps: [
        {title: '1', icon: (<ItemsAndPropertiesIcon className="progress-step-icon"/>)},
        {title: '2', icon: (<ItemsAndPropertiesIcon className="progress-step-icon"/>)},
        {title: '3', icon: (<SocialIcon className="progress-step-icon"/>)},
        {title: '4', icon: (<SocialIcon className="progress-step-icon"/>)},
      ],}
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  createExchange() {
    const {exchangeObj} = this.state;
    const addedUsers = exchangeObj.addedUsers
    exchangeObj.addedUsers = undefined
    exchangeObj.members_count = addedUsers.length
    const {addToExchange, createExchange} = this.props.actions;
    const users = this.props.users
    for ( let i = 0 ; i < addedUsers.length ; i++){
      addToExchange(users[addedUsers[i].user.id].identity.content.id)
    }
    
    this.setState({...this.state,isLoading:true})
    createExchange(exchangeObj,(res)=>{
      this.setState({...this.state,page:4,isLoading:false,error:false})
    })
  }
  _setStep = (newStep, status) => {
    this.setState({
          ...this.state,
          page: newStep,
          progressStatus: status,
          wrapperClassName: WRAPPER_CLASS_NAMES.EXITING,
        },
        () => {
          this._afterStepChanging()
        })
  }
  _afterStepChanging = () => {
    setTimeout(() => this.setState({
      ...this.state,
      progressStatus: PROGRESSIVE_STATUS_CHOICES.ACTIVE,
      wrapperClassName: WRAPPER_CLASS_NAMES.ENTERED,
    }), 10)
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
      
      this.setState({page:1})
    }
  }

  handleNext(event){
    let {progressSteps,page} = this.state
    if (page < progressSteps.length + 1) {
      this._setStep((page + 1), PROGRESSIVE_STATUS_CHOICES.GOING_NEXT)
    }
    if(page == 4){
      this.props.hide();
      
      this.setState({page:1})
    }
  }

  handleBack(event){
    let {progressSteps,page} = this.state
    if (page !== 1) this._setStep((page - 1), PROGRESSIVE_STATUS_CHOICES.GOING_PREV)
    if(page == 1){
      this.props.hide();
      this.setState({page:1})
    }
  }

  handleShare(event){
    // todo amir handle share button
  }

  finishForm(){
    this.props.hide();
    this.setState({page:1})
  }

  handleAddUser(user){
    const {getIdentityByUserId} = this.props.actions
    getIdentityByUserId(user.id)
  }

  saveState(pageState){
    return new Promise((resolve,reject)=>{
      this.setState({...this.state,exchangeObj:{...this.state.exchangeObj,...pageState}},()=>{
        resolve()
      })
    })
    
  }
  getPage(){
    switch(this.state.page){
      case 1:
        return <PageOne {...this.state.exchangeObj} handleNext={this.handleNext} saveState={this.saveState} handleBack={this.handleBack}/>
      case 2: 
        return <PageTwo  {...this.state.exchangeObj} handleNext={this.handleNext} saveState={this.saveState} handleBack={this.handleBack}/>
      case 3:
        return <PageThree  {...this.state.exchangeObj} actions={this.props.actions} createExchange={this.createExchange} users={this.props.users} handleAddUser ={this.handleAddUser} handleNext={this.handleNext} saveState={this.saveState} handleBack={this.handleBack}/>
      case 4:
        return <PageFour  {...this.state.exchangeObj} finishForm={this.props.finishForm} handleShare={this.props.handleShare} handleNext={this.handleNext} saveState={this.saveState} handleBack={this.handleBack}/>
    }
  }
  render() {
    const pageContent = this.getPage()
    const {progressSteps,page,progressStatus} = this.state
    if(!this.state.isLoading){
      return (
        <div className={this.props.active  ? "modal-page create-exchange-wrapper"  : "modal-page create-exchange-wrapper hide" } tabIndex="-1" role="dialog" ref={this.setWrapperRef}>
          
          <div className="progressive-wrapper">
            <MenuProgressive
                steps={progressSteps}
                activeStep={page}
                status={progressStatus}
            />
          </div>
          {pageContent}
        </div>
      )
    }else{
      return (
        <div className={this.props.active  ? "modal-page create-exchange-wrapper"  : "modal-page create-exchange-wrapper hide" } tabIndex="-1" role="dialog" ref={this.setWrapperRef}>
          <div className="full-page-loading">
            <ClipLoader color="#999" size={40} margin="4px" loading={true}/>
          </div>
        </div>
      )
    }
    
  }
};

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth
})
const mapDispatchToProps = dispatch => ({
actions: bindActionCreators({
  getUsers: GetUserActions.getUsers ,
  getIdentityByUserId : GetUserActions.getIdentityByUserId,
  createExchange : ExchangeActions.createExchange,
  addToExchange : ExchangeActions.addToExchange,
  }, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(CreateExchangeForm)