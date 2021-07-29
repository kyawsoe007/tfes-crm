import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { show } from "redux-modal";

import ServerRecordsList from "Components/ServerRecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";

import Button from "@material-ui/core/Button";
import Image from "Components/Image";
import RctSectionLoader from "Components/RctSectionLoader";
//icon
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import baselineDeleteForever from "@iconify/icons-ic/baseline-delete-forever";
import editFilled from "@iconify/icons-ant-design/edit-filled";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

// Redux Imports
import addFilled from "@iconify/icons-carbon/add-filled";
import { supplierNewPage, singlesupplier } from "Helpers/crmURL";
import { getSupplier, getFilterSupplier, deleteSupplier, setDuplicate, clearDuplicate } from "Ducks/suppliertfes";

const options = Object.assign({}, listOptions);

class CrmSupplierList extends Component {

  componentDidMount() {
    //this.props.getFilterSupplier();
  }

  productPage() {
    this.props.history.push(supplierNewPage);
  }

  render() {
    const { data, count } = this.props.SupplierFiltered;
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      { label: "Supp. ID", name: "suppId", options: { filter: false } },
      { label: "Supp. Name", name: "name", options: { filter: false } },
      { label: "Nickname", name: "nickname", options: { filter: false } },
      { label: "Supp PIC", name: "suppPic", options: { filter: false } },
      { label: "SuppPIC Number", name: "suppPicNumber", options: { filter: false } },
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
          this.props.getInfo(rowData[0])
      }
      options.searchText = this.props.searchText;
    return (
      <div className="rct-block">
         <ServerRecordsList title=" " hasSearch={true} columns={columns} data={data} totalCount={count} otherOptions={options} 
        filterFunc={this.props.getFilterSupplier}  
        />
        {/* {loading && <RctSectionLoader />} */}
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
export default connect(mapStateToProps, {
  show,
  getSupplier,
  getFilterSupplier,
  deleteSupplier,
  setDuplicate,
  clearDuplicate,
})(CrmSupplierList);
