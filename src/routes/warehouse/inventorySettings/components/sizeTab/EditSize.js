import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditSize = ({ show, handleHide, sizeDetail, putSize }) => {


    const [sizeName, setSizeName] = useState(sizeDetail.name)

    const closeAndUpdate = () => {

        const putBody = {
            id: sizeDetail.id,
            name: sizeName
        }

        putSize(putBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{sizeName} </span> Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New Size"
                        onChange={ (e) => setSizeName(e.target.value) }
                        value={sizeName}
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

export default EditSize;