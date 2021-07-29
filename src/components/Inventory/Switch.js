import React, { Component } from "react";

import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

class SwitchButton extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.checked != nextProps.checked) {
      return true;
    }
    return false;
  }

  render() {
    const { title, divStyle, checked, _HandleProduct, element } = this.props;

    let divStyles = { ...divStyle };
    divStyles.flexDirection = "column";

    return (
      <div className="d-flex" style={divStyles}>
        <span
          style={{
            paddingBottom: 10,
            paddingTop: 10,
            color: "rgba(150,150,150,1)"
          }}
        >
          {title}
        </span>
        <FormControlLabel
          checked={checked}
          value={checked}
          control={<Switch color="primary" />}
          labelPlacement="top"
          // label="Feature"
          onChange={e => _HandleProduct(checked, element)}
        />
      </div>
    );
  }
}

export default SwitchButton;
