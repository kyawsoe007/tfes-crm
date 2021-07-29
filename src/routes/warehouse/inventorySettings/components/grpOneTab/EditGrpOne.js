import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditGrpOne = ({ show, handleHide, grpOneDetail, putGrpOne }) => {


    const [GrpOneName, setGrpOneName] = useState(grpOneDetail.name)

    const closeAndUpdate = () => {

        const putBody = {
            id: grpOneDetail.id,
            name: GrpOneName
        }

        putGrpOne(putBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{GrpOneName} </span> Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New Stock Location"
                        onChange={ (e) => setGrpOneName(e.target.value) }
                        value={GrpOneName}
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

export default EditGrpOne;