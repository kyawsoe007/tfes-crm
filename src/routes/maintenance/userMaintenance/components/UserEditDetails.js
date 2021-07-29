import React, { Component, Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
// Component Imports
import { listOptions, getDateTime } from "Helpers/helpers";
import FormInput from "Components/Form/FormInput";
// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import RecordsList from 'Components/RecordsList'

import DialogRoot from 'Components/Dialog/DialogRoot'
import {connect} from "react-redux";
import { show } from "redux-modal";
import { getuser,createUser,patchUser,getOneUser } from "Ducks/user"
import { ThumbDownSharp } from "@material-ui/icons";


// const UserEditDetails = ({name, show, handleHide}) => {
  class UserEditDetails extends Component{
    constructor(props){
      super(props)
      this.state={

      }
    }

    componentDidMount() {
      if (this.props.id) {
        this.props.getOneUser(this.props.id);
      }
    }
    render() {
  console.log('id',this.props.id)
    return(
    <DialogRoot
      show={show}
      handleHide={handleHide}
      size={'lg'}
    >
      <form autoComplete="off">
        <h3 style={{ marginLeft: 35 }}>User Contact Details</h3>
        <div className="row mb-20 justify-content-center">
          <div className="col-5">
            <FormInput
              label="First Name"
              target="firstName"
              value={this.state.firstName}
              onChange={(e) => this.setState({ firstName: e.target.value })}
            //  required={!baseContact.firstName}
              // handleChange={handleChange}z`
            />
            {console.log(state)}

          </div>
          <div className="col-5 offset-md-1">
            <FormInput
              label="Last Name"
              target="lastName"
              value={this.state.lastName}
              onChange={(e) => this.setState({ lastName: e.target.value })}
              // handleChange={this.props.handleChange}
            />
          </div>
        </div>
        <h3 style={{ marginLeft: 35 }}>Login Details</h3>
        <div className="row justify-content-center">
          <div className="col-11">
            <FormInput
              label="Email"
              target="email"
              disabled= "true"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            //   required={!email}  
              // handleChange={handleChange}
            />
          </div>
        </div>
       
          <div className="row justify-content-center">
          <div className="col-11">
          <FormInput
                label="User Role"
                      // value={state.role}
                      target="role"
                      // handleChange={handleChange}
                      selectValueName="name"
                selectValues={[
                                { name: 'admin', value: 'admin' },
                                { name: 'finance', value: 'finance' },
                                { name: ' sales ', value: 'sales' },
                                { name: 'purchase ', value: 'purchase' },
                                { name: 'warehouse ', value: 'warehouse' },
                               ]}
              />
          </div>

          
          </div>
          <div className="d-flex mt-40 justify-content-end" >
          <button onClick={this.patchUserData} style={{backgroundColor:"red"  ,color:"white"}}> Save </button>
          <button onClick={this.props.handleHide} style={{backgroundColor:"red"  ,color:"white"}}> Close </button>
        </div>
        <div className="d-flex mt-40 justify-content-end" >
          <button className="primary_btn" onClick={onSubmit} disabled={state.isLoading} > Save and Close  </button>
        </div>

      </form>

    </DialogRoot>
  )
}
  }

export default UserEditDetails;