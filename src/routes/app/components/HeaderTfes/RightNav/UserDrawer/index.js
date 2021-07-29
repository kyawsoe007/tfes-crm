import React from "react";
import Drawer from "@material-ui/core/Drawer";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Person } from "@material-ui/icons";

import UserDrawerContent from "./UserDrawerContent";

export default function UserDrawer() {
  const [state, setState] = React.useState({
    show: false
  });

  const toggleDrawer = () => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ show: !state.show });
  };

  return (
    <React.Fragment>
      <li className="list-inline-item">
        <Tooltip title="User" placement="bottom">
          <IconButton aria-label="user" onClick={toggleDrawer()}>
            <Person fontSize="small" />
          </IconButton>
        </Tooltip>
      </li>
      <Drawer
        anchor="right"
        open={state.show}
        onClose={toggleDrawer()}
        PaperProps={{ style: { backgroundColor: "#fffffff2", width: 450 } }}
      >
        <UserDrawerContent toggleDrawer={toggleDrawer} />
      </Drawer>
    </React.Fragment>
  );
}
