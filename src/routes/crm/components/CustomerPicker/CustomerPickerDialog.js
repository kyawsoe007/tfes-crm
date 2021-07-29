import React from "react";
import { connectModal } from "redux-modal";
import DialogRoot from "Components/Dialog/DialogRoot";

// Customer List
import CustomerList from "../../customer/components/CustomerList";

function CustomerPickerDialog(props) {
  const { show, handleHide, onSelect, target, selected } = props;

  return (
    <DialogRoot show={show} handleHide={handleHide} size="lg" close>
      <CustomerList
        title="Select Customer"
        tableStyles={{ style: { boxShadow: "none" } }}
        optionProps={{
          onRowClick: (rowData, rowMeta) => {
            onSelect(target, rowData[0]);
            handleHide();
          }
        }}
      />
    </DialogRoot>
  );
}

export default connectModal({ name: "customer_picker" })(CustomerPickerDialog);
