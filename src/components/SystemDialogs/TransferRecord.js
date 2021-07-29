import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import BaseInput from "Components/Form/BaseInput";

// Actions
import { getAllUsers } from "Ducks/setting/userManagement";

class TransferRecordModal extends Component {
  constructor(props) {
    super(props);
    this.state = { newOwner: this.props.currentOwner };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getAllUsers();
  }
  onChange(val) {
    this.setState({ newOwner: val });
  }
  onSubmit() {
    this.props.action(this.state.newOwner);
    this.props.handleHide();
  }

  render() {
    const { show, handleHide, userList, name } = this.props;
    return (
      <DialogRoot
        title="Transfer Record"
        size="sm"
        show={show}
        handleHide={handleHide}
        dialogActionLabel="Transfer"
        dialogAction={this.onSubmit}
        close
      >
        <div className="row">
          <div className="col">
            <p>
              Transfer <strong>{name}</strong> to another user.
            </p>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-8 align-self-center">
            <FormControl>
              <InputLabel className="fw-bold" shrink>
                New Owner
              </InputLabel>
              <Select
                value={this.state.newOwner}
                onChange={e => this.onChange(e.target.value)}
                input={<BaseInput />}
              >
                {userList &&
                  userList.map((select, key) => (
                    <MenuItem key={key} value={select.id}>
                      {select.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </DialogRoot>
    );
  }
}
const mapStateToProps = ({ usersState }) => {
  const { userList } = usersState;
  return { userList };
};

export default connect(
  mapStateToProps,
  { getAllUsers }
)(connectModal({ name: "transfer_record" })(TransferRecordModal));
