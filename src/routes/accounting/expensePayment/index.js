import React, { Component } from "react";
import {connect} from "react-redux";
import { show } from "redux-modal";

// Component Imports
import { listOptions, getDateTime } from "Helpers/helpers";
import { supplierPaymentNewPage, singleSupplierPayment } from "Helpers/accountingURL";

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";

// Actions
import {getFilterSupplierPaymentRequest,deleteSupplierPayment} from "Ducks/supplier-payment"

class ExpensePaymentListView extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    paymentPage() {
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
            { label: "Supplier", name: "suppNo", options: { filter: false } },

            { label: "Payment date", name: "createdAt", options: {
                    filter: false,
                    customBodyRender:(value, tableMeta)=>{
                        return(
                            <div>{getDateTime(value)}</div>
                        )
                    }
                } },
            { label: "Payment ref", name: "paymentRef", options: { filter: false } },
            { label: "Payment method", name: "paymentMethod", options: { filter: false } },
            { label: "Status", name: "status", options: { filter: false } },                                            //6
            { label: "Total", name: "total", options: {
                    filter: false,
                    customBodyRender:(value, tableMeta)=>{
                        return(
                            <div>{value ? value.name : ''}</div>
                        )
                    }
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
                                    tableMeta.rowData[6] !== 'confirmed' ? (
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
                                    ) : (null)
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
                    }} >Expense Payment Management
                </div>
                <div className="rct-block">
                    <ServerRecordsList title=" " hasSearch={true} columns={columns} data={data} count={count} otherOptions={options}
                        filterFunc={this.props.getFilterSupplierPaymentRequest}
                    />
                </div>
            </div>
        )
    }

}

const mapStateToProps = ({ supplierPaymentState }) => {
    const { SupplierPaymentFiltered } = supplierPaymentState;
    return { SupplierPaymentFiltered };
};
export default connect(mapStateToProps, {
    show,
    getFilterSupplierPaymentRequest,
    deleteSupplierPayment,
    // getSinglePaymentRequest
})(ExpensePaymentListView);
