import React, { Component } from "react";

class Text extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value != nextProps.value) {
      return true;
    }
    return false;
  }

  render() {
    const { title, value, divStyle, inputStyle } = this.props;

    let divStyles = { ...divStyle };
    divStyles.flexDirection = "column";

    let inputStyles = {};

    if (inputStyle) {
      inputStyles = inputStyle;
    }

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
        <span style={inputStyles}>{value}</span>
      </div>
    );
  }
}

export default Text;
