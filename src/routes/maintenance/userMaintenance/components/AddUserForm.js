import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// Component Imports
import { listOptions, getDateTime } from "Helpers/helpers";
import FormInput from "Components/Form/FormInput";
// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import RecordsList from 'Components/RecordsList'

import DialogRoot from 'Components/Dialog/DialogRoot'
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

const AddUserForm = ({ show, handleHide,onSubmit,state,handleChange}) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    useEffect(()=> {
      dispatch(getAllUserRoles());
    }, []);
    const allAccessRoles = useSelector(state => state.maintenanceState.rolesAll);

    const [errorMsg, setErrorMsg] = useState("")
    const [submitBtnDisable, setSubmitBtnDisable] = useState(state.isLoading);

    // validation for checking if password is the same. Disable submit button if both passwords do not match
    useEffect( () => {
      console.log("password", state.password);
      console.log("confirm password", state.confirmPassword);

      // if (!state.email.includes("@")) {
      //   alert("PING!")
      // }

      if (state.password !== state.confirmPassword) {
        setErrorMsg("password must match");
        setSubmitBtnDisable(true)
      } else {
        setErrorMsg("");
        setSubmitBtnDisable(false)
      }

    }, [state.confirmPassword, state.password, state.email])



    return(

    <DialogRoot
        show={show}
        handleHide={handleHide}
        size={'lg'}
      >
        <form autoComplete="off">
        <h1 style={{ color: "red", textAlign: "center"}}> {errorMsg} </h1>
        <h3 style={{ marginLeft: 35 }}>User Contact Details</h3>
        <div className="row mb-20 justify-content-center">
          <div className="col-5">
            <FormInput
              label="First Name"
              target="firstName"
              value={state.firstName}
              handleChange={handleChange}
            />
          </div>
          <div className="col-5 offset-md-1">
            <FormInput
              label="Last Name"
              target="lastName"
              value={state.lastName}   
               handleChange={handleChange}
            />
          </div>
        </div>
        <h3 style={{ marginLeft: 35 }}>Login Details</h3>
        <div className="row justify-content-center">
          <div className="col-11">
            <FormInput
              label="Email"
              target="email"
              value={state.email}
              handleChange={handleChange}
              disabled={ state.isEdit ? true : false}
            />
          </div>
        </div>
       {/* {!state.isEdit && ( */}
         
         <div className="row mb-20 justify-content-center">
         <div className="col-5">
           <FormInput
             label="Password"
             target="password"
             value={state.password}
             handleChange={handleChange}
             type="password"
           />
         </div>
         <div className="col-5 offset-md-1">
           <FormInput
             label="Confirm Password"
             helperText="Password has to match."
             target="confirmPassword"
             value={state.confirmPassword} 
             handleChange={handleChange}
             type="password"
           />
         </div>
       </div>
      
        

        <h3 style={{ marginLeft: 35 }}>User Role</h3>
        <div className="row justify-content-center">
          <div className="col-11">
          <Select
              multiple
              input={<BaseInput />}
              value={state.roles}
              onChange={e => handleChange("roles", e.target.value)}
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
        </div>
        <div className="row justify-content-center">
          <div className="col-11">
          <FormInput
                                label="set Status"
                                value={state.movement}
                                target="movement"
                                handleChange={handleChange}
                                    seleteValueKey="name"
                                    selectValueName="name"
                                    selectValues={[
                                    {name: 'IN',value:'IN' },
                                    {name:'AL',value:'AL'},
                                    {name:'RSV',value:'RSV'},
                                    {name:'VC',value:'VC'},
                                   {name:'MC',value:'MC'},
                                   {name:'OUT',value:'OUT'}]}
                                />
          </div>
          </div>
        <div className="d-flex mt-40 justify-content-end" >
          <button className="primary_btn" onClick={onSubmit} disabled={submitBtnDisable} > Save and Close  </button>
        </div>
        
      </form>
        
      </DialogRoot>
    )
}
  
export default AddUserForm;