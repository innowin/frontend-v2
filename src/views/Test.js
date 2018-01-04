import React,{Component} from 'react';
import {REST_REQUEST, GET_VIEWS_COUNT} from '../consts/Events';
import {SOCKET as socket , REST_URL as url} from '../consts/URLS';

export default class Test extends Component {

  constructor (props) {
    super(props);
    this.state = {
      is_socket_connected: false,
      error: null,
    }
  }

  componentDidMount() {
    socket.emit(REST_REQUEST,{
      method: "get",
      url: url+'/base/',
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
    const result = this.state;
    return (
      <div style={{background: '#ddd'}}>
        <pre>{JSON.stringify(result,null,2)}</pre>
      </div>
    )
  }
}
