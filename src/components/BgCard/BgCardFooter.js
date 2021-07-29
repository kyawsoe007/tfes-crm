import React from "react";

const BgCardFooter = ({ children, customClasses }) => (
  <div className={`rct-block-footer ${customClasses ? customClasses : ""}`}>
    {children}
  </div>
);

export default BgCardFooter;
