import React, { Component, Fragment } from "react";
import moment from "moment";
// Component Imports
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { journalEntriesNewPage, singleJournalEntries } from "Helpers/accountingURL";
import ServerRecordsList from 'Components/ServerRecordsList'

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import RecordsList from 'Components/RecordsList'
import addFilled from "@iconify/icons-carbon/add-filled";

import { getJournalLists, deleteJournalEntry, getSavedJournalQuery } from "Ducks/accounting";
import { connect } from "react-redux";
import { show } from "redux-modal";
import { amountRounding } from "Helpers/helpers";
import NumberFormat from 'react-number-format';

class JournalEntriesListView extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    //this.props.getJournalLists();
  }

  // icon click function here
  edit = (id) => { this.props.history.push(singleJournalEntries(id)) };
  newJournal = () => { this.props.history.push(journalEntriesNewPage) };

  delete(id, number) {
    this.props.show("alert_delete",
      {
        name: number,
        action: () => this.handleSingleDelete(id),
      });
  }
  handleSingleDelete(deliveryId) {
    this.props.deleteJournalEntry(deliveryId)
  }
  render() {
    const { data, count } = this.props.journalLists;
    const columns = [
      { name: "_id", options: { display: "excluded", filter: false, sort: false } },
      { label: "Number", name: "journalEntryNum", options: { filter: false } },

      { label: "Reference", name: "reference", options: { filter: false } },
      {
        label: "Date", name: "entryDate", options: {
          filter: false,
          customBodyRender: (value) => (
            value ? <div>{moment(value).format('DD/MM/YYYY')}</div> : ""
          )
        }
      },
      { label: "Period", name: "periodName", options: { filter: false } },
      {
        label: "Journal", name: "journalValue", options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return (value ? <div>{value.name}</div> : "")
          }
        }
      },
      {
        label: "Partner", name: "journalItems", options: {
          filter: false,
          customBodyRender: (value, tableMeta) => (
            value && value.length > 0 ? <div>{value[0].partner}</div> : ""
          )
        }
      },
      {
        label: "Amount", name: "totalDebit", options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            return <div >{`${value.toLocaleString("en-SG", { style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              {console.log(tableMeta.rowIndex, " : ", typeof value)}
            </div>
          },

        }
      },
      {
        label: "To Review", name: "toReview", options: {
          filter: false,
          customBodyRender: (value, tableMeta) => {
            console.log('value', value)
            return (<input type="checkbox" defaultChecked={value} style={{ width: "20px", height: "15px", marginTop: "5px" }} />)
          }
        }
      },

      {
        label: "Status", name: "status", options: {                                                             //9 line
          filter: true,
          filterOptions: {
            names: ["draft", "confirmed", "complete"],
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
            return (
              tableMeta.rowData[9] === "draft" ? (
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
              ) : (
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
                </div>
              )
            )
          }
        }
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
      if(this.props.SavedQuery.display){
        columns[i].options.display = this.props.SavedQuery.display[i];
      }
    }

    const options = Object.assign({}, listOptions);
    options.customToolbar = () => {
      return (
        <IconButton size="small" onClick={() => this.newJournal()}>
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
        <div style={{
          width: "50%",
          margin: "10px auto",
          minWidth: "400px",
          color: "#2b4da0",
          fontWeight: "bolder",
          fontSize: "18px",
          textAlign: "center",
        }} > Journal Entries List Page
            </div>
        <div className="rct-block">
          <ServerRecordsList
            title=" "
            columns={columns}
            data={data}
            totalCount={count}
            otherOptions={options}
            filterFunc={this.props.getJournalLists}
            hasSearch={true}
            savedQuery={this.props.SavedQuery}
            getSavedQuery={this.props.getSavedJournalQuery}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ accountingState }) => {
  const { journalState } = accountingState;
  const { journalLists, SavedQuery } = journalState;
  return { journalLists, SavedQuery };
};
export default connect(mapStateToProps, { show, getJournalLists, deleteJournalEntry, getSavedJournalQuery })(JournalEntriesListView);
