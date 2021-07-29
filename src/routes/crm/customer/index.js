import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { show } from "redux-modal";
import ServerRecordsList from "Components/ServerRecordsList";
import RecordsList from "Components/RecordsList";

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

// Actions
import addFilled from "@iconify/icons-carbon/add-filled";
import { customerNewPage } from "Helpers/crmURL";
import { getFilterProduct } from "Ducks/producttfes";

// import { getFilterProduct } from "Ducks/producttfes";
// import { getFilterCustomerTfes } from "Ducks/producttfes";

import { setCustomerTfes, getCustomerTfesDetails, getFilterCustomerTfes, deleteCustomerTfes, setDuplicate, clearDuplicate, getSavedCustomerQuery } from "Ducks/customertfes";
import { singleCustomer } from "Helpers/crmURL";

const options = Object.assign({}, listOptions);
class crm_customer_list extends Component {
  constructor(props) {
    super(props);
    // this.onChangeForm = this.onChangeForm.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    this.handleSingleDelete = this.handleSingleDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.duplicate = this.duplicate.bind(this);
    this.state = {
      toggle: false,
      unitcost: "",
      quantity: "",
      location: "",
      remarks: "",
    };
  }
  componentDidMount() {
    //this.props.getFilterCustomerTfes();
    this.props.getCustomerTfesDetails();

    // alert("PING")
  }
  productPage() {
    this.props.clearDuplicate();
    this.props.history.push(customerNewPage);
  }

  // Push Edit/Update Page
  edit(id) {
    this.props.history.push(singleCustomer(id));
  }

  duplicate(data) {
    this.props.setDuplicate(data);
    this.props.history.push(customerNewPage);
  }
  // Delete row
  delete(id, partNumber) {
    this.props.show("alert_delete", {
      name: partNumber,
      action: () => this.handleSingleDelete(id),
    });
  }

  handleSingleDelete(skuId) {
    this.props.deleteCustomerTfes(skuId);
  }


  duplicate(rowNum) {
    let data = { ...this.props.customerFiltered.data[rowNum] };
    delete data.cusNo;
    this.props.setDuplicate(data);
    this.props.history.push(customerNewPage);
  }

  render() {
    // const tableData = this.props.customerFiltered.data;
    const { data, count } = this.props.customerFiltered;
    //let cusNoSources = [];
    //let nameSources = [];
    /*
    if(this.props.customerDetails.data)
    {
      if(this.props.customerDetails.data.grpOne)
      cusNoSources = this.props.customerDetails.data.grpOne.map((val) => val.name);
      if(this.props.customerDetails.data.grpTwo)
      nameSources = this.props.customerDetails.data.grpTwo.map((val) => val.name);
    }
    */
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      {
        label: "Customer. No",
        name: "cusNo",
        options: { filter: false }
      },
      { label: "Customer. Name", name: "name", options: { filter: false, sort: false } },
      { label: "Nickname", name: "nickname", options: { filter: false, sort: false } },
      {
        label: "Sales PIC",
        name: "cusPIC",
        options: { filter: false, sort: false }
      },
      {
        label: "Sales PIC Contact",
        name: "cusPICMobile1b",
        options: { filter: false, sort: false }
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
                    this.edit(tableMeta.rowData[0])
                    console.log("@props:" + this.props)
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

                <IconButton
                  size="small"
                  className="tableCloneIcon"
                >
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
      if (this.props.SavedQuery.saved){
        columns[i].options.filterList = this.props.SavedQuery.filterList[i];
      } else {
        columns[i].options.filterList = [];
      }

      // FOR COLUMNS
      if(this.props.SavedQuery.display){
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
        }} > Customer Management
            </div>
        <div className="rct-block">
          <ServerRecordsList
            title=""
            hasSearch={true}
            columns={columns}
            data={data}
            totalCount={count}
            otherOptions={options}
            filterFunc={this.props.getFilterCustomerTfes}
            savedQuery={this.props.SavedQuery}
            getSavedQuery={this.props.getSavedCustomerQuery}
          />
          {/* {loading && <RctSectionLoader />} */}

          {/* <RecordsList 
          columns={columns} data={data} count={count}
        /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ customertfesState }) => {
  // const { customers } = customertfesState;

  const { customerDetails } = customertfesState;
  const { customerFiltered, SavedQuery } = customertfesState;
  return { customerDetails, customerFiltered, SavedQuery };
};
export default connect(mapStateToProps, {
  show,
  getCustomerTfesDetails,
  getFilterCustomerTfes,
  deleteCustomerTfes,
  setDuplicate,
  clearDuplicate,
  getSavedCustomerQuery
})(crm_customer_list);
