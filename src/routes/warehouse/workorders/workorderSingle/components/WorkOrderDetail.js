import React, {Fragment, useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormInput from "Components/Form/FormInput";



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: '',
      color: theme.palette.text.primary,
      minHeight: "100%"
    },

    grid: {
        paddingBottom: theme.spacing(2)
    }
  }));

const WorkOrderDetail = ({workorderID, salesOrderID, createdAt, workOrderDetailNotes, workOrderDetailNotesChangeHandler, originalRemark}) => {

    const classes = useStyles();

    const [notes, setNotes] = useState("");

    // prevents remarks from copying across workorder single items 
    useEffect(() => {
        if (typeof workOrderDetailNotes === "undefined") {
            setNotes("")
        } else {
            setNotes(workOrderDetailNotes);
        }
    }, [workOrderDetailNotes])   

    const setNotesHandler = (e) => {
        setNotes(e.target.value);
    }

    const updateParentNotesHandler = () => {
        workOrderDetailNotesChangeHandler(notes);
    }



    return (
        <Fragment>
        <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={3}>
            {/* <Paper className={classes.paper}> */}
            <div className={classes.paper}>
                <p> Work Order Num: {workorderID}  </p>
                <p> Sales Order Num: {salesOrderID} </p>
                <p> Date created: {new Date(createdAt).toLocaleDateString('en-sg')}</p>
                </div>
            {/* </Paper> */}
            </Grid>

            <Grid item xs={9}>
            {/* <Paper className={classes.paper}>
                <TextField
                id="standard-multiline-static"
                label="Work Order Notes"
                multiline
                rows={5}
                fullWidth={true}
                InputLabelProps={{ shrink: true }}
                InputProps={{ disableUnderline: true }}
                margin="none"
                value={notes}
                onChange={setNotesHandler}
                onBlur={updateParentNotesHandler}
                />
            </Paper> */}
            <br />
            <FormInput
            label="Remarks"
            // value={remarks}
            multiline rows={3}
            value={notes}
            onChange={setNotesHandler}
            onBlur={updateParentNotesHandler}
            isToggledEditForm={true}
            original={originalRemark}
            // handleChange={this.handleChange}
            // readOnly={editable} 
            />
            </Grid>

        </Grid>
        </Fragment>
    )
}

export default WorkOrderDetail;