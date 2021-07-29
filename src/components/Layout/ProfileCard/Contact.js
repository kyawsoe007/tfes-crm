import React from "react";
import Avatar from "Components/Avatar";
import { Call, Email, Language } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip, Fab, Chip } from "@material-ui/core";

const useStyles = makeStyles({
  fab: {
    boxShadow: "none",
    marginRight: "1.5rem",
    width: "35px",
    height: "30px"
  }
});

function Contact(props) {
  const classes = useStyles();
  const { name, subHeading, noAvatar, call, email, website, indicator, address } = props;
  return (
    <div className="profile-card-header">
      {indicator && (
        <div className="profile-card-indicator">
          {
            <Chip
              variant="outlined"
              size="small"
              className={indicator.classes}
              style={{ color: indicator.color, borderColor: indicator.color }}
              label={indicator.name}
            />
          }
        </div>
      )}
      <div className="media">
        {!noAvatar && (
          <div className="media-left mr-20">
            <Avatar name={name} size={60} customClasses="d-inline-block" />
          </div>
        )}
        <div className="profile-title media-body my-auto">
          <h2 className="mb-5">{name}</h2>
          <span>{subHeading}</span>
        </div>
      </div>
      {(call || email || website) && (
        <div className="d-flex text-center mt-30">
          {call && (
            <Tooltip id="tooltip-icon" title="Call">
              <Fab
                className={classes.fab}
                color="default"
                size="small"
                href={`tel:${call}`}
              >
                <Call fontSize="inherit" />
              </Fab>
            </Tooltip>
          )}
          {email && (
            <Tooltip id="tooltip-icon" title="Email">
              <Fab
                className={classes.fab}
                color="default"
                size="small"
                href={`mailto:${email}`}
              >
                <Email fontSize="inherit" />
              </Fab>
            </Tooltip>
          )}
          {website && (
            <Tooltip id="tooltip-icon" title="Visit Website">
              <Fab
                className={classes.fab}
                color="default"
                size="small"
                href={`http://${website}`}
                target="_blank"
              >
                <Language fontSize="inherit" />
              </Fab>
            </Tooltip>
          )}
        </div>
      )}
      {address && 
        <div className="mt-30">
          <h3>Address</h3>
          <span>{address}</span>
        </div>
      }
    </div>
  );
}

export { Contact };
