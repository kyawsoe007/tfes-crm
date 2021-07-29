import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { Fab } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

function MoreButton(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const { children } = props;
  const ITEM_HEIGHT = 48;
  return (
    <div>
      <Tooltip title="More" placement="bottom">
        <Fab
          size="small"
          variant="round"
          color="secondary"
          className="text-white ml-10"
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <i className="zmdi zmdi-more zmdi-hc-lg" />
        </Fab>
      </Tooltip>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            minWidth: 150
          }
        }}
      >
        {children.map((child, key) => {
          return (
            <MenuItem key={key} onClick={child.handleOnClick}>
              {child.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}

export default MoreButton;
