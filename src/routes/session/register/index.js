import React, { Component } from "react";
import { Link } from "react-router-dom";

// app config
import AppConfig from "Constants/AppConfig";

import RegisterSteps from "./components/RegisterSteps";

class RegisterPage extends Component {
  routeChange = () => {
    let path = `/login`;
    this.props.history.push(path);
  };

  render() {
    return (
      <div className="login_index">
        <div
          className="register_placeholder"
          style={{ flexDirection: "column", justifyContent: "center" }}
        >
          {/* Placeholder Image */}
          {/* <video src={VideoSource} width="600" height="300" controls="controls" autoplay="true" type="video/mp4"/> */}
          <img
            src={require("Assets/img/appSignUp_yellow.png")}
            alt="site logo"
            style={{
              height: "35%",
              marginBottom: 25
            }}
          />

          <h2 className="text-center">One Time Setup</h2>
          <p className="session-head fw-light text-center mb-30 fs-14 text-muted">
            Digitalise your workprocesses to cloud
            <br />
            Accessable anywhere and anytime
          </p>
        </div>

        <div className="register_module">
          <div
            style={{
              overflow: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Link to="/" className="logo-mini">
              <img
                src={require("Assets/img/TFES_Logo_Pantone.png")}
                alt="site logo"
                width="150"
              />
            </Link>

            <p
              className="session-head fw-light text-center mb-30 fs-14 text-muted"
              style={{ margin: 5 }}
            >
              {AppConfig.tagLine}
            </p>

            <RegisterSteps history={this.routeChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterPage;
