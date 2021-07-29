import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { show } from "redux-modal";
import ServerRecordsList from "Components/ServerRecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import Button from "@material-ui/core/Button";

import { purchaseNewPage } from "Helpers/crmURL";
//icon
import editFilled from "@iconify/icons-ant-design/edit-filled";
// Redux
import { getSupplier, getFilterSupplier } from "Ducks/suppliertfes";
const options = Object.assign({}, listOptions);

class PurchaseList extends Component {
  componentDidMount() {
    // this.props.getFilterProduct();
  }
  productPage() {
    this.props.history.push({ pathname: purchaseNewPage, state: {redirectModal: false} });
    // location.reload();
  }

  render() {
    const { data, count }  = this.props.SupplierFiltered.data;
    let options = {};
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      { label: "PO Number", name: "poNumber", options: { filter: false } },
      { label: "Purchase Type", name: "purchaseType", options: { filter: false } },
      { label: "Date", name: "createdDate", options: { filter: false } },
      { label: "Supp. Name", name: "name", options: { filter: false } },
      { label: "Supp. Number", name: "suppNo", options: { filter: false } },
      
      {
        name: "address",
        options: { filter: false, sort: false },
      },           
      {
        name: "salesPic",
        options: { filter: false, sort: false },
      },      
      {
        name: "delAddress",        
        options: { display: "excluded", filter: false, sort: false },
      },
    ];

    options.onRowClick = (rowData) => {
      this.props.getInfo(rowData[0]);
    }
    
    // Disable Icons
    options.filter = false;
    options.search = false;
    options.viewColumns = false;
    
    return (
      <div className="rct-block">
        <ServerRecordsList  title="Purchase List" hasSearch={true}columns={columns} data={data} totalCount={count} otherOptions={options} filterFunc={this.props.getFilterSupplier}/>
      </div>
    );
  }
}

const mapStateToProps = ({ suppliertfesState }) => {
  const { Suppliers } = suppliertfesState;
  const { SupplierDetails } = suppliertfesState;
  const { SupplierFiltered } = suppliertfesState;
  return { Suppliers, SupplierDetails, SupplierFiltered };
};
export default connect(mapStateToProps, { getSupplier, getFilterSupplier })(PurchaseList);
