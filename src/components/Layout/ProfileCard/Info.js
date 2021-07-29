import React from "react";
import { ArrowForward } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemAvatar, Avatar } from "@material-ui/core";
import EverydayAvatar from "Components/Avatar";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  listItem: {
    paddingLeft: "10px"
  }
}));

function Info(props) {
  const { icon, title, subtitle, onClick, button } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <List disablePadding className={classes.root}>
        <ListItem
          className={classes.listItem}
          onClick={onClick}
          button={button}
        >
          <ListItemAvatar>
            {icon ? (
              <Avatar>{icon}</Avatar>
            ) : (
              <EverydayAvatar name={title} size={40} />
            )}
          </ListItemAvatar>
          <div className="media-body py-5 my-auto d-flex justify-content-between">
            <div>
              <p className="mb-0">{title}</p>
              <p className="text-muted fs-14 mb-0 d-block">
                {subtitle && subtitle}
              </p>
            </div>
            {onClick && (
              <div className="my-auto">
                <ArrowForward fontSize="inherit" />
              </div>
            )}
          </div>
        </ListItem>
      </List>
    </React.Fragment>
  );
}

export { Info };
