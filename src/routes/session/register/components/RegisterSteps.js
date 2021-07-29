import React from "react";
import { connect } from "react-redux";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import Paper from "@material-ui/core/Paper";
import StepButton from "@material-ui/core/StepButton";

import Fab from "@material-ui/core/Fab";
import AppConfig from "Constants/AppConfig";

// Form Components
import RegisterForm from "./Forms/UserRegisterForm";
import SelectPlanForm from "./Forms/SelectPlanForm";
import PaymentDetailForm from "./Forms/PaymentDetailForm";

import RctPageLoader from "Components/RctPageLoader";

// Actions
import {
  registerUser,
  handleRegForm,
  handleRegErrorForm,
  resetSuccess
} from "Ducks/session/register";

import {
  EmailValidator,
  PasswordValidator,
  StepperZeroValidator,
  CheckCreditCard
} from "./Validation";

function getSteps() {
  return ["Enter Your Details", "Select a Plan", "Payment Details"];
}

class RegisterSteps extends React.Component {
  // Set up state for validation
  state = {
    activeStep: 0,
    emailState: "",
    passwordState: "",
    planState: "",
    creditState: {
      payment_name: "",
      payment_no: "",
      payment_expiry: "",
      payment_code: ""
    }
  };

  handleNext = next => {
    let state = { ...this.state };
    if (next) {
      switch (state.activeStep) {
        case 0:
          const [result, info] = StepperZeroValidator(
            this.props,
            state.emailState,
            state.passwordState
          );

          if (result) {
            this.setState({ activeStep: state.activeStep + 1 });
          } else {
            this.props.handleRegErrorForm(info);
          }

          break;

        case 1:
          state.planState !== ""
            ? this.setState({ activeStep: this.state.activeStep + 1 })
            : this.props.handleRegErrorForm("Please tick the one of the plans");
          break;

        case 2:
          this.validateCard();
          break;

        default:
          break;
      }
    } else {
      switch (next) {
        case 0:
          this.setState({ activeStep: 0 });
          break;

        case 1:
          const [result, info] = StepperZeroValidator(
            this.props,
            state.emailState,
            state.passwordState
          );

          if (result) {
            this.setState({ activeStep: 1 });
          } else {
            this.props.handleRegErrorForm(info);
          }
          break;
        case 2:
          const [results, infos] = StepperZeroValidator(
            this.props,
            state.emailState,
            state.passwordState
          );

          if (results) {
            state.planState !== ""
              ? this.setState({ activeStep: 2 })
              : this.props.handleRegErrorForm("Please tick one of the plans");
          } else {
            this.props.handleRegErrorForm(infos);
          }

          break;
        default:
          break;
      }
    }
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  /**
   * Validation of Email | Password before submitting
   */
  validateEmail = e => {
    this.setState({ emailState: EmailValidator(e) });
  };
  validatePassword = (password, repassword) => {
    this.setState({ passwordState: PasswordValidator(password, repassword) });
  };

  /**
   * Validation of Plan before submitting
   */
  validatePlate = e => {
    this.setState({ planState: e });
  };

  /**
   * Validation of Credit Cards
   */
  validateCard = () => {
    const [result, info] = CheckCreditCard(this.props.paymentInfo);
    if (result) {
      this.props.registerUser();
    } else {
      this.props.handleRegErrorForm(info);
    }
  };

  componentDidMount() {
    this.props.resetSuccess();
  }

  render() {
    const steps = getSteps();
    const { activeStep } = this.state;
    const { loading, success } = this.props;
    let StepperPage = null;

    switch (this.state.activeStep) {
      case 0:
        // Implement Email | Password Validation
        StepperPage = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%"
            }}
          >
            <RegisterForm
              validateEmail={e => this.validateEmail(e)}
              emailState={this.state.emailState}
              validatePassword={(password, repassword) =>
                this.validatePassword(password, repassword)
              }
              passwordState={this.state.passwordState}
              {...this.props}
            />
            <div className="text-center">
              <Fab
                variant="extended"
                className="text-white my-20"
                size="medium"
                color="primary"
                type="submit"
                onClick={this.handleNext}
              >
                <span className="px-10">Next</span>
              </Fab>
              <p
                className="fs-12 fw-light"
                style={{ color: "rgba(0,0,0,0.4)" }}
              >
                Already have an account?
                <a className="fw-semi-bold ml-5" onClick={this.props.history}>
                  Login here
                </a>
              </p>
            </div>
          </div>
        );
        break;
      case 1:
        StepperPage = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%"
            }}
          >
            <SelectPlanForm
              validatePlate={e => {
                this.validatePlate(e);
              }}
              {...this.props}
            />

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Fab
                variant="extended"
                className="text-white"
                size="medium"
                style={{
                  backgroundColor: AppConfig.themeColors.primary,
                  marginBottom: "1.5rem",
                  marginRight: 15
                }}
                type="submit"
                onClick={this.handleBack}
              >
                <span className="px-10">Back</span>
              </Fab>

              <Fab
                variant="extended"
                className="text-white"
                size="medium"
                style={{
                  backgroundColor: AppConfig.themeColors.primary,
                  marginBottom: "1.5rem",
                  marginLeft: 15
                }}
                type="submit"
                onClick={this.handleNext}
              >
                <span className="px-10">Next</span>
              </Fab>
            </div>
          </div>
        );
        break;
      case 2:
        StepperPage = (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%"
            }}
          >
            <PaymentDetailForm {...this.props} />

            <div style={{ marginBottom: 15, marginTop: 15 }}>
              By signing up, you agree to Everday's Term of Service*
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Fab
                variant="extended"
                className="text-white"
                size="medium"
                style={{
                  backgroundColor: AppConfig.themeColors.primary,
                  marginBottom: "1.5rem",
                  marginRight: 15
                }}
                type="submit"
                onClick={this.handleBack}
              >
                <span className="px-10">Back</span>
              </Fab>

              <Fab
                variant="extended"
                className="text-white"
                size="medium"
                style={{
                  backgroundColor: AppConfig.themeColors.primary,
                  marginBottom: "1.5rem",
                  marginLeft: 15
                }}
                type="submit"
                onClick={this.handleNext}
              >
                <span className="px-10">Next</span>
              </Fab>
            </div>
          </div>
        );
        break;
      default:
        "Unknown step";
        break;
    }

    // change success to normal for development
    return (
      <div className="w-75 p-3">
        {loading ? (
          <RctPageLoader />
        ) : (
          <div>
            {!success ? (
              <div className="w-100 p-3">
                <Stepper alternativeLabel activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepButton onClick={() => this.handleNext(index)}>
                          <p className="mb-0 text-black">{label}</p>
                        </StepButton>
                      </Step>
                    );
                  })}
                </Stepper>

                <div
                  className="w-100 p-3"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  {StepperPage}
                </div>
              </div>
            ) : (
              <Paper square elevation={0}>
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    paddingLeft: 21,
                    paddingRight: 21
                  }}
                >
                  <h1 style={{ textAlign: "center" }}>
                    A verification link has been sent to your email account
                  </h1>
                  <p style={{ textAlign: "center" }}>
                    Please click on the link that has just been sent to your
                    email account to verify your email and continue the
                    registeration process.
                  </p>

                  <Fab
                    variant="extended"
                    className="text-white"
                    size="medium"
                    style={{
                      backgroundColor: AppConfig.themeColors.primary,
                      marginBottom: "1.5rem",
                      marginLeft: 15
                    }}
                    type="submit"
                    onClick={this.props.history}
                  >
                    <span style={{ width: 80 }}>Login</span>
                  </Fab>
                </div>
              </Paper>
            )}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ sessionState }) => {
  const { registerState } = sessionState;
  const { form, loading, success } = registerState;
  const {
    userInfo,
    companyInfo,
    email,
    password,
    repassword,
    priceplan,
    paymentInfo
  } = form;

  return {
    /*
     * Validating Sign up Process
     */
    loading,
    success,
    /*
     * User Register Form
     */
    userInfo,
    companyInfo,
    email,
    password,
    repassword,
    /*
     * Select Plan Form
     */
    priceplan,
    /*
     * Payment Detail Form
     */
    paymentInfo
  };
};

export default connect(
  mapStateToProps,
  { registerUser, handleRegForm, handleRegErrorForm, resetSuccess }
)(RegisterSteps);
