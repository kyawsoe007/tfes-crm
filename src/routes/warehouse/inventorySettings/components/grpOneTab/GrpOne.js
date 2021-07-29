import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";

import ServerRecordsList from "Components/ServerRecordsList";
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
import AddGrpOne from "./AddGrpOne";
import EditGrpOne from "./EditGrpOne"

// DUCKS 
import { getAllGrpOneSettings, postGrpOne, deleteGrpOne, putGrpOne } from "Ducks/warehouse/inventorySettings";

const GrpOne = ({ 
    show,
    getAllGrpOneSettings, 
    grpOneAll,
    postGrpOne,
    deleteGrpOne,
    putGrpOne,
}) => {

    const grpOneColumns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Name", name: "name", options: { filter: true } },
        { label: "Actions", name: "actions", options: { 
            filter: false,
            customBodyRender: (value, tableMeta) => {
                return(
                    <Fragment>
                        <IconButton
                            size="small"
                            onClick={() => {

                                const grpOneIdIndex = grpOneColumns.findIndex(x => x.name === "id");
                                const grpOneNameIndex = grpOneColumns.findIndex(x => x.name === "name");

                                const grpOneDetail = {
                                    id: tableMeta.rowData[grpOneIdIndex],
                                    name: tableMeta.rowData[grpOneNameIndex]
                                }
                                

                                // setStockLocationDetail(stockLocationDetail)
                                setGrpOneDetail(grpOneDetail)
                                editGrpOneModalToggle();
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                const grpOneNameIndex = grpOneColumns.findIndex(x => x.name === "name");
                                delGrpOne(tableMeta.rowData[0], tableMeta.rowData[grpOneNameIndex])
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
            <Tooltip id="tooltip-icon" title="Add Grp One">
              <IconButton className="mr-2" aria-label="Add Grp One" 
               onClick={() => {
                addGrpOneModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allGrpOne, setAllGrpOne] = useState([]);
    const [editGrpOneToggle, setEditGrpOneToggle] = useState(false);
    const [grpOneDetail, setGrpOneDetail] = useState({});
    const [addGrpOneToggle, setAddGrpOneToggle] = useState(false);

    const setStockLocationModalToggle = () => {
        setStockLocationToggle(!stockLocationToggle);
    }

    const addGrpOneModalToggle = () => {
        setAddGrpOneToggle(!addGrpOneToggle)
    }

    const editGrpOneModalToggle = () => {
        setEditGrpOneToggle(!editGrpOneToggle)
    }

    const delGrpOne = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteGrpOne(id),
          });
      }

    useEffect( () => {
        getAllGrpOneSettings()
    }, [])

    // rerenders after getting all stock data
    useEffect( () => {
        setAllGrpOne(grpOneAll.data)
    }, [grpOneAll])

    // rerenders after patching data 
    // useEffect( () => {
    //     getAllGrpOneSettings()
    // }, [postGrpOneBody, deleteGrpOneBody, putGrpOneBody])
    
    return(
        <Fragment>
            <h2 style={{paddingTop:"15px",paddingLeft:"25px"}}>Grp One</h2>

            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Grp Locations"
                  columns={grpOneColumns}
                  data={allGrpOne}
                  options={tableOptions}
                />
            </div>

            {
                editGrpOneToggle && 
                <EditGrpOne 
                    show={editGrpOneToggle}
                    handleHide={editGrpOneModalToggle} 
                    grpOneDetail={grpOneDetail}
                    putGrpOne={putGrpOne}
                />
            }

            {
                addGrpOneToggle && 
                <AddGrpOne 
                    show={addGrpOneToggle}
                    handleHide={addGrpOneModalToggle} 
                    postGrpOne={postGrpOne}
                />
            }

        </Fragment>
    )
}


const mapStateToProps = ({ inventorySettingsState }) => {
    const { grpOneAll, grpOne, postGrpOneBody, putGrpOneBody, deleteGrpOneBody } = inventorySettingsState;
    return { grpOneAll, grpOne, postGrpOneBody, putGrpOneBody, deleteGrpOneBody }
  }

export default connect(mapStateToProps, {
    getAllGrpOneSettings,
    postGrpOne,
    deleteGrpOne,
    putGrpOne,
    show
})(GrpOne)