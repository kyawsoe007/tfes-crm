import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const DrawerListItem = ({ onClickListItem, title, secondary, selected }) => {
  return (
    <ListItem selected={selected} button onClick={onClickListItem}>
      {secondary ? (
        <ListItemText secondary={title} />
      ) : (
        <ListItemText primary={title} />
      )}
    </ListItem>
  );
};

export default DrawerListItem;
