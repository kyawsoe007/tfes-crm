import React, { Component } from "react";
 import { connect } from 'react-redux'

//sub components
import DialogRoot from 'Components/Dialog/DialogRoot'
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
//icon
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
// Actions
// import {patchSingleQtyPacking } from "Ducks/packing";

function ConfirmFinishedSku(props) {
  const{confirmQty ,  handleChange ,onSubmitCompetedSku } = props;
 
    return (
      <React.Fragment>
        <form autoComplete="off">
          <div class="row"><h2 style={{
            margin: "20px auto", color: "#254065 "
          }}>Finished Qty</h2></div>
          <div style={{
            margin: "20px auto",width:"30%"
          }}>
            <FormInput
              label=""
              value={confirmQty}
              target="confirmQty" 
              handleChange={handleChange}
            />
          </div>
         
          <div class="row" >
            <button
            type="button"
            onClick={onSubmitCompetedSku}
            className="primary_btn"
            style={{margin: "20px auto",}}
           >
              Confirm
            </button></div>
        </form>
      </React.Fragment>

    )

}
export default ConfirmFinishedSku;
