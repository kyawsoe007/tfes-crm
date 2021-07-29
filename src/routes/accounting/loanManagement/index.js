import React, { Component } from "react";

// Component Imports
import { listOptions } from "Helpers/helpers";
import { singleLongLoanManagementPage, singleShortLoanManagementPage, longLoanManagementNewPage, shortLoanManagementNewPage } from "Helpers/accountingURL";
// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import RecordsList from 'Components/RecordsList';
import ServerRecordsList from "Components/ServerRecordsList";
import addFilled from "@iconify/icons-carbon/add-filled";
import NumberFormat from 'react-number-format';
import { amountRounding } from "Helpers/helpers";
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";
import {
  deleteShortTermLoan,
  deleteLongTermLoan,
  getAllLongTermLoans,
  getAllShortTermLoans,
  getSavedShortLoanQuery,
  getSavedLongLoanQuery
} from "Ducks/loanManagement";
class LoanManagementListView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getAllLongTermLoans();
    //this.props.getAllShortTermLoans();
  }

  // icon click function here
  edit = (id, type) => {
    if (type === "long") {
      this.props.history.push(singleLongLoanManagementPage(id));      // To Long Term Form View
    } else {
      this.props.history.push(singleShortLoanManagementPage(id));     // To Short Term Form View
    }

  };

  createNew = (type) => {
    if (type === "long") {
      this.props.history.push({ pathname: longLoanManagementNewPage, state: { type: type } })         // To Long Term Form View
    } else {
      this.props.history.push({ pathname: shortLoanManagementNewPage, state: { type: type } })      // To Short Term Form View
    }
  };

  deleteShortLoan(id, number) {
    this.props.show("alert_delete",
      {
        name: number,
        action: () => this.props.deleteShortTermLoan(id),
      });
  }
  deleteLongLoan(id, number) {
    this.props.show("alert_delete",
      {
        name: number,
        action: () => this.props.deleteLongTermLoan(id),
      });
  }
  // handleSingleDelete(deliveryId) {
  //   this.props.deleteCapex(deliveryId)
  // }
  render() {
    // const longTermData = [];
    const longTermData = this.props.longTermLoanAll.data;
    const shortTermData = this.props.shortTermLoanAll.data;
    // const shortTermData = [];
    // Columns for Long Term Loan Table

    const longLoanColumns = [
      { name: "_id", options: { display: "excluded", filter: false, sort: false } },
      { label: "Bank", name: "bank", options: { filter: false, sort: false } },

      {
        label: "Loan Amount", name: "loanAmount", options: {
          sort: false,
          filter: false,
          customBodyRender: (value) => {
            return value ?  <NumberFormat value={amountRounding(2,value)} displayType={'text'} thousandSeparator={true}/> : ""
          }
        }
      },

      {
        label: "Principal Left", name: "outstanding_loan", options: {
          filter: false, sort: false,
          customBodyRender: (value) => {
            return value ?  <NumberFormat value={amountRounding(2,value)} displayType={'text'} thousandSeparator={true}/> : ""
          }
        }
      },
      {
        label: "Loan Deposit Date", name: "loanDepositDate", options: {
          filter: false, sort: false,
          customBodyRender: (value) => ( value? <div>{moment(value).format('DD/MM/YYYY')}</div> :"")
        }
      },
      {
        label: "Monthly Installment", name: "monthlyInstall", options: {
          filter: false, sort: false,
          customBodyRender: (value) => (value ? "$" + value.toFixed(2) : "")
        }
      },
      {
        label: "Interest Rate", name: "interestRate", options: {
          filter: false, sort: false,
          customBodyRender: (value) => (value ? value.toFixed(2) : "")
        }
      },
      { label: "Loan Duration", name: "loanDuration", options: { filter: false, sort: false } },
      {
        label: "Action",
        name: "action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <div>
                <IconButton size="small"
                  onClick={() => { this.edit(tableMeta.rowData[0], "long") }}
                >
                  <Icon
                    className="tableEditIcon"
                    icon={editFilled}
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                </IconButton>
                <IconButton
                  size="small" className="tableDeleteIcon"
                  onClick={() => { this.deleteLongLoan(tableMeta.rowData[0], tableMeta.rowData[1]) }}
                >
                  <Icon
                    icon={baselineDeleteForever}
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                </IconButton>
              </div>
            )
          }
        }
      },
      { label: "Type", name: "type", options: { display: "excluded", filter: false } },
    ];

    // Columns for Short Term Loan Table
    const shortLoanColumns = [
      { name: "_id", options: { display: "excluded", filter: false, sort: false } },
      { label: "Name", name: "loanName", options: { filter: false, sort: false } },
      { label: "Bank", name: "bank", options: { filter: false, sort: false } },
      { label: "Supplier", name: "supplier_name", options: { filter: false, sort: false } },
      { label: "PO Number", name: "poNumber", options: { filter: false , sort: false} },
      {
        label: "Loan Amount", name: "loanAmount", options: {
          filter: false, sort: false,
          customBodyRender: (value) => {
            return value ?  <NumberFormat value={amountRounding(2,value)} displayType={'text'} thousandSeparator={true}/> : ""
          }
        }
      },
      {
        label: "Principal Left", name: "balance", options: {
          filter: false, sort: false,
          customBodyRender: (value) => {
            return value ?  <NumberFormat value={amountRounding(2,value)} displayType={'text'} thousandSeparator={true}/> : ""
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
            return (
              <div>
                <IconButton size="small"
                  onClick={() => { this.edit(tableMeta.rowData[0], "short") }}
                >
                  <Icon
                    className="tableEditIcon"
                    icon={editFilled}
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                </IconButton>
                <IconButton
                  size="small" className="tableDeleteIcon"
                  onClick={() => { this.deleteShortLoan(tableMeta.rowData[0], tableMeta.rowData[1]) }}
                >
                  <Icon
                    icon={baselineDeleteForever}
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                </IconButton>
              </div>
            )
          }
        }
      },
      { label: "Type", name: "type", options: { display: "excluded", filter: false } },
    ];

    // dynamically adds back filter list based on the props (SHORT TERM LOAN)
    for (var i = 0; i < shortLoanColumns.length; i++) {
      // FOR FILTERS
      if (this.props.SavedShortLoanQuery.saved){
        shortLoanColumns[i].options.filterList = this.props.SavedShortLoanQuery.filterList[i];
      } else{
        shortLoanColumns[i].options.filterList = [];
      }

      // FOR COLUMNS
      if(this.props.SavedShortLoanQuery.display){
        shortLoanColumns[i].options.display = this.props.SavedShortLoanQuery.display[i];
      }
    }

    const optionsForShort = Object.assign({}, listOptions);
    const optionsForLong = Object.assign({}, listOptions);
    // Hide filter icon
    optionsForLong.filter = false;
    optionsForShort.filter = false;
    
    optionsForShort.customToolbar = () => {
      return (
        <IconButton size="small" onClick={() => this.createNew("short")}>
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
    optionsForLong.customToolbar = () => {
      return (
        <IconButton size="small" onClick={() => this.createNew("long")}>
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
        {/* Table for Short-Term Loan Management */}
        <div style={{
          width: "50%",
          margin: "10px auto",
          minWidth: "400px",
          color: "#2b4da0",
          fontWeight: "bolder",
          fontSize: "18px",
          textAlign: "center",
        }} > Short-Term Loan Management
      </div>
        <div className="rct-block">
          <ServerRecordsList
            title=" "
            hasSearch={true}
            columns={shortLoanColumns}
            data={shortTermData}
            totalCount={this.props.shortTermLoanAll.count}
            otherOptions={optionsForShort}
            filterFunc={this.props.getAllShortTermLoans}
            savedQuery={this.props.SavedQuery}
            getSavedQuery={this.props.getSavedShortLoanQuery}
          />
        </div>
        {/* Table for Long-Term Loan Management */}
        <div style={{
          width: "50%",
          margin: "10px auto",
          minWidth: "400px",
          color: "#2b4da0",
          fontWeight: "bolder",
          fontSize: "18px",
          textAlign: "center",
        }} > Long-Term Loan Management
      </div>
        <div className="rct-block">
          <RecordsList
            title=" "
            columns={longLoanColumns}
            data={longTermData}
            options={optionsForLong}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ LoanManagementState }) => {
  const { shortTermLoanAll, longTermLoanAll, SavedShortLoanQuery, SavedLongLoanQuery } = LoanManagementState



  return { shortTermLoanAll, longTermLoanAll, SavedShortLoanQuery, SavedLongLoanQuery }
};
export default connect(mapStateToProps, {
  deleteShortTermLoan,
  deleteLongTermLoan,
  getAllLongTermLoans,
  getAllShortTermLoans,
  getSavedShortLoanQuery,
  getSavedLongLoanQuery,
  show,

})(LoanManagementListView);
