import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from "moment";

// Component Imports
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { expenseClaimsNewPage, singleExpenseClaims } from "Helpers/adminURL";
import { expenseClaimsStatus } from 'Constants/modelStatus';

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

// Redux
import { getDeposit, getFilterDepositRequest, deleteDeposit, getSingleDepositRequest } from "Ducks/accounting/deposit";
import { getAllExpenseClaims, getAllFilterExpenseClaims, deleteExpenseClaims } from "Ducks/expenseClaims";

class ExpenseClaimsListView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = () => {
        // this.props.getAllExpenseClaims()
    }

    createPage() {
        this.props.history.push(expenseClaimsNewPage);
    }

    edit(id) {
        this.props.history.push({ pathname: singleExpenseClaims(id) })
    }

    duplicateClaim = (id) => {
        this.props.history.push({ pathname: expenseClaimsNewPage, state: { duplicate: true, duplicateId: id } })
    }


    handleSingleDelete(id) {
        this.props.deleteDeposit(id);
    }

    delete(id, partNumber) {
        this.props.show("alert_delete", {
            name: partNumber,
            action: () => this.props.deleteExpenseClaims(id),
        });
    }

    render() {
        // const { data, count, loading } = this.props.DepositFiltered;

        const data = this.props.allFilteredExpenseClaims.data

        const columns = [
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            { label: "Expense Claims No", name: "claimNo", options: { filter: false } },
            {
                label: "Date", name: "createdDate", options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        if (value != undefined) {
                            return (<div>{moment(value).format('DD/MM/YYYY')}</div>)
                        } else {
                            return (<div> </div>)
                        }
                    }
                }
            },
            // { label: "Expense Claims PIC", name: "claimsPic", options: { filter: false }},  
            // { label: "Expense Claims type", name: "type", options: { filter: false }},  
            { label: "Remarks", name: "remark", options: { filter: false } },
            { label: "Status", name: "status", options: { filter: true } },
            {
                label: "Action",
                name: "action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        const statusIndex = columns.findIndex(x => x.name === 'status');
                        console.log(tableMeta.rowData[statusIndex])
                        return (

                            <div>

                                {
                                    (tableMeta.rowData[statusIndex] === expenseClaimsStatus.APPROVED || 
                                     tableMeta.rowData[statusIndex] === expenseClaimsStatus.REJECTED || 
                                     tableMeta.rowData[statusIndex] === expenseClaimsStatus.PAID) &&
                                    <IconButton size="small"
                                        onClick={() => { this.edit(tableMeta.rowData[0]) }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                }

                                {
                                    (tableMeta.rowData[statusIndex] === expenseClaimsStatus.DRAFT ||
                                        tableMeta.rowData[statusIndex] === expenseClaimsStatus.WAITINGAPPROVAL) &&
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
                                }

                                {
                                    tableMeta.rowData[statusIndex] === expenseClaimsStatus.DRAFT &&
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
                                }

                                <IconButton
                                    size="small" className="tableDeleteIcon"
                                    onClick={() => {this.duplicateClaim(tableMeta.rowData[0])}}
                                >
                                    <FileCopyOutlinedIcon />
                                </IconButton>



                            </div>
                        )
                    }
                }
            },
        ];

        const options = Object.assign({}, listOptions);
        options.customToolbar = () => {
            return (
                <IconButton size="small" onClick={() => this.createPage()}>
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
                }} > Expense Claims
            </div>
                <div className="rct-block">
                    <ServerRecordsList
                        title=" "
                        hasSearch={true}
                        columns={columns}
                        data={data ? data : []}
                        //   totalCount={count} 
                        otherOptions={options}
                        // filterFunc = {() => {}}
                        // need to set get call to filter, throwing error 
                        filterFunc={this.props.getAllFilterExpenseClaims}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ expenseClaimsState }) => {
    const { allExpenseClaims, allFilteredExpenseClaims } = expenseClaimsState;
    return { allExpenseClaims, allFilteredExpenseClaims };
};
export default connect(mapStateToProps, { show, getAllExpenseClaims, getAllFilterExpenseClaims, deleteExpenseClaims })(ExpenseClaimsListView);

