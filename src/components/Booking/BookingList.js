import React from "react";

import RecordsList from "Components/RecordsList";
import { listOptions } from "Helpers/helpers";
import RctSectionLoader from "Components/RctSectionLoader";

import Moment from "moment";

const CustomerList = ({
  tableData,
  loading,
  title,
  action,
  SetSingleBooking
}) => {
  const columns = [
    {
      name: "id",
      options: { display: "excluded", filter: false, sort: false }
    },
    {
      label: "Name",
      name: "contact",
      options: {
        customBodyRender: (value, tableMeta) => {
          const { firstName, lastName } = value;
          const id = tableMeta.rowData[0];
          return (
            <span style={{ color: "rgba(0,0,0,0.7)" }}>
              {firstName + " " + lastName}
            </span>
          );
        }
      }
    },
    {
      label: "Created",
      name: "created_at",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <span style={{ color: "rgba(0,0,0,0.7)" }}>
              {Moment(value).format("LL")}
            </span>
          );
        }
      }
    },
    {
      label: "Email",
      name: "contact",
      options: {
        customBodyRender: value => {
          const { email } = value;
          return <span style={{ color: "rgba(0,0,0,0.7)" }}>{email}</span>;
        }
      }
    },
    {
      label: "Contact",
      name: "contact",
      options: {
        customBodyRender: (value, tableMeta) => {
          const { phone } = value;
          return <span style={{ color: "rgba(0,0,0,0.7)" }}>{phone}</span>;
        }
      }
    },
    {
      label: "Service",
      name: "service",
      options: {
        customBodyRender: value => {
          return <span style={{ color: "rgba(0,0,0,0.7)" }}>{value}</span>;
        }
      }
    },
    {
      label: "Model",
      name: "content",
      options: {
        customBodyRender: value => {
          const { model, date, timeslot, description } = value;
          return <span style={{ color: "rgba(0,0,0,0.7)" }}>{model}</span>;
        }
      }
    },
    {
      label: "Schedule",
      name: "content",
      options: {
        customBodyRender: value => {
          const { model, date, timeslot, description } = value;
          return (
            <span style={{ color: "rgba(0,0,0,0.7)" }}>
              {Moment(date).format("LL")}
            </span>
          );
        }
      }
    },
    {
      label: "Status",
      name: "status",
      options: {
        customBodyRender: value => {
          return <span style={{ color: "rgba(0,0,0,0.7)" }}>{value}</span>;
        }
      }
    }
  ];

  const listOptions = {
    filterType: "dropdown",
    responsive: "stacked",
    selectableRows: "none",
    expandableRows: false, // Try Adding This
    print: false,
    download: false,
    viewColumns: false,
    search: false,
    filter: false,
    onRowClick: (rowData, rowState) => SetSingleBooking(rowData[0])
  };

  return (
    <div
      className="rct-block"
      style={{
        borderRadius: 10,
        boxShadow:
          "0 5px 9px 0 rgba(0,0,0,0.15), 0 8px 25px 0 rgba(0,0,0,0.15)",
        flex: 1,
        overflow: "auto"
      }}
    >
      <RecordsList
        title={title}
        columns={columns}
        data={tableData}
        options={listOptions}
      />
      {loading && <RctSectionLoader />}
    </div>
  );
};

export default CustomerList;
