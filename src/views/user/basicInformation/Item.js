/*global __*/
import React, {Component} from "react"
import PropTypes from "prop-types"
import {list_of_badge} from "../../common/Functions"
import {userInfoIcon} from "src/images/icons"
import {
    Field,
    FieldLabel,
    FieldValue,
    ItemHeader,
    ItemWrapper,
} from '../../common/cards/Frames'


export const UserInfoItemWrapper = ({children}) => {
    return (
        <ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
    )
};

export class UserInfoView extends Component {
    static propTypes = {
        showEdit: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
    };

    render() {
        const {user, showEdit} = this.props;
        return (
            <UserInfoItemWrapper>
                <ItemHeader title={__('User info')} showEdit={showEdit}/>
                <Field>
                    <FieldLabel label={__('Username') + ": "}/>
                    <FieldValue value={user.username}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Name') + ": "}/>
                    <FieldValue value={user.firstName}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Last name') + ": "}/>
                    <FieldValue value={user.lastName}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Email') + ": "}/>
                    <FieldValue value={user.email}/>
                </Field>
            </UserInfoItemWrapper>
        )
    }
}

export class ProfileInfoView extends Component {
    static propTypes = {
        showEdit: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
    };

    render() {
        const {profile, showEdit} = this.props;
        const listMobile = list_of_badge(profile.mobile);
        const listPhone = list_of_badge(profile.phone);
        const listWebSite = list_of_badge(profile.webSite);
        // TODO keep ltr
        return (
            <UserInfoItemWrapper>
                <ItemHeader title={__('Profile info')} showEdit={showEdit}/>
                <Field>
                    <FieldLabel label={__('BirthDate') + ": "}/>
                    <FieldValue value={profile.birthDate}/>
                </Field>
                <Field>
                    <FieldLabel label={__('National code') + ": "}/>
                    <FieldValue value={profile.nationalCode}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Mobile') + ": "}/>
                    <FieldValue value={<span className="dir-rtl">{listMobile}</span>}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Phone') + ": "}/>
                    <FieldValue value={<span className="dir-rtl">{listPhone}</span>}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Fax') + ": "}/>
                    <FieldValue value={<span className="d-inline-block dir-rtl">{profile.fax}</span>}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Public email') + ": "}/>
                    <FieldValue value={profile.publicEmail}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Telegram account') + ": "}/>
                    <FieldValue value={<span className="d-inline-block dir-rtl">{profile.telegramAccount}</span>}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Website') + ": "}/>
                    <FieldValue value={<span className="dir-rtl">{listWebSite}</span>}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Description') + ": "}/>
                    <FieldValue value={profile.description}/>
                </Field>
            </UserInfoItemWrapper>
        )
    }
}
