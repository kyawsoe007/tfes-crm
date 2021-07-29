import React from "react";

const FormInputLayout = props => (
  <div className="row p-30 justify-content-center">
    <div className="col-lg-5 px-20">
      <div>
        <h2>{props.title}</h2>
        <p className="text-muted">{props.desc}</p>
      </div>
    </div>
    <div className="col-lg-6 px-20">
      <div className="row justify-content-center">
        <div className="col-md-5 d-block">
          {console.log(props.leftCol)}
          {props.leftCol &&
            props.leftCol.map((col, key) => (
              <React.Fragment key={key}>{col}</React.Fragment>
            ))}
        </div>
        <div className="col-md-5 d-block offset-md-1">
          {props.rightCol &&
            props.rightCol.map((col, key) => (
              <React.Fragment key={key}>{col}</React.Fragment>
            ))}
        </div>
      </div>
      {props.fullRow &&
        props.fullRow.map((row, key) => (
          <div className="row justify-content-center" key={key}>
            <div className="col-md-11">{row}</div>
          </div>
        ))}
    </div>
  </div>
);

export default FormInputLayout;
