import React, { PureComponent } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmButton extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    handleOpen = () => {
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    render() {
        const { _Function, product, files, name } = this.props;
        const { open } = this.state;

        return (
            <div >
                <button
                    type="button"
                    style={{
                        border: "none",
                        backgroundColor: "#254065",
                        height: "30px",
                        width: "150px",
                        paddingLeft: 15,
                        paddingRight: 15,
                        borderRadius: 15,
                        marginBottom: 10,
                        textAlign: "center",
                        marginTop: 20,
                        color: "white",
                        float: "right",
                        cursor: "pointer",
                    }}
                    // onClick={() => _Function(product, files)}
                    onClick={this.handleOpen}>
                    {name ? name : "Confirm"}
                </button>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Quotation Confirmation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to confirm the Quotation Order?
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Yes
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            No
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmButton;
