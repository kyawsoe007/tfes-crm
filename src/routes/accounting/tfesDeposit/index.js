import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from "moment";

// Component Imports
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { depositNewPage, singleTfesDeposit } from "Helpers/accountingURL";
import { amountRounding } from "Helpers/helpers";

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";

// Actions
import { getDeposit, getFilterDepositRequest, deleteDeposit, getSingleDepositRequest, getSavedDepositQuery } from "Ducks/accounting/deposit";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { invoiceStatus } from 'Constants/modelStatus';

class DepositListView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    invoicePage() {
        //this.props.clearDuplicate();                                                                                 //TODO for future function
        this.props.history.push(depositNewPage);
    }

    edit(id) {
        this.props.history.push({ pathname: singleTfesDeposit(id) })
    }

    duplicate(id) {
        this.props.getSingleDepositRequest(id);
        this.props.history.push({ pathname: singleTfesDeposit(id) }, { isDuplicate: true })
    }

    handleSingleDelete(id) {
        this.props.deleteDeposit(id);
    }

    delete(id, partNumber) {
        this.props.show("alert_delete", {
            name: partNumber,
            action: () => this.handleSingleDelete(id),
        });
    }

    render() {
        const { data, count, loading } = this.props.DepositFiltered;
        // const columndata =[]
        // let company
        // this.props.InvoiceFiltered.map(item =>{

        // })

        const columns = [
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            {
                label: "Partner No", name: "companyNo", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        const rowIndex = tableMeta.rowIndex
                        if (data[rowIndex].custNo) {
                            return <div>{data[rowIndex].custNo}</div>
                        } else if (data[rowIndex].suppNo) {
                            return <div>{data[rowIndex].suppNo}</div>
                        }

                    }

                }
            },
            {
                label: "Partner Name", name: "companyName", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        const rowIndex = tableMeta.rowIndex
                        if (data[rowIndex].custName) {
                            return <div>{data[rowIndex].custName}</div>
                        } else if (data[rowIndex].suppName) {
                            return <div>{data[rowIndex].suppName}</div>
                        }

                    }

                }
            },
            {
                label: "Deposit date", name: "invoiceDate", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <div>{moment(value).format('DD/MM/YYYY')}</div>
                        )
                    }
                }
            },
            { label: "Number", name: "depositNumber", options: { filter: false } },
            {
                label: "Currency", name: "currency", options: {
                    filter: false,
                    display: false
                }
            },
            {
                label: "Total", name: "grandTotal", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {

                        const currencyIndex = columns.findIndex(x => x.name === "currency")
                        if (typeof value !== "number") {
                            return <div>0.00</div>

                        } else {
                            if (currencyIndex >= 0 && tableMeta.rowData[currencyIndex]) {
                                const currencySymbol = tableMeta.rowData[currencyIndex].currencySymbol
                                // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
                                return (
                                    // <div>{currencySymbol} {amountRounding(2,value).toLocaleString()}</div>
                                    // add in tofixed(2) to ensure whole number also shows 2 decimal places. will not have rounding error as amount rounding is done first 
                                    <div style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <div >{currencySymbol} </div>
                                        <div style={{ textAlign: "center" }}>{`${value.toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</div>
                                    </div>
                                )
                            }
                            else {
                                return <div style={{ textAlign: "center" }}>{`${value.toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</div>
                            }
                        }



                    }
                }
            },
            {
                label: "Balance", name: "balance", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {

                        const currencyIndex = columns.findIndex(x => x.name === "currency")
                        if (typeof value !== "number") {
                            return ""

                        } else {
                            if (currencyIndex >= 0 && tableMeta.rowData[currencyIndex]) {
                                const currencySymbol = tableMeta.rowData[currencyIndex].currencySymbol
                                // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
                                return (
                                    // <div>{currencySymbol} {amountRounding(2,value).toLocaleString()}</div>
                                    // add in tofixed(2) to ensure whole number also shows 2 decimal places. will not have rounding error as amount rounding is done first 
                                    <div style={{ textAlign: "center", display: "flex", flexDirection: "row" }}>
                                        <div >{currencySymbol} </div>
                                        <div style={{ textAlign: "center" }}>{`${value.toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</div>
                                    </div>
                                )
                            }
                            else {
                                return <div style={{ textAlign: "center" }}>{`${value.toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</div>
                            }
                        }



                    }
                }
            },
            {
                label: "Status", name: "status", options: {                                                               //11
                    filter: true,
                    filterOptions: {
                        names: Object.values(invoiceStatus)
                    },
                }
            },
            {
                label: "Action",
                name: "action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        let statusIndex = columns.findIndex(x => x.name == "status")
                        return (
                            <div>
                                <IconButton size="small"
                                    onClick={() => { this.edit(tableMeta.rowData[0]) }}
                                >
                                    <Icon
                                        className="tableEditIcon"
                                        icon={editFilled}
                                        color="#595959"
                                        width="1.5rem"
                                        height="1.5rem"
                                    />
                                </IconButton>
                                {
                                    tableMeta.rowData[statusIndex] == invoiceStatus.DRAFT ? (
                                        <IconButton
                                            size="small" className="tableDeleteIcon"
                                            onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[1]) }}
                                        >
                                            <Icon
                                                icon={baselineDeleteForever}
                                                color="#595959"
                                                width="1.5rem"
                                                height="1.5rem"
                                            />
                                        </IconButton>
                                    ) : (
                                        null
                                    )
                                }
                                <IconButton
                                    size="small" className="tableCloneIcon" onClick={() => { this.duplicate(tableMeta.rowData[0]) }}>
                                    <FileCopyOutlinedIcon
                                        style={{
                                            color: "#595959",
                                            width: "1.5rem",
                                            height: "1.5rem"
                                        }}
                                    />
                                </IconButton>

                            </div>
                        )
                    }
                }
            },
        ];

        // dynamically adds back filter list based on the props 
        for (var i = 0; i < columns.length; i++) {
            // FOR FILTERS
            if (this.props.SavedQuery.saved) {
                columns[i].options.filterList = this.props.SavedQuery.filterList[i];
            } else {
                columns[i].options.filterList = [];
            }

            // FOR COLUMNS
            if(this.props.SavedQuery.display){
                columns[i].options.display = this.props.SavedQuery.display[i];
            }
        }

        const options = Object.assign({}, listOptions);
        options.customToolbar = () => {
            return (
                <IconButton size="small" onClick={() => this.invoicePage()}>
                    <Icon
                        className="tableEditIcon"
                        icon={addFilled}
                        color="#df0021"
                        width="2rem"
                        height="2rem"
                    />
                </IconButton>
            );
        };

        return (
            <div>
                <div style={{
                    width: "50%",
                    margin: "10px auto",
                    minWidth: "400px",
                    color: "#2b4da0",
                    fontWeight: "bolder",
                    fontSize: "18px",
                    textAlign: "center",
                }} > Deposit
            </div>
                <div className="rct-block">
                    <ServerRecordsList
                        title=" "
                        hasSearch={true}
                        columns={columns}
                        data={data}
                        totalCount={count}
                        otherOptions={options}
                        filterFunc={this.props.getFilterDepositRequest}
                        savedQuery={this.props.SavedQuery}
                        getSavedQuery={this.props.getSavedDepositQuery}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ depositState }) => {
    const { Deposits, DepositFiltered, SavedQuery } = depositState;
    return { Deposits, DepositFiltered, SavedQuery };
};
export default connect(mapStateToProps, { show, getDeposit, getFilterDepositRequest, deleteDeposit, getSingleDepositRequest, getSavedDepositQuery })(DepositListView);
