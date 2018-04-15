/*global __*/
import React, {Component} from "react"
import PropTypes from 'prop-types'
import {getProductRepresents, createRepresent, deleteRepresent, updateRepresent} from 'src/crud/product/represents'
import {FrameCard, CategoryTitle, ListGroup, VerifyWrapper} from "src/views/common/cards/Frames"
import {RepresentCreateForm} from "./Forms"
import {RepresentEditForm} from './Forms'
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
    this.state = {edit: false, error: false, isLoading: false, product:{}, profile:{}, Represent: this.props.Represent||{} };
  }

  _showEdit = () => {
    this.setState({edit: true});
  };

  _hideEdit = () => {
    this.setState({edit: false});
  };

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

  _delete = () => {
    this.setState({...this.state, isLoading: true});
    return deleteRepresent(this.props.Represents, this.props.Represent, this.props.updateRepresent, this._hideEdit, this._handleErrorLoading);
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
    if (this.state.edit) {
      return (
        <VerifyWrapper isLoading={isLoading} error={error}>
          <RepresentItemWrapper>
            <RepresentEditForm
              Represent={Represent}
              hideEdit={this._hideEdit}
              delete={this._delete}
              update={this._update}
            />
          </RepresentItemWrapper>
        </VerifyWrapper>
      )
    }
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
    this.state = {createForm: false, edit: false, isLoading: false, error: null, Represents: [], product: {}, profile: {}};
  }

  _delete = (postId, updateStateForView, hideEdit) => {
    return deleteRepresent(postId, updateStateForView, hideEdit);
  };

  _showCreateForm = () => {
    this.setState({createForm: true});
  };

  _hideCreateForm = () => {
    this.setState({createForm: false});
  };

  _handleErrorLoading = (error = false) => {
    this.setState({...this.state, isLoading: false, error: error});
  };

  _updateRepresents = (res, type, deletedIndex = null) => {
    const {Represents} = this.state;
    if (type === 'get') {
      this.setState({...this.state, Represents: [...Represents, ...res]});
      return false;
    }
    if (type === 'Represent') {
      this.setState({...this.state, Represents: [res, ...Represents]});
      return false;
    }
    if (type === 'del') {
      const remainRepresents = Represents.slice(0, deletedIndex).concat(Represents.slice(deletedIndex + 1));
      this.setState({...this.state, Represents: remainRepresents});
    }
  };

  _getProductRepresents = (productId) => {
    this.setState({...this.state, isLoading: true});
    getProductRepresents(productId , this._updateRepresents, this._handleErrorLoading);
  };

  _create = (formValues) => {
    this.setState({...this.state, isLoading: true});
    createRepresent(formValues, this._updateRepresents, this._handleErrorLoading, this._hideCreateForm);
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
    const {createForm, isLoading, error} = this.state;
    const Represents = [...new Set(this.state.Represents)];
    return (
      <VerifyWrapper isLoading={isLoading} error={error}>
        <CategoryTitle
          title={__('Represent')}
          showCreateForm={this._showCreateForm}
          createForm={createForm}
        />
        <FrameCard className="-frameCardRepresents">
          <ListGroup>
            {
              createForm &&
              <RepresentItemWrapper>
                <RepresentCreateForm hideCreateForm={this._hideCreateForm} create={this._create}/>
              </RepresentItemWrapper>
            }
            {
              Represents.map((Represent) => (
                <Represent
                  Represents={Represents}
                  Represent={Represent}
                  updateRepresent={this._updateRepresents}
                  key={Represent.id}
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