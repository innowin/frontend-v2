import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import OrganizationPage from "src/views/public/OrganizationPage";
import Organization from 'src/views/components/organization/organizations/index';
import Customers from 'src/views/components/organization/customers/index';


export const organizationRoutes = <Route path="/organization/:username" component={OrganizationPage}>
    <IndexRedirect to="basicInfo"/>
    <Route path="basicInfo" components={Organization}/>
    <Route path="customers" components={Customers}/>
</Route>;
