import React from "react";
import { Button } from "@material-ui/core";
import { Info } from "@material-ui/icons";

function SystemAlert(props) {
  const { title, message, action, actionText } = props;
  return (
    <div className="icon-alert">
      <div className="alert bg-white" role="alert">
        <span className="alert-addon bg-info">
          <Info className="text-white" />
        </span>
        <p className="fs-14">
          <strong>{title}</strong> {message}
        </p>
        {action && (
          <Button
            onClick={action}
            size="small"
            variant="outlined"
            className="ml-20"
          >
            {actionText}
          </Button>
        )}
      </div>
    </div>
  );
}

export default SystemAlert;
