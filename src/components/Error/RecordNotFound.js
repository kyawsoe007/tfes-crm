import React from "react";

const RecordNotFound = () => {
  return (
    <div className="row py-25 px-30">
      <div className="col-4 offset-md-4">
        <div className="d-flex justify-content-between">
          <div className="mx-auto">
            <i className="zmdi zmdi-alert-triangle zmdi-hc-5x text-danger my-auto" />
          </div>
          <div>
            <h3 className="mb-20">Not Found</h3>
            <p className="mb-10">
              There could be a few reasons you're seeing this:
            </p>
            <ul className="ml-15 fs-14">
              <li>Network Problems</li>
              <li>Record might have been deleted</li>
              <li>Record transferred to another user</li>
              <li>No access to the current record</li>
            </ul>
            <p>For any issues please contact your administrator.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordNotFound;
