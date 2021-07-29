
import React, { Component } from "react";
import moment from "moment";
// Sub components
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { show } from "redux-modal";
import ServerRecordsList from 'Components/ServerRecordsList'
import InternalRemarks from '../../dashboard/components/InternalRemarks';
import RecordsList from "Components/RecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import { FormLabel, FormGroup, TextField } from '@material-ui/core';
import {dateFormat } from 'Components/StandardFormat/DateFormat';
import NumberFormat from 'react-number-format';
import { amountRounding } from "Helpers/helpers";

//icon
import { IconButton } from "@material-ui/core";
import { Icon } from '@iconify/react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { saleStatus, workorderStatus, deliveryStatus } from 'Constants/modelStatus';
import ReceiptSharpIcon from '@material-ui/icons/ReceiptSharp';

// Actions
import addFilled from '@iconify/icons-carbon/add-filled';
import { salesOrderNewPage, singlesalesorder } from "Helpers/crmURL";
import { getFilterProduct } from "Ducks/producttfes";
import { deleteSalesOrder, setDuplicate, clearDuplicate, getFilterSalesOrderRequest, getSingleSkuSalesOrderRequest, getSavedSalesQuery ,patchSingleSalesRequestInternalRemarks } from "Ducks/salesordertfes";


const options = Object.assign({}, listOptions);
class crm_salesOrder_list extends Component {
    constructor(props) {
        super(props);

        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this);
        this.duplicate = this.duplicate.bind(this);
        this.view = this.view.bind(this)

