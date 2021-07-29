import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { show } from "redux-modal";
import ServerRecordsList from "Components/ServerRecordsList";

//icon

import editFilled from "@iconify/icons-ant-design/edit-filled";
import { supplierNewPage } from "Helpers/crmURL";
import { getSupplier, getFilterSupplier } from "Ducks/suppliertfes";


class SupplierList extends Component {
  componentDidMount() {
    // this.props.getFilterProduct();
  }
  productPage() {
    this.props.history.push(supplierNewPage);
    // location.reload();
  }

  render() {
    const { data, count }  = this.props.SupplierFiltered;
    let options = {};
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      { label: "Supp. ID", name: "suppId", options: { filter: false } },
      { label: "Supp. Name", name: "name", options: { filter: false } },
      { label: "Nickname", name: "nickname", options: { filter: false } },
      { label: "Supp PIC", name: "accPIC", options: { filter: false } },
      {
        label: "SuppPIC Number", name: "tel1a", options: { filter: false },
        customBodyRender: (value, tableMeta) => (
            <div>
              {`+${tableMeta.rowData[9]} ${value}`}
            </div>
        )
      },
      {
        name: "address",
        options: { filter: false, sort: false },
      },
      {
        name: "salesPIC",
        options: { filter: false, sort: false },
      },
      {
        name: "delAddress",
        options: { display: "excluded",
        filter: false, sort: false },
      },
      {
        name: "tel1b",
        options: { display: "excluded",
          filter: false, sort: false },
      },
    ];
    options.onRowClick = (rowData) => {
      this.props.getInfo(rowData[0]);
    };
    options.searchText = this.props.searchText;
    // Disable Icons
    // options.filter = false;
    // options.search = false;
    // options.viewColumns = false;

    return (
      <div className="rct-block">
        <ServerRecordsList  title="Supplier List" hasSearch={true} columns={columns} data={data} totalCount={count} otherOptions={options} filterFunc={this.props.getFilterSupplier}/>
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
export default connect(mapStateToProps, { getSupplier, getFilterSupplier })(SupplierList);
