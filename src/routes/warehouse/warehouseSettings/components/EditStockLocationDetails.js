import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditStockLocationDetails = ({ show, handleHide, stockLocationDetail, patchStockLocation }) => {


    const [stockLocationName, setStockLocationName] = useState(stockLocationDetail.name)

    const closeAndUpdate = () => {

        const patchBody = {
            id: stockLocationDetail.id,
            name: stockLocationName
        }

        patchStockLocation(patchBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{stockLocationDetail.name} </span> Location Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New Stock Location"
                        onChange={ (e) => setStockLocationName(e.target.value) }
                        value={stockLocationName}
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

export default EditStockLocationDetails;