import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
import {getAllAccountItem} from "Ducks/account-item"
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";
const AddPurchaseSettingDetails = ({ show, handleHide, postPurchaseSetting,getAllAccountItem,accountItem }) => {


    const [purcahseSettingName, setPurchaseSettingName] = useState("")
    const [purchaseSettingAccount,setPurchaseSettingAccount]=useState('')
    const closeAndUpdate = () => {

        const postBody = {
            setting_name: purcahseSettingName,
            account:purchaseSettingAccount
        }

        postPurchaseSetting(postBody)
        handleHide();
    }
    const handleChangeAccount=(field,value)=>{
        setPurchaseSettingAccount(value)
    }

    const handleChangeName=(field,value)=>{
        setPurchaseSettingName(value)
    }

    useEffect(()=>{
        getAllAccountItem()
    },[])
    return (
        <DialogRoot
        show={show}
        handleHide={handleHide}
        size={'sm'}
      >
        <div className="container" style={{padding: "1rem"}}>

            <div className="row">
                <div className="col-12">
                    <h1> Add Purchase Setting Details</h1>
                </div>
                <div className="col-12">
                    <FormInput
                label="New Setting Name"
                      value={purcahseSettingName}
                      target="purcahseSettingName"
                      handleChange={handleChangeName}
                      selectValueName="name"
                      isToggledEditForm={true}
                selectValues={[
                    {name: "Trading", value: "Trading"},
                    {name: "Stocks", value: "Stocks"},
                    {name: "Expenses", value: "Expenses"},
                    {name: "Fixed Assets", value: "Fixed Assets"}
                               ]}
              />
                    </div>
                    <div className="col-12">
                    <FormInput 
                        label="Account"
                         handleChange={handleChangeAccount}
                        value={purchaseSettingAccount}
                        target='purchaseSettingAccount'
                        isToggleEditForm={true}
                        selectValueKey="_id"
                        selectValueName="accountName"
                        selectValues={
                        accountItem.data?accountItem.data:[]
                        }
                        />
                    {/* <FormInput 
                        label="New Account"
                        onChange={ (e) => setPurchaseSettingAccount(e.target.value) }
                        value={purchaseSettingAccount}
                    /> */}
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
    )
}
const mapStateToProps=({accountItemState})=>{
    const {accountItem}=accountItemState
        return {accountItem}
    }
export default connect(mapStateToProps,{
    show,
    getAllAccountItem
})(AddPurchaseSettingDetails);