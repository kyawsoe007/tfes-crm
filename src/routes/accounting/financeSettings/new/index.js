import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import CurrencyRateList from "./components/CurrencyRateList";


const EditCurrency = ({ }) => {
    const [editCurrencyName, seteditCurrencyName] = useState("")
    const [currencySymbol,setCurrencySymbol]=useState("")
    const [editSymbol,setEditSymbol]=useState("")

    return (
        <Fragment>
        <div style={{padding: "1rem" ,margin:"0px"}}>
            <div className="row"> 
                <div className="col-10"/>                        
                <div className="col-1">                        
                        <button 
                        variant="contained"
                        className="primary_btn"
                        style={{
                            backgroundColor:"green",
                            
                        }}
                        // onClick={}
                        >Cancel</button>
                </div>
                 <div className="col-1">
                    <button 
                        className="primary_btn"
                        // onClick={}
                        > Save</button>
               </div>
            </div>
            <div className="row">
                    <div className="col-12">
                        <h1> Currency Edit</h1>
                    </div>
                </div>
                <div className="row">
                    
                    <div className="col-6">
                        <FormInput 
                        label="Name"
                        // onChange={(e) => setAddCurrencyName(e.target.value) }
                        value={editCurrencyName}
                        />
                    </div>
                    <div className="col-6">
                        <FormInput 
                        label="Currency Symbol"
                        // onChange={(e) => setAddCurrencyName(e.target.value) }
                        value={currencySymbol}
                        />
                    </div>
                    
               </div>
                <div className="row">
                    <div className="col-6">
                        <FormInput 
                        label="Symbol"
                        // onChange={(e) =>setCurrencyType(e.target.value) }
                        value={editSymbol}
                        />
                    </div>
               </div>
        </div>
        <CurrencyRateList/>

      </Fragment>
    )
}

export default EditCurrency;