
import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";

// Ducks 
import { connect } from 'react-redux'
import { deleteUserRole } from 'Ducks/maintenancetfes'


const DeleteRoleDetails = ({show, handleHide, userRolesData, deleteUserRole}) => {

const closeAndUpdate = () => {

    console.log(userRolesData.id);

    deleteUserRole(userRolesData.id);
    // console.log(    deleteUserRole(userRolesData.id)    )
    handleHide()
}
    return(

    <DialogRoot
        show={show}
        handleHide={handleHide}
        size={'sm'}
      >
        <div className="container" style={{padding: "1rem"}}>

            <div className="row">
                <div className="col-12">
                    <h1 style={{textAlign: "center"}}> Warning!</h1>
                    <h2 style={{textAlign: "center"}}> Are you sure you want to delete <span style={{color: "red"}}>{userRolesData.role}</span> role? </h2>
                </div>

            </div>


        <div style={{ float: "right", paddingTop: "1rem"}}>
            <Button
                variant="contained"
                className="btn-danger text-white"
                onClick={closeAndUpdate}
            >
                Delete Permanently
            </Button>
        </div>

        </div>
      </DialogRoot>
    )
}

const mapStateToProps = ({ maintenanceState }) => {
    return maintenanceState
  }

export default connect(mapStateToProps, {
    deleteUserRole,
})(DeleteRoleDetails)

// export default DeleteRoleDetails