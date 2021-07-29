import React from "react";
import classnames from "classnames";

function BgCard(props) {
  const {
    children,
    heading,
    fullBlock,
    customClasses,
    customStyles,
    actionButtons,
    headingCustomClasses,
    contentCustomClasses
  } = props;
  return (
    <div className="d-block">
      <div
        className={`rct-block ${customClasses ? customClasses : ""}`}
        style={customStyles}
      >
        {(heading || actionButtons) && (
          <div
            className={`rct-block-title d-flex align-items-center justify-content-between ${
              headingCustomClasses ? headingCustomClasses : ""
            }`}
          >
            <h4>{heading ? heading : ""}</h4>
            {actionButtons && <div className="">{actionButtons}</div>}
          </div>
        )}
        <div
          className={classnames(
            contentCustomClasses ? contentCustomClasses : "",
            { "rct-block-content": !fullBlock, "rct-full-block": fullBlock }
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default BgCard;