        this.state = {
            salesOrderData:[]
    }
}
    // Edit comes here
    edit(id) {
        this.props.history.push({ pathname: singlesalesorder(id), state: { view: false } })
    }
    view(id) {
        this.props.history.push({ pathname: singlesalesorder(id), state: { view: true } })
    }

    delete(id, partNumber) {
        this.props.show("alert_delete", {
            name: partNumber,
            action: () => this.handleSingleDelete(id),
        });
    }
    duplicate(id) {
        // this.props.setDuplicate(data);
        // this.props.history.push(salesOrderNewPage);
        this.props.getSingleSkuSalesOrderRequest(id)
        this.props.history.push(salesOrderNewPage, { isDuplicate: true , view: false })
        // this.props.history.push({ pathname: salesOrderNewPage(id), state: { isDuplicate: true } })
    }

    productPage() {
        this.props.clearDuplicate();
        this.props.history.push({ pathname: salesOrderNewPage, state: { view: false } })
    }

    handleSingleDelete(skuId) {
        this.props.deleteSalesOrder(skuId);
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps) {
        let data = this.props.SalesOrderFiltered.data
        if(prevProps.SalesOrderFiltered){
            if (prevProps.SalesOrderFiltered !== this.props.SalesOrderFiltered) {
            this.setState({ salesOrderData: this.props.SalesOrderFiltered.data });
        }}
        
    }
    handleChange = (field, value, index) => {
        if (field === "internalRemarks") {
            let salesOrderData = [...this.state.salesOrderData];
            salesOrderData[index].internalRemarks = value;
            this.setState({ salesOrderData: salesOrderData});
        }
        
    }
    editRemarkHandler = (id, internalRemarks) => {
        let patchBody = {
            id: id,
            internalRemarks: internalRemarks
        }
        this.props.patchSingleSalesRequestInternalRemarks(patchBody)
    }

    render() {
        const tableData = this.props.SalesOrderFiltered;
        const columns = [
            {
                name: "id",
                options: { display: "excluded", filter: false, sort: false }
            },
            {
                name: "subsalesOrder",
                options: { display: "excluded", filter: false, sort: false }
            },
            { label: "Sales Order #", name: "soNumber", options: { filter: false } },
            { label: 'Version No', name: 'versionNum', options: { filter: false, sort: false } },
            {
                label: 'Date', name: 'updatedAt',
                options: {
                    filter: true,
                    customBodyRender: (value) => (
                        <div>{moment(value).format('DD/MM/YYYY')}</div>
                    ),
                    filterType: 'custom',
                    filterList: [],
                    customFilterListRender: filterList => {
                        let returnString = "Date ";
                        let dateArr = filterList[0].split("-");
                        returnString += dateArr[2]+"/"+dateArr[1]+"/"+dateArr[0];
                        if(filterList[1]){
                            dateArr = filterList[1].split("-");
                            returnString += " - "+dateArr[2]+"/"+dateArr[1]+"/"+dateArr[0];
                        }
                        //returnString += dateFormat("DD/MM/YYYY", filterList[0])
                        return returnString;
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
                }


            },
            { label: "Customer Name", name: "custName", options: { filter: false, sort: false } },
            { label: 'Currency', name: 'currency', options: { display: 'excluded', filter: false, sort: false } },
            {
                label: 'Amount',
                name: 'total',
                options: {
                  filter: false,
                  sort: false,
                  customBodyRender: (value,tableMeta) => {
                    let totalIndex = columns.findIndex(items => items.name === "grandTotalAmt")
                    let totalAmount = amountRounding(2,tableMeta.rowData[totalIndex])
                    let currencyIndex = columns.findIndex(items => items.name === "currency")
                    let currencySymbol = tableMeta.rowData[currencyIndex] ? tableMeta.rowData[currencyIndex].symbol : ''
                    return <div >
                      <span>{currencySymbol && currencySymbol} </span>
                      <NumberFormat value={totalAmount} displayType={'text'} thousandSeparator={true}/>
                    </div>
                  },
                },
              },
            {
                label: 'Amount', name: 'grandTotalAmt', options: {
                    display: 'excluded',
                    filter: true,
                    filterType: 'custom',
                    filterList: [],
                    customFilterListRender: filterList => `Amount $${filterList[0]} - $${filterList[1]} `,
                    filterOptions: {
                        display: (filterList, onChange, index, column) => (
                            <div className="amount_filter">
                                <FormLabel>Amount</FormLabel>
                                <FormGroup row>
                                    <TextField
                                        label='min'
                                        type="number"
                                        value={filterList[index][0] ? filterList[index][0] : ''}
                                        onChange={event => {
                                            filterList[index][0] = event.target.value;
                                            onChange(filterList[index], index, column);
                                        }}
                                        style={{ width: '45%', marginRight: '10%' }}
                                    />
                                    <TextField
                                        label='max'
                                        type="number"
                                        value={filterList[index][1] || ''}
                                        onChange={event => {
                                            filterList[index][1] = event.target.value;
                                            onChange(filterList[index], index, column);
                                        }}
                                        style={{ width: '45%' }}
                                    />
                                </FormGroup>
                            </div>
                        ),
                    },
                    customBodyRender: (value, tableMeta) => {
                        let currencyIndex = columns.findIndex(x => x.name === "currency");
                        // tableMeta.rowData[currencyIndex]
                        return `$${value}`
                    }

                }
            },
            {
                label: "Status",
                name: "status",
                options: {
                    sort: false,
                    filter: true,       
                    filterType: "checkbox",
                    filterOptions:  { names: Object.values(saleStatus)},
                    // filterList: [saleStatus.DRAFT, saleStatus.OPEN, saleStatus.INVOICED, saleStatus.DELIVERED],                   
                    customFilterListOptions:{
                    render: (v) => `Status: ${v}`
                    },
                    customBodyRender: (value, tableMeta) => {
                        return value;
                    }
                }
            },
            {
                label: "W.O Status",
                name: "woStatus",
                options: {
                    sort: false,
                    filter: true,       
                    filterType: "checkbox",
                    filterOptions:  { names: Object.values(workorderStatus)},
                    // filterList: [saleStatus.DRAFT, saleStatus.OPEN, saleStatus.INVOICED, saleStatus.DELIVERED],                   
                    customFilterListOptions:{
                    render: (v) => `WO Status: ${v}`
                    },
                    customBodyRender: (value, tableMeta) => {
                        return value;
                    }
                }
            },
            {
                label: "D.O Status",
                name: "doStatus",
                options: {
                    sort: false,
                    filter: true,       
                    filterType: "checkbox",
                    filterOptions:  { names: Object.values(deliveryStatus)},
                    // filterList: [saleStatus.DRAFT, saleStatus.OPEN, saleStatus.INVOICED, saleStatus.DELIVERED],                   
                    customFilterListOptions:{
                    render: (v) => `DO Status: ${v}`
                    },
                    customBodyRender: (value, tableMeta) => {
                        return value;
                    }
                }
            },
            { label: 'Version List', name: 'oldVersionList', options: { filter: false, display: false } },
            {
                label: 'salesPic',
                name: 'salesPic',
                options: {
                    display: 'excluded',
                    filter: false,
                    
                },
            },
            {
                label: 'Invoice Status', name: 'invoiceStatus', options: {
                    display: 'excluded',
                    filter: false,
                    
                }
            },
            {
                label: 'Purchase Status', name: 'poStatus', options: {
                    display: 'excluded',
                    filter: false,
                    filterOptions: {
                        names: ['none', 'sent', 'received'],
                    },
                    filterType: "checkbox"
                }
            },
            {
                label: 'Internal Remarks', name: 'internalRemarks', options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value,tableMeta) => {
                        let index = tableMeta.rowIndex
                        let item = tableMeta.rowData
                        let indexRemarks = tableMeta.rowData.columnIndex
                        let salesOrderData =this.state.salesOrderData
                        if(salesOrderData.length > 0 )
                        {
                            let rowData =  salesOrderData[index]
                            console.log("item",rowData)
                            return (
                                <InternalRemarks 
                                    target="internalRemarks"
                                    keys={index}
                                    // value={rowData.internalRemarks ? rowData.internalRemarks: ""}
                                    value={rowData && rowData.internalRemarks ? rowData.internalRemarks: ""}
                                    handleChange={this.handleChange}
                                    onBlur={(e) => this.editRemarkHandler(rowData.id, e.target.value)}
                                    originalVal={rowData && rowData.internalRemarks ? rowData.internalRemarks: ""} 
                                    // originalVal={rowData.internalRemarks ? rowData.internalRemarks: ""} 
                                /> 
                            )
                        }
                    }
                }
            },
            {
                label: "Action",
                name: "action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        let stateIndex = columns.findIndex(x => x.name == "status")
                        let data = tableMeta.rowData
                        let boolean = false
                        if (data[stateIndex] == 'open' || data[stateIndex] == 'draft' || data[stateIndex] == 'partial invoiced') {
                            boolean = true
                        }
                        else{
                            boolean = false
                        }

                        return (
                            <div>
                                {!boolean &&<IconButton
                                    size="small"
                                    onClick={() => { this.view(tableMeta.rowData[0]) }}>
                                    <VisibilityIcon
                                    color="#595959"
                                    width="1.5rem"
                                    height="1.5rem"
                                    />
                                </IconButton> }
                                { boolean &&  <IconButton size="small" onClick={() => { this.edit(tableMeta.rowData[0]) }}>
                                    <Icon
                                        className="tableEditIcon"
                                        icon={editFilled}
                                        color="#595959"
                                        width="1.5rem"
                                        height="1.5rem"
                                    />
                                </IconButton>}
                               
                                {boolean && <IconButton
                                    size="small" className="tableDeleteIcon" onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[1]) }}>
                                    <Icon
                                        icon={baselineDeleteForever}
                                        color="#595959"
                                        width="1.5rem"
                                        height="1.5rem"
                                    />
                                </IconButton>}
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
            if (this.props.SavedQuery.saved){
              columns[i].options.filterList = this.props.SavedQuery.filterList[i];
            } else{
                // sets default filter list for status on first load 
                if (columns[i].name === 'status') {
                    columns[i].options.filterList = [saleStatus.DRAFT, saleStatus.OPEN, saleStatus.INVOICED, saleStatus.DELIVERED];
                } else {
                    columns[i].options.filterList = []
                }
            }

            // FOR COLUMNS
            if(this.props.SavedQuery.display){
                columns[i].options.display = this.props.SavedQuery.display[i];
            }
          }

        let options = {}
        options.expandableRows = true;
        options.renderExpandableRow = (rowData, rowMeta) => {
            const versionIndex = columns.findIndex(x => x.name === "oldVersionList")
            if (rowData[versionIndex]) {
                return rowData[versionIndex].map((item) => (
                    <tr className="CRM-sub-table">
                        <td></td>
                        <td>
                            {item.soNumber}
                        </td>
                        <td>
                            {item.versionNum}
                        </td>
                        <td>
                            {item.createdAt}
                        </td>
                        <td>
                            {item.custName}
                        </td>
                        <td>
                            {item.currency}
                        </td>
                        <td>
                            {item.total}
                        </td>
                        <td>
                            {item.status}
                        </td>
                        <td>
                            {item.remarks}
                        </td>
                        <td>
                            <IconButton
                                size="small"
                                onClick={() => { this.view(item.id) }}>
                                <VisibilityIcon
                                    color="#595959"
                                    width="1.5rem"
                                    height="1.5rem"
                                />
                            </IconButton>
                            <IconButton
                                size="small" className="tableCloneIcon" onClick={() => { this.duplicate(item.id) }}>
                                <FileCopyOutlinedIcon
                                    style={{
                                        color: "#595959",
                                        width: "1.5rem",
                                        height: "1.5rem"
                                    }}
                                />
                            </IconButton>
                        </td>
                    </tr>
                ))
            } else {
                return ""
            }

        }
        options.customToolbar = () => {
            return (
                <IconButton size="small"
                    onClick={() => this.productPage()}
                >
                    <Icon
                        className="tableEditIcon"
                        icon={addFilled}
                        // color="#12394C"
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
                  }} > Sales Order
                </div>
               <div className="rct-block">
                {/* <RecordsList columns={columns} data={tableData} options={options} /> */}
                <ServerRecordsList
                    title=""
                    hasSearch={true}
                    columns={columns}
                    data={tableData.data}
                    totalCount={tableData.count}
                    otherOptions={options}
                    filterFunc={this.props.getFilterSalesOrderRequest}
                    duplicate={this.duplicate}
                    savedQuery={this.props.SavedQuery}
                    getSavedQuery={this.props.getSavedSalesQuery}
                />
            </div>
            </div>

        )

    }
}

const mapStateToProps = ({ salesorderState }) => { // salesorderState producttfesState
    const { SalesOrders } = salesorderState;
    const { SalesOrderDetails } = salesorderState;
    const { SalesOrderFiltered } = salesorderState;
    const { SavedQuery } = salesorderState;
    return { SalesOrders, SalesOrderDetails, SalesOrderFiltered, SavedQuery };
};
export default connect(mapStateToProps, { 
    show, 
    getFilterProduct, 
    deleteSalesOrder, 
    setDuplicate, 
    clearDuplicate, 
    getFilterSalesOrderRequest, 
    getSingleSkuSalesOrderRequest,
    getSavedSalesQuery,
    patchSingleSalesRequestInternalRemarks
})(crm_salesOrder_list);









