import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditUom = ({ show, handleHide, uomDetail, putUom }) => {


    const [uomName, setUomName] = useState(uomDetail.name)

    const closeAndUpdate = () => {

        const putBody = {
            id: uomDetail.id,
            name: uomName
        }

        putUom(putBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{uomName} </span> Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New Uom"
                        onChange={ (e) => setUomName(e.target.value) }
                        value={uomName}
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

export default EditUom;