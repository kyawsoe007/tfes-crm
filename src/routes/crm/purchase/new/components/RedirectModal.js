import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";


const RedirectModal = ({ show, handleHide  }) => {

    return (
        <DialogRoot
        show={show}
        handleHide={handleHide}
        size={'sm'}
      >
        <div className="container" style={{padding: "1rem"}}>

            <div className="row">
                <div className="col-12" style={{ textAlign: "center" }}>
                    <h1> Redirecting to PO page as there is insufficent materials to complete Sales Order </h1>
                </div>
                <hr></hr>
            </div>

        <div style={{ float: "right", paddingTop: "1rem"}}>
            <Button
                variant="contained"
                className="btn-success text-white"
                onClick={handleHide}
            >
                Acknowledge and Close
            </Button>
        </div>

        </div>
      </DialogRoot>
    )
}

export default RedirectModal;