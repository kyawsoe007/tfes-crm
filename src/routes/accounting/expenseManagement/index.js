import React, { Component } from "react";
import {connect} from "react-redux";
import { show } from "redux-modal";

// Component Imports
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { expenseMangementNewPage, singleExpenseManagement } from "Helpers/accountingURL";

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";

// Actions
import { getSupplierInvoice, getFilterSupplierInvoiceRequest, deleteSupplierInvoice, setDuplicate, clearDuplicate, getSingleSupplierInvoiceRequest } from "Ducks/supplier-invoice";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

class ExpenseManagementListView extends Component{
    constructor(props){
        super(props);
            this.state={

            }
        }

    invoicePage() {
        this.props.clearDuplicate();                                                                                 //TODO for future function
        this.props.history.push(expenseMangementNewPage);
    }

    edit(id) {
        this.props.history.push({ pathname: singleExpenseManagement(id) })
    }

    duplicate(id) {
        this.props.getSingleSupplierInvoiceRequest(id);
        this.props.history.push({ pathname: singleExpenseManagement(id) }, { isDuplicate: true })
    }

    handleSingleDelete(id) {
        this.props.deleteSupplierInvoice(id);
    }

    delete(id, partNumber) {
        this.props.show("alert_delete", {
            name: partNumber,
            action: () => this.handleSingleDelete(id),
        });
    }

    render() {
        const { data, count, loading } = this.props.SupplierInvoiceFiltered;

        const columns = [
            { name: "id",  options: { display: "excluded", filter: false, sort: false }},
            { label: "Supplier No", name: "suppNo", options: { filter: false } },
            { label: "Supplier Name", name: "suppName", options: { filter: false } },

            { label: "Invoice date", name: "createdAt", options: {
                filter: false,
                customBodyRender:(value, tableMeta)=>{
                    return(
                        <div>{getDate(value)}</div>
                    )
                }
            } },
            { label: "Number", name: "invoiceNumber", options: { filter: false } },
            { label: "Responsible", name: "responsible", options: { filter: false } },
            { label: "Due date", name: "paymentTerm", options: {
                filter: false,
                customBodyRender:(value, tableMeta)=>{
                    const date = new Date(tableMeta.rowData[3]);
                    return(
                        <div>{getDate(date.setDate(date.getDate() + (value ? value.days : 0)))}</div>
                    )
                }
            } },
            { label: "Source Document", name: "soNumber", options: { filter: false } },
            { label: "Currency", name: "currency", options: {
                filter: false,
                customBodyRender:(value, tableMeta)=>{
                    return(
                        <div>{value ? value.name : ''}</div>
                    )
                }
            } },
            { label: "Balance", name: "balance", options: { filter: false,
                    customBodyRender:(value, tableMeta)=>{
                        return(
                            <div>{value}</div>
                        )
                    }}
            },
            { label: "Total", name: "total", options: { filter: false } },
            { label: "Status", name: "status", options: {                                                               //11
                    filter: true,
                    filterOptions:{
                        names:["draft", "complete"],
                    },
                } },
            {
                label: "Action",
                name: "action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value,tableMeta) => {
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
                                    tableMeta.rowData[11] !== 'confirmed' ? (
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
                    width:"50%",
                    margin:"10px auto",
                    minWidth:"400px",
                    color:"#2b4da0",
                    fontWeight:"bolder",
                    fontSize:"18px",
                    textAlign:"center", 
                    }} >Expense Management
                </div>
            <div className="rct-block"> 
                <ServerRecordsList title=" " hasSearch={true} columns={columns} data={data} count={count} otherOptions={options}
                    filterFunc={this.props.getFilterSupplierInvoiceRequest}
                />
            </div>
            </div>
            
        )
    }

}

const mapStateToProps = ({ supplierinvoiceState }) => {
    const { SupplierInvoices, SupplierInvoiceDetails, SupplierInvoiceFiltered } = supplierinvoiceState;
    return { SupplierInvoices, SupplierInvoiceDetails, SupplierInvoiceFiltered };
};
export default connect(mapStateToProps, { show, getSupplierInvoice, getFilterSupplierInvoiceRequest, deleteSupplierInvoice, setDuplicate, clearDuplicate, getSingleSupplierInvoiceRequest })(ExpenseManagementListView);
