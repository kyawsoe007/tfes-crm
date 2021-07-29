import React from "react";
import { List } from "@material-ui/icons";

function KeyDetails(props) {
  const { keyDetails } = props;
  return (
    <div className="profile-card-footer">
      <div className="profile-heading">
        <List />
        Key Details
      </div>
      {keyDetails &&
        keyDetails.map((detail, key) => (
          <div className="profile-details" key={key}>
            <span>{detail.label}</span>
            <span className="text-right">{detail.value}</span>
          </div>
        ))}
    </div>
  );
}

export { KeyDetails };
