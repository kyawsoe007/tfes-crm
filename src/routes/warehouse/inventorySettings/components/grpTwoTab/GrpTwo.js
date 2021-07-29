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
import AddGrpTwo from "./AddGrpTwo";
import EditGrpTwo from "./EditGrpTwo"

// DUCKS 
import { getAllGrpTwoSettings, postGrpTwo, deleteGrpTwo, putGrpTwo } from "Ducks/warehouse/inventorySettings";

const GrpTwo = ({ 
    show,
    getAllGrpTwoSettings, 
    grpTwoAll,
    postGrpTwo,
    deleteGrpTwo,
    putGrpTwo,
}) => {

    const grpTwoColumns = [
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

                                const grpTwoIdIndex = grpTwoColumns.findIndex(x => x.name === "id");
                                const grpTwoNameIndex = grpTwoColumns.findIndex(x => x.name === "name");

                                const grpTwoDetail = {
                                    id: tableMeta.rowData[grpTwoIdIndex],
                                    name: tableMeta.rowData[grpTwoNameIndex]
                                }
                                

                                // setStockLocationDetail(stockLocationDetail)
                                setGrpTwoDetail(grpTwoDetail)
                                editGrpTwoModalToggle();
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                const grpTwoNameIndex = grpTwoColumns.findIndex(x => x.name === "name");
                                delGrpTwo(tableMeta.rowData[0], tableMeta.rowData[grpTwoNameIndex])
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
                addGrpTwoModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allGrpTwo, setAllGrpTwo] = useState([]);
    const [editGrpTwoToggle, setEditGrpTwoToggle] = useState(false);
    const [grpTwoDetail, setGrpTwoDetail] = useState({});
    const [addGrpTwoToggle, setAddGrpTwoToggle] = useState(false);


    const addGrpTwoModalToggle = () => {
        setAddGrpTwoToggle(!addGrpTwoToggle)
    }

    const editGrpTwoModalToggle = () => {
        setEditGrpTwoToggle(!editGrpTwoToggle)
    }

    const delGrpTwo = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteGrpTwo(id),
          });
      }

    useEffect( () => {
        getAllGrpTwoSettings()
    }, [])

    // rerenders after getting all stock data
    useEffect( () => {
        setAllGrpTwo(grpTwoAll.data)
    }, [grpTwoAll])

    //  rerenders after patching data 
    // useEffect( () => {
    //     getAllGrpTwoSettings()
    // }, [postGrpTwoBody, deleteGrpTwoBody, putGrpTwoBody])
    
    return(
        <Fragment>
            <h2 style={{paddingTop:"15px",paddingLeft:"25px"}}>Grp Two</h2>

            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Grp Two Locations"
                  columns={grpTwoColumns}
                  data={allGrpTwo}
                  options={tableOptions}
                />
            </div>

            {
                editGrpTwoToggle && 
                <EditGrpTwo 
                    show={editGrpTwoToggle}
                    handleHide={editGrpTwoModalToggle} 
                    grpTwoDetail={grpTwoDetail}
                    putGrpTwo={putGrpTwo}
                />
            }

            {
                addGrpTwoToggle && 
                <AddGrpTwo 
                    show={addGrpTwoToggle}
                    handleHide={addGrpTwoModalToggle} 
                    postGrpTwo={postGrpTwo}
                />
            }

        </Fragment>
    )
}


const mapStateToProps = ({ inventorySettingsState }) => {
    const { grpTwoAll, grpTwo, postGrpTwoBody, putGrpTwoBody, deleteGrpTwoBody } = inventorySettingsState;
    return { grpTwoAll, grpTwo, postGrpTwoBody, putGrpTwoBody, deleteGrpTwoBody }
  }

export default connect(mapStateToProps, {
    getAllGrpTwoSettings,
    postGrpTwo,
    deleteGrpTwo,
    putGrpTwo,
    show
})(GrpTwo)

