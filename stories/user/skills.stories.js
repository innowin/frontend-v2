import React from "react"
import { action } from "@storybook/addon-actions"
import { Button, Welcome } from "@storybook/react/demo"
import { linkTo } from "@storybook/addon-links"
import { storiesOf } from "@storybook/react"
import {CenterDecorator, ProfileCardDecorator} from "../helpers"
import {UserSkills} from "src/views/user/skills/item"


// TODO correct  customer format, users format ( users? members?)
const User = {
		username: "mohsnejon",
		firstName: "mohsen",
		lastName: "fallah",
		email: "mohy@gail.co",
    id: 2,
	skills:[{
		node:
		{
			id:1,
			title:"طراحی صفحات وب و اپلیکیشن",
			description:"با داشتن 10 سال سابقه فعالیت در زمینه وب و استفاده به روز از ابزار و تکنولوژی های جدید همیشه بهترین کیفیت و پشتیبانی را ارایه کردیم",
			tags:[{name:"C#"},{name:"Matlab"},{name:"C++"}]
		}
	},
	{node:{
		id:2,
		title:"خدمات آموزشی",
		description:"با داشتن 10 سال سابقه فعالیت در زمینه وب و استفاده به روز از ابزار و تکنولوژی های جدید همیشه بهترین کیفیت و پشتیبانی را ارایه کردیم",
		tags:[{name:"C#"},{name:"Matlab"},{name:"C++"}]
	}
	}]
};

storiesOf('User - skills', module)
    .addDecorator(ProfileCardDecorator)
    .addDecorator(CenterDecorator(600))
    .add('Item', () => {
        return <UserSkills
            updateUser={action('update')}
            User={User}
        />
    });

