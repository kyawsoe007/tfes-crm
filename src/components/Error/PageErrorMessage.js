import React from "react";

const PageErrorMessage = ({ heading, message }) => {
  return (
    <div className="text-center" style={{ height: "calc(100vh - 280px)" }}>
      <div style={{ marginTop: "auto" }}>
        <h3>{heading}</h3>
        <p>{message && message}</p>
      </div>
    </div>
  );
};

export default PageErrorMessage;
