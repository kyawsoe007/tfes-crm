import React, { Component } from "react";
import { connect } from "react-redux";

import FormInput from "Components/Form/FormInput";
import { Button } from "@material-ui/core";
import RctSectionLoader from "Components/RctSectionLoader";

import { updateCurrentUser ,getUserRights} from "Ducks/session/auth";
import { getUserProfile } from "Ducks/user";
class UpdateUserDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.userData;
    console.log('p',this.props.userData)
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleChangeBaseContact = this.handleChangeBaseContact.bind(this);
  }

  componentDidMount() {
    this.props.getUserProfile();
    if (this.props.singleProfileUser.data && this.props.singleProfileUser.data._id) {
      this.setState({...this.props.singleProfileUser.data})
    }
}
  handleChange(field, value) {
    this.setState({ [field]: value });
  }
  handleChangeBaseContact(field, value) {
    this.setState({
     [field]: value 
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.singleProfileUser.data !== this.props.singleProfileUser.data) {
      if (this.props.singleProfileUser && this.props.singleProfileUser._id) {
        let newState = {
          firstName: this.props.singleProfileUser.data.firstName,
          lastName: this.props.singleProfileUser.data.lastName,
          mobile:this.props.singleProfileUser.data.mobile
        }
        this.setState({
          ...this.state,
          ...newState
      })
    }
    }
    if (prevState !== this.state) {
      console.log("ASDASDA", prevState)
      this.forceUpdate()
    }
}
  submitForm() {
    let newState = {
      ...this.state,
      // id:this.state.userId
      id: this.state._id
    }

    console.log("NEW STATE", newState);
    this.props.updateCurrentUser(newState);
  }

  render() {
    const { baseContact,firstName,lastName, mobile, email } = this.state;
    return (
      <React.Fragment>
        {this.props.singleProfileUser.loading? (
          <RctSectionLoader />
        ) : (
          <form>
            <div className="row justify-content-center">
              <div className="col-5">
                <FormInput
                  label="First Name"
                  defaultValue={this.props.singleProfileUser.data.firstName}
                  target="firstName"
                  handleChange={this.handleChangeBaseContact}
                />

                <FormInput
                  label="Mobile"
                  defaultValue={this.props.singleProfileUser.data.mobile}
                  target="mobile"
                  handleChange={this.handleChange}
                />
              </div>
              <div className="col-5 offset-md-1">
                <FormInput
                  label="Last Name"
                  defaultValue={this.props.singleProfileUser.data.lastName}
                  target="lastName"
                  handleChange={this.handleChangeBaseContact}
                />
              </div>
            </div>
            <div className="d-flex flex-row-reverse my-20">
              <Button
                variant="contained"
                className="text-white"
                onClick={this.submitForm}
                style={{backgroundColor:"#DF0021"}}
              >
                Save
              </Button>
            </div>
          </form>
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps=({userState})=>{
  // const {authState} = sessionState;
  // const{ loggedInUser} =authState;
  // return {loggedInUser};
  return userState;

}
export default connect(mapStateToProps, { updateCurrentUser,getUserRights,getUserProfile })(UpdateUserDetailsForm);
