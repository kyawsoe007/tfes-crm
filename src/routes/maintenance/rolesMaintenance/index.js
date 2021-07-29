
import React, { Component, Fragment, useState, useEffect } from "react";
import { connect } from 'react-redux'

// Component Imports
import RecordsList from 'Components/RecordsList'
import RoleEditDetails from "./components/RoleEditDetails";
import CreateRoleDetails from "./components/CreateRoleDetails"
import DeleteRoleDetails from "./components/DeleteRoleDetails"

// Icon Imports
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import Tooltip from "@material-ui/core/Tooltip";
import { PersonAdd, Edit, Delete } from "@material-ui/icons";

// Ducks  
import { getAllUserRoles, patchUserRole, deleteUserRole } from 'Ducks/maintenancetfes'

const RoleMaintenanceListView = ({ getAllUserRoles, rolesAll, patchUserRole, patchUserRoleBody, postRoleBody, deleteRoleBody }) => {

    const roleColumns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Role", name: "name", options: { filter: false } },
        { label: "Access", name: "access", options: { display: false, filter: false } },
        { label: "isManager", name: "isManager", options: { display: false, filter: false } },
        { 
            label: "Actions", 
            name: "actions", 
            options: { 
                filter: false ,
                customBodyRender: (value, tableMeta) => {

                    return (
                      <Fragment>
                        <IconButton
                            size="small"
                            onClick={() => {
                                console.log("ROW VALUE", tableMeta.rowData);
                                
                                const idIndex = roleColumns.findIndex(x => x.name === "id");
                                const roleIndex = roleColumns.findIndex(x => x.name === "name");
                                const permissionsIndex = roleColumns.findIndex(x => x.name === "access");
                                const isManagerIndex = roleColumns.findIndex(x => x.name === "isManager")
                                const userRolesData = {
                                    id: tableMeta.rowData[idIndex],
                                    role: tableMeta.rowData[roleIndex],
                                    permissions: tableMeta.rowData[permissionsIndex],
                                    isManager: tableMeta.rowData[isManagerIndex]
                                }

                                setRoleToggle();
                                setUserRolesRowData(userRolesData);
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {

                                const idIndex = roleColumns.findIndex(x => x.name === "id");
                                const roleIndex = roleColumns.findIndex(x => x.name === "name");
                                const permissionsIndex = roleColumns.findIndex(x => x.name === "access");  
                                const isManagerIndex = roleColumns.findIndex(x => x.name === "isManager"); 
                                const userRolesData = {
                                    id: tableMeta.rowData[idIndex],
                                    role: tableMeta.rowData[roleIndex],
                                    permissions: tableMeta.rowData[permissionsIndex],
                                    isManager: tableMeta.rowData[isManagerIndex]
                                }

                                console.log("ROLE", userRolesData)
                                deleteUserRoleToggle();
                                setUserRolesRowData(userRolesData);
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

    const tableOptions = {
        selectableRows: false,
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        customToolbar: () => (
            <React.Fragment>
            <Tooltip id="tooltip-icon" title="Add User">
              <IconButton className="mr-2" aria-label="Add User" 
               onClick={() => {
                newRoleToggle()
              }}
              >
                <PersonAdd />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };

    const [columns, setColumns] = useState(roleColumns) 
    const [allUserRolesData, setAllUserRolesData] = useState([]);
    const [roleDetailToggle, setRoleDetailToggle] = useState(false);
    const [userRolesRowData, setUserRolesRowData] = useState();
    const [createNewRoleToggle, setCreateNewRoleToggle] = useState(false);
    const [deleteRoleToggle, setDeleteRoleToggle] = useState(false);


    const setRoleToggle = () => {
        setRoleDetailToggle(!roleDetailToggle);
    }

    const newRoleToggle = () => {
        setCreateNewRoleToggle(!createNewRoleToggle);
    }

    const deleteUserRoleToggle = () => {
        setDeleteRoleToggle(!deleteRoleToggle);
    }


    // component did mount 
    useEffect(() => {
        getAllUserRoles();
    }, [])

    // rerenders when props.rolesAll changes 
    //https://til.hashrocket.com/posts/z1xzaupgpd-run-side-effect-when-a-prop-changes-whooks
    useEffect( () => {
        // console.log("RTTTT", rolesAll);
        setAllUserRolesData(rolesAll.data);
    }, [rolesAll])

    // rerenders when patch occurs
    useEffect( () =>{
        // alert("PING")
        getAllUserRoles();
    }, [patchUserRoleBody])

    // rerenders when post occurs 
    useEffect( () =>{
        getAllUserRoles()
    }, [postRoleBody])

    // rerenders when delete occurs 
    useEffect( () => {
        getAllUserRoles()
    }, [deleteRoleBody])


    return(
        <div>
            <div style={{
              width:"50%",
              margin:"10px auto",
              minWidth:"400px",
              color:"#2b4da0",
              fontWeight:"bolder",
              fontSize:"18px",
              textAlign:"center", 
              }} > Roles Maintenance
            </div>
            <RecordsList 
                title="All Roles"
                columns={columns}
                data={allUserRolesData}
                options={tableOptions}
            />

            {roleDetailToggle &&
                <RoleEditDetails 
                    show={roleDetailToggle}
                    handleHide={setRoleToggle} 
                    userRolesData={userRolesRowData}
                    patchUserRole={patchUserRole}
                />
            }

            {createNewRoleToggle &&
                <CreateRoleDetails 
                    show={createNewRoleToggle}
                    handleHide={newRoleToggle} 
                />
            }

            {deleteRoleToggle &&
                    <DeleteRoleDetails 
                    show={deleteRoleToggle}
                    handleHide={deleteUserRoleToggle} 
                    userRolesData={userRolesRowData}
                    deleteUserRole={deleteUserRole}
                />
            }

        </div>
        )
}
  
const mapStateToProps = ({ maintenanceState }) => {
    return maintenanceState
  }

export default connect(mapStateToProps, {
    getAllUserRoles,
    patchUserRole,
    deleteUserRole
})(RoleMaintenanceListView)