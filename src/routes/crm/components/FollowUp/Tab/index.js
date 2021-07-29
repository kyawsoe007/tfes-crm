/**
 * Follow up component
 *
 * @param allFollowup
 * @param followupableType(Lead, Invoice)
 * @param followupableId(Lead, Invoice)
 */

import React from "react";
import { connect } from "react-redux";

// New Follow up
import { show } from "redux-modal";
import FollowupForm from "../Forms/FollowupForm";
import FollowUpTable from "./FollowUpTable";

// Actions
import { deleteFollowUp } from "Ducks/followUp";

function seperateFollowup(allFollowup) {
  const completed = [];
  const upcoming = [];
  const now = Date.now();
  allFollowup.forEach(followup => {
    new Date(followup.date).getTime() > now
      ? upcoming.push(followup)
      : completed.push(followup);
  });
  return { completed, upcoming };
}

function crm_followup_tab(props) {
  const { allFollowup, followupableType, followupableId } = props;

  const newFollowup = () =>
    props.show("followup_form", {
      followupableType: followupableType,
      followupableId: followupableId
    });

  const editFollowup = id => {
    const toEdit = allFollowup.find(followup => followup.id == id);
    props.show("followup_form", {
      edit: toEdit
    });
  };

  const deleteEntry = id => {
    const toDelete = allFollowup.find(followup => followup.id == id);
    props.show("alert_delete", {
      action: () => props.deleteFollowUp(toDelete)
    });
  };

  const { completed, upcoming } = seperateFollowup(allFollowup);
  return (
    <React.Fragment>
      <div className="row mb-20">
        <div className="col-12">
          <FollowUpTable
            title="Upcoming Follow Ups"
            upcoming
            data={upcoming}
            newFollowup={newFollowup}
            editFollowup={editFollowup}
            deleteFollowup={deleteEntry}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <FollowUpTable
            title="Logged Follow Ups"
            data={completed}
            newFollowup={newFollowup}
            editFollowup={editFollowup}
            deleteFollowup={deleteEntry}
          />
        </div>
      </div>
      <FollowupForm />
    </React.Fragment>
  );
}

export default connect(null, { show, deleteFollowUp })(crm_followup_tab);
