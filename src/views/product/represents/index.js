/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getProductRepresents, createRepresent, deleteRepresent, updateRepresent} from 'src/crud/product/represents'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {RepresentItemWrapper, RepresentView} from "./Views"
import {REST_REQUEST} from "src/consts/Events"
import {REST_URL as url, SOCKET as socket} from "src/consts/URLS"
import {TOKEN} from "src/consts/data"
import {ID} from "../../../consts/data";

export class Represent extends Component {

  static propTypes = {
    Represents: PropTypes.array.isRequired,
    Represent: PropTypes.object.isRequired,
    updateRepresent: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { error: false, isLoading: false, product:{}, profile:{}, Represent: this.props.Represent||{} };
  }
  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updateView = (res) => {
    this.setState({...this.state, Represent: res})
  };

  _update = (formValues, postId) => {
    this.setState({...this.state, isLoading: true});
    return updateRepresent(formValues, postId, this._updateView, this._hideEdit, this._handleErrorLoading);
  };

  componentDidMount() {
    // TODO mohsen: handle get productId or organId from Represent
    const productId = ID;

  }

  componentWillUnmount() {
    const {productId} = this.props;
    // TODO mohsen: complete by socket.off of update and delete requests
    socket.off(`product-Represents-get/${productId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, Represents: res, isLoading: false};
        this.setState(newState);
      }
    });

    socket.off(`profileUser-Represents-get/${productId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, profile: res[0], isLoading: false};
        this.setState(newState);
      }
    });

  }

  render() {
    const {Represent, isLoading, error, product, profile} = this.state;
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <RepresentView Represent={Represent} product={product} profile={profile} showEdit={this._showEdit}/>
      </VerifyWrapper>
    )
  }
}

class Represents extends Component {

  constructor(props) {
    super(props);
    this.state = {isLoading: false, error: null, Represents: [], product: {}, profile: {}};
  }

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updateRepresents = (res, type, deletedIndex = null) => {
    const {Represents} = this.state;
    this.setState({...this.state, Represents: [...Represents, ...res]});
    return false;
  };

  _getProductRepresents = (productId) => {
    this.setState({...this.state, isLoading: true});
    getProductRepresents(productId , this._updateRepresents, this._handleErrorLoading);
  };

  componentDidMount() {
    this._getProductRepresents(this.props.productId);
  };

  componentWillUnmount() {
    const {productId} = this.props;
    // TODO mohsen: complete by socket.off of update and delete requests
    socket.off(`productRepresents-Represents-get/${productId}`, (res) => {
      if (res.detail) {
        const newState = {...this.state, error: res.detail, isLoading: false};
        this.setState(newState);
      } else {
        const newState = {...this.state, Represents: res, isLoading: false};
        this.setState(newState);
      }
    });
  }

  render() {
    const { isLoading, error} = this.state;
    const Represents = [...new Set(this.state.Represents)];
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Represent')}
        />
        <FrameCard className="-frameCardRepresents">
          <ListGroup>
            {
              Represents.map((represent) => (
                <Represent
                  Represents={represent}
                  Represent={represent}
                  updateRepresent={this._updateRepresents}
                  key={represent.id}
                />
              ))
            }
          </ListGroup>
        </FrameCard>
      </VerifyWrapper>
    )
  }
}

export default Represents;