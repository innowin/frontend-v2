import React from 'react';
import { action } from '@storybook/addon-actions';
import { Button, Welcome } from '@storybook/react/demo';
import {CenterDecorator, ProfileCardDecorator} from "../helpers";
import {OrganizationSkills} from 'src/views/organization/skills/item'
import { OrganizationContainer } from 'src/views/organization/skills/index';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';


// TODO correct  customer format, users format ( users? members?)
const organization = {
    user: {username: "mohsnejon", firstName: "mohsen", lastName: "fallah", email: "mohy@gail.co"},
    username: "nokavan",
    officialName: "نوکاوان گستر اندیشه",
    nationalCode: "6660080791",
    id: 2,
	skills:{edges:[{node:{id:1,title:"طراحی صفحات وب و اپلیکیشن",description:"با داشتن 10 سال سابقه فعالیت در زمینه وب و استفاده به روز از ابزار و تکنولوژی های جدید همیشه بهترین کیفیت و پشتیبانی را ارایه کردیم"}},
	{node:{id:2,title:"خدمات آموزشی",description:"با داشتن 10 سال سابقه فعالیت در زمینه وب و استفاده به روز از ابزار و تکنولوژی های جدید همیشه بهترین کیفیت و پشتیبانی را ارایه کردیم"}}]}
};

storiesOf('Organization - skills', module)
    .addDecorator(ProfileCardDecorator)
    .addDecorator(CenterDecorator(600))
    .add('Item', () => {
        return <OrganizationSkills
            updateOrganization={action('update')}
            organization={organization}
            allUsers={[
                {node:{id:1, username:"mohsen1"}},
                {node:{id:2, username:"mohsen2"}},
                {node:{id:3, username:"mohsen3"}},
                {node:{id:4, username:"mohsen4"}}
                ]}
        />
    });

