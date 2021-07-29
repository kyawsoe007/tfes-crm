import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import FilteredJournalAccount from './FilteredJournalAccount'

import FormInput from "Components/Form/FormInput";
import DialogRoot from 'Components/Dialog/DialogRoot'
import Button from "@material-ui/core/Button";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

function AddBalanceSheetSetting({ show, handleHide, accountItem, setData, data, postBalanceSheet }) {

    const [internalTypeValues, setInternalTypeValues] = useState([
        { name: "Current Assets", value: "Current Assets" },
        { name: "Fixed Assets", value: "Fixed Assets" },
        { name: "Current Liabilities", value: "Current Liabilities" },
        { name: "Long Term Liabilities", value: "Long Term Liabilities" },
        { name: "Capital", value: "Capital" },
    ])
    const [accountJournalToggle, setAccountJournalToggle] = useState(false)
    const [filterAccountItems, setFilterAccountItems] = useState(accountItem)

    const [internalType, setInternalType] = useState("");

    const [levelToggle, setLevelToggle] = useState("")
    const [levelOneAcct, setLevelOneAcct] = useState("")
    // creates a first array so that .map can run
    // https://stackoverflow.com/questions/5501581/javascript-new-arrayn-and-array-prototype-map-weirdness
    const [levelTwoAcct, setLevelTwoAcct] = useState(["empty"])
    const [levelTwoIndex, setLevelTwoIndex] = useState(0)
    console.log('level2', levelTwoAcct)
    const changeInternalType = (field, value) => {
        setInternalType(value);
        let filtered = [];
        for (let i = 0; i < accountItem.length; i++) {
            if (accountItem[i].internalType.toUpperCase() === value.toUpperCase()) {
                filtered.push(accountItem[i])
            }
        }
        setFilterAccountItems(filtered);

    }

    const getInfoLevelOne = (id) => {
        const selectedAcct = filterAccountItems.find(x => x._id === id);
        setLevelOneAcct(selectedAcct)
        setAccountJournalToggle(!accountJournalToggle);
    }

    const levelOneChangeHandler = (field, value) => {
        setLevelOneAcct(value);

        //fix issue on totally empty array after user deletes all lines 
        if (levelTwoAcct.length === 0) {
            let newArr = ["empty"];
            setLevelTwoAcct(newArr);
        }
    }

    const getInfoLevelTwo = (id) => {
        const selectedAcct = filterAccountItems.find(x => x._id === id);
        let newDataSelect = { ...selectedAcct, accountId: selectedAcct._id }
        let newLevelTwoArr = [...levelTwoAcct,];

        newLevelTwoArr[levelTwoIndex] = newDataSelect;
        setLevelTwoAcct(newLevelTwoArr);
        setAccountJournalToggle(!accountJournalToggle);
    }

    const addLevelTwoLine = () => {
        let newLevelTwoArr = [...levelTwoAcct];
        newLevelTwoArr.push("");
        setLevelTwoAcct(newLevelTwoArr);
    }

    const deleteLine = (index) => {
        let newLevelTwoArr = [...levelTwoAcct];
        newLevelTwoArr.splice(index, 1);
        setLevelTwoAcct(newLevelTwoArr);

    }

    const submitBtnHandler = () => {

        let newData = [...data];

        let postBody = {
            internalType: internalType,
            id: newData.length, //shorterm
        }

        if (typeof levelOneAcct === 'object') {
            postBody.levelOne = levelOneAcct;
            console.log("POST1", postBody)
            //post call here
        }

        if (typeof levelOneAcct === 'string') {
            postBody.levelOne = levelOneAcct;
            postBody.levelTwo = levelTwoAcct;
            console.log("POST2", postBody)
            // postcall here
        }

        // this is just to populate mock data 
        newData.push(postBody);
        //setData(newData)
        postBalanceSheet(postBody)
        handleHide()
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
                            <h1> Add Balance Sheet Details</h1>
                            {/* <h1 style={{color: "red"}}> {errorMsg}</h1> */}
                        </div>

                        <div className="col-12">
                            <FormInput
                                label="internalType"
                                target="internalType"
                                selectValues={internalTypeValues}
                                handleChange={changeInternalType}
                                value={internalType}
                            />
                        </div>

                        <div className="col-12">
                            <FormInput
                                label="level One"
                                readOnly={internalType ? false : true}
                                target="level One"
                                value={levelOneAcct && levelOneAcct.accountName ? levelOneAcct.accountName : levelOneAcct}
                                hasButton={internalType !== "" ? true : false}
                                buttonClick={() => {
                                    setLevelToggle(1);
                                    setAccountJournalToggle(true)
                                }}
                                handleChange={levelOneChangeHandler}
                            />
                        </div>


                        {
                            typeof levelOneAcct === 'string' && levelOneAcct.length > 0 &&
                            <React.Fragment>
                                <div className="col-12">
                                    {levelTwoAcct.map((acct, index) => {
                                        return (
                                            <div className="row">
                                                <div key={index} className="col-11">
                                                    <FormInput
                                                        label="level Two"
                                                        value={levelTwoAcct[index] && levelTwoAcct[index].accountName ? levelTwoAcct[index].accountName : ""}
                                                        hasButton={true}
                                                        readOnly={true}
                                                        buttonClick={() => {
                                                            setLevelToggle(2)
                                                            setLevelTwoIndex(index)
                                                            setAccountJournalToggle(true)
                                                        }}
                                                    />
                                                </div>
                                                <div className="col-1">
                                                    <div className="journal-delete-btn">
                                                        <HighlightOffIcon
                                                            className="tableOffIcon"
                                                            onClick={() => deleteLine(index)}
                                                            style={{ marginTop: '50%', marginRight: '50%' }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                {
                                    levelTwoAcct.length > 0 &&
                                    <div className="row quotation-btn" style={{ margin: '0 auto' }}>
                                        <AddCircleOutlineIcon
                                            className="tableAddIcon"
                                            onClick={addLevelTwoLine}
                                        />
                                    </div>
                                }

                            </React.Fragment>
                        }
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

                {
                    accountJournalToggle &&
                    <DialogRoot
                        show={accountJournalToggle}
                        handleHide={() => setAccountJournalToggle(!accountJournalToggle)}
                        size={'lg'}
                    >
                        <FilteredJournalAccount
                            data={filterAccountItems}
                            getInfoLevelOne={getInfoLevelOne}
                            getInfoLevelTwo={getInfoLevelTwo}
                            levelToggle={levelToggle}
                        />
                    </DialogRoot>
                }

            </DialogRoot>
        </Fragment>
    )
}

export default AddBalanceSheetSetting;

AddBalanceSheetSetting.propTypes = {
    show: PropTypes.bool,
    handleHide: PropTypes.func,
    accountItem: PropTypes.array,
    setData: PropTypes.func,
    data: PropTypes.array
}