import React, {Component} from 'react';
import {REST_REQUEST, GET_VIEWS_COUNT} from '../consts/Events';
import {REST_URL as url, SOCKET as socket} from '../consts/URLS';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as testActions from 'src/redux/actions/testActions';
import PropTypes from 'prop-types';

class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_socket_connected: false,
      error: null,
    }
  }

  static propTypes = {
    testActions: PropTypes.object,
    tests: PropTypes.array
  };

  componentDidMount() {
    socket.emit(REST_REQUEST, {
      method: "get",
      url: url + '/base/',
      result: "TEST_BASE_GET",
      token: "",
    });

    socket.emit(GET_VIEWS_COUNT, {
      id: 1,
      result: "TEST_VIEW"
    });

    socket.on('connect', () => {
      console.log('WS connected');
      const newState = {
        ...this.state,
        is_socket_connected: true,
      };
      this.setState(newState);
    });

    socket.on("TEST_REDUX_RESPONSE", res => (
      alert('response of test recieved'))
    );

    socket.on('TEST_VIEW', (res) => {
      console.log('VIEW: ', res);
    });
    socket.on('TEST_BASE_GET', (res) => {
      console.log('base: ', res);
    });

    socket.on('disconnect', () => {
      console.log('WS disconnected');
      const newState = {
        ...this.state,
        is_socket_connected: false,
      };
      this.setState(newState);
    });

    socket.on('error', (err) => {
      console.log('WS has problem in connecting');
      const newState = {
        ...this.state,
        error: err,
      };
      this.setState(newState);
    });
  }

  _renderData = () => (<div>{this.props.tests}</div>);

  render() {
    const result = this.state;
    return (
      <div style={{background: '#ddd', position: 'absolute', bottom: '0', left: '0', opacity: '0.5'}}>
        <pre>{JSON.stringify(result, null, 2)}</pre>
        {this.props.tests.length > 0 ?
          this._renderData()
          :
          <div>
            No Data
          </div>
        }
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    result: state.test.result,
    list: state.test.list,
  }
}

function mapDispatchToProps() {
  return {
    testActions: bindActionCreators(testActions)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)
