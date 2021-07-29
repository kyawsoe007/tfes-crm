import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditCreditTerm = ({ show, handleHide, creditTermDetail, patchCreditTerm }) => {


    const [stockLocationName, setStockLocationName] = useState(creditTermDetail.name)
    const [creditTerm,setCreditTerm]=useState(creditTermDetail.term)
    const closeAndUpdate = () => {

        const patchBody = {
            id: creditTermDetail.id,
            name: stockLocationName,
            term:creditTerm
        }

        patchCreditTerm(patchBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{creditTermDetail.name} </span> Credit Term Details</h1>
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
                        label="Credit Term"
                        onChange={ (e) => setCreditTerm(e.target.value) }
                        value={creditTerm}
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

export default EditCreditTerm;