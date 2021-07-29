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

// Actions
import addFilled from "@iconify/icons-carbon/add-filled";
import { customer2NewPage } from "Helpers/crmURL";


import { getFilterCustomerTfes } from "Ducks/customertfes";

// SkuNew
const options = Object.assign({}, listOptions);
class TfesCustomerList extends Component {
  componentDidMount() {
    // this.props.getFilterCustomerTfes();
    // alert("PING!!!!!")
  }
  productPage() {
    this.props.history.push(customer2NewPage);
  }
  render() {
    const { data, count } = this.props.customerFiltered;    
    // let options = {};
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      { label: "Cust. No", name: "cusNo", options: { filter: false } },
      { label: "Cust. Name", name: "name", options: { filter: false } },     
      { label: "Sales PIC", name: "cusPIC", options: { filter: false } },
      { label: "Sales PIC phone", name: "cusPICMobile1b", options: { filter: false } },
      { label: "Nickname", name: "nickname", options: { filter: false } },
    ];

    options.onRowClick = (rowData) => {
      this.props.getInfo(rowData[0], rowData[2]);
    };

    options.searchText = this.props.searchText;


    // options.customSearchRender = (searchText, handleSearch, hideSearch, options) => {

    //   let searchSeg = parseSearch(searchText);

    //   function parseSearch(sText) {
    //     let searchVals = {};
    //     if (sText != null) {
    //       let searchItems = sText.split("|");
    //       searchItems.forEach(item => {
    //         let sVal = item.split(":");
    //         searchVals[sVal[0]] = sVal[1];
    //       });
    //     }
    //     return searchVals;
    //   }

    //   return (
    //     <React.Fragment>
    //       <div style={{ display: "flex", justifyContent: "space-around" }}>
    //         <div>
    //           <TextField id="outlined-basic" label="Search" variant="standard" value={searchSeg.partNo} onChange={evt => {
    //             let searchStr = "";
    //             Object.keys(searchSeg).forEach(s => { if (s !== "partNo") searchStr += s + ":" + searchSeg[s] + "|" });
    //             searchStr += "partNo:" + evt.target.value;
    //             handleSearch(searchStr);
    //           }} />
    //         </div>
    //       </div>
    //     </React.Fragment>
    //   );
    // };

    return (
      <div className="rct-block">
        <ServerRecordsList title="Customer List" hasSearch={true} columns={columns} data={data} totalCount={count} otherOptions={options} 
        filterFunc={this.props.getFilterCustomerTfes}  
        />
      </div>
    );
  }
}

const mapStateToProps = ({ customertfesState }) => {
  const { customers } = customertfesState;
  const { customerDetails } = customertfesState;
  const { customerFiltered } = customertfesState;
  return { customers, customerDetails, customerFiltered };
};
export default connect(mapStateToProps, { getFilterCustomerTfes })(TfesCustomerList);
