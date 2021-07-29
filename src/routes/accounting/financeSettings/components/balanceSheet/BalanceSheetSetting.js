import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect, useDispatch } from "react-redux";

import RecordsList from "Components/RecordsList";
import { show } from "redux-modal";

import AddBalanceSheetSetting from './AddBalanceSheetSetting';
import EditBalanceSheetSetting from './EditBalanceSheetSetting';

import { getAllAccountItem } from "Ducks/account-item"

// ICONS 
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';
import { getAllBalanceSheet, deleteBalanceSheet, postBalanceSheet, patchBalanceSheet } from 'Ducks/finance-settings/balance-sheet';

function BalanceSheetSetting({ show,
    getAllAccountItem,
    accountItem,
    getAllBalanceSheet,
    deleteBalanceSheet,
    postBalanceSheet,
    patchBalanceSheet,
    balanceSheetAll }) {
    const [data, setData] = useState([])
    const [addBalanceToggle, setAddBalanceToggle] = useState(false)
    const [editBalanceToggle, setEditBalanceToggle] = useState(false)
    const [selectedData, setSelectedData] = useState({})
    const [selectedDataIndex, setSelectedDataIndex] = useState(0)

    useEffect(() => {
        getAllAccountItem()
        getAllBalanceSheet()
    }, [])


    const columns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        {
            label: "Code", name: "LevelOne", options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    let codeIndex = columns.findIndex(x => x.name === "LevelOne");
                    if (typeof tableMeta.rowData[codeIndex] === 'object') {
                        console.log('code', tableMeta.rowData[codeIndex])
                        return tableMeta.rowData[codeIndex].accountCode
                    }

                    if (typeof tableMeta.rowData[codeIndex] === 'string') {
                        return ""
                    }
                }
            }
        },
        {
            label: "Account", name: "LevelOne", options: {
                filter: true,
                customBodyRender: (value, tableMeta) => {
                    let accountIndex = columns.findIndex(x => x.name === "LevelOne");
                    console.log("TABLEMETA", tableMeta.rowData, accountIndex, tableMeta.rowData[accountIndex]);

                    if (typeof tableMeta.rowData[accountIndex] === 'object') {
                        return tableMeta.rowData[accountIndex].accountName
                    }

                    if (typeof tableMeta.rowData[accountIndex] === 'string') {
                        return tableMeta.rowData[accountIndex]
                    }
                }
            }
        },
        { label: "Level Two", name: "levelTwo", options: { display: false, filter: false } },
        // { label: "Currency", name: "currency", options: { filter: true } },
        // { label: "Internal", name: "internal", options: { filter: true } },
        { label: "Internal Type", name: "internalType", options: { filter: true } },
        {
            label: "Actions", name: "actions", options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    console.log('table', tableMeta)
                    return (
                        <Fragment>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    debugger
                                    const balanceSheetId = columns.findIndex(x => x.name === 'id');
                                    const balanceSheetLevel1 = columns.findIndex(x => x.name === 'LevelOne')
                                    const balanceSheetInternalType = columns.findIndex(x => x.name === 'internalType')
                                    const balanceSheetLevel2 = columns.findIndex(x => x.name === 'levelTwo')
                                    const dd = {
                                        id: tableMeta.rowData[balanceSheetId],
                                        internalType: tableMeta.rowData[balanceSheetInternalType],
                                        levelOne: tableMeta.rowData[balanceSheetLevel1],
                                        levelTwo: tableMeta.rowData[balanceSheetLevel2]
                                    }
                                    setSelectedDataIndex(tableMeta.rowIndex)
                                    setSelectedData(dd)
                                    setEditBalanceToggle(!editBalanceToggle)

                                    // const purchaseIdIndex = purchaseSettingColumns.findIndex(x => x.name === "id");
                                    // const purchaseNameIndex = purchaseSettingColumns.findIndex(x => x.name === "setting_name");
                                    // const purchaseAccountIndex = purchaseSettingColumns.findIndex(x => x.name === "account");

                                    // const purchaseSettingDetail = {
                                    //     id: tableMeta.rowData[purchaseIdIndex],
                                    //     setting_name: tableMeta.rowData[purchaseNameIndex],
                                    //     account:tableMeta.rowData[purchaseAccountIndex]
                                    // }


                                    // setPurchaseSettingDetail(purchaseSettingDetail)
                                    // setPurchaseSettingToggle(true);
                                }}
                            >
                                <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                            </IconButton>
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

    const options = {
        selectableRows: false,
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        customToolbar: () => (
            <React.Fragment>
                <Tooltip id="tooltip-icon" title="Add Balance Sheet">
                    <IconButton className="mr-2" aria-label="Add Balance Sheet"
                        onClick={() => { setAddBalanceToggle(!addBalanceToggle) }}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        ),
        expandableRows: true,
        renderExpandableRow: (rowData, rowMeta) => {
            let levelTwoIndex = columns.findIndex(x => x.name === "levelTwo");
            if (rowData[levelTwoIndex] && rowData[levelTwoIndex].length > 0) {
                // alert("PING")
                return rowData[levelTwoIndex].map((acct) => (
                    <tr className="SKU-sub-table">
                        <td></td>
                        <td>{acct.accountCode}</td>
                        <td>{acct.accountName}</td>
                        <td>{acct.internalType}</td>
                        <td></td>
                    </tr>
                ))
            }
        }
    };

    const delAcct = (id, name) => {
        show("alert_delete",
            {
                name: name.accountCode ? name.accountCode : name,
                action: () => {
                    deleteBalanceSheet(id)
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
                    data={balanceSheetAll.data}
                    options={options}
                />
            </div>

            {
                addBalanceToggle &&
                <AddBalanceSheetSetting
                    show={addBalanceToggle}
                    handleHide={() => setAddBalanceToggle(!addBalanceToggle)}
                    accountItem={accountItem.data}
                    setData={setData}
                    postBalanceSheet={postBalanceSheet}
                    data={data}
                />
            }

            {
                editBalanceToggle &&
                <EditBalanceSheetSetting
                    show={editBalanceToggle}
                    handleHide={() => setEditBalanceToggle(!editBalanceToggle)}
                    accountItem={accountItem.data}
                    setData={setData}

                    patchBalanceSheet={patchBalanceSheet}
                    data={data}
                    selectedData={selectedData}
                    selectedDataIndex={selectedDataIndex}
                />
            }

        </Fragment>
    )
}

const mapStateToProps = ({ accountItemState, financeState }) => {
    const { accountItem } = accountItemState
    const { BalanceSheetState } = financeState;
    const { balanceSheetAll } = BalanceSheetState
    return { accountItem, balanceSheetAll }
}


export default connect(mapStateToProps, {
    show,
    getAllAccountItem,
    getAllBalanceSheet,
    deleteBalanceSheet,
    postBalanceSheet,
    patchBalanceSheet
})(BalanceSheetSetting)

BalanceSheetSetting.propTypes = {
    show: PropTypes.func,
    getAllAccountItem: PropTypes.func,
    getAllBalanceSheet: PropTypes.func,
    deleteBalanceSheet: PropTypes.func,
    postBalanceSheet: PropTypes.func,
    patchBalanceSheet: PropTypes.func,
    balanceSheetAll: PropTypes.array,
    accountItem: PropTypes.object
}
