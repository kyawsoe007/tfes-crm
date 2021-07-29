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
import AddSize from "./AddSize"
import EditSize from "./EditSize"

// DUCKS 
import { getAllSizeSettings, postSize, deleteSize, putSize } from "Ducks/warehouse/inventorySettings";

const Size = ({ 
    show,
    getAllSizeSettings, 
    sizeAll,
    postSize,
    deleteSize,
    putSize,
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

                                const sizeDetail = {
                                    id: tableMeta.rowData[IdIndex],
                                    name: tableMeta.rowData[NameIndex]
                                }
                                
                                setSizeDetail(sizeDetail)
                                editSizeModalToggle();
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                const nameIndex = columns.findIndex(x => x.name === "name");
                                delSize(tableMeta.rowData[0], tableMeta.rowData[nameIndex])
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
                addSizeModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allSize, setAllSize] = useState([]);
    const [editSizeToggle, setEditSizeToggle] = useState(false);
    const [sizeDetail, setSizeDetail] = useState({});
    const [addSizeToggle, setAddSizeToggle] = useState(false);


    const addSizeModalToggle = () => {
        setAddSizeToggle(!addSizeToggle)
    }

    const editSizeModalToggle = () => {
        setEditSizeToggle(!editSizeToggle)
    }

    const delSize = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteSize(id),
          });
      }

    useEffect( () => {
        getAllSizeSettings()
    }, [])

    // rerenders after getting all stock data
    useEffect( () => {
        setAllSize(sizeAll.data)
    }, [sizeAll])

    // rerenders after patching data 
    // useEffect( () => {
    //     getAllSizeSettings()
    // }, [postSizeBody, deleteSizeBody, putSizeBody])
    
    return(
        <Fragment>
            <h2 style={{paddingTop:"15px",paddingLeft:"25px"}}>Size</h2>

            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Size"
                  columns={columns}
                  data={allSize}
                  options={tableOptions}
                />
            </div>

            {
                editSizeToggle && 
                <EditSize 
                    show={editSizeToggle}
                    handleHide={editSizeModalToggle} 
                    sizeDetail={sizeDetail}
                    putSize={putSize}
                />
            }

            {
                addSizeToggle && 
                <AddSize 
                    show={addSizeToggle}
                    handleHide={addSizeModalToggle} 
                    postSize={postSize}
                />
            }

        </Fragment>
    )
}


const mapStateToProps = ({ inventorySettingsState }) => {
    const { sizeAll, size, postSizeBody, putSizeBody, deleteSizeBody } = inventorySettingsState;
    return { sizeAll, size, postSizeBody, putSizeBody, deleteSizeBody }
  }

export default connect(mapStateToProps, {
    getAllSizeSettings,
    postSize,
    deleteSize,
    putSize,
    show
})(Size)

