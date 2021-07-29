import React, { useEffect,useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import Button from "@material-ui/core/Button";
import { ExitToApp, Settings } from "@material-ui/icons";
import { Scrollbars } from "react-custom-scrollbars";
import FormInput from "Components/Form/FormInput";
// Avatar
import Avatar from "Components/Avatar";

// Logout
import Select from '@material-ui/core/Select';
import { logoutUser,updateMovementUser } from "Ducks/session/auth";
 import {getUser,patchUser} from "Ducks/user"
import { updateCurrentUser ,getUserRights} from "Ducks/session/auth";
function UserDrawerContent(props) {
  const toggleDrawer = props.toggleDrawer;
  const { loggedInUser, history } = props;
  const userLogin = useSelector((state) => state.sessionState.authState.user)
  const [movement,setMovement]=useState(userLogin&& userLogin.movement);
  function toSettingPage() {
    history.push("/app/maintenance/userprofile");
  }
  const dispatch = useDispatch()

  const logoutHandler = () => {
    console.log('calling logout latest')
  // if(movement=='OUT'){
    const data={
      id:userLogin._id,
      firstName: userLogin.firstName,
      lastName:userLogin.lastName,
      // password: userLogin.password,
      email: userLogin.email,
      roles:userLogin.roles,
       movement:'OUT'
    }
    dispatch(updateMovementUser(data))
    dispatch(logoutUser(props.history))
  // }
  }
 
  const setState=()=>{
    const newData={
      id:userLogin._id,
      firstName: userLogin.firstName,
      lastName:userLogin.lastName,
      // password: userLogin.password,
      email: userLogin.email,
      roles:userLogin.roles,
       movement:movement
    }
    dispatch(patchUser(newData))
  }
  
 
  
  const handleChange = (event) => {
  setMovement(event.target.value);
};
console.log('hello',userLogin)
  return (
    <div className="user-drawer" role="presentation" onKeyDown={toggleDrawer()}>
      <div className="d-flex top-drawer">
        <div className="media">
          <div className="media-left mr-25">
            {/* <Avatar name={userLogin.name} size={60} /> */}
          </div>
          <div className="media-body my-auto">
            <h2 className="mb-5">
              {userLogin && userLogin.lastName ? userLogin.lastName : ""}
            </h2>
            <span className="text-muted fs-14 mb-0 d-block">
              {userLogin && userLogin.email ? userLogin.email : ""}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className="row justify-content-center" style={{marginLeft:2,width:'100%'}}>
         
          <div className="col-4">
          <Select
          native
          value={movement}
          onChange={handleChange}
        >
          <option value={'IN'}>IN</option>
          <option value={'AL'}>AL</option>
          <option value={'RSV'}>RSV</option>
          <option value={'VC'}>VC</option>
          <option value={'MC'}>MC</option>
          <option value={'OUT'}>OUT</option>
        </Select>
          </div>
          <div className="col-4">
          <Button
              onClick={setState}
              className="ml-20 btn-success text-white"
              variant="contained"
            >
              Save
            </Button>
            </div>
          </div>
      <Scrollbars
        className="rct-scroll"
        autoHeightMin={350}
        style={{ maxHeight: "calc(100vh - 250px)" }}
      >

      </Scrollbars>
      <div className="drawer-footer">
        <hr />
        <div className="drawer-actions">
          <Button
            variant="text"
            aria-label="settings"
            onClick={() => toSettingPage()}
          >
            {/* icon */}
            <Settings />
            Profile
          </Button>
          <Button
            aria-label="logout"
            onClick={logoutHandler}
          >
            <ExitToApp />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}


export default withRouter(UserDrawerContent)