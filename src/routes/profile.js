import React from 'react';
import {Route, IndexRedirect} from 'react-router';

import ProfilePage from "src/views/public/ProfilePage";
import Profile from 'src/views/components/profile/profiles/index';
import WorkExperiences from 'src/views/components/profile/workExperiences/index';
import Educations from 'src/views/components/profile/educations/index';
import Certificates from 'src/views/components/profile/certificates/index';
import Researches from "src/views/components/profile/researches/index";
import Skills from "src/views/components/profile/skills/index";

export const profileRoutes = <Route path="/user/:username" component={ProfilePage}>
    <IndexRedirect to="profile"/>
    <Route path="profile" components={Profile}/>
    <Route path="educations" components={Educations}/>
    <Route path="workExperiences" components={WorkExperiences}/>
    <Route path="researches" components={Researches}/>
    <Route path="certificates" components={Certificates}/>
    <Route path="skills" components={Skills}/>
</Route>;