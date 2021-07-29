import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditPaymentTerm = ({ show, handleHide, stockLocationDetail, patchPaymentTerm }) => {


    const [stockLocationName, setStockLocationName] = useState(stockLocationDetail.name)
    const [paymentTermDay,setPaymentTermDay]=useState(stockLocationDetail.days)
    const closeAndUpdate = () => {

        const patchBody = {
            id: stockLocationDetail.id,
            name: stockLocationName,
            days:paymentTermDay
        }

        patchPaymentTerm(patchBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{stockLocationDetail.name} </span> Payment Term Details</h1>
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
                        label="Day"
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

export default EditPaymentTerm;