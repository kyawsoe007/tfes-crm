import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditIncoTermDetails = ({ show, handleHide, incoTermDetail, patchIncoTerm }) => {


    const [incoTermName, setIncoTermName] = useState(incoTermDetail.name)

    const closeAndUpdate = () => {

        const patchBody = {
            id: incoTermDetail.id,
            name: incoTermName
        }

        patchIncoTerm(patchBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{incoTermDetail.name} </span> IncoTerm Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="IncoTerm"
                        onChange={ (e) => setIncoTermName(e.target.value) }
                        value={incoTermName}
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

export default EditIncoTermDetails;