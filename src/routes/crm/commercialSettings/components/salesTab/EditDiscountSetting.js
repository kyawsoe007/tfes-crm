import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const EditDiscountSetting = ({ show, handleHide, discountDetail, putDiscount }) => {

    const [discountId, setDiscountId] = useState(discountDetail.id)
    const [isPercentage, setIsPercentage] = useState(discountDetail.isPercentage)
    const [discountName, setDiscountName] = useState(discountDetail.name)
    const [discountValue, setDiscountValue] = useState(discountDetail.value)
    const [errorMsg, setErrorMsg] = useState("")

    const isPercentageChangeHandler = (field, value) => {
        setIsPercentage(value)
    }

    const closeAndUpdate = () => {
        setErrorMsg("");
        if (isPercentage === "") {
            setErrorMsg("Please select a discount type.");
            return;
        }

        const putBody = {
            id: discountId,
            isPercentage: isPercentage,
            name: discountName,
            value: discountValue
        }

        putDiscount(putBody)
        handleHide();
    }

    const AntSwitch = withStyles((theme) => ({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex',
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main,
                },
            },
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none',
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white,
        },
        checked: {},
    }))(Switch);

    return (
        <DialogRoot
            show={show}
            handleHide={handleHide}
            size={'sm'}
        >
            <div className="container" style={{ padding: "1rem" }}>
                <div className="row">
                    <div className="col-12">
                        <h1> Edit Discount</h1>
                    </div>
                    <div className="col-12">
                        {errorMsg && (<h4 class="text-danger text-center">{errorMsg} </h4>)}
                    </div>

                    <div className="col-12">
                        <FormInput
                            label="Discount Name"
                            onChange={(e) => setDiscountName(e.target.value)}
                            value={discountName}
                        />
                    </div>
                    <div className="col-12">
                        <FormInput
                            label="Discount Value"
                            onChange={(e) => setDiscountValue(e.target.value)}
                            value={discountValue}
                            type="number"
                        />
                    </div>
                    <hr></hr>
                    <div className="col-12" style={{ paddingBottom: '1rem' }}>
                        <Typography component="div">
                            <Grid component="label" container alignItems="center" spacing={1}>
                                <Grid item>Dollar</Grid>
                                <Grid item>
                                    <AntSwitch checked={isPercentage} onChange={isPercentageChangeHandler} name="isPercentage" />
                                </Grid>
                                <Grid item>Percentage</Grid>
                            </Grid>
                        </Typography>
                    </div>
                </div>

                <div style={{ float: "right", paddingTop: "1rem" }}>
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

export default EditDiscountSetting;