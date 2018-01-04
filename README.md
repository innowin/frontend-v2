#DANESH BOOM PROJECT
##Instruction to run the project :

- Installing Node modules
    ```sh 
    yarn
    ```
- Running Developement server
    ```sh 
    yarn start
    ```
    
##Instruction to run StoryBook :
- Running Developement server
    ```sh 
    yarn run storybook
    ```
-------------------------------------
## **GIT**
##### Rules
        1) pull from premaster into your branch.
        2) commit and Push on your branch.
        3) checkout to premaster.
        4) merge your branch into premaster.
        5) push premaster branch on remote server
-------------------------------------
## **Code Style**
- General:
    + TODO
        + Use TODO every where that need change or fixing.

- Indentation 
    + JS
        + Tab size : 2 
        + Indent : 2 
        + Continuation indent : 4 
    + SCSS 
        + Tab size : 2 
        + Indent : 2 
        + Continuation indent : 4     
    + CSS 
        + Tab size : 2 
        + Indent : 2 
        + Continuation indent : 4 
- React Components:
    + Stateless Components: 
        - should be written in Functional-Component way.
    + Importing in Components: 
        - should be imported base on alphabetic order. 
    + Naming declared functions: 
        - Their names should be started with under-score( _ ). 
    + Returning in functions: 
        - Return context inside ( ).


-------------------------------------------------         
## Rest documentation server 
```sh 
    http://restful.daneshboom.ir/docs/    
```
## Socket server 
```sh 
    http://restful.daneshboom.ir/docs/    
```
------------------------------------
##sample Code for SOCKET
```
import React,{Component} from 'react';
import io from 'socket.io-client';
import {REST_REQUEST, GET_VIEWS_COUNT, NEW_VIEW} from '../consts/Events';
import SOCKET_URL from '../consts/socket';

export default class Test extends Component {

  constructor (props) {
    super(props);
    this.state = {
      is_socket_connected: false,
      error: null,
    }
  }

  componentDidMount() {
    const socket = io(SOCKET_URL);

    socket.emit(REST_REQUEST,{
      method: "get",
      url: "http://restful.daneshboom.ir/base/",
      result: "TEST_BASE_GET",
      token: "",
    });

    socket.emit(GET_VIEWS_COUNT, {
      id: 1,
      result: "TEST_VIEW"
    });

    socket.on('connect',()=> {
      console.log('WS connected');
      const newState = {
        ...this.state,
        is_socket_connected: true,
      };      this.setState(newState);
    });

    socket.on('TEST_VIEW',(res)=>{
      console.log('VIEW: ',res);
    });
    socket.on('TEST_BASE_GET',(res)=>{
      console.log('base: ',res);
    });

    socket.on('disconnect',()=>{
      console.log('WS disconnected');
      const newState = {
        ...this.state,
        is_socket_connected: false,
      };
      this.setState(newState);
    });

    socket.on('error',(err)=> {
      console.log('WS has problem in connecting');
      const newState = {
        ...this.state,
        error: err,
      };
      this.setState(newState);
    });
  }

  render() {
    const result = this.state
    return (
        <pre>{JSON.stringify(result,null,2)}</pre>
    )
  }
}

```