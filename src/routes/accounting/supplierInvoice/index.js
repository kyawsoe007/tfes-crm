import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from "moment";

// Component Imports
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { supplierInvoiceNewPage, singleSupplierInvoice } from "Helpers/accountingURL";

// Icon Imports
import { FormGroup, FormLabel, FormControl, ListItemText, TextField, Checkbox, Select, InputLabel, MenuItem, IconButton } from '@material-ui/core';
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";
import { amountRounding } from "Helpers/helpers";

// Actions
import { getSupplierInvoice, getFilterSupplierInvoiceRequest, deleteSupplierInvoice, setDuplicate, clearDuplicate, getSingleSupplierInvoiceRequest, getSavedSupplierInvoiceQuery } from "Ducks/supplier-invoice";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

class SupplierInvoiceListView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    invoicePage() {
        this.props.clearDuplicate();                                                                                 //TODO for future function
        this.props.history.push(supplierInvoiceNewPage);
    }

    edit(id) {
        this.props.clearDuplicate();   
        this.props.history.push({ pathname: singleSupplierInvoice(id) })
    }

    duplicate(id) {
        this.props.getSingleSupplierInvoiceRequest(id);
        this.props.history.push({ pathname: singleSupplierInvoice(id) }, { isDuplicate: true })
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
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            { label: "Supplier Name", name: "suppName", options: { filter: false , sort: false} },
            { label: "Inv Number", name: "invoiceNumber", options: { filter: false } },
            { label: "Supp Inv Number", name: "suppInvoiceNo", options: { filter: false } },
            { label: "PO Number", name: "soNumber", options: { filter: false }},
            { label: "Invoice date", name: "invoiceDate", options: {
                filter: true,
                customBodyRender:(value, tableMeta)=>{
                    return(
                        <div>{moment(value).format('DD/MM/YYYY')}</div>
                    )
                },
                filterType: 'custom',
                // filterList: this.props.SavedQuery.saved? this.props.SavedQuery.filterList[4] : [],
                customFilterListRender: filterList => {
                 return `Date ${filterList[0]} - ${filterList[1]}`
                },
                filterOptions: {
                    display: (filterList, onChange, index, column) => (
                      <div className="date_filter">
                        <FormLabel>Date</FormLabel>
                        <FormGroup row>
                          <TextField
                            label=''
                            type="date"
                            value={filterList[index][0] ? filterList[index][0] : ''}
                            onChange={event => {
                              filterList[index][0] = event.target.value;
                              onChange(filterList[index], index, column);
                            }}
                            style={{ width: '45%', marginRight: '10%', paddingTop: "17px" }}
                          />
                          <TextField
                            label=''
                            type="date"
                            value={filterList[index][1] || ''}
                            onChange={event => {
                              filterList[index][1] = event.target.value;
                              onChange(filterList[index], index, column);
                            }}
                            style={{ width: '45%', paddingTop: "17px" }}
                          />
                        </FormGroup>
                      </div>
                    ),
                  },
            } },
                          
            { label: "Currency", name: "currency", options: {
                filter: false,
                display: false,
            } },           
            { label: "Total", name: "grandTotal", options: { filter: false, sort: false, 
                customBodyRender:(value, tableMeta)=>{

                    const currencyIndex = columns.findIndex(x => x.name === "currency")
                    if(currencyIndex >= 0 && tableMeta.rowData[currencyIndex]){
                        const currencySymbol = tableMeta.rowData[currencyIndex].currencySymbol
                    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
                    return(
                        // <div>{currencySymbol} {amountRounding(2,value).toLocaleString()}</div>
                        // add in tofixed(2) to ensure whole number also shows 2 decimal places. will not have rounding error as amount rounding is done first 
                        <div>{currencySymbol} {value ? `${value.toLocaleString("en-SG", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2})}` : ""}</div>
                    )
                    }
                    else {
                        return <div>{value ? `${value.toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}</div>
                    }
                }
            } },

            { label: "Status", name: "status", options: {                 
                    sort: false,                                             
                    filter: true,
                    filterType: "checkbox",
                    filterOptions:{
                        names:["cancelled", "draft", "paid", "partial", "unpaid"],
                    },
                    customFilterListOptions:{
                        render: (v) => `Status: ${v}`
                      },
                } 
            },
            { label: "Remarks", name: "remarks", options: { filter: false } },
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
                                    tableMeta.rowData[statusIndex] == 'draft' ? (
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
                }} >Supplier Invoices - Expenses
                </div>
                <div className="rct-block">
                    <ServerRecordsList
                        title=" "
                        hasSearch={true}
                        columns={columns}
                        data={data}
                        totalCount={count}
                        otherOptions={options}
                        filterFunc={this.props.getFilterSupplierInvoiceRequest}
                        savedQuery={this.props.SavedQuery}
                        getSavedQuery={this.props.getSavedSupplierInvoiceQuery}
                    />
                </div>
            </div>

        )
    }

}

const mapStateToProps = ({ supplierinvoiceState }) => {
    const { SupplierInvoices, SupplierInvoiceDetails, SupplierInvoiceFiltered, SavedQuery } = supplierinvoiceState;
    return { SupplierInvoices, SupplierInvoiceDetails, SupplierInvoiceFiltered, SavedQuery };
};
export default connect(mapStateToProps, { show, getSupplierInvoice, getFilterSupplierInvoiceRequest, deleteSupplierInvoice, setDuplicate, clearDuplicate, getSingleSupplierInvoiceRequest, getSavedSupplierInvoiceQuery })(SupplierInvoiceListView);
