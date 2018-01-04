import React, {Component} from 'react';
import {Link} from 'react-router'; /// mohsen

export class NavItemLink extends Component {
    render() {
        return (
            <Link className="nav-item nav-link" activeClassName="active" {...this.props}>
                {this.props.children}
            </Link>
        )
    }
}