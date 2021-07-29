
import React, { Component, Fragment } from "react";
// Component Imports
import { listOptions, getDateTime, amountRounding } from "Helpers/helpers";
import FormInput from "Components/Form/FormInput";
// Icon Imports
import { IconButton } from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import RecordsList from 'Components/RecordsList'
import { connect } from "react-redux";
import { show } from "redux-modal";
//import Ducks
import addFilled from "@iconify/icons-carbon/add-filled";
// npm install --save-dev @iconify/react @iconify-icons/ant-design
import { Icon, InlineIcon } from '@iconify/react';

import { getAllAccountItem, deleteAccountItem, getSavedAccountQuery } from "Ducks/account-item";
import ServerRecordsList from "Components/ServerRecordsList";

class acctMaintenanceListView extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.state = {
    };

  }
  componentDidMount() {
    //this.props.getAllAccountItem();
  }
  // icon click function here
  // edit=(id)=>{this.props.history.push(singleDeliveryOrder(id))}
  // view=(id)=>{this.props.history.push(singleDeliveryOrder(id))}
  newItem = () => {
    this.props.history.push({ pathname: `/app/accounting/acctMaintenance/new/` })
  }
  edit = (id) => {

    this.props.history.push({
      pathname: `/app/accounting/acctMaintenance/${id}`,
      data: id // your data array of objects
    })

  }
  // 参数

  delete(id) {
    this.props.show("alert_delete",
      {
        name: id,
        action: () => this.handleSingleDelete(id),
      });
  }
  productPage() {
    // this.props.clearDuplicate();
    this.props.history.push(`/app/accounting/acctMaintenance/new/`)
  }
  handleSingleDelete(accountId) {
    this.props.deleteAccountItem(accountId)
  }
  handleChange = (field, value) => {
    this.setState({
      [field]: value,
    })
  }
  render(
  ) {
    const { data, count } = this.props.accountItem;
    const columns = [
      { name: "_id", options: { display: "excluded", filter: false, sort: false } },
      {
        label: "Code", name: "accountCode", options: { filter: false }
        //         customBodyRender: (value, tableMeta) => {
        //           return(
        //             <FormInput placeholder="code" onChange={this.handleChange} value={tableMeta.rowData[1]} />
        //           )
        //   }
        // }
      },
      {
        label: "Name", name: "accountName", options: { filter: false }
        //   customBodyRender:(value,tableMeta)=>{
        //       return(
        //           <FormInput  placeholder="name" onChange={this.handleChange} value={tableMeta.rowData[2]} />
        //       )
        //   }
        // }
      },
      {
        label: "Debit", name: "debit", options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return value ? amountRounding(2, value) : "0.00";
          },
        }
      },
      {
        label: "Credit", name: "credit", options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return value ? amountRounding(2, value) : "0.00";
          },
        }
      },
      {
        label: "Balance", name: "balance", options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return value ? amountRounding(2, value) : "0.00";
          },
        }
      },


      { label: "Company Currency", name: "currency", options: { filter: false } },
      {
        label: "Internal Type", name: "internalType", options: {
          filter: true, 
          sort: false,
          filterType: 'checkbox',
          filterOptions: { names: ['INCOME', 'OTHER INCOME', 'COGS', 'EXPENSES', 'CURRENT ASSETS', 'FIXED ASSETS', 'CURRENT LIABILITIES', 'LONG TERM LIABILITIES', 'CAPITAL' ]},
          customFilterListOptions:{
            render: (v) => `Type: ${v}`
          }, 
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
                  onClick={() => { this.edit(tableMeta.rowData[0]) }}
                // onClick={() => alert("Edit A New One")}
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
                  onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[1]) }}

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
    
    const options = Object.assign({}, listOptions);
    //   let options = {}
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
        }} >Account Maintenance
            </div>

        <div className="rct-block">
          <ServerRecordsList
            title=""
            hasSearch={true}
            columns={columns}
            data={data}
            totalCount={count}
            //   filterType='checkbox'
            otherOptions={options}
            filterFunc={this.props.getAllAccountItem}
          // handlCheck={true}  
          savedQuery={this.props.SavedQuery}
          getSavedQuery={this.props.getSavedAccountQuery}

          />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ accountItemState }) => {
  const { accountItem, SavedQuery } = accountItemState;
  return { accountItem, SavedQuery };
}

export default connect(mapStateToProps, {
  show, getAllAccountItem, deleteAccountItem, getSavedAccountQuery
})(acctMaintenanceListView);