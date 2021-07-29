import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import RecordsList from "Components/RecordsList";
import { show } from "redux-modal";

// ICONS 
import { IconButton } from '@material-ui/core'
import { Icon } from '@iconify/react'
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import editFilled from '@iconify/icons-ant-design/edit-filled'
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';

// COMPONENTS 
import EditDoDetails from "./EditDoDetails";
import AddDoDetails from "./AddDoDetails";

//DUCKS
import {getAllDeliveryApprovalRights,patchApprovalRight,postApprovalRight,deleteApprovalRight} from "Ducks/general-setting/approval-right"

const DoDetails = ({
    getAllDeliveryApprovalRights,
    approvalRightsAll,
    patchApprovalRight,
    deleteApprovalRight,
    postApprovalRight,
    show
}) => {

    const poColumns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Lower Limit", name: "minAmt", options: { filter: true } },
        { label: "Upper Limit", name: "maxAmt", options: { filter: true } },
        { label: "Roles", name: "roles", options: 
        { filter: true,
            customBodyRender: (value) => {
                return value && value.length > 0 ? value.reduce((all, item) => all +", "+item) : "";
            } 
        } },
        { label: "Action", name: "maxAmt", options: { 
            filter: false,
            customBodyRender: (value, tableMeta) => {
                return (
                    <Fragment>
                    <IconButton
                        size="small"
                        onClick={() => {

                            const IdIndex = poColumns.findIndex(x => x.name === "id");
                            const lowerLimitIndex = poColumns.findIndex(x => x.name === "minAmt");
                            const upperLimitIndex = poColumns.findIndex(x => x.name === "maxAmt");
                            const rolesIndex = poColumns.findIndex(x => x.name === "roles");

                            const poDetail = {
                                id: tableMeta.rowData[IdIndex],
                                minAmt: tableMeta.rowData[lowerLimitIndex],
                                maxAmt: tableMeta.rowData[upperLimitIndex],
                                roles: tableMeta.rowData[rolesIndex],
                                types:"delivery"
                            }
                            
                            setPoDetail(poDetail);
                            setEditPoDetailModalToggle();
                        }}
                    >
                        <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                    </IconButton>

                    <IconButton
                        size="small" className="tableDeleteIcon"
                        onClick={() => {
                            deletePoDetail(tableMeta.rowData[0], tableMeta.rowData[1], tableMeta.rowData[2])
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
        } },
    ]

    const tableOptions = {
        selectableRows: false,
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        customToolbar: () => (
            <React.Fragment>
            <Tooltip id="tooltip-icon" title="Add DO Approval">
              <IconButton className="mr-2" aria-label="DO Approval" 
               onClick={() => {
                setAddPoDetailModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };

    const deletePoDetail = (id, lowerLimit, upperLimit) => {
        show("alert_delete",
        {
            name: `Lower Limit: ${lowerLimit} & Upper Limit: ${upperLimit}`,
            action: () => deleteApprovalRight(id)
        });
    }

    const setEditPoDetailModalToggle = () => {
        setEditPoDetailToggle(!editPoDetailToggle);
    }

    const setAddPoDetailModalToggle = () => {
        setAddPoDetailToggle(!addPoDetailToggle)
    }

    const [editPoDetailToggle, setEditPoDetailToggle] = useState(false);
    const [poDetail, setPoDetail] = useState({});
    const [addPoDetailToggle, setAddPoDetailToggle] = useState(false);

    useEffect(() => {
       getAllDeliveryApprovalRights() 
    },[])
    return (
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
            <RecordsList 
                columns={poColumns}
                options={tableOptions}
                data={approvalRightsAll.data}
            />
            </div>

            {
                editPoDetailToggle && 
                <EditDoDetails 
                    show={editPoDetailToggle}
                    poDetail={poDetail}
                    handleHide={setEditPoDetailModalToggle} 
                    patchApprovalRight={patchApprovalRight}
                />
            }

            {
                addPoDetailToggle && 
                <AddDoDetails 
                    show={addPoDetailToggle}
                    handleHide={setAddPoDetailModalToggle}
                postApprovalRight={postApprovalRight}
                />
            }
        </Fragment>
    )
}

const mapStateToProps = ({generalState}) => {
    const {ApprovalRightsState}=generalState
    return ApprovalRightsState
  }

export default connect(mapStateToProps, {
    getAllDeliveryApprovalRights,
    patchApprovalRight,
    deleteApprovalRight,
    postApprovalRight,
    show
})(DoDetails)