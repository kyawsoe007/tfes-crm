import React from "react";
import { Chip } from "@material-ui/core";

const ActiveStatusBadge = ({ isActive }) => {
  return (
    <Chip
      variant="outlined"
      size="small"
      label={isActive ? "Active" : "Inactive"}
      className={
        isActive ? "text-success border-success" : "text-danger border-danger"
      }
    />
  );
};

export default ActiveStatusBadge;
