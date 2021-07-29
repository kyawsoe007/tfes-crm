import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const AddGrpOne = ({ show, handleHide, postGrpTwo }) => {


    const [grpTwoName, setGrpTwoName] = useState("")

    const closeAndUpdate = () => {

        const postBody = {
            name: grpTwoName,
        }

        postGrpTwo(postBody)
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
                    <h1> Add Grp Two Setting</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New Grp Two Name"
                        onChange={ (e) => setGrpTwoName(e.target.value) }
                        value={grpTwoName}
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

export default AddGrpOne;