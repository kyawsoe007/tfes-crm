import React, { Component } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

class Input extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.value != nextProps.value) {
      return true;
    }
    return false;
  }

  render() {
    const {
      title,
      placeholder,
      value,
      _HandleProduct,
      element,
      style,
      divStyle,
      textarea,
      type,
      read
    } = this.props;

    let styles = { ...style };
    let divStyles = { ...divStyle };
    divStyles.flexDirection = "column";

    if (textarea) {
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
          <textarea
            type={element}
            placeholder={placeholder}
            value={value}
            onChange={e => _HandleProduct(e.target.value, element)}
            style={styles}
            readOnly={read}
          />
        </div>
      );
    } else if (type == "number") {
      styles.padding = 5;

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
          <FormControl
            type="number"
            placeholder={placeholder}
            aria-label={placeholder}
            style={styles}
            value={value}
            onChange={e => _HandleProduct(e.target.value, element)}
            readOnly={read}
          />
        </div>
      );
    } else {
      styles.padding = 5;

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
          <FormControl
            type={element}
            placeholder={placeholder}
            value={value}
            onChange={e => _HandleProduct(e.target.value, element)}
            style={styles}
            readOnly={read}
          />
        </div>
      );
    }
  }
}

export default Input;
