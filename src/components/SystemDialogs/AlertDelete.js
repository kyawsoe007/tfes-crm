import React from "react";
import { connectModal } from "redux-modal";
import SweetAlert from "react-bootstrap-sweetalert";

const AlertDelete = props => {
  function handleDelete() {
    props.action();
    props.handleHide();
  }
  const { show, handleHide, name } = props;
  return (
    <SweetAlert
      danger
      btnSize="sm"
      show={show}
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="default"
      confirmBtnCssClass="text-danger"
      title="Are you sure?"
      onConfirm={() => handleDelete()}
      onCancel={() => handleHide()}
    >
      <p>
        You are about to delete the record {`"${name}". `}You will not be able
        to recover this record.
      </p>
    </SweetAlert>
  );
};

export default connectModal({ name: "alert_delete" })(AlertDelete);
