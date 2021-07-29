import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditGrpTwo = ({ show, handleHide, grpTwoDetail, putGrpTwo }) => {


    const [GrpTwoName, setGrpTwoName] = useState(grpTwoDetail.name)

    const closeAndUpdate = () => {

        const putBody = {
            id: grpTwoDetail.id,
            name: GrpTwoName
        }

        putGrpTwo(putBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{GrpTwoName} </span> Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New Stock Location"
                        onChange={ (e) => setGrpTwoName(e.target.value) }
                        value={GrpTwoName}
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

export default EditGrpTwo;