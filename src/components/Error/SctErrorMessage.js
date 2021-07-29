import React from "react";

const SctErrorMessage = ({ heading, message }) => {
  return (
    <div className="text-center mt-40">
      <h3>{heading}</h3>
      <p>{message ? message : "Sorry! Please Contact Support :("}</p>
    </div>
  );
};

export default SctErrorMessage;
