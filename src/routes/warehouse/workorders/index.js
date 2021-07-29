import React, { Component, Fragment } from 'react'
import moment from "moment";
import ServerRecordsList from 'Components/ServerRecordsList'
import RecordsList from 'Components/RecordsList'
import { workOrderColumns } from './mockdata'
import { listOptions, getDateTime } from "Helpers/helpers";
import { connect } from 'react-redux'
import {Link} from "react-router-dom";
import { workorderStatus } from 'Constants/modelStatus';

// redux
import { getAllWorkOrders, getFilterWorkOrderRequest, getSavedWorkOrderQuery } from 'Ducks/workorders'

// icons 
import { IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Icon } from '@iconify/react';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import { workOrderSingle } from 'Helpers/warehouseURL';


class Workorders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      title: 'Work Order Management',
      options: {
        selectableRows:false,
        filter: true,
      },
      workOrdersData: []
    }
  }

  componentDidMount = () => {
    //this.props.getAllWorkOrders()
    // this.props.getFilterWorkOrderRequest()
  }

  render() {
    const columns = [
      {
        name: "id", 
        options: {
          filter: false,
          display: false
        }
      },
      {
        name: "woNumber", 
        label: "WO Num",
        options: {
          filter: false
        }
      },
      {
        name: "soNumber",
        label: "SO Number", 
        options: {
          filter: false
        }
      },
      {
        name: "createdAt",
        label: "Date Created", 
        options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return new Date(value).toLocaleDateString()
            
          }
        }
      },
      {
        name: "woStatus",
        label: "Status", 
        options: {
          filter: true,
          filterType: "checkbox",
          filterOptions: {
            names: Object.values(workorderStatus)
          },
          customFilterListOptions:{
            render: (v) => `Status: ${v}`
          },
        }
      },
      {
        name: "Action",
        options: {
          filter: false,
              sort: false,
                empty: true,
                customBodyRender: (value, tableMeta) => {

                  // find index of column for status for rendering logic 
                  const statusColIndex = columns.findIndex( (obj) => obj.name === "woStatus");

                  if (tableMeta.rowData[statusColIndex] === workorderStatus.COMPLETED) {
                    return (
                      //TODO: add Link to specific page 
                      <Link to={`workorder/${tableMeta.rowData[0]}`}>
                        <IconButton
                          size="small"
                          onClick={() => {
                              console.log("ROW VALUE", tableMeta.rowData[0]);
                          }}>
                          <VisibilityIcon
                            color="#595959"
                            width="1.5rem"
                            height="1.5rem"
                          />
                        </IconButton>
                      </Link>
                    );
                  } else if (tableMeta.rowData[statusColIndex] === workorderStatus.OPEN || tableMeta.rowData[statusColIndex] === workorderStatus.PROCESSING) {
                      return (
                        //TODO: add Link to specific page 
                        <Link to={ workOrderSingle(tableMeta.rowData[0]) }>
                          <IconButton
                            size="small"
                            onClick={() => {
                                console.log("ROW VALUE", tableMeta.rowData[0]);
                            }}>
                            <Icon
                              className="tableEditIcon"
                              icon={editFilled}
                              color="#595959"
                              width="1.5rem"
                              height="1.5rem"
                            />
                          </IconButton>
                        </Link>
                    );                  
                  }

                  }
            }
        }
    ]

    // dynamically adds back filter list based on the props 
    for (var i = 0; i < columns.length; i++) {
      // FOR FILTERS
      if (this.props.SavedQuery.saved){
        columns[i].options.filterList = this.props.SavedQuery.filterList[i];
      } else{
        columns[i].options.filterList = [];
      }

      // FOR COLUMNS
      if(this.props.SavedQuery.display){
        columns[i].options.display = this.props.SavedQuery.display[i];
    }
    }

    const options = Object.assign({}, listOptions);
    // const { tableData, totalCount } = this.props.workOrderFiltered;
    return (
      
      <Fragment>
        <div style={{
              width:"50%",
              margin:"10px auto",
              minWidth:"400px",
              color:"#2b4da0",
              fontWeight:"bolder",
              fontSize:"18px",
              textAlign:"center", 
              }} > {this.state.title}
            </div>
        <ServerRecordsList
          columns={columns}
          title="Work Orders"
          data={this.props.workOrderFiltered.data}
          totalCount={this.props.workOrderFiltered.count}
          otherOptions={options}
          filterFunc={this.props.getFilterWorkOrderRequest}
          hasSearch={true}
          savedQuery={this.props.SavedQuery}
          getSavedQuery={this.props.getSavedWorkOrderQuery}
        />

      </Fragment>
    )
  }
}

const mapStateToProps = ({ workorderState }) => {
  const { workOrderFiltered }  = workorderState;
  const { SavedQuery } = workorderState;
  return { workOrderFiltered, SavedQuery } 
}

export default connect(mapStateToProps, {
  getAllWorkOrders,
  getFilterWorkOrderRequest,
  getSavedWorkOrderQuery
})(Workorders)

// https://stackoverflow.com/questions/54330386/react-redux-saga-actions-must-be-plain-objects-use-custom-middleware-for-async