import React, { PureComponent } from "react";

class Button extends PureComponent {
  render() {
    const { _Function, product, files, title, divStyle } = this.props;

    return (
      <div style={divStyle}>
        <button
          style={{
            border: "none",
            backgroundColor: "rgba(244, 132, 33, 1",
            padding: 10,
            paddingLeft: 25,
            paddingRight: 25,
            borderRadius: 5,
            marginBottom: 10,
            marginTop: 10,
            color: "white"
          }}
          onClick={() => _Function(product, files)}
        >
          {title}
        </button>
      </div>
    );
  }
}

export default Button;
