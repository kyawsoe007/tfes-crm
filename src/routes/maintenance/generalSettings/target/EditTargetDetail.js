import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import { useSelector, useDispatch } from 'react-redux';
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import BaseInput from "Components/Form/BaseInput";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
import { getAllUserRoles } from "Ducks/maintenancetfes";

const useStyles = makeStyles(theme => ({
    menuChips: {
      marginRight: theme.spacing(1),
      color: "#fff",
      backgroundColor: theme.palette.secondary.main
    }
  }));
const EditSaleTargetDetails = ({ show, handleHide,saleTargetDetail,patchSaleTarget }) => {


    // const [stockLocationName, setStockLocationName] = useState(stockLocationDetail.name)
    const classes = useStyles();
    const [name, setname] = useState(saleTargetDetail.name);
    const [target, setTarget] = useState(saleTargetDetail.target)
     const closeAndUpdate = () => {

        const patchBody = {
            id: saleTargetDetail.id,
            name: name,
            target: parseInt(target),
        }
        console.log('hello',patchBody)
        patchSaleTarget(patchBody);
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
                    <h1> Edit SaleTarget Details</h1>
                    {/* <h1> Edit <span style={{color:"blue"}}>{stockLocationDetail.name} </span> Location Details</h1> */}
                </div>
                <div className="col-12">
                    <FormInput 
                        label="Name"
                        onChange={ (e) => setname(e.target.value) }
                        value={name}
                        disabled={ true}
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

export default EditSaleTargetDetails;