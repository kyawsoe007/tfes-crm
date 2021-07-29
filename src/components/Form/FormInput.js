import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  InputLabel,
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import BaseInput from "Components/Form/BaseInput";

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    width: "100%",
  }
});

class FormInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      // isToggledEditForm: true,
      formColor:
        this.props.isToggledEditForm ||
          this.props.isToggledEditForm === undefined
          ? "black"
          : "blue",
    };
  }

  componentDidUpdate(prevProps, prevState) {

    // when value changes
    if (this.props.value != this.props.original) {
      this.setState({
        formColor: "red",
      });
      
      // If duplicate, initialise as blue,
    } else if (!this.props.isToggledEditForm) {
      this.setState({
        formColor:"blue",
      });
    }
    // when results change back to original/or when initialising 
    else {
      this.setState({
        formColor: "black",
      });
    }
    
  }
  changeValue = (evt) => {
    //compare new value with original value
    // console.log("value: ", this.props.value);
    // console.log("original: ", this.props.original);
    // console.log("evt.value: ", evt.target.value);
    if (evt.target.value != this.props.original) {
      //console.log("come in for Red");
      this.setState({
        formColor: "red",
      });
    } else {
      //console.log("come in here for black or blue");
      if (this.props.isToggledEditForm) {
        // if editForm
        this.setState({ formColor: "black" });
      } else {
        // if replicateForm
        this.setState({ formColor: "blue" });
      }
    }

    this.props.handleChange(
      this.props.target,
      evt.target.value,
      this.props.keys
    );
  };

  render() {
    const {
      classes,
      value,
      handleChange,
      placeholder,
      disabled,
      required,
      label,
      selectValues,
      target,
      keys,
      helperText,
      selectValueKey,
      selectValueName,
      hasButton,
      secondButton,
      thirdButton,
      buttonClick,
      secondButtonClick,
      thirdButtonClick,
      isToggledEditForm,
      ...others
    } = this.props;
    // console.log('search',hasButton)
    return (
      <FormControl className={classes.root}>
        {label && (
          <React.Fragment>
            <div
              className="
            labelTest"
            >
              <InputLabel className="fw-bold " shrink>
                {label}
              </InputLabel>
            </div>
            {hasButton && (
              <Button
                className="textButton"
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "#2B4DA0",
                }}
                onClick={(e) =>
                  this.props.buttonClick && this.props.buttonClick(target)
                }
              >
                Search
              </Button>
            )}
            {secondButton && (
              <Button
                className="textButton"
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "#2B4DA0",
                  marginRight: "70px"
                }}
                onClick={(e) =>
                  this.props.secondButtonClick && this.props.secondButtonClick(target)
                }
              >
                BOM
              </Button>
            )}
            {thirdButton && (
              <Button
                className="textButton"
                variant="contained"
                size="small"
                style={{
                  backgroundColor: "#2B4DA0",
                  marginRight: "70px"
                }}
                onClick={(e) =>
                  this.props.thirdButton && this.props.thirdButtonClick(target)
                }
              >
                Create
              </Button>
            )}
          </React.Fragment>
        )}
        {selectValues ? (
          <Select
            style={{ color: this.state.formColor }}
            value={value}
            // onChange={(e) => handleChange(target, e.target.value, keys)}
            onChange={this.changeValue}
            input={<BaseInput {...others} />}
          >
            {selectValues &&
              selectValues.map((select, key) => (
                <MenuItem
                  key={key}
                  value={select[selectValueKey ? selectValueKey : "value"]}
                >
                  {selectValueName ? select[selectValueName] : select.name}
                </MenuItem>
              ))}
          </Select>
        ) : (
          <BaseInput
            value={value}
            onChange={this.changeValue}
            placeholder={placeholder}
            disabled={disabled}
            style={{ color: this.state.formColor }}
            {...others}
          />
        )}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        {required && <FormHelperText error>* Required Field</FormHelperText>}
      </FormControl>
    );
  }
}

export default withStyles(styles)(FormInput);
