import React from "react";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    zIndex: 90,
    position: "relative",
    height: "auto",
    borderRadius: "15px"
  },
  root: {
    width: "100%",
    padding: 10
  }
}));

export default function SideDrawer(props) {
  const classes = useStyles();
  const { children, listHeader } = props;
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <List
        className={classes.root}
        subheader={<ListSubheader>{listHeader}</ListSubheader>}
      >
        {children}
      </List>
    </Drawer>
  );
}
