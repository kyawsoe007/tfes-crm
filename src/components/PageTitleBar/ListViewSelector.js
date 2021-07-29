import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

function ListViewSelector(props) {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  function toggle() {
    setdropdownOpen(!dropdownOpen);
  }
  const { options, nowShowing, onChangeValue } = props;
  return (
    <Dropdown isOpen={dropdownOpen} toggle={() => toggle()}>
      <DropdownToggle color="info" className="text-white mr-15" caret>
        {nowShowing}
      </DropdownToggle>
      <DropdownMenu>
        {options.map((opt, key) => {
          return (
            <DropdownItem
              style={{ padding: "0.45rem 1.5rem" }}
              onClick={() => onChangeValue(opt)}
              key={key}
            >
              {opt.name}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
      {console.log(props)}
    </Dropdown>
  );
}

export default ListViewSelector;
