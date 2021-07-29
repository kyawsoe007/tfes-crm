import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditDownPayment = ({ show, handleHide, downPaymentDetail, patchDownPayment }) => {


    const [stockLocationName, setStockLocationName] = useState(downPaymentDetail.name)
    const [downPaymentAmount,setDownPaymentAmount]=useState(downPaymentDetail.amount)
    const closeAndUpdate = () => {

        const patchBody = {
            id: downPaymentDetail.id,
            name: stockLocationName,
            amount:downPaymentAmount
        }

        patchDownPayment(patchBody);
        // console.log("PATCH BODY", patchBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{downPaymentDetail.name} </span> Down Payment Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="Name"
                        onChange={ (e) => setStockLocationName(e.target.value) }
                        value={stockLocationName}
                    />
                    </div>
                    <div className="col-12">
                    <FormInput 
                        label="Amount"
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

export default EditDownPayment;