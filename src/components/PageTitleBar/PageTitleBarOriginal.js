import React from "react";
import { Button, IconButton } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { ArrowBack } from "@material-ui/icons";
import ActionButtonGroup from "./ActionButtons/ActionButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  actionButton: {
    marginLeft: theme.spacing(3),
    boxShadow: theme.custom.boxShadow
  }
}));

const PageTitleBar = ({
  title,
  customButton,
  actionButton,
  actionGroup,
  history,
  noBack,
}) => {
  const classes = useStyles();
  return (
    <div className="page-title d-flex justify-content-between align-items-center">
      <div className="page-title-wrap">
        {!noBack && (
          <IconButton
            onClick={() => history.goBack()}
            disableRipple
            aria-label="back"
            className="back-button"
          >
            <ArrowBack
              fontSize="small"
              style={{ color: "rgba(0, 0, 0, 0.54)" }}
            />
          </IconButton>
        )}

        <h2 className="">{title && title}</h2>
      </div>
     
      {/* <div>
        <h2 className="promptMessage" style={{ textAlign: "center", }} >
          {promptMessage && promptMessage}
        </h2>
      </div> */}

      {/* <div className="d-flex title-action-buttons">
        <div className="extra-action-buttons">
          {customButton && customButton}
          {actionButton &&
            actionButton.map((button, key) => (
              <Button
                key={key}
                variant="contained"
                className={`${button.classes} ${classes.actionButton}`}
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            ))}
        </div>
        {actionGroup && <ActionButtonGroup buttons={actionGroup} />}
      </div> */}


      <div className="d-flex title-action-buttons">
        <div className="extra-action-buttons">
          {customButton && customButton}
          {actionButton &&
            actionButton.map((button, key) => (
              <Button
                key={key}
                variant="contained"
                className={`${button.classes} ${classes.actionButton}`}
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            ))}
        </div>
        {actionGroup && <ActionButtonGroup buttons={actionGroup} />}
      </div>
    </div>
  );
};

export default withRouter(PageTitleBar);
