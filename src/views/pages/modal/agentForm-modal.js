//@flow
import React, { Component } from "react"
import PropTypes from "prop-types"
import LabelTag from "../../common/tag-label.js"
import {AgentSvgIcon, TipsIcon} from "src/images/icons"

import OrganizationActions from '../../../redux/actions/organization/organizationActions';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
type AgentFormProps ={
  hide: Function,
  active:boolean,
  actions:Object,
  agencyRequest:Object
}
class AgentForm  extends React.Component<AgentFormProps,{tags:Array<String>, description:string, loading:boolean}> {
  wrapperRef:Object;
  setWrapperRef:Function;
  handleClickOutside: Function;
  sendReqeust:Function;
  description:?HTMLTextAreaElement;

  state = {
    tags: [],
    description:'',
    loading:false
  };
  constructor(props:AgentFormProps) {
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.sendReqeust = this.sendReqeust.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  hideLoading(message){
    this.setState({...this.state, loading:false})
    alert(message)
  }

  sendReqeust(){
    const {agencyRequest} = this.props.actions;
    agencyRequest(this.description.value, this.hideLoading.bind(this))
    this.setState({...this.state, loading:true})
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node:Object) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event:Event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.hide();
    }
  }

  onLabelChange(event:Event) {
    let val = event.target.value 
    if(val.length < 1){
      this.setState({tags:[]})
      return
    }
    let tags = val.split(',')
    this.setState({tags:tags})

  }
  render() {
    const {tags, loading} = this.state
    const {agencyRequest} = this.props
    // const {isLoading, error} = agencyRequest
    
    const tagsView = tags.map((val,idx)=>{
      return <LabelTag name={val} number={idx}/>
    })
    
      return (
        <div className={this.props.active  ? "modal-page" : "modal-page hide" } tabIndex="-1" role="dialog" ref={this.setWrapperRef}>
          <div className="agent-from-title"><div className="agent-form-title-container"><AgentSvgIcon className="agent-form-agent-icon"/><span className="agent-from-title-text"> درخواست ارتقاء به کارگزار</span></div></div>
          
          {loading == false  ? 
            <div className="modal-bottom">
              <label className="label float-right">شرحی از سوابق کاری خود را بنویسید</label>
              <textarea type="text" name="description" id="description" ref={description => (this.description = description)} className="form-control gray-text-input job-description"/>
    
              <label className="label float-right mt-2">ویرایش برچسب ها</label>
              <input type="text " onChange={this.onLabelChange.bind(this)} className="form-control gray-text-input"/>
              <div className="modal-labels">
                {tagsView}
                {/* <LabelTag
                  name="تست"
                  number="2"
                /> */}
              </div>
              
            </div>
           : <div className="modal-bottom">
           <h2>لطفا منتظر بمانید</h2>
           </div>}
            
          <div className="modal-footers">
            <div className = "row">
              <div className="col">
                <button onClick={this.props.hide} className="modal-button link float-right">
                  لغو
                </button>
              </div>
              <div className="col">
                <button onClick={this.sendReqeust} className="modal-button primary float-left">
                  ارسال
                </button>
              </div>
            </div>
          </div>
        </div>
      )
  
    
    
  }
};
const mapStateToProps = (state) => ({
    agencyRequest: state.common.agencyRequest,
   
})
const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
    agencyRequest: OrganizationActions.agencyRequest ,
	}, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(AgentForm)