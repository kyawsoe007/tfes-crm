import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import { withStyles } from "@material-ui/core/styles";
import { InputLabel, FormControl, FormHelperText } from "@material-ui/core";
import BaseInput from "Components/Form/BaseInput";
import CustomerPickerDialog from "./CustomerPickerDialog";

const styles = theme => ({
  root: {
    marginBottom: theme.spacing(1),
    width: "100%"
  }
});

class CustomerPicker extends Component {
  constructor(props) {
    super(props);
  }

  renderName(value) {
    const selected = Object.assign([], this.props.tableData).find(
      cust => cust.id == value
    );
    if (selected) {
      return selected.name;
    } else {
      return "";
    }
  }

  render() {
    const { classes, value, handleChange, required, target, show } = this.props;
    return (
      <React.Fragment>
        <FormControl className={classes.root}>
          <InputLabel className="fw-bold" shrink>
            Customer
          </InputLabel>
          <BaseInput
            value={this.renderName(value)}
            readOnly
            onFocus={() => show("customer_picker")}
            onClick={() => show("customer_picker")}
          />
          {required && <FormHelperText error>* Required Field</FormHelperText>}
        </FormControl>
        <CustomerPickerDialog
          onSelect={handleChange}
          selected={value}
          target={target}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ crmState }) => {
  const { customerState } = crmState;
  const { customerList } = customerState;
  const { tableData } = customerList;
  return { tableData };
};

export default connect(mapStateToProps, { show })(
  withStyles(styles)(CustomerPicker)
);
