import React from 'react'
import 'src/fontawesome/css/font-awesome.min.css'
import 'src/styles/global.scss'
import Layout from 'src/views/Layout'
import Login from 'src/views/pages/Login'
import PropsRoute from 'src/consts/PropsRoute'
import {Switch} from 'react-router-dom'

class App extends React.Component {

  render() {
    return (
        <div className="App">
          <Switch>
            <PropsRoute path="/login" component={Login}/>
            <Layout/>
          </Switch>
        </div>
    )
  }
}


export default App
