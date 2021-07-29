import React from "react";
import RecordsList from "Components/RecordsList";
import { getDateTime } from "Helpers/helpers";
import { Button, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";

function FollowUpTable({
  title,
  data,
  newFollowup,
  editFollowup,
  deleteFollowup,
  upcoming
}) {
  const columns = [
    { label: "Title", name: "title", options: { filter: false } },
    {
      label: "Time of Follow Up",
      name: "date",
      options: {
        customBodyRender: value => getDateTime(value)
      }
    },
    {
      label: "Result",
      name: "result",
      options: {
        customBodyRender: value => (value ? value.name : ""),
        display: upcoming ? false : true,
        filter: upcoming ? false : true,
        search: upcoming ? false : true
      }
    },
    {
      label: "Type",
      name: "type",
      options: {
        customBodyRender: value => (value ? value.name : "")
      }
    },
    {
      label: "Owner",
      name: "userInfo",
      options: { customBodyRender: value => (value ? value.name : "") }
    },
    {
      name: "id",
      label: " ",
      options: {
        customBodyRender: value => (
          <React.Fragment>
            <IconButton size="small" onClick={() => editFollowup(value)}>
              <Edit style={{ fontSize: "1rem" }} />
            </IconButton>
            <IconButton
              className="ml-10 text-danger"
              size="small"
              onClick={() => deleteFollowup(value)}
            >
              <Delete style={{ fontSize: "1rem" }} />
            </IconButton>
          </React.Fragment>
        ),
        filter: false,
        search: false
      }
    }
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scrollMaxHeight",
    download: false,
    print: false,
    viewColumns: false,
    elevation: 0,
    selectableRows: "none",
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 30, 60, 100],
    textLabels: { body: { noMatch: "No Follow Ups" } },
    customToolbar: () => {
      return (
        <Button onClick={newFollowup} variant="outlined" size="small">
          New Log
        </Button>
      );
    }
  };
  return (
    <RecordsList
      title={title}
      columns={columns}
      data={data}
      options={options}
    />
  );
}

export default FollowUpTable;
