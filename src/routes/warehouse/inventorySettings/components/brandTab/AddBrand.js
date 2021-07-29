import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const AddBrand = ({ show, handleHide, postBrand }) => {


    const [brandName, setBrandName] = useState("")

    const closeAndUpdate = () => {

        const postBody = {
            name: brandName,
        }

        postBrand(postBody)
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
                    <h1> Add Brand Setting</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New Size Name"
                        onChange={ (e) => setBrandName(e.target.value) }
                        value={brandName}
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

export default AddBrand;