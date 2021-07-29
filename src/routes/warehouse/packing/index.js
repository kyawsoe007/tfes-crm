import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// Component Imports
import { listOptions, getDateTime } from "Helpers/helpers";

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import RecordsList from 'Components/RecordsList'
import ServerRecordsList from 'Components/ServerRecordsList'
import * as url from "Helpers/warehouseURL";
import { show } from "redux-modal";
//import Ducks
import { getAllPacking, deletePackingOrder, getFilterPacking, getSavedPackingQuery } from "Ducks/packing";
class packingListView extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.state = {

    };
  }


  edit = (id) => { this.props.history.push(`/app/warehouse/packing/new/${id}`) }

  delete(id) {
    this.props.show("alert_delete",
      {
        name: id,
        action: () => this.handleSingleDelete(id),
      });
  }

  handleSingleDelete(deliveryId) {
    this.props.deletePackingOrder(deliveryId);
    this.props.getFilterPacking();
  }



  render(
  ) {
    const columns = [
      { name: "_id", options: { display: "excluded", filter: false, sort: false } },
      { name: "subpackingOrder", options: { display: "excluded", filter: false, sort: false } },
      { label: "Packing Num", name: "packingNum", options: { filter: false } },

      { label: "Sales Order Num", name: "soNumber", options: { filter: false } },
      {
        label: "Status", name: "packinglistStatus", options: {
          filter: true,
          filterOptions: {
            names: ["draft", "open", "processing", "complete"],
          },
          filterType: "checkbox"
        }
      },
      { label: "Remarks", name: "remarks", options: { filter: false } },
      {
        label: "Action",
        name: "action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {

            const statusIndex = columns.findIndex(x => x.name === "packinglistStatus");
            if (tableMeta.rowData[statusIndex] === "completed") {
              return (
                <div>
                  <IconButton
                    size="small"
                    onClick={() => { this.edit(tableMeta.rowData[0]) }}
                  >
                    <VisibilityIcon
                      color="#595959"
                      width="1.5rem"
                      height="1.5rem"
                    />
                  </IconButton>
                </div>
              )
            } else {
              return (
                <div>
                  <IconButton size="small"
                    onClick={() => { this.edit(tableMeta.rowData[0]) }}
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
        }
      },
    ]

    // dynamically adds back filter list based on the props 
    for (var i = 0; i < columns.length; i++) {
      //  FOR FILTERS
      if (this.props.SavedQuery.saved) {
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
    const { tableData, totalCount } = this.props.filteredPackingList;
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
        }} > Packing Management
      </div>
        <div className="rct-block">
          <ServerRecordsList
            columns={columns}
            data={tableData}
            totalCount={totalCount}
            otherOptions={options}
            filterFunc={this.props.getFilterPacking}
            hasSearch={true}
            savedQuery={this.props.SavedQuery}
            getSavedQuery={this.props.getSavedPackingQuery}
          // options={options}
          />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ packinglistState }) => {
  const { filteredPackingList, SavedQuery } = packinglistState;
  return { filteredPackingList, SavedQuery };
}
export default connect(mapStateToProps, {
  show,
  getAllPacking,
  deletePackingOrder,
  getFilterPacking,
  getSavedPackingQuery
})(packingListView);
