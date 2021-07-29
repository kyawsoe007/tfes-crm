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
import { getSupplier, getFilterSupplier, deleteSupplier, setDuplicate, clearDuplicate, getSavedSupplierMainQuery } from "Ducks/suppliertfes";

const options = Object.assign({}, listOptions);

class crm_supplier_list extends Component {
  constructor(props) {
    super(props);
    this.handleSingleDelete = this.handleSingleDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.duplicate = this.duplicate.bind(this);
  }

  componentDidMount() {
    //this.props.getFilterSupplier();
  }

  productPage() {
    this.props.clearDuplicate();
    this.props.history.push(supplierNewPage);
  }
  // Push Edit/Update Page
  edit(id) {
    this.props.history.push(singlesupplier(id));
  }

  // Push Edit/Update Page
  clone(id) {
    // this.props.history.push(singlesupplier(id));
    this.props.history.push(supplierNewPage, { isDuplicate: true, view: false })
  }

  // Delete row
  delete(id, partNumber) {
    this.props.show("alert_delete", {
      name: id,
      action: () => this.handleSingleDelete(id),
    });
  }

  handleSingleDelete(skuId) {
    console.log("inside handlesingledelete");
    console.log(skuId);
    this.props.deleteSupplier(skuId);
  }

  duplicate(rowNum) {
    let data = { ...this.props.SupplierFiltered.data[rowNum] };
    delete data.suppId;
    this.props.setDuplicate(data);
    this.props.history.push({ pathname: supplierNewPage, state: { isDuplicate: true } });
  }

  render() {
    const { data, count } = this.props.SupplierFiltered;
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      { label: "Supp. ID", name: "suppId", options: { filter: false } },
      { label: "Supp. Name", name: "name", options: { filter: false, sort: false } },
      { label: "Nickname", name: "nickname", options: { filter: false, sort: false } },
      { label: "Supp PIC", name: "salesPIC", options: { filter: false, sort: false } },
      { label: "SuppPIC Number", name: "salesPICMobile1a", options: { display: "excluded", filter: false, } },
      { label: "SuppPIC Number", name: "salesPICMobile1b", options: { display: "excluded", filter: false, } },
      {
        label: "SuppPIC Number", name: "salesPICMobile1b", options: {
          sort: false,
          filter: false,
          customBodyRender: (value, tableMeta) => {
            let number1aIndex = columns.findIndex(x => x.name == "salesPICMobile1a")
            let number1bIndex = columns.findIndex(x => x.name == "salesPICMobile1b")
            // console.log("customBodyRender",this.props.SupplierFiltered[1])

            // console.log("ersrwser", tableMeta)
            return (
              <div>
                {`${typeof tableMeta.rowData[number1aIndex] === "undefined" ? "" : tableMeta.rowData[number1aIndex]} ${tableMeta.rowData[number1bIndex]}`}
              </div>
            )
          }
        }
      },
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
      {
        label: "Action",
        name: "action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <div>
                <IconButton
                  size="small"
                  onClick={() => {
                    this.edit(tableMeta.rowData[0]);
                  }}
                >
                  <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                </IconButton>
                <IconButton
                  size="small"
                  className="tableDeleteIcon"
                  onClick={() => {
                    this.delete(tableMeta.rowData[0], tableMeta.rowData[1]);
                  }}
                >
                  <Icon icon={baselineDeleteForever} color="#595959" width="1.5rem" height="1.5rem" />
                </IconButton>

                <IconButton size="small" className="tableCloneIcon">
                  <FileCopyOutlinedIcon
                    onClick={() => {
                      this.duplicate(tableMeta.rowIndex);
                    }}
                    style={{
                      color: "#595959",
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                  />
                </IconButton>
              </div>
            );
          },
        },
      },
    ];

    // dynamically adds back filter list based on the props 
    for (var i = 0; i < columns.length; i++) {
      // FOR FILTERS
      if (this.props.SavedQuery.saved) {
        columns[i].options.filterList = this.props.SavedQuery.filterList[i];
      } else {
        columns[i].options.filterList = [];
      }

      // FOR COLUMNS
      if (this.props.SavedQuery.display) {
        columns[i].options.display = this.props.SavedQuery.display[i];
      }
    }

    options.customToolbar = () => {
      return (
        <IconButton size="small" onClick={() => this.productPage()}>
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
          width: "50%",
          margin: "10px auto",
          minWidth: "400px",
          color: "#2b4da0",
          fontWeight: "bolder",
          fontSize: "18px",
          textAlign: "center",
        }} > Supplier Maintenance
            </div>
        <div className="rct-block">
          <ServerRecordsList
            title=""
            hasSearch={true}
            columns={columns}
            data={data}
            totalCount={count}
            otherOptions={options}
            filterFunc={this.props.getFilterSupplier}
            savedQuery={this.props.SavedQuery}
            getSavedQuery={this.props.getSavedSupplierMainQuery}
          />
          {/* {loading && <RctSectionLoader />} */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ suppliertfesState }) => {
  const { Suppliers } = suppliertfesState;
  const { SupplierDetails } = suppliertfesState;
  const { SupplierFiltered, SavedQuery } = suppliertfesState;
  return { Suppliers, SupplierDetails, SupplierFiltered, SavedQuery };
};
export default connect(mapStateToProps, {
  show,
  getSupplier,
  getFilterSupplier,
  deleteSupplier,
  setDuplicate,
  clearDuplicate,
  getSavedSupplierMainQuery
})(crm_supplier_list);
