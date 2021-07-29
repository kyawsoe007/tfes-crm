import React, {Fragment, useEffect, useState} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
import moment from 'moment';



import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const SalesOrderUpdate = ({status, completedBy, completedDate, remarks, salesOrderUpdateChangeHandler}) => {

    const [completedName, setCompletedName] = useState(completedBy);
    const [chosenDate, setChosenDate] = useState(completedDate);
    const [remarksDetail, setRemarksDetail] = useState(remarks);
    const [allData, setAllData] = useState({});
    const [currentStatus, setStatus] = useState(status)

    //this is to override default US date settings
    const FORMAT = 'DD/MM/YYYY';

    const setCompletedNameHandler = (e) => {
        // console.log("commmmm", e.target.value);
        setCompletedName(e.target.value);
    }

    const setDateHandler = (date) => {
        // console.log("datteesssss", date.toLocaleDateString('en-GB'));
        // setChosenDate(date.toLocaleDateString('en-sg'));        
        const newDate = formatDate(new Date(date), FORMAT);
        // console.log("DATE", newDate);

        setChosenDate(newDate);
    }

    const setRemarksHandler = (e) => {
        // console.log("remarrrkkssss", e.target.value);
        setRemarksDetail(e.target.value);
    }

    const updateAllDetailsHandler = () => {
        const newAllData = {...allData, completedName: completedName, chosenDate: chosenDate, remarksDetail: remarksDetail, status: currentStatus};
        setAllData(newAllData)
        salesOrderUpdateChangeHandler(newAllData);
    }

    useEffect( () => {
        updateAllDetailsHandler()
        if (chosenDate === "" ) {
            setChosenDate(formatDate(new Date(), FORMAT))
        }
    }, [chosenDate] )
    
    // useEffect( () => {
    //     // if (completedName !== "") {
    //     //     setStatus('Completed');
    //     // } else {
    //     //     setStatus('Open');
    //     // }
    // }, [completedName])



    return(
        <Fragment>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <p> Completed Date: </p>
                </Grid>
                <Grid item xs={9}>
                    <DayPickerInput
                        formatDate={formatDate}
                        format={FORMAT}
                        parseDate={parseDate}
                        placeholder={`${formatDate(new Date(), FORMAT)}`}
                        dayPickerProps={{
                            todayButton: 'Today',
                            onDayClick: () => updateAllDetailsHandler()
                          }}
                        onDayChange={setDateHandler}
                        value={chosenDate}
                    />  
                </Grid>

                <Grid item xs={3}>
                    <p> Completed By: </p>
                </Grid>
                <Grid item xs={9}>
                    <TextField 
                    fullWidth={true}
                    variant="outlined"
                    value={completedName}
                    onChange={setCompletedNameHandler}
                    onBlur={updateAllDetailsHandler}
                    />
                </Grid>

                <Grid item xs={3}>
                    <p> Remarks: </p>
                </Grid>

                <Grid item xs={9}>
                    <TextField 
                        fullWidth={true}
                        multiline
                        rows={12}
                        variant="outlined"
                        value={remarksDetail}
                        onChange={setRemarksHandler}
                        onBlur={updateAllDetailsHandler}
                        />
                </Grid>
            </Grid>
        </Fragment>
    )
}


export default SalesOrderUpdate;



