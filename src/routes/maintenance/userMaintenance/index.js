
import React, { Component, Fragment, useState, useEffect } from "react";
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


import AddUserForm from './components/AddUserForm';

import Tooltip from "@material-ui/core/Tooltip";
import { PersonAdd, Edit, Delete } from "@material-ui/icons";
import {connect} from "react-redux";
import { show } from "redux-modal";
import { getuser,createUser,patchUser, deleteUser} from "Ducks/user"

class UserMaintenanceListView extends Component{
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            id:'',
            isEdit: false,
            userPageToggle: false,
            name: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
            email: '',
            roles: [],
            movement:'',
            isLoading: false,
            oldPassword:''
        }
    }
    componentDidMount() {
        // console.log('po',this.props.User)
        this.props.getuser();
    }
    handleChange = (field, value) => {
        this.setState({
          [field]: value,
    
        })
    }
    onSubmit=(e)=> { 

        e.preventDefault();
        
        const newData = {
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            password: this.state.password,
            email: this.state.email,
            roles:this.state.roles,
            movement:this.state.movement
        }
        const newDataNoPassword = {
            id:this.state.id,
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            password: this.state.oldPassword,
            email: this.state.email,
            roles:this.state.roles,
            movement: this.state.movement
        }
        if (this.state.isEdit) {
            if (this.state.password) {
                newData.id = this.state.id;
            this.props.patchUser(newData);
            }
           else{this.props.patchUser(newDataNoPassword)} 
            
            this.setState({ isEdit: false})
        }
        else{
            this.props.createUser(newData)
        }
          
        this.setState({userPageToggle: false})
    }

    createNewUserToggle = () => {

        // this resets the state each time they close the modal 
        this.setState({
          userPageToggle:!this.state.userPageToggle,
          isEdit: false,
          firstName: "",
          lastName: "",
          email: "",
          password: '',
          confirmPassword: '',
          roles: [],
          movement:''
      })
    }

    editUserToggle = (id) => {
        let user = this.props.User.tableData.data.find(item => item.id == id);
        this.setState({
            id: id,
            isEdit: true,
            firstName: user.firstName,
            lastName:user.lastName,            
            email: user.email,
            oldPassword:user.password,
            roles:user.roles,
            userPageToggle:true
        });
    }

    deleteUserAcct(id, name) {
        this.props.show("alert_delete", 
        {
          name: name,
          action: () => this.props.deleteUser(id),
          });
      }
/*
    setUserToggle = (userData) => {
        this.setState({
            userDetailToggle: true,
            userDetails: {
                id:userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                roles: userData.roles
            }
        })
    }
*/
    render() {
        const { tableData } = this.props.User;
        
        
            // setTarget(target)

        
        const columns = [
            { label: "ID", name: "id", options: { display: false, filter: false } },
            { label: "First Name", name: "firstName", options: { filter: false } },
            { label: "Last Name", name: "lastName", options: { filter: false } },
            { label: "Email", name: "email", options: { filter: false } },
            { label: "Role", name: "roles", options: { 
                filter: false,
                customBodyRender: (value) => {
                    return value && value.length > 0 ? value.reduce((all, item) => all +", "+item) : "";
                }
            }},
            {
                label: "Actions",
                name: "actions",
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        // console.log('table',tableMeta)
                        return (
                            <Fragment>
                            <IconButton
                                size="small"
                                // onClick={() => {console.log("ROW VALUE", tableMeta.rowData[0])}}
                                onClick={() => {
                                    /*
                                    const idIndex = columns.findIndex(x => x.name === "id");
                                    const firstNameIndex = columns.findIndex(x => x.name === "firstName");
                                    const lastNameIndex = columns.findIndex(x => x.name === "lastName");   
                                    const emailIndex = columns.findIndex(x => x.name === "email");   
                                    const roleIndex = columns.findIndex(x => x.name === "roles")

                                    const userData = {
                                        id: tableMeta.rowData[idIndex],
                                        firstName: tableMeta.rowData[firstNameIndex],
                                        lastName: tableMeta.rowData[lastNameIndex],
                                        email: tableMeta.rowData[emailIndex],
                                        roles: tableMeta.rowData[roleIndex]
                                    }

                                    console.log("USER DATA", userData)
                                    */
                                    // console.log(this.state.userDetailToggle)
                                    this.editUserToggle(tableMeta.rowData[0])
                                }}
                            >
                                <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                            </IconButton>

                            <IconButton
                                size="small" className="tableDeleteIcon"
                                onClick={() => {
                                    this.deleteUserAcct(tableMeta.rowData[0], tableMeta.rowData[1])
                                }}
                                >
                                <Icon
                                    icon={baselineDeleteForever}
                                    color="#595959"
                                    width="1.5rem"
                                    height="1.5rem"
                                />
                            </IconButton>
                            </Fragment>
                        )
                    }
                }
            },
        ]

    
        // const[target,setTarget]=useState(false)

        const options = {
            selectableRows: false,
            download: false,
            filter: false,
            print: false,
            viewColumns: false,
            customToolbar: () => (
                <React.Fragment>
                    <Tooltip id="tooltip-icon" title="Add User">
                        <IconButton className="mr-2" aria-label="Add User"
                            onClick={
                                this.createNewUserToggle
                            }
                        >
                            <PersonAdd />
                        </IconButton>
                    </Tooltip>
                </React.Fragment>
            )
        };
       
        return (
            <div>
                 <div style={{
                    width:"50%",
                    margin:"10px auto",
                    minWidth:"400px",
                    color:"#2b4da0",
                    fontWeight:"bolder",
                    fontSize:"18px",
                    textAlign:"center", 
                    }} > User Maintenance
                </div>
                <RecordsList
                    title=""
                    columns={columns}
                    data={tableData.data}
                    //   filterType='checkbox'
                    options={options}
                // handlCheck={true}  
                />

                {/* <button  className="primary_btn" onClick={() => this.setUserToggle()}> test</button> */}
                {
                    /*
                    this.state.userDetailToggle &&
                    <UserEditDetails
                    show={this.state.userDetailToggle}
                    handleHide={this.editUserToggle}
                    handleChange={this.handleChange}
                    state={this.state}
                    onSubmit={this.onSubmit}
                    id={this.state.id}
                    userDetails={this.state.userDetails}
                    />
                    */
                }
                {
                    this.state.userPageToggle &&
                    <AddUserForm
                        show={this.state.userPageToggle}
                        handleHide={this.createNewUserToggle}
                        handleChange={this.handleChange}
                        state={this.state}
                        onSubmit={this.onSubmit}                       

                    />
                }
      
        
            </div>
        )
    }
}
const mapStateToProps = ({ userState }) => {
    const { User } = userState;
    return { User }
 } 
export default connect(mapStateToProps, {
    show,
    getuser,
    createUser, 
    patchUser, 
    deleteUser   
})(UserMaintenanceListView);
