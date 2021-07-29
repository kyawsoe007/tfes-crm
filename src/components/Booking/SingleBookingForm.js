import React, { useState, useEffect } from "react";
import Moment from "moment";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const StatusOption = ["Awaiting", "Processing", "Confirmed", "Rejected"];

import Input from "Components/Inventory/Input";
import Button from "Components/Inventory/Button";
import NoteList from "./NoteList";
import Forms from "./DetailsTable";

const Index = ({ SingleBooking, ChangeStatus, MakeNotes }) => {
  if (!SingleBooking) {
    return null;
  }

  const {
    created_at,
    service,
    status,
    contact,
    content,
    id,
    notes
  } = SingleBooking;
  const { firstName, lastName, email, phone } = contact;
  const { model, date, timeslot, description } = content;

  const [newStatus, setnewStatus] = useState(null);
  const [newNotes, setnewNotes] = useState("");

  return (
    <div className="d-flex" style={{ flex: 1, margin: 20 }}>
      <div className="d-flex flex-column" style={{ flex: 1 }}>
        <div className="d-flex flex-row" style={{ flex: 1 }}>
          <div
            className="d-flex flex-column"
            style={{
              flex: 1,
              boxShadow:
                "0 5px 9px 0 rgba(0,0,0,0.15), 0 8px 25px 0 rgba(0,0,0,0.15)",
              marginRight: 25
            }}
          >
            <div
              className="d-flex justify-content-center"
              style={{ backgroundColor: "rgba(76,109,126,1)", padding: 10 }}
            >
              <span style={{ textAlign: "center", color: "white" }}>
                BOOKING DETAILS
              </span>
            </div>

            <div style={{ margin: 25 }}>
              <Forms
                Style={"row"}
                Details={{
                  id: id,
                  Created: created_at,
                  Scheduled: date,
                  Timeslot: timeslot,
                  Service: service,
                  Model: model,
                  Status: status,
                  Description: description
                }}
              />
            </div>
          </div>

          <div
            className="d-flex flex-column"
            style={{
              boxShadow:
                "0 5px 9px 0 rgba(0,0,0,0.15), 0 8px 25px 0 rgba(0,0,0,0.15)"
            }}
          >
            <div
              className="d-flex justify-content-center"
              style={{ backgroundColor: "rgba(76,109,126,1)", padding: 10 }}
            >
              <span style={{ textAlign: "center", color: "white" }}>
                USER DETAIL
              </span>
            </div>

            <div style={{ margin: 25 }}>
              <Forms
                Style={"column"}
                Details={{
                  Name: `${firstName} ${lastName}`,
                  Email: email,
                  Phone: phone
                }}
              />
            </div>
          </div>
        </div>
        {MakeNotes && (
          <React.Fragment>
            <div className="d-flex flex-column">
              <Input
                textarea={true}
                divStyle={{ width: "100%", flex: 1, display: "flex" }}
                title="Notes"
                placeholder="Enter notes for this booking"
                value={newNotes}
                _HandleProduct={e => setnewNotes(() => e)}
                style={{
                  height: "100%",
                  backgroundColor: "rgba(244,246,251,1)",
                  borderRadius: 8,
                  border: "none",
                  padding: 20
                }}
              />

              <Button
                divStyle={{ display: "flex", justifyContent: "flex-end" }}
                _Function={() => {
                  MakeNotes(id, newNotes);
                  setnewNotes(() => null);
                }}
                product={""}
                files={""}
                title={"Save Notes"}
              />
            </div>

            <NoteList
              title={"Describe the actions taken for customer"}
              tableData={notes}
            />
          </React.Fragment>
        )}
        <div
          className="d-flex flex-row justify-content-between align-items-center"
          style={{ marginTop: 10 }}
        >
          <span style={{ color: "rgba(0,0,0,0.7)" }}>
            When actions has been taken, you may change the status of the
            booking. Each succesful status change will invoke auto update email
            to client.
          </span>

          <div className="d-flex flex-row justify-content-center align-items-center">
            <FormControl>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={status }
                onChange={e => setnewStatus(() => e.target.value)}
                style={{ minWidth: 100, marginLeft: 5 }}
              >
                {StatusOption.map((e, index) => {
                  return (
                    <MenuItem key={index} value={e}>
                      {e}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Button
              divStyle={{
                display: "flex",
                justifyContent: "flex-end",
                marginLeft: 20
              }}
              _Function={() => ChangeStatus(id, newStatus)}
              product={""}
              files={""}
              title={"Update"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
