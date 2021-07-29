import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const EditBrand = ({ show, handleHide, brandDetail, putBrand }) => {


    const [brandName, setBrandName] = useState(brandDetail.name)

    const closeAndUpdate = () => {

        const putBody = {
            id: brandDetail.id,
            name: brandName
        }

        putBrand(putBody);
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
                    <h1> Edit <span style={{color:"blue"}}>{brandName} </span> Details</h1>
                </div>
                <div className="col-12">
                    <FormInput 
                        label="New Stock Location"
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

export default EditBrand;