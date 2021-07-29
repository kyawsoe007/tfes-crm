import React from "react";
import Moment from "moment";

const Forms = ({ Details, Style }) => {
  const BookingEntries = Object.entries(Details);

  if (Style == "column") {
    return (
      <React.Fragment>
        {BookingEntries.map((e, index) => {
          const key = e[0];
          const value = e[1];
          return (
            <div
              className="d-flex flex-column justify-content-between"
              key={index}
              style={{ padding: 10 }}
            >
              <span>{key}</span>
              <span style={{ marginLeft: 15, marginTop: 5 }}>{value}</span>
            </div>
          );
        })}
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        {BookingEntries.map((e, index) => {
          const key = e[0];
          const value = e[1];

          if (key == "Created" || key == "Scheduled") {
            return (
              <div
                className="d-flex flex-row justify-content-between"
                key={index}
                style={{ padding: 10 }}
              >
                <span>{key}</span>
                <span>{Moment(value).format("LL")}</span>
              </div>
            );
          } else {
            return (
              <div
                className="d-flex flex-row justify-content-between"
                key={index}
                style={{ padding: 10 }}
              >
                <span>{key}</span>
                <span>{value}</span>
              </div>
            );
          }
        })}
      </React.Fragment>
    );
  }
};

export default Forms;
