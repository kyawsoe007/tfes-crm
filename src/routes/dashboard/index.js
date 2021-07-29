import React, { Component } from "react";
import { Fragment } from "react";
// components
import DashboardContent from "./components/DashboardContent"
import DashboardManagement from "./components/DashboardManagement"
import DashboardRates from "./components/DashboardRates"

// redux
import { connect } from 'react-redux';
import { show } from 'redux-modal';
import {  getFilterSalesOrderRequest, patchSingleSalesRequestInternalRemarks } from "Ducks/salesordertfes";
import {  getFilterPurchase, patchSinglePurchaseRequestInternalRemarks } from "Ducks/purchasetfes";
import { saleStatus, purchaseStatus } from 'Constants/modelStatus';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }

componentDidMount(){
       
    this.props.getFilterSalesOrderRequest(0, 0, [{status: [saleStatus.OPEN, saleStatus.PARTIAL] }]);
    this.props.getFilterPurchase(0, 0, [{status: [purchaseStatus.OPEN, purchaseStatus.PARTIAL] }]);

}

  render() {
    const salesOrderData = this.props.SalesOrderFiltered
    const purchaseOrderData = this.props.PurchaseFiltered
    console.log(salesOrderData)
    
    return (
      <Fragment>
        <DashboardRates/>
        <DashboardManagement 
          salesOrderData={salesOrderData.data}
          purchaseOrderData={purchaseOrderData.data}
          patchSinglePurchaseRequestInternalRemarks={this.props.patchSinglePurchaseRequestInternalRemarks}
          patchSingleSalesRequestInternalRemarks={this.props.patchSingleSalesRequestInternalRemarks}
        />
        {/* <DashboardContent /> */}
      </Fragment> 
     
    )
  }


}

const mapStateToProps=({salesorderState ,purchasetfesState})=>{
  const {SalesOrderFiltered}=salesorderState;
  const {PurchaseFiltered}=purchasetfesState;

  return{ SalesOrderFiltered,PurchaseFiltered };
}
export default connect(mapStateToProps,{
  show,
  getFilterSalesOrderRequest, 
  getFilterPurchase,
  patchSinglePurchaseRequestInternalRemarks,
  patchSingleSalesRequestInternalRemarks
} )(Dashboard) 
