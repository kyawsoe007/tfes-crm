import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Menu, MenuItem } from "@material-ui/core";
import { MoreHorizOutlined, Add } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  buttonGroup: {
    boxShadow: theme.custom.boxShadow,
    marginLeft: theme.spacing(3)
  },
  menuPaper: {
    minWidth: "120px"
  }
}));

function ActionButtonGroup(props) {
  const classes = useStyles();
  const [menu, setMenu] = React.useState(null);
  const { buttons } = props;

  // Handle more button click
  function handleClick(event) {
    setMenu(event.currentTarget);
  }
  function handleClose() {
    setMenu(null);
  }
  return (
    <React.Fragment>
      <ButtonGroup variant="contained" className={classes.buttonGroup}>
        {buttons.add && (
          <Button onClick={buttons.add.onClick}>
            <Add fontSize="small" />
          </Button>
        )}
        {buttons.mid && (
          <Button onClick={buttons.mid.onClick}>{buttons.mid.label}</Button>
        )}
        {buttons.more && (
          <Button
            aria-owns={menu ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreHorizOutlined fontSize="small" />
          </Button>
        )}
      </ButtonGroup>
      <Menu
        id="simple-menu"
        anchorEl={menu}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={Boolean(menu)}
        onClose={handleClose}
        PaperProps={{ className: classes.menuPaper }}
      >
        {buttons.more &&
          buttons.more.map((button, key) => (
            <MenuItem key={key} onClick={button.onClick}>
              {button.label}
            </MenuItem>
          ))}
      </Menu>
    </React.Fragment>
  );
}

export default ActionButtonGroup;
