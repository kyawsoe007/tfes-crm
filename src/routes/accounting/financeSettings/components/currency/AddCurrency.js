import React, { useState, useEffect, Fragment } from "react";


// components
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
// icon

// redux
const AddCurrency=({ show, handleHide, addRate ,handleChange })=>{   
    const [dataState, setDataState ] = useState({
        currencyDate: new Date(),
        currencyRate: "",
        currencyType: ""
    });
    const closeAndUpdate = () => {

        const postBody = {
            date: dataState.currencyDate,
            rate:dataState.currencyRate,
            type:dataState.currencyType,
        }

        console.log(postBody);
        addRate(postBody);
        // postCurrency({
        //     date: addCurrencyName,
        //     rate:CurrencyRate,
        //     type:CurrencyType,
        // })
        // postCurrency(postBody)
        // setCurrencyRateData([...postBody,postBody])

        handleHide();
    }
    const close =()=>{
        handleHide();
    }

    handleChange = (target, value) => {
        let newState = { ...dataState};
        newState[target] = value;
        setDataState(newState);
    }

    return(
        <DialogRoot
        show={show}
        handleHide={handleHide}
        size={"sm"}
        >
           <div className="container" style={{padding: "1rem", height:"18em"}}>
               <div className="row">
                    <div className="col-12">
                        <h1> Add New Rate</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                    <p style={{
                        color: "rgba(0, 0, 0, 0.54)",
                        padding: "0",
                        fontSize: "0.75rem",
                        fontFamily: " Lato",
                        fontWeight: "500",
                        lineHeight: " 1",
                        marginBottom: "1px"
                      }}>Date</p>
                    <DayPickerInput
                        formatDate={formatDate}
                        parseDate={parseDate}
                        value={dataState.currencyDate}
                        selectedDay={dataState.currencyDate}
                        onDayChange={(day) => {                           
                            handleChange("currencyDate", day) } }
                    />
                       
                    </div>
                    <div className="col-6">
                        <FormInput 
                        label="Rate"
                        target="currencyRate"
                        handleChange={handleChange}                        
                        value={dataState.currencyRate}
                        />
                    </div>
               </div>
                <div className="row">
                    <div className="col-6">
                        <FormInput 
                        label="Type"
                        target="currencyType"
                        handleChange={handleChange }
                        value={dataState.currencyType}
                        selectValues={[
                            {name: "sales", value: "sales"},
                            {name: "purchase", value: "purchase"}
                        ]}
                        // selectValues={[
                        //     { name: 'hardCord1', value: ' CurrencyType' },
                        //     { name: 'hardCord2', value: ' CurrencyType' },
                        //     { name: 'hardCord3 ', value: 'CurrencyType' },
                        // ]}
                        />
                    </div>
               </div>
           </div>    
               <br/>
               <div className="row">
                    <div className="col-4"/>                        
                    <div className="col-3">                        
                        <button 
                        variant="contained"
                        className="primary_btn"
                        style={{
                            backgroundColor:"#c0c0c0",
                            width:"63px",
                            paddingLeft:"7px"
                        }}
                        onClick={close}
                        >Cancel</button>
                    </div>
                    <div className="col-3" className="primary_button">
                    <button 
                        className="primary_btn"
                        onClick={closeAndUpdate}
                        > Save</button>
               </div>
               
               
           </div>

        </DialogRoot>
    )

}
export default AddCurrency