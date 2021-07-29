import React, { Component } from "react";
import api from 'Api';

import { Fragment } from "react";
import { Grid } from '@material-ui/core';
import { Table } from "reactstrap";
// components
import FormInput from "Components/Form/FormInput";
import { dateFormat } from 'Components/StandardFormat/DateFormat';
import InternalRemarks from './InternalRemarks';

// icon
// npm install --save-dev @iconify/react @iconify-icons/ri
import {connect} from "react-redux";
import { show } from "redux-modal";
import { getuser} from "Ducks/user"
import {getAllSaleTargets,getPerform} from "Ducks/general-setting/sale-target"
// import MomentLocaleUtils, {
//     formatDate,
//     parseDate,
//   } from 'react-day-picker/moment';

class DashboardManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            salesOrderData: [],
            purchaseOrderData: []
        }
    }
    
    componentDidMount() {
        // console.log('po',this.props.User)
        this.props.getuser();
        this.props.getAllSaleTargets();
        this.props.getPerform();

        // this.setState({})
    }

    componentDidUpdate(prevProps) {
        // have to render after send the thing over 
        if (prevProps.salesOrderData !== this.props.salesOrderData) {
            this.setState({ salesOrderData: this.props.salesOrderData });
        }

        if (prevProps.purchaseOrderData !== this.props.purchaseOrderData) {
            this.setState({ purchaseOrderData: this.props.purchaseOrderData })
        }
    }

    handleChange = (field, value, index) => {


        // console.log(field, value, index)

        if (field === "salesOrderData") {
            let salesOrderData = [...this.state.salesOrderData];
            salesOrderData[index].internalRemarks = value;
            this.setState({ salesOrderData: salesOrderData});
        }

        if (field === "purchaseOrderData") {
            let purchaseOrderData = [...this.state.purchaseOrderData]
            purchaseOrderData[index].internalRemarks = value;
            this.setState({ purchaseOrderData : purchaseOrderData})
        }

        // debugger

    }
    editRemarkHandler = (id, internalRemarks, type) => {

        let patchBody = {
            id: id,
            internalRemarks: internalRemarks
        }

        if (type === "salesOrderData") {
            this.props.patchSingleSalesRequestInternalRemarks(patchBody)
        }

        if (type === "purchaseOrderData") {
            this.props.patchSinglePurchaseRequestInternalRemarks(patchBody)
        }
    }
    
    render() {
        const { tableData } = this.props.User;
        const {data}=this.props.saleTarget;
        return (
            <Grid className="dashboardGrid_top_container" container spacing={2} >

                <Grid item sm={9} >
                    <h3>Open Order</h3>
                    <div className="leftGrid_container" >
                        <Table size="sm">
                            <thead>
                                <tr style={{}}>
                                    <th style={{width: "10%" }}><h4>Entry Date</h4></th>
                                    <th style={{width: "10%" }}><h4>SO #</h4></th>
                                    <th style={{width: "10%" }}><h4>Cust PO #</h4></th>
                                    <th style={{width: "30%" }}><h4>Customers</h4></th>
                                    <th style={{width: "10%" }}><h4>Status</h4></th>
                                    <th style={{width: "30%" }}><h4>Internal Remarks</h4></th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.salesOrderData.map((items, index)=>{
                                    
                                        return(
                                            <tr key={items.id}>
                                            <td><h4>{dateFormat("DD/MM/YYYY", new Date(items.createdAt))}</h4></td>
                                            {/* <td><h4>{formatDate( new Date(items.createdDate))}</h4></td> */}
                                            <td><h4>{items.soNumber}</h4></td>
                                            <td><h4>{items.custNo}</h4></td>
                                            <td><h4>{items.custName}</h4></td>
                                            <td><h4>{items.status}</h4></td>
                                            <td> 
                                                {/* <FormInput 
                                                    target="salesOrderData"
                                                    keys={index}
                                                    value={items.internalRemarks ? items.internalRemarks: ""}
                                                    handleChange={this.handleChange}
                                                    onBlur={(e) => this.editRemarkHandler(items.id, e.target.value, "salesOrderData")} 
                                                /> */}
                                                <InternalRemarks 
                                                    target="salesOrderData"
                                                    keys={index}
                                                    value={items.internalRemarks ? items.internalRemarks: ""}
                                                    handleChange={this.handleChange}
                                                    onBlur={(e) => this.editRemarkHandler(items.id, e.target.value, "salesOrderData")}
                                                    originalVal={items.internalRemarks ? items.internalRemarks: ""} 
                                                />
                                            </td>
                                        </tr>
                                    )                            
                                }) }  
                            </tbody>
                        </Table>
                       
                    </div>
                </Grid>
                 <Grid item sm={3} >
                    <h3>Performance</h3>
                    <div className="middleGrid_container" style={{padding:"0" }}>
                        <Table size="sm">
                            <thead>
                            <tr >
                                <th style={{ width: "50%" }}><h4></h4></th>
                                <th style={{ width: "50%"}}><h4 style={{ textAlign: "center"}}>SGD</h4></th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr style={{ width: "25%" ,height:"15px" }}></tr>
                                
                                    <tr>
                                    <td><h4>{'FY TARGET'}</h4></td>
                                    <td><h5  style={{ textAlign: "right",paddingRight:"5px" }}>{data.fy_target}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{''}</h4></td>
                                    <td><h5>{''}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{'BACK ORDER'}</h4></td>
                                    <td><h5>{data.back_order}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{'YTD SALES'}</h4></td>
                                    <td><h5>{data.ytd_sale}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{'YTD QUOTE'}</h4></td>
                                    <td><h5>{data.ytd_quote}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{'YTD ORDER'}</h4></td>
                                    <td><h5>{data.ytd_order}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{''}</h4></td>
                                    <td><h5>{''}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{'MTD SALES'}</h4></td>
                                    <td><h5>{data.mtd_sale}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{'MTD QUOTE'}</h4></td>
                                    <td><h5>{data.mtd_quote}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{'MTD ORDER'}</h4></td>
                                    <td><h5>{data.mtd_order}</h5></td>
                                    </tr>
                                    <tr>
                                    <td><h4>{'MTD ORDER TGT'}</h4></td>
                                    <td><h5>{data.mtd_target}</h5></td>
                                    </tr>
                            </tbody>
                        </Table>

                    </div>
                </Grid> 
                
                <Grid item sm={9} >
                    <h3>Open Purchase</h3>
                    <div className="leftGrid_container" 
                    >
                        <Table size="sm">
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}><h4>Order Date</h4></th>
                                    <th style={{ width: "10%" }}><h4>PO #</h4></th>
                                    <th style={{ width: "10%" }}><h4>ETA</h4></th>
                                    <th style={{ width: "30%" }}><h4>Supplier</h4></th>
                                    <th style={{ width: "10%" }}><h4>Status</h4></th>
                                    <th style={{ width: "10%" }}><h4>Remarks</h4></th>
                                    <th style={{ width: "20%" }}><h4>Internal Remarks</h4></th>
                                </tr>
                            </thead>

                            <tbody>
                          {this.state.purchaseOrderData.map((items, index)=>{
                             
                                return(
                                   <tr key={items.id}>
                                   <td><h4>{dateFormat("DD/MM/YYYY", new Date(items.createdAt))}</h4></td>
                                   {/* <td><h4>{formatDate( new Date(items.createdAt))}</h4></td> */}
                                   <td><h4>{items.poNumber}</h4></td>
                                   <td><h4>{dateFormat("DD/MM/YYYY", new Date(items.delDate))}</h4></td>
                                   <td><h4>{items.name}</h4></td>
                                   <td><h4>{items.status}</h4></td>
                                   <td><h4>{items.remarks}</h4></td>
                                   <td>
                                       {/* <FormInput 
                                            target="purchaseOrderData"
                                            keys={index}
                                            value={items.internalRemarks ? items.internalRemarks: ""}
                                            handleChange={this.handleChange}
                                            onBlur={(e) => this.editRemarkHandler(items.id, e.target.value, "purchaseOrderData")} 
                                       /> */}

                                        <InternalRemarks 
                                            target="purchaseOrderData"
                                            keys={index}
                                            value={items.internalRemarks ? items.internalRemarks: ""}
                                            handleChange={this.handleChange}
                                            onBlur={(e) => this.editRemarkHandler(items.id, e.target.value, "purchaseOrderData")} 
                                            originalVal={items.internalRemarks ? items.internalRemarks: ""}
                                        />
                                    </td>
                               </tr>
                             )    
                             
                            }) }  
                            </tbody>
                        </Table>
                    </div>
                </Grid>
                <Grid item sm={3} >
                    <h3>Movement</h3>
                    <div className="middleGrid_container" style={{padding:"0" }}>
                        <Table size="sm">
                            <thead>
                            <tr >
                                <th style={{ width: "60%"}}><h4>Name</h4></th>
                                <th style={{ width: "40%" }}><h4>Status</h4></th>
                                
                            </tr>
                            </thead>

                            <tbody>
                            {tableData.data&&tableData.data.map(items=>{
                                return(
                                    <tr key={items.id}>
                                        <td><h4>{items.firstName+''+items.lastName}</h4></td>
                                        <td><h4>{items.movement}</h4></td>
                                        </tr>
                                )
                            })}
                            </tbody>
                               
                        </Table>

                    </div>
                </Grid> 
            </Grid>
        );
    }




}
const mapStateToProps = ({ userState,generalState }) => {
    const { User } = userState;
    const { SaleTargetsState } = generalState;
    const { saleTargetsAll,saleTarget } = SaleTargetsState;
    return { User, saleTargetsAll, saleTarget}
 } 
 export default connect(mapStateToProps, {
    show,
    getuser,
    getAllSaleTargets,
    getPerform,
})(DashboardManagement);