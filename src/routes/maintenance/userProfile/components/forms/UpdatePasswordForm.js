import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import FormInput from "Components/Form/FormInput";

import { UpdatePassword } from "Ducks/user"
import { show } from "redux-modal";
class UpdatePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
      errorMsg: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleChange(type, val) {
    var newMsg = this.state.errorMsg;
    if (type == "newPassword") {
      if (val != this.state.confirmNewPassword) {
        newMsg = "Passwords must match";
      } else {
        newMsg = "";
      }
    }
    if (type == "confirmNewPassword") {
      if (val != this.state.newPassword) {
        newMsg = "Passwords must match";
      } else {
        newMsg = "";
      }
    }

    this.setState({ [type]: val, errorMsg: newMsg });
  }

  handleUpdate() {
    const data = {
      ...this.state,
      email:this.props.userData.email
    }
    if (this.state.password == "") {
      this.setState({ errorMsg: "Current Password is empty" });
    } else if (this.state.newPassword != this.state.confirmNewPassword) {
      this.setState({ errorMsg: "Passwords must match" });
    } else {
      delete data.errorMsg;
      this.props.UpdatePassword(data);
    }
  }

  render() {
    const { password, newPassword, confirmNewPassword } = this.state;
    return (
      <form>
        <div className="row justify-content-center">
          <div className="col-6">
            <FormInput
              label="Current Password"
              value={password}
              target="password"
              type="password"
              handleChange={this.handleChange}
            />
            <FormInput
              label="New Password"
              value={newPassword}
              target="newPassword"
              type="password"
              handleChange={this.handleChange}
            />
            <FormInput
              label="Confirm New Password"
              value={confirmNewPassword}
              type="password"
              target="confirmNewPassword"
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <div className="d-flex flex-row-reverse align-items-center my-20">
          <Button
            variant="contained"
            className="text-white"
            onClick={this.handleUpdate}
            style={{backgroundColor:"#DF0021"}}
          >
            Save
          </Button>
          <span className="text-danger mr-20">{this.state.errorMsg}</span>
        </div>
      </form>
    );
  }
}

export default connect(
  show,
  { UpdatePassword }
)(UpdatePasswordForm);
