import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import client from './client'

const PrivateRoute = ({component, ...rest}) =>
    <Route {...rest} render={routeProps =>
        client.isAuthenticated() ?
            React.createElement(component, {...routeProps, ...rest})
            :
            <Redirect to={{
              pathname: '/login',
              state: routeProps.location,
            }}/>
    }/>

export default PrivateRoute