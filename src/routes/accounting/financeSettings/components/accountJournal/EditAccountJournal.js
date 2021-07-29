import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";

import {  getAccountJournal, patchAccountJournal,postAccountJournal,} from "Ducks/finance-settings/account-journal";
import { getAllCurrences} from "Ducks/finance-settings/currences";
import {getAllCurrencyData,getAllAccountItem} from "Ducks/account-item"
const EditAccountJournal = ({ onEdit,getAllCurrencyData,currencyData,accountItem,getAllAccountItem,editData,patchAccountJournal,postAccountJournal }) => {
  
    const [name, setName] = useState(editData? editData.name:"")
    const [currency,setCurrency]=useState(editData?editData.currency:"")
    const [debit,setDebit]=useState(editData && editData.debit_account ?editData.debit_account._id:"")
    const [credit,setCredit]=useState(editData && editData.credit_account ?editData.credit_account._id:"")
   

    const closeAndCreate = () => {
        let data = {
            name: name,
            debit_account: debit,
            currency: currency,
            credit_account:credit
        }
        postAccountJournal(data)
    }
    const closeAndUpdate = () => {
        let data = {
            id: editData._id,
            _id:editData._id,
            name: name,
            debit_account: debit,
            currency: currency,
            credit_account:credit
        }
        console.log('data',data)
        patchAccountJournal(data)
    }

    const saveData = () => {
        editData ?
            closeAndUpdate()
            :
            closeAndCreate()
    }
    useEffect( () => {
        getAllCurrencyData()
        getAllAccountItem()
    }, [])

    const handleChange=(field,value)=>{
        setCurrency(value)
    }
    const handleChangeDebit=(field,value)=>{
        setDebit(value)
    }
    const handleChangeCredit=(field,value)=>{
        setCredit(value)
    }
    console.log('currency',accountItem)
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
                        <h1>{editData? "Account Journal Edit":"Account Journal Create"}</h1>
                    </div>
                </div>
                <div className="row">
                    
                    <div className="col-6">
                        <FormInput 
                        label="Name"
                         onChange={(e) => setName(e.target.value) }
                        value={name}
                        />
                    </div>
                    <div className="col-6">
                        <FormInput 
                        label="Currency Name"
                        target='currency'
                         handleChange={ handleChange }
                        value={currency}
                        isToggleEditForm={true}
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        currencyData.data.currency?currencyData.data.currency:[]
                      }      
                        />
                    </div>
                    
               </div>
                <div className="row">
                    <div className="col-6">
                        <FormInput 
                        label="Debit"
                         handleChange={handleChangeDebit}
                        value={debit}
                        target='debit'
                        isToggleEditForm={true}
                        selectValueKey="_id"
                        selectValueName="accountName"
                        selectValues={
                          accountItem.data?accountItem.data:[]
                        } 
                        />
                    </div>
                    <div className="col-6">
                        <FormInput 
                        label="Credit"
                         handleChange={handleChangeCredit}
                        value={credit}
                        target='credit'
                        isToggleEditForm={true}
                        selectValueKey="_id"
                        selectValueName="accountName"
                        selectValues={
                        accountItem.data?accountItem.data:[]
                        }
                        />
                    </div>
               </div>
        </div>
      </Fragment>
    )
}
const mapStateToProps=({financeState,accountItemState})=>{
    const {AccountJournalsState} =financeState
    const {currencyData,accountItem}=accountItemState
        return {AccountJournalsState,currencyData,accountItem}
    }
    export default connect(mapStateToProps,{
        show,
        getAccountJournal,
        patchAccountJournal,
        getAllCurrencyData,
        postAccountJournal,
        getAllAccountItem
    })(EditAccountJournal)