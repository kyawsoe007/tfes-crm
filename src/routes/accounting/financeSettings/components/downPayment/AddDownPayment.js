import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const AddDownPaymentDetails = ({ show, handleHide, postDownPayment }) => {


    const [addStockLocationName, setAddStockLocationName] = useState("")
    const [downPaymentAmount,setDownPaymentAmount]=useState("")
    const closeAndUpdate = () => {

        const postBody = {
            name: addStockLocationName,
            amount:downPaymentAmount
        }

        postDownPayment(postBody)
        handleHide();
    }

    return (
        <DialogRoot
        show={show}
        handleHide={handleHide}
        size={'sm'}
      >
        <div className="container" style={{padding: "1rem"}}>

            <div className="row">
                <div className="col-12">
                    <h1> Add Down Payment Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New Name"
                        onChange={ (e) => setAddStockLocationName(e.target.value) }
                        value={addStockLocationName}
                    />
                    </div>
                    <div className="col-12">
                    <FormInput 
                        label="New Amount"
                        onChange={ (e) => setDownPaymentAmount(e.target.value) }
                        value={downPaymentAmount}
                    />
                </div>
                <hr></hr>
            </div>

        <div style={{ float: "right", paddingTop: "1rem"}}>
            <Button
                variant="contained"
                className="btn-success text-white"
                onClick={closeAndUpdate}
            >
                Save and Close
            </Button>
        </div>
        </div>
      </DialogRoot>
    )
}

export default AddDownPaymentDetails;