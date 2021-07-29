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
import EditSaleTargetDetails from "./EditTargetDetail";
import AddSaleTargetDetails from "./AddTargetDetails"

//DUCKS
import {getAllSaleTargets,patchSaleTarget,postSaleTarget,deleteSaleTarget} from "Ducks/general-setting/sale-target"

const SaleTargetDetails = ({
    getAllSaleTargets,
    saleTargetsAll,
    patchSaleTarget,
    deleteSaleTarget,
    postSaleTarget,
    show
}) => {

    const poColumns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Name", name: "name", options: { filter: true } },
        { label: "Target", name: "target", options: { filter: true } },
        { label: "Action", name: "actions", options: { 
            filter: false,
            customBodyRender: (value, tableMeta) => {
                return (
                    <Fragment>
                    <IconButton
                        size="small"
                        onClick={() => {

                            const IdIndex = poColumns.findIndex(x => x.name === "id");
                            const name = poColumns.findIndex(x => x.name === "name");
                            const targetIndex = poColumns.findIndex(x => x.name === "target");

                            const SaleTargetDetail = {
                                id: tableMeta.rowData[IdIndex],
                                name: tableMeta.rowData[name],
                                target: tableMeta.rowData[targetIndex],
                            }
                            console.log('saletarget',SaleTargetDetail)
                            setSaleTargetDetail(SaleTargetDetail);
                            setEdiSaleTargetDetailModalToggle(true);
                        }}
                    >
                        <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                    </IconButton>

                    <IconButton
                        size="small" className="tableDeleteIcon"
                        onClick={() => {
                            deleteSaleTargetDetail(tableMeta.rowData[0], tableMeta.rowData[1])
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
        SaleTargetwnload: false,
        filter: false,
        print: false,
        viewColumns: false,
        customToolbar: () => (
            <React.Fragment>
            <Tooltip id="tooltip-icon" title="Add SaleTarget Approval">
              <IconButton className="mr-2" aria-label="SaleTarget Approval" 
               onClick={() => {
                setAddSaleTargetDetailModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };

    const deleteSaleTargetDetail = (id, name) => {
        show("alert_delete",
        {
            name: name,
            action: () => deleteSaleTarget(id)
        });
    }

    const setEdiSaleTargetDetailModalToggle = () => {
        setEditSaleTargetDetailToggle(!editSaleTargetDetailToggle);
    }

    const setAddSaleTargetDetailModalToggle = () => {
        setAddSaleTargetDetailToggle(!addSaleTargetDetailToggle)
    }

    const [editSaleTargetDetailToggle, setEditSaleTargetDetailToggle] = useState(false);
    const [saleTargetDetail, setSaleTargetDetail] = useState({});
    const [addSaleTargetDetailToggle, setAddSaleTargetDetailToggle] = useState(false);

    useEffect(() => {
       getAllSaleTargets() 
    },[])

    return (
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
            <RecordsList 
                columns={poColumns}
                options={tableOptions}
                data={saleTargetsAll.data}
                options={tableOptions}
            />
            </div>

            {
                editSaleTargetDetailToggle && 
                <EditSaleTargetDetails 
                    show={editSaleTargetDetailToggle}
                    saleTargetDetail={saleTargetDetail}
                    handleHide={setEdiSaleTargetDetailModalToggle} 
                    patchSaleTarget={patchSaleTarget}
                />
            }

            {
                addSaleTargetDetailToggle && 
                <AddSaleTargetDetails 
                    show={addSaleTargetDetailToggle}
                    handleHide={setAddSaleTargetDetailModalToggle}
                postSaleTarget={postSaleTarget}
                />
            }
        </Fragment>
    )
}

const mapStateToProps = ({generalState}) => {
    const {SaleTargetsState}=generalState
    return SaleTargetsState
  }

export default connect(mapStateToProps, {
    getAllSaleTargets,
    patchSaleTarget,
    deleteSaleTarget,
    postSaleTarget,
    show
})(SaleTargetDetails)