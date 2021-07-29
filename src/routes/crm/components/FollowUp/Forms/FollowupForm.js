/**
 * New Follow up form
 * @param(followupableType: Lead, Invoice)
 * @param(followupableId: LeadId, InvoiceId)
 */

import React, { Component } from "react";
import { connect } from "react-redux";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

// form inputs
import FormInput from "Components/Form/FormInput";
import DateTimePicker from "Components/Form/Pickers/DateTimePicker";

// actions
import {
  getFollowupResult,
  getFollowupType,
  newFollowUp,
  editFollowUp
} from "Ducks/followUp";

class FollowupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followup: {
        resultId: "",
        typeId: "",
        date: Date.now(),
        title: "",
        followupableType: props.followupableType,
        followupableId: props.followupableId
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    this.props.getFollowupResult();
    this.props.getFollowupType();
    this.props.edit && this.setState({ followup: this.props.edit });
  }

  handleChange(field, value) {
    this.setState({ followup: { ...this.state.followup, [field]: value } });
  }
  onSubmit() {
    this.props.newFollowUp(this.state.followup);
    this.props.handleHide();
  }
  onEdit() {
    this.props.editFollowUp(this.state.followup);
    this.props.handleHide();
  }

  render() {
    const { show, handleHide, followupResult, followupType } = this.props;
    const { resultId, typeId, date, title } = this.state.followup;
    return (
      <DialogRoot
        title="New Follow Up"
        size="md"
        show={show}
        handleHide={handleHide}
        dialogActionLabel={"Save"}
        dialogAction={this.props.edit ? this.onEdit : this.onSubmit}
        close
      >
        <div className="row justify-content-start">
          <div className="col-md-3">
            <FormInput
              label="Result"
              value={resultId}
              selectValues={followupResult}
              selectField="id"
              target="resultId"
              handleChange={this.handleChange}
            />
          </div>
          <div className="col-md-3">
            <FormInput
              label="Type"
              value={typeId}
              selectValues={followupType}
              selectField="id"
              target="typeId"
              handleChange={this.handleChange}
            />
          </div>
          <div className="col-md-3">
            <DateTimePicker
              label="Date and Time"
              value={date}
              target="date"
              handleChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <FormInput
              placeholder="Describe the Follow Up"
              rows={4}
              multiline
              value={title}
              target="title"
              handleChange={this.handleChange}
            />
          </div>
        </div>
      </DialogRoot>
    );
  }
}

const mapStateToProps = ({ followupState }) => {
  const { followupResult, followupType } = followupState;
  return { followupResult, followupType };
};

export default connect(
  mapStateToProps,
  { getFollowupResult, getFollowupType, newFollowUp, editFollowUp }
)(connectModal({ name: "followup_form" })(FollowupForm));
