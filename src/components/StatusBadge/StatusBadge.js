import React from "react";
import { Chip } from "@material-ui/core";

const StatusBadge = ({ name, color, backgroundColor }) => {
  return (
    <Chip
      style={{ backgroundColor: backgroundColor, color: color, fontSize: "12px" }}
      label={name}
      size="small"
      variant="outlined"
    />
  );
};

export default StatusBadge;
