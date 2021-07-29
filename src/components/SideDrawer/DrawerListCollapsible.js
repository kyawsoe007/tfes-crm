import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

const DrawerListCollapsible = ({ title, state, openNested, children }) => {
  return (
    <React.Fragment>
      <ListItem button onClick={openNested}>
        <ListItemText primary={title} />
        {state ? <ExpandMore /> : <ExpandLess />}
      </ListItem>
      <Collapse component="li" in={state} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default DrawerListCollapsible;
