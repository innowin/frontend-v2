import React, {Component} from 'react'
import cx from 'classnames'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {editIcon} from 'src/images/icons'
import {ErrorCard} from "./ErrorCard"
import {LoadingCard} from "./LoadingCard"



export class Tabs extends Component {
  render() {
    return (
      <div className="mt-4 mb-4">
        <div className="-tabs">
          {this.props.children}
        </div>
      </div>
    )
  }
}


export class ItemWrapper extends Component {
  static propTypes = {
    icon: PropTypes.node,
  };

  render() {
    return (
      <div className="-itemWrapper">
        <div className="-item-icon">{this.props.icon}</div>
        <div className="-item-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}


export class ListGroup extends Component {
  render() {
    return (
      <div className="list-group list-group-flush">
        {this.props.children}
      </div>
    )
  }
}

export class ItemHeader extends Component {
  static propTypes = {
    title: PropTypes.node,
    showEdit: PropTypes.func,
  };

  render() {
    const {showEdit} = this.props;
    return (
      <div className="-item-header">
        <div className="-item-title">{this.props.title}</div>
        
          <div className="-item-edit-btn">
          {
          (showEdit!=null) ? 
            <div onClick={showEdit}>{editIcon}</div>: <span/>
          }
          </div> 
      </div>
    )
  }
}

export class FrameCard extends Component {
  static defaultProps = {
    className : ""
  };
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    return (
      <div className={cx("-frameCard\u0020" + this.props.className)}>
        {this.props.children}
      </div>
    )
  }
}

export class CategoryTitle extends Component {

  static defaultProps = {
    createForm: true,
    showCreateForm: () => false
  };

  static propTypes = {
    title: PropTypes.node,
    createForm: PropTypes.bool,
    showCreateForm: PropTypes.func,
  };

  render() {
    return (
      <div className="-categoryTitle">
        <span>{this.props.title}</span>
        {!this.props.createForm &&
        <button className="btn btn-sm btn-outline-success" onClick={this.props.showCreateForm}>
          <FontAwesome name="plus" />
        </button>}
      </div>
    )
  }
}

export class FieldLabel extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="col-5">
        {this.props.label}
      </div>
    )
  }
}

export class FieldValue extends Component {
  static propTypes = {
    value: PropTypes.any,
  };

  render() {
    return (
      <div className="col-7 font-weight-bold break-word">
        {this.props.value}
      </div>
    )
  }
}

export class Field extends Component {

  render() {
    return (
      <div className="row col-form-label">
        {this.props.children}
      </div>
    )
  }
}

export class VerifyWrapper extends Component {

  static defaultProps = {
    retry: () => {
      return alert("retry")
    },
    error: false
  };

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    retry: PropTypes.func,
    className: PropTypes.string
  };

  render() {
    const {isLoading, error, retry, children, className} = this.props;
    if (!isLoading) {
      if (!error) {
        return (
          <div className={className}>
            {children}
          </div>
        )
      }
      // TODO mohsen #32 handel error message and retry in ErrorCard
      return <ErrorCard retry={retry} header={error}/>
    }
    return <LoadingCard/>
  }
}

