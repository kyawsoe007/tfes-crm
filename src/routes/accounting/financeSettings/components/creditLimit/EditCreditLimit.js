import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditCreditLimit = ({ show, handleHide, creditLimitDetail, patchCreditLimit }) => {


    const [stockLocationName, setStockLocationName] = useState(creditLimitDetail.name)
    const [creditLimitAmount,setCreditLimitAmount]=useState(creditLimitDetail.amount)
    const closeAndUpdate = () => {

        const patchBody = {
            id: creditLimitDetail.id,
            name: stockLocationName,
            amount:creditLimitAmount
        }

        patchCreditLimit(patchBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{creditLimitDetail.name} </span> Credit Limit Details</h1>
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
                        onChange={ (e) => setCreditLimitAmount(e.target.value) }
                        value={creditLimitAmount}
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

export default EditCreditLimit;