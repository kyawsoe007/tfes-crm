import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';

import {  getFiscalYear, patchFiscalYear,postFiscalYear,postFiscalYearByMonthly,getFiscalPeriod,getAllFiscalPeriodByMonth } from "Ducks/finance-settings/fiscal-year";
import { Day } from "react-big-calendar";
import FiscalYearByMonthlyList from './components/fiscalYearMonthy'

const EditFiscalYear = ({ onEdit,editData,patchFiscalYear,fiscalYearsAll,postFiscalYear,fiscalYearsByMonthlyAll,postFiscalYearByMonthly,getFiscalPeriod,getAllFiscalPeriodByMonth }) => {
  
    console.log('hello',editData)
    const [editCode, setEditCode] = useState(editData? editData.code:"")
    
    const [startDate,setStartDate]=useState(editData?editData.startDate:new Date)
    const [endDate,setEndDate]=useState(editData?editData.endDate:new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
    const [editFiscalYear,setEditFiscalYear]=useState(editData?editData.fiscalYear:"")
    const [fiscalYearToggle, setFiscalYearToggle] = useState(false);
    // const [currencyDetail, setCurrencyDetail] = useState({});
    
    const setFiscalYearModalToggle = () => {
        setFiscalYearToggle(!fiscalYearToggle);
    }
    const closeAndCreate = () => {
        let data = {
            code: editCode,
            fiscalYear: editFiscalYear,
            status:'Open',
            startDate: startDate,
            endDate:endDate,
            monthlyPeriod:fiscalYearsByMonthlyAll.data
        }
        postFiscalYear(data)
    }
    const closeAndUpdate = () => {
        let data = {
            id: editData.id,
            _id:editData._id,
            code: editCode,
            fiscalYear: editFiscalYear,
            status:'Open',
            startDate: startDate,
            endDate:endDate,
            monthlyPeriod:fiscalYearsByMonthlyAll.data
        }
        patchFiscalYear(data)

    }
    
    const saveData = () => {
        editData ?
            closeAndUpdate()
            :
            closeAndCreate()
    }
    const monthlyData=(monthly)=>{
        let data={
            startOfPeriod:startDate,
            endOfPeriod:endDate,
            code:editCode,
            periodName:editFiscalYear,
            checkMonth:monthly
        }
        
        postFiscalYearByMonthly(data)
    }
    useEffect(()=>{
        getAllFiscalPeriodByMonth()
        if(editData){
        getFiscalPeriod(editData._id)
    }},[])

const hangleChange=(e)=>{
    setStartDate(e)
    setEndDate(new Date(new Date(e).setFullYear(new Date(e).getFullYear() + 1)))
}
console.log('ids',fiscalYearsAll)
    return (
        <Fragment>
        <div style={{padding: "1rem" ,margin:"0px",width:"100%"}}>
            <div className="row" style={{display:"flex",flexDirection:"row-reverse" }}>                       
                <div className="" >                        
                        <button  
                        variant="contained"
                        className="primary_btn"
                        style={{
                            backgroundColor:"#c0c0c0"
                        }}
                        onClick={()=> onEdit(true)}
                        >Back</button>
                </div>
                 <div className="">
                    <button 
                        className="primary_btn"
                        onClick={()=>{saveData(), onEdit(true)}}
                       
                        > Save</button>
               </div>
               <div style={{marginRight:'62%'}} className='row'>
                  <div className="" style={{marginRight:26}}>
                   <button variant="contained" className="primary_btn" onClick={()=>monthlyData(1)}>
                        Create Monthly Periods
                   </button>
                   </div>
                   <div className="">
                   <button variant='contained' className={'primary_btn'} onClick={()=>monthlyData(3)}>
                        Create 3 Monthly Periods
                   </button>
               </div></div>
            </div>
            <div className="row">
                    <div className="col-12">
                        <h1>{editData? "Fiscal Year Edit":"Fiscal Year Create"}</h1>
                    </div>
                </div>
                <div className="row">
                <div className="col-6">
                        <FormInput 
                        label="Fiscal Year"
                         onChange={(e) =>setEditFiscalYear(e.target.value) }
                        value={editFiscalYear}
                        />
                    </div>
                    
                    <div className="col-6">
                    <p style={{
                        color: "rgba(0, 0, 0, 0.54)",
                        padding: "0",
                        fontSize: "0.75rem",
                        fontFamily: " Lato",
                        fontWeight: "500",
                        lineHeight: " 1",
                        marginBottom: "1px"
                      }}>Start Date</p>
                    <DayPickerInput
                    style={{zIndex:999}}
                        formatDate={formatDate}
                        parseDate={parseDate}
                        value={moment(startDate).format('YYYY-MM-DD')}
                        selectedDay={moment(startDate).format('YYYY-MM-DD')}
                        onDayChange={(e)=>hangleChange(e)}
                        placeholder={`${formatDate(startDate)}`}
                    />
                    </div>
                    
               </div>
                <div className="row">
                <div className="col-6">
                        <FormInput 
                        label="Code"
                         onChange={(e) => setEditCode(e.target.value) }
                        value={editCode}
                        />
                    </div>
                    <div className="col-6">
                    <p style={{
                        color: "rgba(0, 0, 0, 0.54)",
                        padding: "0",
                        fontSize: "0.75rem",
                        fontFamily: " Lato",
                        fontWeight: "500",
                        lineHeight: " 1",
                        marginBottom: "1px"
                      }}>End Date</p>
                    <DayPickerInput
                     style={{zIndex:122}}
                        formatDate={formatDate}
                        parseDate={parseDate}
                        value={moment(endDate).format('YYYY-MM-DD')}
                        selectedDay={moment(endDate).format('YYYY-MM-DD')}
                        onDayChange={(e)=>setEndDate(e)}
                    />
                    </div>
               </div>
        </div>
            <FiscalYearByMonthlyList setToggle={setFiscalYearModalToggle} fiscalYearByMonthly={fiscalYearsByMonthlyAll.data?fiscalYearsByMonthlyAll.data:[]}/>
     
      </Fragment>
    )
}
const mapStateToProps=({financeState})=>{
    const {FiscalYearsState} =financeState
        return FiscalYearsState
    }
    export default connect(mapStateToProps,{
        show,
        getFiscalYear,
        patchFiscalYear,
        postFiscalYear,
        postFiscalYearByMonthly,
        getFiscalPeriod,
        getAllFiscalPeriodByMonth
    })(EditFiscalYear)