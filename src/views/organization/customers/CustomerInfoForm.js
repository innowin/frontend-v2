// flow type of CustomerInfoForm
import * as React from "react";
import { Component } from "react";
import PropTypes from "prop-types";

import type { CustomerType } from "src/consts/flowTypes/organization/customer";
import constants from "src/consts/constants";
import types from "src/redux/actions/types";
import { createFileFunc } from "../../common/Functions";
import AttachFile from "../../common/inputs/AttachFile";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import userActions from "src/redux/actions/user/getUserActions";
import { getSearchedUsers, getSearchWord } from "src/redux/selectors/user/GetAllUsers";
import FileActions from "src/redux/actions/commonActions/fileActions";
import TempActions from "src/redux/actions/tempActions";
import CustomerActions from "src/redux/actions/organization/customerActions";
import { TextInput } from "../../common/inputs/TextInput";
import { DefaultUserIcon } from "../../../images/icons";

const CustomerInfoFormTempKeyName = "customer_picture_file";

type PropsCustomerInfoForm = {
  customer: CustomerType,
  translate: { [string]: string },
  children?: React.Node,
  tempCustomerPictureId: ? number,
  customerPictureLink: ?string,
  hideEdit: Function,
  actions: {
    getSearchedUsers: Function,
    resetSearchUser: Function,
    getUserIdentity: Function,
    createFile: Function,
    getFile: Function,
    removeFileFromTemp: Function,
    createOrgCustomer: Function,
    updateOrgCustomer: Function,
  },
  searchedUsers: (Object)[],
  searchObj: {
    search: ?string,
    isLoading: boolean
  }
}

