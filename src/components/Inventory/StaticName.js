import React, { Component } from "react";

class StaticName extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.title != nextProps.title) {
      return true;
    }
    return false;
  }

  render() {
    const { title } = this.props;

    return (
      <span
        style={{
          paddingBottom: 10,
          paddingTop: 10,
          color: "rgba(150,150,150,1)"
        }}
      >
        {title}
      </span>
    );
  }
}

export default StaticName;
