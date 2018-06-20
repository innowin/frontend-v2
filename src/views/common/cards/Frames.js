import React from 'react'
import cx from 'classnames'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import {editIcon} from 'src/images/icons'
import {ErrorCard} from "./ErrorCard"
import {LoadingCard} from "./LoadingCard"


export const Tabs = (props) => {
  return (
    <div className="mt-4 mb-4">
      <div className="-tabs">
        {props.children}
      </div>
    </div>
  )
}


export const ItemWrapper = ({className='', ...props}) => {
  const {icon, children} = props
  return (
    <div className={"-itemWrapper " + className}>
      <div className="-item-icon">{icon}</div>
      <div className="-item-content">
        {children}
      </div>
    </div>
  )
}
ItemWrapper.propTypes = {
  icon: PropTypes.node,
  className: PropTypes.string,
}


export const ListGroup = (props) => {
  return (
    <div className="list-group list-group-flush">
      {props.children}
    </div>
  )
}

export const ItemHeader = (props) => {
  const {showEdit} = props;
  return (
    <div className="-item-header">
      <div className="-item-title">{props.title}</div>
      <div className="-item-edit-btn">
        {
          (showEdit != null) ?
            <div onClick={showEdit}>{editIcon}</div> : <span/>
        }
      </div>
    </div>
  )
}
ItemHeader.propTypes = {
  title: PropTypes.node,
  showEdit: PropTypes.func,
};

export const FrameCard = ({children, className=''}) => {
  return (
    <div className={cx("-frameCard\u0020" + className)}>
      {children}
    </div>
  )
}
FrameCard.propTypes = {
  className: PropTypes.string
};

export const CategoryTitle = ({title, createForm = true, showCreateForm = () => false}) => {
    return (
      <div className="-categoryTitle">
        <span>{title}</span>
        {!createForm &&
        <button className="btn btn-sm btn-outline-success" onClick={showCreateForm}>
          <FontAwesome name="plus"/>
        </button>}
      </div>
    )
}
CategoryTitle.propTypes = {
  title: PropTypes.node,
  createForm: PropTypes.bool,
  showCreateForm: PropTypes.func,
};

export const FieldLabel = (props) => {
    return (
      <div className="col-5">
        {props.label}
      </div>
    )
}
FieldLabel.propTypes = {
  label: PropTypes.string.isRequired,
};

export const FieldValue = (props) => {
    return (
      <div className="col-7 font-weight-bold break-word">
        {props.value}
      </div>
    )
}
FieldValue.propTypes = {
  value: PropTypes.any,
};

export const Field = (props) => {
    return (
      <div className="row col-form-label">
        {props.children}
      </div>
    )
}

export const VerifyWrapper = ({error=false, retry = () => alert("retry"), ...props}) => {
    const {isLoading, children, className} = props;
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
VerifyWrapper.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  retry: PropTypes.func,
  className: PropTypes.string
};

