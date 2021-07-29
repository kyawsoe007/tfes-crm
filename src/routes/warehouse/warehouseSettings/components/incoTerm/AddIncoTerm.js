import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const AddIncoTermDetails = ({ show, handleHide, postIncoTerm }) => {


    const [addIncoTermName, setAddIncoTermName] = useState("")

    const closeAndUpdate = () => {

        const postBody = {
            name: addIncoTermName
        }

        postIncoTerm(postBody)
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
                    <h1> Add IncoTerm Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New IncoTerm"
                        onChange={ (e) => setAddIncoTermName(e.target.value) }
                        value={addIncoTermName}
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

export default AddIncoTermDetails;