import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import QueueAnim from "rc-queue-anim";

export default class NotFound extends Component {
  render() {
    return (
      <QueueAnim type="bottom" duration={2000}>
        <div className="error-wrapper" key="1">
          <div className="session-inner-wrapper">
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-9 mx-auto">
                <div className="error-body text-center text-white">
                  <h2 className="mb-50">
                    <Link to="/">
                      <img
                        src={require("Assets/img/appLogo_light.png")}
                        alt="session-logo"
                        className="img-fluid"
                        width="180"
                      />
                    </Link>
                  </h2>
                  <h2 className="bold mb-0" style={{ color: "#fac257" }}>
                    404
                  </h2>
                  <h3 className="error-msg mb-30">
                    Hello, is it me you're looking for?
                  </h3>
                  <h4 className="mb-50">
                    Don't walk into the 404, it could be dangerous!
                  </h4>
                  <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    className="btn-light btn-lg"
                  >
                    Return to Homebase
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueueAnim>
    );
  }
}
