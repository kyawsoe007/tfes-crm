import React from "react";
import ListSummaryItem from "./ListSummaryItem";

const ListSummary = ({ summary }) => {
  return (
    <ul className="list-inline d-flex align-content-center">
      {summary &&
        summary.map((sum, key) => {
          return (
            <ListSummaryItem
              key={key}
              heading={sum.summaryName}
              number={sum.number}
              color={sum.color}
            />
          );
        })}
    </ul>
  );
};

export default ListSummary;
