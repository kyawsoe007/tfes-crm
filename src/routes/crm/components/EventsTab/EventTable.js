import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import RecordsList from "Components/RecordsList";
import { EventNote, Edit } from "@material-ui/icons";

import { getTheDate, getTheTime } from "Helpers/helpers";

const EventsTable = ({ tableData, title, action, showNewEventDialog }) => {
  const columns = [
    {
      name: "allDay",
      options: { display: "excluded", filter: false, sort: false }
    },
    { label: "Title", name: "title" },
    {
      label: "Start",
      name: "start",
      options: {
        customBodyRender: (value, tableMeta) =>
          tableMeta.rowData[0] ? "" : getTheTime(value)
      }
    },
    {
      label: "End",
      name: "end",
      options: {
        customBodyRender: (value, tableMeta) =>
          tableMeta.rowData[0] ? "" : getTheTime(value)
      }
    },
    {
      label: "From",
      name: "start",
      options: {
        customBodyRender: value => getTheDate(value)
      }
    },
    {
      label: "To",
      name: "end",
      options: {
        customBodyRender: value => getTheDate(value)
      }
    },
    {
      label: "Owner",
      name: "userInfo",
      options: { customBodyRender: value => (value ? value.name : "") }
    }
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scrollMaxHeight",
    download: false,
    print: false,
    search: false,
    filter: false,
    viewColumns: false,
    elevation: 0,
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 30, 60, 100],
    textLabels: { body: { noMatch: "No Events" } },
    customToolbar: () => {
      return (
        <Tooltip id="tooltip-icon" title="New Event">
          <IconButton aria-label="new-event" onClick={showNewEventDialog}>
            <EventNote fontSize="small" />
          </IconButton>
        </Tooltip>
      );
    }
  };

  if (action == true) {
    columns.push({
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
          return (
            <React.Fragment>
              <Tooltip id="tooltip-icon" title="Edit">
                <IconButton className="text-primary mr-2">
                  <Edit />
                </IconButton>
              </Tooltip>
            </React.Fragment>
          );
        }
      }
    });
  }

  return (
    <RecordsList
      title={title}
      columns={columns}
      data={tableData}
      options={options}
    />
  );
};

export default EventsTable;
