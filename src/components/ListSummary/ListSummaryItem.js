import React from "react";

const ListSummaryItem = ({ heading, number, color }) => {
  return (
    <li className="list-inline-item col">
      <h4 style={{ color: color }}>{heading}</h4>
      <h2 className="font-2x">{number}</h2>
    </li>
  );
};

export default ListSummaryItem;
