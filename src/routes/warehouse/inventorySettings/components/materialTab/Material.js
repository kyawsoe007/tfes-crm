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
import AddMaterial from "./AddMaterial"
import EditMaterial from "./EditMaterial"

// DUCKS 
import { getAllMaterialSettings, postMaterial, deleteMaterial, putMaterial } from "Ducks/warehouse/inventorySettings";

const Material = ({ 
    show,
    getAllMaterialSettings, 
    materialAll,
    postMaterial,
    deleteMaterial,
    putMaterial,
}) => {

    const columns = [
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

                                const IdIndex = columns.findIndex(x => x.name === "id");
                                const NameIndex = columns.findIndex(x => x.name === "name");

                                const materialDetail = {
                                    id: tableMeta.rowData[IdIndex],
                                    name: tableMeta.rowData[NameIndex]
                                }
                                
                                setMaterialDetail(materialDetail)
                                editMaterialModalToggle();
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                const nameIndex = columns.findIndex(x => x.name === "name");
                                delMaterial(tableMeta.rowData[0], tableMeta.rowData[nameIndex])
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
                addMaterialModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allMaterial, setAllMaterial] = useState([]);
    const [editMaterialToggle, setEditMaterialToggle] = useState(false);
    const [materialDetail, setMaterialDetail] = useState({});
    const [addMaterialToggle, setAddMaterialToggle] = useState(false);


    const addMaterialModalToggle = () => {
        setAddMaterialToggle(!addMaterialToggle)
    }

    const editMaterialModalToggle = () => {
        setEditMaterialToggle(!editMaterialToggle)
    }

    const delMaterial = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteMaterial(id),
          });
      }

    useEffect( () => {
        getAllMaterialSettings()
    }, [])

    // rerenders after getting all stock data
    useEffect( () => {
        setAllMaterial(materialAll.data)
    }, [materialAll])

    // rerenders after patching data 
    // useEffect( () => {
    //     getAllMaterialSettings()
    // }, [postMaterialBody, deleteMaterialBody, putMaterialBody])
    
    return(
        <Fragment>
            <h2 style={{paddingTop:"15px",paddingLeft:"25px"}}>Material</h2>

            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Size"
                  columns={columns}
                  data={allMaterial}
                  options={tableOptions}
                />
            </div>

            {
                editMaterialToggle && 
                <EditMaterial 
                    show={editMaterialToggle}
                    handleHide={editMaterialModalToggle} 
                    materialDetail={materialDetail}
                    putMaterial={putMaterial}
                />
            }

            {
                addMaterialToggle && 
                <AddMaterial 
                    show={addMaterialToggle}
                    handleHide={addMaterialModalToggle} 
                    postMaterial={postMaterial}
                />
            }

        </Fragment>
    )
}


const mapStateToProps = ({ inventorySettingsState }) => {
    const { materialAll, material, postMaterialBody, putMaterialBody, deleteMaterialBody } = inventorySettingsState;
    return { materialAll, material, postMaterialBody, putMaterialBody, deleteMaterialBody }
  }

export default connect(mapStateToProps, {
    getAllMaterialSettings,
    postMaterial,
    deleteMaterial,
    putMaterial,
    show
})(Material)

