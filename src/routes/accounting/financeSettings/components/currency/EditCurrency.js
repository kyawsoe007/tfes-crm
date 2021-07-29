import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import CurrencyRateList from "./components/CurrencyRateList";
import AddCurrency from "./AddCurrency";
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";

import { getAllCurrences, getCurrency, patchCurrency,postCurrency,postCurrencyRate } from "Ducks/finance-settings/currences";

const EditCurrency = ({ onEdit,editData,getCurrency,patchCurrency,postCurrencyRate,currency,postCurrency }) => {
  
    console.log('hello',editData)
    const [editCurrencyName, seteditCurrencyName] = useState(editData? editData.name:"")
    const [currencySymbol,setCurrencySymbol]=useState(editData?editData.currencySymbol:"")
    const [editSymbol,setEditSymbol]=useState(editData?editData.symbol:"")
    const [currencyRate,setCurrencyRate]=useState({})
    const [currencyRateData,setCurrencyRateData]=useState(editData? editData.currencyRate: [])
    const [currencyToggle, setCurrencyToggle] = useState(false);
    // const [currencyDetail, setCurrencyDetail] = useState({});
    
    const setCurrencyModalToggle = () => {
        setCurrencyToggle(!currencyToggle);
    }
    const closeAndCreate = () => {
        let data = {
            name: editCurrencyName,
            symbol: editSymbol,
            currencySymbol: currencySymbol,
            currencyRate:currencyRateData
        }
        postCurrency(data)
    }
    const closeAndUpdate = () => {
        let data = {
            id: editData.id,
            _id:editData._id,
            name: editCurrencyName,
            symbol: editSymbol,
            currencySymbol: currencySymbol,
            currencyRate:currencyRateData
        }
        patchCurrency(data)
    }

    const removeRate = (index) => {
        
        let rows = currencyRateData.filter( (item, pos) => pos !== index);
        setCurrencyRateData(rows);

    }

    const addRate = (rateData) => {
        let rows = [...currencyRateData]
        rows.splice(0, 0, rateData);
        setCurrencyRateData(rows);
    }

    const saveData = () => {
        editData ?
            closeAndUpdate()
            :
            closeAndCreate()
    }
    
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
            </div>
            <div className="row">
                    <div className="col-12">
                        <h1>{editData? "Currency Edit":"Currency Create"}</h1>
                    </div>
                </div>
                <div className="row">
                    
                    <div className="col-6">
                        <FormInput 
                        label="Name"
                         onChange={(e) => seteditCurrencyName(e.target.value) }
                        value={editCurrencyName}
                        />
                    </div>
                    <div className="col-6">
                        <FormInput 
                        label="Currency Symbol"
                         onChange={(e) => setCurrencySymbol(e.target.value) }
                        value={currencySymbol}
                        />
                    </div>
                    
               </div>
                <div className="row">
                    <div className="col-6">
                        <FormInput 
                        label="Symbol"
                         onChange={(e) =>setEditSymbol(e.target.value) }
                        value={editSymbol}
                        />
                    </div>
               </div>
        </div>
            <CurrencyRateList setToggle={setCurrencyModalToggle} currencyRate={currencyRateData} removeRate={ removeRate} />
        {currencyToggle && 
                <AddCurrency
                show={currencyToggle}
                handleHide={setCurrencyModalToggle}
                addRate={addRate}
               
                />
            }
      </Fragment>
    )
}
const mapStateToProps=({financeState})=>{
    const {CurrencesState} =financeState
        return CurrencesState
    }
    export default connect(mapStateToProps,{
        show,
        getCurrency,
        patchCurrency,
        postCurrencyRate,
        postCurrency
    })(EditCurrency)