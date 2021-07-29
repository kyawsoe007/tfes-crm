/**
 * Login Page
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FormGroup, Input, FormFeedback } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from "@material-ui/core/Fab";

// app config
import AppConfig from "Constants/AppConfig";

// redux action
import { userResetPassword } from "Ducks/session/forgetPassword";
import { EmailValidator } from "../register/components/Validation";

class forgetpassword extends Component {
  constuctor() {}

  state = {
    emailAddress: "",
    emailValidated: "",
    error: null
  };

  resetPassword = () => {
    if (this.state.emailValidated == "has-success") {
      this.props.userResetPassword(this.state.emailAddress);
    }

    if (this.state.emailAddress.length == 0) {
      this.setState({ error: "Email field cannot be empty" });
    }
  };

  render() {
    const { emailAddress } = this.state;
    const { loading } = this.props;

    return (
      <div className="login_index">
        {loading && <LinearProgress />}

        <div className="login_module">
          <div className="row justify-content-center">
            <div className="col-md-8 col-sm-12">
              <div className="session-body text-center">
                <div
                  className="logo-mini"
                  style={{ marginBottom: 25, textAlign: "left" }}
                >
                  <img
                    src={require("Assets/img/TFES_Logo_Pantone.png")}
                    alt="site logo"
                    width="150"
                  />
                  <p
                    className="session-head fw-light text-left mb-30 fs-14 text-muted"
                    style={{ margin: 5 }}
                  >
                    Work-life has never been better
                  </p>
                </div>

                <h2 className="text-left">
                  Lost your account?
                  <br />
                  We've got you covered
                </h2>
                <p className="session-head fw-light text-left mb-30 fs-14 text-muted">
                  Enter your email address
                  <br />
                  and you will receive a reset password link
                </p>

                <FormGroup className="has-wrapper">
                  <Input
                    type="email"
                    value={emailAddress}
                    name="emailAddress"
                    id="emailAddress"
                    style={emailAddress ? EmailStyle : emptyField}
                    className="has-input input-lg"
                    placeholder="Enter Email Address"
                    onChange={event => {
                      this.setState({ emailAddress: event.target.value });
                      this.setState({
                        emailValidated: EmailValidator(event.target.value)
                      });
                    }}
                    valid={this.state.emailValidated === "has-success"}
                    invalid={this.state.emailValidated === "has-danger"}
                  />
                  <span className="has-icon">
                    <i className="ti-email" />
                  </span>
                  <FormFeedback>
                    You need to input a valid email addresss!
                  </FormFeedback>
                  <FormFeedback valid>The email address is valid!</FormFeedback>
                </FormGroup>
                {this.state.error && (
                  <div>
                    <p className="text-danger">{this.state.error}</p>
                  </div>
                )}
                <FormGroup>
                  <Fab
                    variant="extended"
                    className="text-white"
                    size="medium"
                    style={{
                      backgroundColor: AppConfig.themeColors.primary,
                      marginBottom: "1.5rem"
                    }}
                    onClick={() => this.resetPassword()}
                  >
                    <span className="px-10">Recover email</span>
                  </Fab>
                  <div className="d-flex justify-content-center align-items-center">
                    <p
                      className="fs-12 fw-light"
                      style={{ color: "rgba(0,0,0,0.4)" }}
                    >
                      Back to
                      <a
                        className="ml-5 fw-semi-bold"
                        onClick={() => this.props.history.push("/login")}
                      >
                        Login
                      </a>
                    </p>
                  </div>
                </FormGroup>
              </div>
            </div>
          </div>
        </div>

        <div
          className="login_placeholder"
          style={{ flexDirection: "column", justifyContent: "center" }}
        >
          <img
            src={require("Assets/img/appSignUp_yellow.png")}
            alt="site logo"
            style={{
              height: "45%",
              marginBottom: 25
            }}
          />

          <h2 className="text-center">Overview In One Click</h2>
          <p className="session-head fw-light text-center mb-30 fs-14 text-muted">
            Digitalise your workprocesses to cloud
            <br />
            Accessable anywhere and anytime
          </p>
        </div>
      </div>
    );
  }
} // map state to props
const mapStateToProps = ({ sessionState }) => {
  const { forgetPasswordState } = sessionState;
  const { user, loading } = forgetPasswordState;
  return { user, loading };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      userResetPassword
    }
  )(forgetpassword)
);

const emptyField = {
  borderBottom: "0.3px solid rgba(0,0,0,0.5)",
  borderRadius: 0,
  padding: 0,
  boxShadow: "none",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  fontWeight: "300",
  fontSize: "16px",
  color: "#ebedf2"
};

const EmailStyle = {
  borderBottom: "0.3px solid rgba(0,0,0,0.5)",
  borderRadius: 0,
  padding: 0,
  boxShadow: "none",
  borderTop: "none",
  borderLeft: "none",
  borderRight: "none",
  fontWeight: "500",
  fontSize: "18px",
  color: "black"
};
