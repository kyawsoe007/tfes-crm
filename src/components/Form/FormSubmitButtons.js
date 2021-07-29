import React from "react";
import Button from "@material-ui/core/Button";

const FormSubmitButtons = ({ onSave, onSaveNew, disabled, edit, name, hidden }) => {
  return (
    <div className="d-block" style={{visibility: hidden}}>
      {!edit && onSaveNew && (
        <Button onClick={() => onSaveNew()} disabled={!disabled}>
          Save and New
        </Button>
      )}
      <Button
        variant="contained"
        color="primary"
        // color="#df0021"
        className="text-white ml-20"
        onClick={() => onSave()}
        disabled={!disabled}
      >
        {name ? name : "Save"}
      </Button>
    </div>
  );
};

export default FormSubmitButtons;
