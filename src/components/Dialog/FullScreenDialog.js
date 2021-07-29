import React from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = ({
  children,
  show,
  handleHide,
  title,
  dialogAction,
  dialogActionLabel
}) => {
  return (
    <Dialog
      fullScreen
      open={show}
      onClose={handleHide}
      TransitionComponent={Transition}
    >
      <AppBar position="relative" color="secondary">
        <Toolbar variant="dense">
          <IconButton color="inherit" onClick={handleHide} aria-label="Close">
            <CloseIcon className="text-white" fontSize="small" />
          </IconButton>
          <h2 className="ml-10 mb-0 text-white">{title}</h2>
          {dialogAction && (
            <Button
              size="small"
              className="ml-auto btn-success text-white"
              variant="contained"
              onClick={dialogAction}
            >
              {dialogActionLabel}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className="p-20">{children}</div>
    </Dialog>
  );
};

export default FullScreenDialog;
