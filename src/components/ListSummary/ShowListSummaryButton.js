import React from "react";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const ShowListSummaryButton = ({ action }) => {
  return (
    <Tooltip title="Show Summary" placement="bottom">
      <Button
        variant="contained"
        className="btn-info text-white"
        onClick={action}
      >
        <i className="zmdi zmdi-chart font-lg" />
      </Button>
    </Tooltip>
  );
};

export default ShowListSummaryButton;
