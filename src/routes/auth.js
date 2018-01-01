import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import LoginPage from "src/views/public/LoginPage";

export const authRoutes = <Route path="auth">
    <Route path="login" component={LoginPage}/>

    <Redirect from="logged-in" to="/"/>
    <Redirect from="login-error" to="/"/>

    <Redirect from="new-association" to="/"/>
    <Redirect from="account-disconnected" to="/"/>
    <Redirect from="inactive-user" to="/"/>
    <Redirect from="logout" to="/"/>

    <Redirect from="invalid-token" to="/"/>
    <Redirect from="expired-token" to="/"/>
    <Redirect from="success-activation" to="/"/>
</Route>;