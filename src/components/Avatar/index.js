import React from "react";
import Avatar from "@material-ui/core/Avatar";

const IconAvatar = ({ name, size, customClasses, props }) => {
  function getInitials(name) {
    if (name) {
      var array = name.split(" ");
      switch (array.length) {
        case 1:
          return array[0].charAt(0).toUpperCase();
          break;
        default:
          return (
            array[0].charAt(0).toUpperCase() +
            array[array.length - 1].charAt(0).toUpperCase()
          );
      }
    }
    return false;
  }

  var getFontSize = () => {
    if (size == "40") return "12px";
    else if (size == "60") return "18px";
    else if (size == "80") return "24px";
    else if (size == "100") return "26px";
    else if (size == "120") return "28px";
    else return "12px";
  };
  return (
    <Avatar
      className={`size-${size} rounded-circle ${customClasses} d-flex justify-content-center`}
      style={{ fontSize: getFontSize() }}
    >
      {getInitials(name)}
    </Avatar>
  );
};

export default IconAvatar;
