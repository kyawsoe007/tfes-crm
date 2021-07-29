import React, { PureComponent } from "react";

class RemoveButton extends PureComponent {
  render() {
    const { _Function, product, files, name} = this.props;

    return (
      <div >
        <button
          style={{
            border: "none",
            backgroundColor: "#df0021",
            height: "30px",
            width: "80px",
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 15,
            marginBottom: 10,
            textAlign: "center",
            marginTop: 20,
            color: "white",
            float: "right",
          }}
          onClick={() => _Function(product, files)}
        >
          {name ? name : "Remove"}
        </button>
      </div>
    );
  }
}

export default RemoveButton;
