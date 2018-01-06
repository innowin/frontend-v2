/*global __*/
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {editIcon} from 'src/images/icons'


export class ItemWrapper extends Component {
    static propTypes = {
        icon: PropTypes.node,
    };

    render() {
        return (
            <div className="profile-item">
                <div className="profile-icon">{this.props.icon}</div>
                <div className="profile-content">
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
        showEdit: PropTypes.func.isRequired,
    };

    render() {
        return (
            <div className="profile-item-header">
                <div className="profile-item-title">{this.props.title}</div>
                <div className="profile-item-edit-btn">
                    <div onClick={this.props.showEdit}>{editIcon}</div>
                </div>
            </div>
        )
    }
}

export class FrameCard extends Component {
    render() {
        return (
            <div className="profile-card">
                {this.props.children}
            </div>
        )
    }
}

export class CategoryTitle extends Component {
    static propTypes = {
        title: PropTypes.node,
        createForm: PropTypes.bool,
        showCreateForm: PropTypes.func,
    };

    render() {
        return (
            <div className="profile-category-title">
                {this.props.title}
                {!this.props.createForm &&
                <button className="btn btn-sm btn-outline-success ml-auto" onClick={this.props.showCreateForm}>
                    +
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
            <div className="col-5 pr-0">
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

