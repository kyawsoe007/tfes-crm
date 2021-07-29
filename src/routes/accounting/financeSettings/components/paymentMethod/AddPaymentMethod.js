import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
import {getAllAccountItem, getAllCurrencyData} from "Ducks/account-item"
import { getAllAccountJournals} from "Ducks/finance-settings/account-journal";
import JournalAccountList from "../../../journalEntries/components/JournalAccountList"; 
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";

const AddPaymentMethodDetails = ({
     show, 
     handleHide, 
     postPaymentMethod,
     getAllAccountItem,
     accountItem,
     currencyData,
     getAllAccountJournals,
     accountJournalsAll,
     getAllCurrencyData
     }) => {


    const [paymentMethodName, setPaymentMethodName] = useState("")
    const [paymentMethodAccount,setPaymentMethodAccount]=useState('')
    const [paymentMethodJournal,setPaymentMethodJournal]=useState('')
    const [paymentCurrency,setPaymentCurrency]=useState('')
    const [toggle,setToggle]=useState(false)
    const [target,setTarget]=useState('')
    const [accountName,setAccountName]=useState('')

    const closeAndUpdate = () => {

        const postBody = {
            name: paymentMethodName,
            account:paymentMethodAccount,
            journal:paymentMethodJournal,
            currency: paymentCurrency
        }        
        postPaymentMethod(postBody)
        handleHide();
    }
    const handleChangeAccount=(field,value)=>{
        setPaymentMethodAccount(value)
    }
    
    const handleChangeJournal=(field,value)=>{
        setPaymentMethodJournal(value)
    }

    const handleChangeCurrency=(field, value)=> {
        setPaymentCurrency(value);
    }

    useEffect(()=>{
        getAllAccountItem()
        getAllAccountJournals()
        getAllCurrencyData()
    },[])

    const getAccountData=(id)=>{
        (accountItem.data.length!==0?accountItem.data.map(acc=>{
            if(acc._id===id){
                setPaymentMethodAccount(acc._id)
                setAccountName(acc.accountName)
            }
        })
        :[])
        setToggle(false)
    }
    const restartToggle=()=>{
        setToggle(false)
    }
    return (
        <React.Fragment>
        <DialogRoot
        show={show}
        handleHide={handleHide}
        size={'sm'}
      >
        <div className="container" style={{padding: "1rem"}}>

            <div className="row">
                <div className="col-12">
                    <h1> Add Payment Method Details</h1>
                </div>
                <div className="col-12">
                   
                    <FormInput 
                        label="New Name"
                         onChange={(e) => setPaymentMethodName(e.target.value) }
                        value={paymentMethodName}
                        />
                    </div>
                    <div className="col-12">
                    <FormInput
                                label="Account"
                                value={paymentMethodAccount?accountName:''}
                                target="paymentMethodAccount"
                                hasButton={true}
                                secondButtonClick={(target,index) => setTarget('account')}
                                buttonClick={(target,index) => {setTarget('account'),setToggle(true)}}
                                handleChange={handleChangeAccount}
                                isToggledEditForm={true}
                            />
                  
                </div>
                <div className="col-12">
                <FormInput
                                            label="Journal"
                                            value={paymentMethodJournal}
                                            target="paymentMethodJournal"
                                            selectValueKey="_id"
                                            selectValues={accountJournalsAll.data ? accountJournalsAll.data : []}
                                            handleChange={handleChangeJournal}
                                        />
                </div>
                <div className="col-12">
                <FormInput 
                        label="Currency"
                        target='currency'
                         handleChange={ handleChangeCurrency }
                        value={paymentCurrency}
                        isToggleEditForm={true}
                      selectValueKey="id"
                      selectValueName="name"
                      selectValues={
                        currencyData.data.currency?currencyData.data.currency:[]
                      }      
                        />
                  
                </div>
                <hr></hr>
            </div>

        <div style={{ float: "right", paddingTop: "1rem"}}>
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
      <DialogRoot show={toggle} handleHide={restartToggle} size={"lg"}>
         {target==='account'?
        (<div>
            <h3>Account List</h3>
            <JournalAccountList
            getInfo={getAccountData}/>
        </div>):
        null 
        }
          </DialogRoot>
      </React.Fragment>
    )
}
const mapStateToProps=({accountItemState,financeState})=>{
    const {currencyData, accountItem}=accountItemState
    const {AccountJournalsState} =financeState
    const{accountJournalsAll}=AccountJournalsState
        return {currencyData, accountItem,accountJournalsAll}
    }
export default connect(mapStateToProps,{
    show,
    getAllAccountItem,
    getAllAccountJournals,
    getAllCurrencyData
})(AddPaymentMethodDetails);