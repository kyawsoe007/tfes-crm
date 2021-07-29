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
// import DateTimePicker from "Components/Form/Pickers/DateTimePicker";

// // actions
// import {
//     getFollowupResult,
//     getFollowupType,
//     newFollowUp,
//     editFollowUp
// } from "Ducks/followUp";

class TemplateDetailsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            template: {
                title: this.props.title ? this.props.title : "Not Set",
                description: this.props.description ? this.props.description : "Not Set",
                id: this.props.id
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.openNewTemplate = this.openNewTemplate.bind(this);
        // this.onEdit = this.onEdit.bind(this);
        // this.onCheck = this.onCheck.bind(this);
    }

    componentDidMount() {

    }

    handleChange(field, value) {
        this.setState({ template: { ...this.state.template, [field]: value } });
        this.props.updateParent(field, value);
    }
    onSubmit() {

        this.props.onSub({
            id: this.state.template.id,
            title: this.state.template.title,
            description: this.state.template.description
        })
        // this.openNewTemplate();
        this.props.handleHide();
    }

    render() {

        const { show, handleHide } = this.props;
        const { title, description } = this.state.template;
        return (
            <DialogRoot
                title={this.props.title ? this.props.title : "New Template" + " Details"}
                size="md"
                show={show}
                handleHide={handleHide}
                dialogActionLabel={"Save"}
                dialogAction={this.onSubmit}
                close
            >
                <div className="row justify-content-start">
                    <div className="col-md-3">
                        <FormInput
                            placeholder="Template Title"
                            rows={1}
                            value={title}
                            target="title"
                            handleChange={this.handleChange}
                        />
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <FormInput
                            placeholder="Description"
                            rows={4}
                            multiline
                            value={description}
                            target="description"
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
    {

    }
)(connectModal({ name: "template_details_form" })(TemplateDetailsForm));
