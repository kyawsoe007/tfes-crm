import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import { useSelector, useDispatch } from 'react-redux';
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
const AddSaleTargetDetails = ({ show, handleHide,postSaleTarget }) => {

    const [name, setName] = useState('');
    const [target, setTarget] = useState(0)
    const closeAndUpdate = () => {

        const postBody = {
            name:name,
            target: parseInt(target)
        }
console.log('pp',postBody)
postSaleTarget(postBody);
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
                    <h1> Add SaleTarget Details</h1>
                    {/* <h1> Edit <span style={{color:"blue"}}>{stockLocationDetail.name} </span> Location Details</h1> */}
                </div>
                <div className="col-12">
                    <FormInput 
                        label="Name"
                        onChange={ (e) => setName(e.target.value) }
                        value={name}
                    />
                </div>

                <div className="col-12">
                    <FormInput 
                        label="Target"
                        onChange={ (e) => setTarget(e.target.value) }
                        value={target}
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

export default AddSaleTargetDetails;