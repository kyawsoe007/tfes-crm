import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const AddPaymentDetails = ({ show, handleHide, postPaymentTerm }) => {


    const [addStockLocationName, setAddStockLocationName] = useState("")
    const [paymentTermDay,setPaymentTermDay]=useState(0)
    const closeAndUpdate = () => {

        const postBody = {
            name: addStockLocationName,
            days:paymentTermDay
        }

        postPaymentTerm(postBody)
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
                    <h1> Add Payment Term Details</h1>
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
                        label="New Days"
                        onChange={ (e) => setPaymentTermDay(e.target.value) }
                        value={paymentTermDay}
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

export default AddPaymentDetails;