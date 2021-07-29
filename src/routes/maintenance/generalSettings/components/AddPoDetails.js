import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import { useSelector, useDispatch } from 'react-redux';
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
import { getAllUserRoles } from "Ducks/maintenancetfes";
import { connect } from "react-redux";
import { show } from "redux-modal";
import Select from "@material-ui/core/Select";
import BaseInput from "Components/Form/BaseInput";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    menuChips: {
      marginRight: theme.spacing(1),
      color: "#fff",
      backgroundColor: theme.palette.secondary.main
    }
  }));
const AddPoDetails = ({ show, handleHide,postApprovalRight }) => {


    // const [stockLocationName, setStockLocationName] = useState(stockLocationDetail.name)
    const classes = useStyles();
    const [lowerLimit, setLowerLimit] = useState(0);
    const [upperLimit, setUpperLimit] = useState(0)
    const [roles, setRoles] = useState([])
    const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(getAllUserRoles());
    }, []);
    const allAccessRoles = useSelector(state => state.maintenanceState.rolesAll);
    
    const closeAndUpdate = () => {

        const postBody = {
            minAmt: parseInt(lowerLimit),
            maxAmt: parseInt(upperLimit),
            roles: roles,
            type:"Purchase"
        }
console.log('pp',postBody)
         postApprovalRight(postBody);
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
                    <h1> Add PO Details</h1>
                    {/* <h1> Edit <span style={{color:"blue"}}>{stockLocationDetail.name} </span> Location Details</h1> */}
                </div>
                <div className="col-12">
                    <FormInput 
                        label="Lower Limit"
                        onChange={ (e) => setLowerLimit(e.target.value) }
                        value={lowerLimit}
                    />
                </div>

                <div className="col-12">
                    <FormInput 
                        label="Upper Limit"
                        onChange={ (e) => setUpperLimit(e.target.value) }
                        value={upperLimit}
                    />
                </div>

                <div className="col-12">
                <Select
              multiple
              input={<BaseInput />}
              value={roles}
              onChange={e => setRoles(e.target.value)}
              renderValue={selected => (
                <div className="d-flex">
                  {selected.map(value => {
                    

                    return (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.menuChips}
                      />
                    );
                  })}
                </div>
              )}
            >
              {
                allAccessRoles.data.map(role => (
                  <MenuItem key={role.name}
                  value={role.name}>
                    {role.name}
                  </MenuItem>
                ))
              }
            </Select>
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

export default AddPoDetails;