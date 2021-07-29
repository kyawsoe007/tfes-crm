import React, { Component } from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

// Components
import TabsWrapper from "Components/Tabs/TabsWrapper";
import AccountingDetails from "Components/Accounting/View/AccountingDetails";

// Invoice Tab
import ViewTemplate from "Components/Accounting/View/Templates/ViewTemplate";

// Event Tab
import ActivityLog from "Components/ActivityLog";

// Notes Tab
import NewNote from "Components/Form/Note/NewNote";
import DisplayAllNotes from "Components/Everyday/Notes/DisplayAllNotes";

class ViewInvoiceDialog extends Component {
  state = {};
  render() {
    const { show, handleHide, viewInvoice } = this.props;

    return (
      <DialogRoot show={show} handleHide={handleHide} size="md" title="Invoice">
        <AccountingDetails type="invoice" />
        <TabsWrapper>
          <div icon="zmdi-shopping-cart text-success" label="INVOICE">
            <ViewTemplate />
          </div>
          <div icon="zmdi-pizza text-warning" label="ACTIVITY LOG">
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

export default connectModal({ name: "view_invoice", destroyOnHide: true })(
  ViewInvoiceDialog
);
