import React, { Component } from "react";
import {connect} from "react-redux";
import { show } from "redux-modal";
import moment from "moment";

// Component Imports
import { listOptions, getDateTime } from "Helpers/helpers";
import { supplierPaymentNewPage, singleSupplierPayment } from "Helpers/accountingURL";

// Icon Imports
import { FormGroup, FormLabel, FormControl, ListItemText, TextField, Checkbox, Select, InputLabel, MenuItem, IconButton } from '@material-ui/core';
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";

// Actions
import {getFilterSupplierPaymentRequest,deleteSupplierPayment, clearDuplicate, getSavedSupplierPaymentQuery} from "Ducks/supplier-payment"

class SupplierPaymentListView extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    paymentPage() {
        this.props.clearDuplicate();
        this.props.history.push(supplierPaymentNewPage);
    }

    edit(id) {
        this.props.history.push({ pathname: singleSupplierPayment(id) })
    }

    delete(id, paymentNumber) {
        this.props.show("alert_delete", {
            name: paymentNumber,
            action: () => this.handleSingleDelete(id),
        });
    }

    handleSingleDelete(id) {
        this.props.deleteSupplierPayment(id);
    }

    eyeView(id) {
        // this.props.getSingleInvoiceRequest(id);
        // this.props.history.push({ pathname: singleTfesInvoice(id) }, { isDuplicate: true })
    }

    render() {
        const { data, count, loading } = this.props.SupplierPaymentFiltered;

        const columns = [
            { name: "id",  options: { display: "excluded", filter: false, sort: false }},
            { label: "Payment No", name: "paymentNo", options: { filter: false } },            
            { label: "Supplier", name: "suppName", options: { sort: false, filter: false } },

            { label: "Payment date", name: "paymentDate", options: {
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
            { label: "Payment ref", name: "paymentRef", options: { sort: false, filter: false } },
            { label: "Payment method", name: "paymentMethod", options: { sort: false, filter: false,
                customBodyRender: value => {
                    return(
                        <div>{value ? value.name : ''}</div>
                    )
                }
            } },
                                                       //6
            { label: "Total", name: "total", options: {
                    filter: false,
                    customBodyRender:(value, tableMeta)=>{
                        return(
                            <div style={{textAlign: "center" ,display:"flex",flexDirection:"row"}}>
                                <div style={{textAlign: "center"}}>{`${value.toLocaleString("en-SG", {style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2})}`}</div>
                            </div>       
                        )    
                }
             } },
             { label: "Status", name: "status", options: { 
                    sort: false,
                    filter: true,
                    filterType: 'checkbox',
                    filterOptions: ['draft', 'closed'],
                    customFilterListOptions:{
                        render: (v) => `Status: ${v}`
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
                                    tableMeta.rowData[7] == 'draft' && 
                                        <IconButton
                                            size="small" className="tableDeleteIcon"
                                            onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[2]) }}

                                        >
                                            <Icon
                                                icon={baselineDeleteForever}
                                                color="#595959"
                                                width="1.5rem"
                                                height="1.5rem"
                                            />
                                        </IconButton>
                                    
                                }
                                {/*<IconButton*/}
                                {/*    size="small" className="tableCloneIcon" onClick={() => { this.eyeView(tableMeta.rowData[0]) }}>*/}
                                {/*    <VisibilityIcon*/}
                                {/*        color="#595959"*/}
                                {/*        width="1.5rem"*/}
                                {/*        height="1.5rem"*/}
                                {/*    />*/}
                                {/*</IconButton>*/}

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
                <IconButton size="small" onClick={() => this.paymentPage()}>
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
                    }} >AP Payments
                </div>
                <div className="rct-block">
                    <ServerRecordsList 
                    title=" " 
                    hasSearch={true} 
                    columns={columns} 
                    data={data} 
                    totalCount={count} 
                    otherOptions={options}
                        filterFunc={this.props.getFilterSupplierPaymentRequest}
                        savedQuery={this.props.SavedQuery}
                        getSavedQuery={this.props.getSavedSupplierPaymentQuery}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ supplierPaymentState }) => {
    const { SupplierPaymentFiltered, SavedQuery } = supplierPaymentState;
    return { SupplierPaymentFiltered, SavedQuery };
};
export default connect(mapStateToProps, {
    show,
    getFilterSupplierPaymentRequest,
    deleteSupplierPayment,
    clearDuplicate,
    getSavedSupplierPaymentQuery
    // getSinglePaymentRequest
})(SupplierPaymentListView);
