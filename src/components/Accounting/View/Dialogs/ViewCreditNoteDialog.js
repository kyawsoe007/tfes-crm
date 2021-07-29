import React, { Component } from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

// Components
import TabsWrapper from "Components/Tabs/TabsWrapper";

// Credit Note Tab
import ViewTemplate from "Components/Accounting/View/Templates/ViewTemplate";

// Invoice Credited Tab
import CreditedInvoices from "Components/Accounting/CreditNote/CreditedInvoices";

// Activity Log Tab
import ActivityLog from "Components/ActivityLog";

// Notes Tab
import NewNote from "Components/Form/Note/NewNote";
import DisplayAllNotes from "Components/Everyday/Notes/DisplayAllNotes";

class ViewCreditNoteDialog extends Component {
  state = {};
  render() {
    const { show, handleHide, viewCreditNote } = this.props;

    return (
      <DialogRoot
        show={show}
        handleHide={handleHide}
        size="md"
        title="Credit Note"
      >
        <TabsWrapper>
          <div icon="zmdi-shopping-cart-plus text-success" label="CREDIT NOTE">
            {viewCreditNote}
            <ViewTemplate />
          </div>
          <div icon="zmdi-shopping-cart text-warning" label="INVOICE CREDITED">
            <CreditedInvoices />
          </div>
          <div icon="zmdi-pizza text-info" label="ACTIVITY LOG">
            <ActivityLog />
          </div>
          <div icon="zmdi-assignment text-danger" label="NOTES">
            <div className="row">
              <div className="col-md-12">
                <DisplayAllNotes />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <NewNote /* onAddNote="function" */ />
              </div>
            </div>
          </div>
        </TabsWrapper>
      </DialogRoot>
    );
  }
}

export default connectModal({ name: "view_credit_note", destroyOnHide: true })(
  ViewCreditNoteDialog
);
