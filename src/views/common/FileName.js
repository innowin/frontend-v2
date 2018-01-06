import React, {Component, PropTypes} from 'react';

export class FileName extends Component {
    static propTypes = {
        fileName: PropTypes.string.isRequired,
    };

    render() {
        const fileName = this.props.fileName;
        const parts = fileName.split('.');
        const ext = parts.pop();
        const name = parts.join('.');
        // TODO keep ltr
        return (
            <div className="filename-wrapper dir-rtl">
                <span className="filename-name">{name}</span>
                <span className="filename-ext">.{ext}</span>
            </div>
        )
    }
}
