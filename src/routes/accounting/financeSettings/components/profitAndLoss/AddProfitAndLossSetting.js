import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import JournalAccountList from "../../../journalEntries/components/JournalAccountList"

import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
// redux

function AddProfitAndLossSetting({ show, handleHide, accountItem, postProfitAndLoss }) {

    const [journalAccountToggle, setJournalAccountToggle] = useState(false)
    const [accountDetails, setAccountDetails] = useState({})
    const [internalValues, setInternalValues] = useState([
        { name: "Income", value: "INCOME" },
        { name: "Other Income", value: "Other Income" },
        { name: "COGS", value: "COGS" },
        { name: "Expenses", value: "Expenses"},
        { name: "Other Expenses", value: "Other Expenses"}
    ])
    const [internal, setInternal] = useState("")
    const [acctItem, setAcctItem] = useState(accountItem);
    const [errorMsg, setErrorMsg] = useState("")

    const getInfo = (id) => {

        const selectedAcct = acctItem.find(x => x._id === id);
        let accountDetails = { ...accountDetails };
        accountDetails.id = selectedAcct._id
        accountDetails.accountCode = selectedAcct.accountCode;
        accountDetails.accountName = selectedAcct.accountName;
        accountDetails.currency = selectedAcct.currency ? selectedAcct.currency : "";

        setAccountDetails(accountDetails);
        setJournalAccountToggle(!journalAccountToggle);
    }

    const submitBtnHandler = () => {

        let error = false;

        if (internal === "") { error = true; setErrorMsg("Please select internal value!") }
        if (typeof accountDetails.accountCode === "undefined" || typeof accountDetails.accountName === "undefined") {
            error = true; setErrorMsg("Please select account!")
        }

        if (error) { return null }


        let postBody = accountDetails;
        console.log("POSTY", postBody)
        // postBodyActions
        let data = {
            accountId: postBody.id,
            internal: postBody.internal
        }
        postProfitAndLoss(data)
        handleHide()
    }

    const changeHandler = (field, value) => {
        let newAccountDetails = accountDetails;
        newAccountDetails[field] = value

        setAccountDetails(newAccountDetails);
        setInternal(value)
    }

    return (
        <Fragment>
            <DialogRoot
                show={show}
                handleHide={handleHide}
                size={'sm'}
            >
                <div className="container" style={{ padding: "1rem" }}>
                    <div className="row">
                        <div className="col-12">
                            <h1> Add Account Details</h1>
                            <h1 style={{ color: "red" }}> {errorMsg}</h1>
                        </div>

                        <div className="col-12">
                            <FormInput
                                label="account code"
                                readOnly={true}
                                value={accountDetails.accountCode ? accountDetails.accountCode : ""}
                                handleChange={() => { }}
                                hasButton={true}
                                buttonClick={() => setJournalAccountToggle(true)}
                            />
                        </div>

                        <div className="col-12">
                            <FormInput
                                label="details"
                                readOnly={true}
                                value={accountDetails.accountName ? accountDetails.accountName : ""}
                                handleChange={() => { }}

                            />
                        </div>

                        <div className="col-12">
                            <FormInput
                                label="currency"
                                readOnly={true}
                                value={accountDetails.currency ? accountDetails.currency : ""}
                                handleChange={() => { }}

                            />
                        </div>

                        <div className="col-12">
                            <FormInput
                                label="internal"
                                target="internal"
                                handleChange={changeHandler}
                                selectValues={internalValues}
                                selectValueName="name"
                                value={internal ? internal : ""}

                            />
                        </div>


                    </div>
                </div>

                <div style={{ float: "right", paddingTop: "1rem" }}>
                    <Button
                        variant="contained"
                        className="btn-success text-white"
                        onClick={submitBtnHandler}
                    >
                        Save and Close
                    </Button>
                </div>
            </DialogRoot>

            {
                journalAccountToggle &&
                <DialogRoot
                    show={journalAccountToggle}
                    size={'lg'}
                    handleHide={() => setJournalAccountToggle(!journalAccountToggle)}
                >
                    <JournalAccountList getInfo={getInfo} />
                </DialogRoot>

            }
        </Fragment>
    )
}

export default AddProfitAndLossSetting

AddProfitAndLossSetting.propTypes = {
    show: PropTypes.bool,
    handleHide: PropTypes.func,
    accountItem: PropTypes.array
}