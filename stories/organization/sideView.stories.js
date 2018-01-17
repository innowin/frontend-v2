import React from "react"

import { storiesOf } from "@storybook/react"
import { action } from "@storybook/addon-actions"
import { linkTo } from "@storybook/addon-links"

import { Button, Welcome } from "@storybook/react/demo"
import OrganizationSideView from "src/views/bars/Sidebar"

const organization ={
	logo :"#",
	nikeName:"تست",
	officialName:"test",
	description:"a Company"
}
storiesOf('Organization SideView', module)
  .add('normal', () =>{
	return <OrganizationSideView organization={organization}/>
	} )
