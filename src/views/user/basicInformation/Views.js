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
import * as jMoment from 'moment-jalali'

export const UserInfoItemWrapper = ({children}) => {
    return (
        <ItemWrapper icon={userInfoIcon}>{children}</ItemWrapper>
    )
};
const JalaliWithFarsiMonth = (date) => {
    // this function getting a date in format "YYYY-MM-DDTHH:mm:ss.SSZ" and return somthing like 26 فروردین 1397
    const monthes = {  // object of monthes
        1: 'فروردین',
        2: 'اردیبهشت',
        3: 'خرداد',
        4: 'تیر',
        5: 'مرداد',
        6: 'شهریور',
        7: 'مهر',
        8: 'آبان',
        9: 'آذر',
        10: 'دی',
        11: 'بهمن',
        12: 'اسفند',
    }
    
    const convertTOFarsi = (month) => {
           // a function that convert numbered month to farsi month(for example conver 1 to فروردین).
        const farsiMonth =  Object.keys(monthes).reduce((farsi, key) => {
            return ((key == month) && monthes[key]) || farsi
        }, '')
        /*
            the returned value working as same as the below:
            if (key == month) return monthes[key]
            else return farsi
        */
            
        return farsiMonth
    }
    
    let jalaliDate;
    if (date) {
        jalaliDate = jMoment(date, "YYYY-MM-DDTHH:mm:ss.SSZ")
        jalaliDate = `${jalaliDate.jDate()} ${convertTOFarsi(jalaliDate.jMonth())} ${jalaliDate.jYear()}`
    }
    return jalaliDate // the output is somthing like 26 فروردین 1397
}

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
                    <FieldValue value={user.first_name}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Last name') + ": "}/>
                    <FieldValue value={user.last_name}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Email') + ": "}/>
                    <FieldValue value={user.email}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Date joined') + ": "}/>
                    <FieldValue value={JalaliWithFarsiMonth(user.date_joined)}/>
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
        const listWebSite = list_of_badge(profile.web_site);
        // TODO keep ltr
        return (
            <UserInfoItemWrapper>
                <ItemHeader title={__('Profile info')} showEdit={showEdit}/>
                <Field>
                    <FieldLabel label={__('BirthDate') + ": "}/>
                    <FieldValue value={profile.birth_date}/>
                </Field>
                <Field>
                    <FieldLabel label={__('National code') + ": "}/>
                    <FieldValue value={profile.national_code}/>
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
                    <FieldValue value={profile.public_email}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Telegram account') + ": "}/>
                    <FieldValue value={<span className="d-inline-block dir-rtl">{profile.telegram_account}</span>}/>
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



export class ResearchInfoView extends Component {
    static propTypes = {
        showEdit: PropTypes.func.isRequired,
        research: PropTypes.object.isRequired,
    };

    render() {
        const {research, showEdit} = this.props;
        const listAuthor = list_of_badge(research.author);
        // TODO keep ltr
        return (
            <UserInfoItemWrapper>
                <ItemHeader title={__('ResearchInfo')} showEdit={showEdit}/>
                <Field>
                    <FieldLabel label={__('Title') + ": "}/>
                    <FieldValue value={research.title}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Author') + ": "}/>
                    <FieldValue value={<span className="dir-rtl">{listAuthor}</span>}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Publication') + ": "}/>
                    <FieldValue value={research.publication}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Year') + ": "}/>
                    <FieldValue value={research.year}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Page Count') + ": "}/>
                    <FieldValue value={research.page_count}/>
                </Field>
            </UserInfoItemWrapper>
        )
    }
}


export class EducationInfoView extends Component {
    static propTypes = {
        showEdit: PropTypes.func.isRequired,
        education: PropTypes.object.isRequired,
    };

    render() {
        const {education, showEdit} = this.props;
        // TODO keep ltr
        return (
            <UserInfoItemWrapper>
                <ItemHeader title={__('EducationInfo')} showEdit={showEdit}/>
                <Field>
                    <FieldLabel label={__('University') + ": "}/>
                    <FieldValue value={education.university}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Grade') + ": "}/>
                    <FieldValue value={education.grade}/>
                </Field>
                <Field>
                    <FieldLabel label={__('FromDate') + ": "}/>
                    <FieldValue value={education.from_date}/>
                </Field>
                <Field>
                    <FieldLabel label={__('ToDate') + ": "}/>
                    <FieldValue value={education.to_date}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Average') + ": "}/>
                    <FieldValue value={education.average}/>
                </Field>
                <Field>
                    <FieldLabel label={__('Description') + ": "}/>
                    <FieldValue value={education.description}/>
                </Field>
            </UserInfoItemWrapper>
        )
    }
}