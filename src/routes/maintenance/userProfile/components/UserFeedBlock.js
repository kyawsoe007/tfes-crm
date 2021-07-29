import React from "react";
import { connect } from "react-redux";
import { Person } from "@material-ui/icons";

import TabsWrapper from "Components/Tabs/TabsWrapper";
import RctSectionLoader from "Components/RctSectionLoader";

// forms
import UpdateUserDetailsForm from "./forms/UpdateUserDetailsForm";
import UpdatePasswordForm from "./forms/UpdatePasswordForm";
import { useDispatch, useSelector } from 'react-redux'
const UserFeedBlock = ({ loggedInUser, loading, authState }) => {
  const userLogin = useSelector((state) => state.sessionState.authState.user)
  // const userLogin = useSelector((state) => state.userState.singleProfileUser.data)

  return (
    <React.Fragment>
      <TabsWrapper>
        <div icon={<Person />} label="Update Your Details">
          {loading ? (
            <RctSectionLoader />
          ) : (
              <UpdateUserDetailsForm user={authState} userData={userLogin}/>
          )}
        </div>
        <div icon={<Person />} label="Update Your Password">
          {loading ? (
            <RctSectionLoader />
          ) : (
            <UpdatePasswordForm user={authState} userData={userLogin}/>
          )}
        </div>

      </TabsWrapper>
    </React.Fragment>
  );
};
const mapStateToProps=({sessionState})=>{
  const {authState} = sessionState;
  return {authState};
  // return userState;

}

export default connect(mapStateToProps)(UserFeedBlock);

