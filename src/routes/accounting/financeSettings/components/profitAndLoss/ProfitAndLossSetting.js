import React, { useState, useEffect, Fragment } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from 'prop-types';

import RecordsList from "Components/RecordsList";
import { show } from "redux-modal";

//IMPORTS
// import JournalAccountList from "../../journalEntries/components/JournalAccountList";
import JournalAccountList from "../../../journalEntries/components/JournalAccountList";
import AddProfitAndLossSetting from './AddProfitAndLossSetting';
import { getAllAccountItem } from "Ducks/account-item"

// ICONS 
import { IconButton } from '@material-ui/core';
import { Icon } from '@iconify/react';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';
import { getAllProfitAndLoss, patchProfitAndLoss, postProfitAndLoss, deleteProfitAndLoss } from "Ducks/finance-settings/profitAndLoss";
const mockData = [
    {
        id: 1,
        code: "60-10-010",
        account: "SALES",
        currency: "SGD",
        internal: "INCOME"
    },
    {
        id: 2,
        code: "70-10-010",
        account: "OTHER INCOME (COMMISSION)",
        currency: "SGD",
        internal: "Other Income"
    },
    {
        id: 3,
        code: "70-10-020",
        account: "OTHER INCOME (SUPPLIER REBATE)",
        currency: "SGD",
        internal: "Other Income"
    },
    {
        id: 4,
        code: "70-10-030",
        account: "OTHER INCOME (BANK REBATE)",
        currency: "SGD",
        internal: "Other Income"
    },
    {
        id: 5,
        code: "80-10-010",
        account: "PURCHASES - GOODS",
        currency: "SGD",
        internal: "COGS"
    },
]

function ProfitAndLossSettings({ show,
    getAllAccountItem,
    accountItem,
    profitLossAll,
    getAllProfitAndLoss,
    patchProfitAndLoss,
    postProfitAndLoss,
    deleteProfitAndLoss }) {

    const [data, setData] = useState(mockData)
    const [addAccountToggle, setAddAccountToggle] = useState(false)


    useEffect(() => {
        getAllAccountItem()
        getAllProfitAndLoss()
    }, [])


    const columns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Code", name: "code", options: { filter: true } },
        { label: "Account", name: "account", options: { filter: true } },
        { label: "Currency", name: "currency", options: { filter: true } },
        { label: "Internal", name: "internal", options: { filter: true } },
        {
            label: "Actions", name: "actions", options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        <Fragment>
                            <IconButton
                                size="small" className="tableDeleteIcon"
                                onClick={() => {
                                    delAcct(tableMeta.rowData[0], tableMeta.rowData[1])
                                    // delPurchaseSetting(tableMeta.rowData[0], tableMeta.rowData[1])
                                }}
                            >
                                <Icon
                                    icon={baselineDeleteForever}
                                    color="#595959"
                                    width="1.5rem"
                                    height="1.5rem"
                                />
                            </IconButton>
                        </Fragment>
                    )
                }
            }
        },
    ]

    const tableOptions = {
        selectableRows: false,
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        customToolbar: () => (
            <React.Fragment>
                <Tooltip id="tooltip-icon" title="Add Account">
                    <IconButton className="mr-2" aria-label="Add Account"
                        onClick={() => {
                            setAddAccountToggle(!addAccountToggle)
                            // addPurchaseSettingModalToggle()
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    };

    const delAcct = (id, name) => {
        show("alert_delete",
            {
                name: name,
                action: () => {
                    deleteProfitAndLoss(id)
                    // hard code delete from static array, to put in delete function
                    // let newData = [...data];
                    // newData = newData.filter(x => x.id !== id)
                    // console.log("NEWDATA", newData, id)
                    // setData(newData)
                },
            });
    }

    return (
        <Fragment>
            <div style={{ padding: "1rem", minWidth: "1200px" }}>
                <RecordsList
                    columns={columns}
                    data={profitLossAll.data}
                    options={tableOptions}
                />
            </div>

            {
                addAccountToggle &&
                <AddProfitAndLossSetting
                    show={addAccountToggle}
                    handleHide={() => setAddAccountToggle(!addAccountToggle)}
                    accountItem={accountItem.data}
                    postProfitAndLoss={postProfitAndLoss}
                />
            }

        </Fragment>
    )
}

const mapStateToProps = ({ accountItemState, financeState }) => {
    const { accountItem } = accountItemState
    const { ProfitAndLossState } = financeState
    const { profitLossAll } = ProfitAndLossState
    return { accountItem, profitLossAll }
}

export default connect(mapStateToProps, {
    show,
    getAllAccountItem,
    getAllProfitAndLoss,
    patchProfitAndLoss,
    postProfitAndLoss,
    deleteProfitAndLoss
})(ProfitAndLossSettings)

ProfitAndLossSettings.propTypes = {
    show: PropTypes.bool,
    getAllAccountItem: PropTypes.func,
    getAllProfitAndLoss: PropTypes.func,
    patchProfitAndLoss: PropTypes.func,
    postProfitAndLoss: PropTypes.func,
    deleteProfitAndLoss: PropTypes.func,
    profitLossAll: PropTypes.array,
    accountItem: PropTypes.array
}
