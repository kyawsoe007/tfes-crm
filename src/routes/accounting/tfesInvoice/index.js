import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from "moment";

// Component Imports
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { tfesInvoiceNewPage, singleTfesInvoice } from "Helpers/accountingURL";
import { amountRounding } from "Helpers/helpers";

// Icon Imports
import {
    FormGroup,
    FormLabel,
    FormControl,
    ListItemText,
    TextField,
    Checkbox,
    Select,
    InputLabel,
    MenuItem,
    IconButton
  } from '@material-ui/core';
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";

// Actions
import { getInvoice, getFilterInvoiceRequest, deleteInvoice, setDuplicate, clearDuplicate, getSingleInvoiceRequest, getSavedInvoiceQuery } from "Ducks/invoicetfes";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { invoiceStatus } from 'Constants/modelStatus';

class TfesInvoiceListView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    invoicePage() {
        this.props.clearDuplicate();                                                                                 //TODO for future function
        this.props.history.push(tfesInvoiceNewPage);
    }

    edit(id) {
        this.props.clearDuplicate();  
        this.props.history.push({ pathname: singleTfesInvoice(id) })
    }

    duplicate(id) {
        this.props.getSingleInvoiceRequest(id);
        this.props.history.push({ pathname: singleTfesInvoice(id) }, { isDuplicate: true })
    }

    handleSingleDelete(id) {
        this.props.deleteInvoice(id);
    }

    delete(id, partNumber) {
        this.props.show("alert_delete", {
            name: partNumber,
            action: () => this.handleSingleDelete(id),
        });
    }

    render() {
        const { data, count, loading } = this.props.InvoiceFiltered;
        const columns = [
            { name: "id", options: { display: "excluded", filter: false, sort: false } },
            { label: "Customer No", name: "custNo", options: { sort: false, filter: false } },
            { label: "Customer Name", name: "custName", options: { sort: false, filter: false } },
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
            { label: "Number", name: "invoiceNumber", options: { filter: false } },            
            { label: "Due date", name: "paymentTerm", options: {
                sort: false,
                filter: false,
                customBodyRender:(value, tableMeta)=>{
                    const date = new Date(tableMeta.rowData[3]);
                    
                    return(
                        // <div>{getDate(date.setDate(date.getDate() + (value ? value.days : 0)))}</div>
                        <div>{moment((date.setDate(date.getDate() + (value ? value.days : 0)))).format('DD/MM/YYYY')}</div>
                    )
                }
            } },
            { label: "SO Number", name: "soNumber", options: { filter: false } },
            {
                label: "Currency", name: "currency", options: {
                    filter: false,
                    display: false
                }
            },
            {
                label: "Balance", name: "balance", options: {
                    sort: false,
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <div>{`${value && value.toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</div>
                        )
                    }
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
                                        <div style={{ textAlign: "center" }}>{ value ? `${value.toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}</div>
                                    </div>
                                )
                            }
                            else {
                                return <div>{ value ? `${value.toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}</div>
                            }
                        }

                   
                    
                }}
            },
            { label: "Status", name: "status", options: {    
                    sort: false,
                    filter: true,
                    filterType: "checkbox",
                    filterOptions:{ 
                        names: Object.values(invoiceStatus)
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
                        //get status column
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
                }} > Invoice Management
            </div>
                <div className="rct-block">
                    <ServerRecordsList
                        title=" "
                        hasSearch={true}
                        columns={columns}
                        data={data}
                        totalCount={count}
                        otherOptions={options}
                        filterFunc={this.props.getFilterInvoiceRequest}
                        savedQuery={this.props.SavedQuery}
                        getSavedQuery={this.props.getSavedInvoiceQuery}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ invoiceState }) => {
    const { Invoices, InvoiceDetails, InvoiceFiltered, SavedQuery } = invoiceState;
    return { Invoices, InvoiceDetails, InvoiceFiltered, SavedQuery };
};
export default connect(mapStateToProps, { show, getInvoice, getFilterInvoiceRequest, deleteInvoice, setDuplicate, clearDuplicate, getSingleInvoiceRequest, getSavedInvoiceQuery })(TfesInvoiceListView);
