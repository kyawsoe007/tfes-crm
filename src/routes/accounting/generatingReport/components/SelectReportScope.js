import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import TfesCustomerList from 'Components/PopupPage/TfesCustomerList'
import JournalAccountList from "../../journalEntries/components/JournalAccountList";

// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput'
import DayPicker from 'react-day-picker'
import { DateUtils } from 'react-day-picker'
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment'
import moment from 'moment'
import 'moment/locale/en-SG'
const SelectReportScope=({ show, handleHide,onPrintReport, title, startDate, setStartDate, endDate, setEndDate, custData, setCustData, accountData, setAccountData, errorMsg })=> {
    const styleForP={marginBottom:"5px", paddingLeft:"5px",marginTop:"15px"}

    const [customerToggle, setCustomerToggle] = useState(false)
    const [accountToggle, setAccountToggle] = useState(false)

    const getInfoCustomer = (id, name) => {
        setCustData({ id, name })
        setCustomerToggle(!customerToggle)
    }

    const getInfoAccount = (id, target, name) => {
        setAccountData({ id, name })
        setAccountToggle(!accountToggle)
    }

    return(
        <Fragment>
        <DialogRoot
         show={show}
         handleHide={handleHide}
         size={"sm"}
        >
        <div style={{minHeight:""}}>
            <div className="row">
                <div className="col-12">
                    <h1 style={{ textAlign: "center",verticalAlign: "middle"}} > {title} </h1>
                    <h4 style={{ textAlign: "center",verticalAlign: "middle", color: "red"}} > {errorMsg} </h4>
                </div>
                {
                    title === "Customer Statement of Accounts" &&
                    <div className="col-12">
                        <FormInput 
                            label="Customer"
                            value={custData.name ? custData.name : ""}
                            hasButton
                            buttonClick={() => setCustomerToggle(!customerToggle)}
                            readOnly    
                        />
                    </div>
                }

                {
                    title === "Account Journal Report" &&
                    <div className="col-12">
                        <FormInput 
                            label="Accounts"
                            value={accountData.name ? accountData.name : ""}
                            hasButton
                            buttonClick={() => setAccountToggle(!accountToggle)}
                            readOnly    
                        />
                    </div>
                }

                <div className="col-6">
                    <p style={styleForP}>Start Date</p>
                    <DayPickerInput
                        formatDate={formatDate}
                        parseDate={parseDate}
                        format="L"
                        value={`${formatDate(startDate,'L','en-SG')}`}
                        placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                        onDayChange={(e) => setStartDate(e)}
                        dayPickerProps={{
                          locale: 'en-SG',
                          localeUtils: MomentLocaleUtils
                        }}
                    />
                </div>
                <div className="col-6">
                    <p style={styleForP}>End Date</p>
                    <DayPickerInput
                        formatDate={formatDate}
                        parseDate={parseDate}
                        format="L"
                        value={`${formatDate(endDate,'L','en-SG')}`}
                        placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                        onDayChange={(e) => setEndDate(e)}
                        dayPickerProps={{
                          locale: 'en-SG',
                          localeUtils: MomentLocaleUtils
                        }}
                    />
                </div>
            </div>
            <div style={{marginTop:"250px"}}>
                <button
                    className="primary_btn"
                    style={{}}
                    onClick={handleHide}
                > Leave
                </button>
                <button
                    className="primary_btn"
                    style={{backgroundColor:"green"}}
                    onClick={onPrintReport}
                >Print
                </button>   
            </div>
            
        </div>
       </DialogRoot>

       <DialogRoot
            show={customerToggle}
            handleHide={() => setCustomerToggle(!customerToggle)}
            size={"lg"}
       >
           <div>
              <h3> Customer List </h3>
                <TfesCustomerList getInfo={getInfoCustomer}/>
           </div>
       </DialogRoot>

       <DialogRoot
            show={accountToggle}
            handleHide={() => setAccountToggle(!accountToggle)}
            size={"lg"}
       >
           <div>
              <h3> Account List </h3>
                <JournalAccountList getInfo={getInfoAccount}/>
           </div>
       </DialogRoot>

                        
       </Fragment>
    )

}
export default SelectReportScope
