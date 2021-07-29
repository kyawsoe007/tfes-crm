import React from "react";
import Button from "@material-ui/core/Button";

const FormEditButtons = ({ onChangeToEdit,  disabled, edit, name,hidden }) => {
  return (
    <div className="" style={{display:hidden,paddingLeft:0,paddingRight:0,marginRight:0,marginLeft:0,}}>
      
      <Button
        variant="contained"
        className="text-white ml-20 FormEditButtons "
        onClick={() => onChangeToEdit()}
        style={{backgroundColor:"#df0021"}}
      >
        {name ? name : "Edit"}
      </Button>
    </div>
  );
};

export default FormEditButtons;
