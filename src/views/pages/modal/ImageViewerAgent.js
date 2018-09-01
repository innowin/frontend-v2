
import React, { Component } from 'react'
import PropTypes from "prop-types"

export class ImageViewerAgent extends React.Component{
  constructor(props){
    super(props)
  }

  handleClick(){
    if(this.props.imageSelect)
      this.props.imageSelect(this.props.src,this.props.idx)
  }

  render(){
    return(
      <div className="img-agent">
        <img src={this.props.src.file} 
          width="100%" 
          className={this.props.selected ? "selected":""}
          onClick={this.handleClick.bind(this)}/>
      </div>
    )
  }
}