class CustomerInfoForm extends Component<PropsCustomerInfoForm> {
  static propTypes = {
    translate: PropTypes.object.isRequired,
    hideEdit: PropTypes.func.isRequired,
    getFile: PropTypes.func,
    customer: PropTypes.object,
    tempCustomerPictureId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      relatedCustomerIdentityId: "",
      searchedRelatedCustomerWord: "",
      pictureString: "",
      savingCustomer: false,
      resetSearch: false,
      error: ""
    };
  }

  _handleBase64 = (fileString) => {
    this.setState({ ...this.state, pictureString: fileString });
  };

  _validateTitle = (title) => {
    const { translate } = this.props;
    if (title.length < 3) {
      return translate["Title is wrong"];
    }
  };

  _preSave = () => {
    this.setState({ ...this.state, savingCustomer: true });
    const { pictureString } = this.state;
    const { actions } = this.props;
    const { createFile } = actions;
    const nextActionTypesForCustomerPicture = types.COMMON.SET_FILE_IDS_IN_TEMP_FILE;
    const nextActionDataForCustomerPicture = { tempFileKeyName: CustomerInfoFormTempKeyName };
    const fileIdKey = "fileId";
    const postPicturesCreateArguments = {
      fileIdKey,
      nextActionType: nextActionTypesForCustomerPicture,
      nextActionData: nextActionDataForCustomerPicture
    };
    pictureString && createFileFunc(createFile, pictureString, postPicturesCreateArguments);
  };


  _formValidate = () => {
    const { relatedCustomerIdentityId } = this.state;
    const { customer, tempCustomerPictureId } = this.props;
    const titleValidate = this.titleInput.validate();
    const customerPicture = tempCustomerPictureId ||
      (customer && (customer.customer_picture.id || customer.customer_picture));
    if (!titleValidate && customerPicture && relatedCustomerIdentityId) {
      return true;
    } else {
      return false;
    }
  };

  _save = () => {
    const { organizationId, customer, tempCustomerPictureId, hideEdit, actions } = this.props;
    const { updateOrgCustomer, createOrgCustomer, removeFileFromTemp } = actions;
    const { relatedCustomerIdentityId } = this.state;
    const title = this.titleInput.getValue();
    const customerPicture = tempCustomerPictureId ||
      (customer && (customer.customer_picture.id || customer.customer_picture));
    const formValues = {
      customer_organization: organizationId,
      title,
      related_customer: relatedCustomerIdentityId,
      customer_picture: customerPicture
    };
    if (this._formValidate()) {
      if (customer) {
        const customerId: number = customer.id;
        updateOrgCustomer({ formValues, customerId });
      } else {
        createOrgCustomer({ formValues, organizationId });
      }
      hideEdit();
    }
    removeFileFromTemp(CustomerInfoFormTempKeyName);
    this.setState({ ...this.state, savingCustomer: false });
  };

  componentDidUpdate(prevProps, prevState) {
    const { tempCustomerPictureId, customer } = this.props;
    const { resetSearch, savingCustomer } = this.state;
    const customerPictureId = customer && (customer.customer_picture.id || customer.customer_picture);
    const existPicture = tempCustomerPictureId || customerPictureId;

    if (resetSearch) {
      this._resetSearchUser();
      this.setState({ ...this.state, resetSearch: false });
    }
    if (savingCustomer && existPicture) {
      this._save();
    }
  }

  _handleClickOutMenuBox = (e: any) => {
    const { searchObj } = this.props;
    if (searchObj.search && !e.target.closest("#relatedCustomerDiv")) {
      this._resetSearchUser();
    }
  };

  componentDidMount() {
    const { customer, actions } = this.props;
    const { getFile } = actions;
    if (customer) {
      const customerPictureId = customer.customer_picture.id || customer.customer_picture;
      const relatedCustomerIdentityId = customer.related_customer.id || customer.related_customer;
      this.setState({
        ...this.state,
        title: customer.title,
        customerPictureId,
        relatedCustomer: relatedCustomerIdentityId
      }, () => {
        getFile && !customer.customer_picture.id && getFile(customer.customer_picture);
      });
    }

    this._resetSearchUser();

    document.addEventListener("click", this._handleClickOutMenuBox);
  }

  componentWillUnmount() {
    (document.removeEventListener: Function)("click", this._handleClickOutMenuBox);
  }

  _onSubmit = (e) => {
    e.preventDefault();
    this._preSave();
  };

  _handleSearchedWord = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const { searchedUsers, actions } = this.props;
    const { getSearchedUsers } = actions;
    const object = searchedUsers.filter(
      userObj => userObj.profile && (userObj.profile.content.profile_user.username === value)
    )[0];
    const identityId = ((object && object.profile) ? object.profile.content.profile_user.identity : "") ||
      2638; //TODO: handle by backend developer.remove 2638 from here
    this.setState({ ...this.state, relatedCustomerIdentityId: identityId, searchedRelatedCustomerWord: value }, () => {
      const trimedValue = value.trim();
      if (trimedValue.length >= 2) {
        getSearchedUsers(0, 0, trimedValue);
      } else {
        this.setState({ ...this.state, resetSearch: true });
      }
    });
  };

  _handleRelatedCustomer = (e, username, identityId) => {
    this.setState({
      ...this.state,
      relatedCustomerIdentityId: identityId, searchedRelatedCustomerWord: username
    }, () => this._resetSearchUser());
  };

  _resetSearchUser = () => {
    const { actions } = this.props;
    const { resetSearchUser } = actions;
    resetSearchUser();
  };

  render() {
    const { searchedUsers, customerPictureLink, translate } = this.props;
    const { pictureString, searchedRelatedCustomerWord, error } = this.state;
    return (
      <form onSubmit={this._onSubmit} className="customer-form">
        <TextInput
          label={translate["Title"] + ": "}
          name="title"
          required={true}
          customValidate={this._validateTitle}
          className="title"
          ref={e => {
            this.titleInput = e;
          }}
        />
        <div className='form-group'>
          <label>
            {translate["Customer picture"] + ": "}
          </label>
          <AttachFile
            inputId="customerPictureInputId"
            AttachButton={() => (<span>عکس </span>)}
            handleBase64={this._handleBase64}
            handleError={(error) => alert(error)}
            translate={translate}
            allowableFormat={constants.FILE_TYPE.PHOTO}
            className="form-control cursor-pointer"
          />
          {
            (pictureString || customerPictureLink) &&
            <img src={pictureString || customerPictureLink} className="media-preview covered-img" alt=""/>
          }
        </div>

        <div className='form-group'>
          <label>
            {translate["Related customer"] + ": "}
          </label>
          <div id="relatedCustomerDiv">
            <input
              type="text"
              placeholder={translate["Title"]}
              className='form-control'
              onChange={this._handleSearchedWord}
              value={searchedRelatedCustomerWord}
              style={
                searchedRelatedCustomerWord.length > 0
                && new RegExp("^[A-Za-z]*$").test(searchedRelatedCustomerWord[0]) ? { direction: "ltr" }
                  : { direction: "rtl" }
              }
            />
            <div className="searched-users">
              {searchedUsers.map(userObj => {
                  const profile = userObj.profile ? userObj.profile.content : {};
                  const user = profile.profile_user;
                  return (
                    <div
                      key={user.username}
                      onClick={(event) => this._handleRelatedCustomer(event, (user.username), (user.identity || 2638))}
                      //TODO: handle by backend developer. identity is not exist yet in object.remove 2638 from here
                    >
                      <div className="name">
                      <span>
                        {user.first_name + " " + user.last_name}
                      </span>
                        <span>
                        {user.username + "@"}
                      </span>
                      </div>
                      <div className="img">
                        {
                          (profile.profile_media && profile.profile_media.file) ?
                            (<img className="covered-img" alt=""
                                  src={"http://restful.innowin.ir" + profile.profile_media.file}/>)
                            : (<DefaultUserIcon/>)
                        }
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
        {error && <span className="error-message">{error}</span>}

        {this.props.children}

      </form>
    );
  }
}

const mapStateToProps = state => {
  const tempCustomerPictureId = state.temp.file[CustomerInfoFormTempKeyName] || null;
  return {
    tempCustomerPictureId,
    searchedUsers: getSearchedUsers(state),
    searchObj: getSearchWord(state)
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getSearchedUsers: userActions.getAllUsers,
    resetSearchUser: userActions.resetSearchUser,
    createFile: FileActions.createFile,
    getFile: FileActions.getFile,
    removeFileFromTemp: TempActions.removeFileFromTemp,
    createOrgCustomer: CustomerActions.createOrgCustomer,
    updateOrgCustomer: CustomerActions.updateOrgCustomer
  }, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoForm);