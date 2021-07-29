import React, { Component, Fragment, useState, useEffect } from "react";
// Component Imports
import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
import {getAllAccountItem} from "Ducks/account-item"
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";

const EditPurchaseSetting = ({ show, handleHide, purchaseSettingDetail, patchPurchaseSetting,getAllAccountItem,accountItem }) => {


    const [purchaseSetting, setPurchaseSetting] = useState(purchaseSettingDetail.setting_name)
    const [purchaseAccount,setPurchaseAccount]=useState(purchaseSettingDetail.account._id)
    const closeAndUpdate = () => {

        const patchBody = {
            id: purchaseSettingDetail.id,
            setting_name: purchaseSetting,
            account:purchaseAccount
        }

        patchPurchaseSetting(patchBody);
        // console.log("PATCH BODY", patchBody);
        handleHide();
    }
    const handleChangeAccount=(field,value)=>{
        setPurchaseAccount(value)
    }
    
    const handleChangeName=(field,value)=>{
        setPurchaseSetting(value)
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
                    <h1> Edit <span style={{color:"blue"}}>{purchaseSettingDetail.name} </span> Payment Term Details</h1>
                </div>
                <div className="col-12">
                    
                             <FormInput
                label="New Setting Name"
                      value={purchaseSetting}
                      target="purchaseSetting"
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
                        value={purchaseAccount}
                        target='purchaseAccount'
                        isToggleEditForm={true}
                        selectValueKey="_id"
                        selectValueName="accountName"
                        selectValues={
                        accountItem.data?accountItem.data:[]
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
    )
}
const mapStateToProps=({accountItemState})=>{
    const {accountItem}=accountItemState
        return {accountItem}
    }
export default connect(mapStateToProps,{
    show,
    getAllAccountItem
})(EditPurchaseSetting);