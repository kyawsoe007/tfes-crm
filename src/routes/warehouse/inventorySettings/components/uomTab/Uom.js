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
import AddUom from "./AddUom"
import EditUom from "./EditUom"

// DUCKS 
import { getAllUomSettings, postUom, deleteUom, putUom } from "Ducks/warehouse/inventorySettings";

const Uom = ({ 
    show,
    getAllUomSettings, 
    uomAll,
    postUom,
    deleteUom,
    putUom,
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

                                const uomDetail = {
                                    id: tableMeta.rowData[IdIndex],
                                    name: tableMeta.rowData[NameIndex]
                                }
                                
                                setUomDetail(uomDetail)
                                editUomModalToggle();
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                const nameIndex = columns.findIndex(x => x.name === "name");
                                delUom(tableMeta.rowData[0], tableMeta.rowData[nameIndex])
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
                addUomModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allUom, setAllUom] = useState([]);
    const [editUomToggle, setEditUomToggle] = useState(false);
    const [uomDetail, setUomDetail] = useState({});
    const [addUomToggle, setAddUomToggle] = useState(false);


    const addUomModalToggle = () => {
        setAddUomToggle(!addUomToggle)
    }

    const editUomModalToggle = () => {
        setEditUomToggle(!editUomToggle)
    }

    const delUom = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteUom(id),
          });
      }

    useEffect( () => {
        getAllUomSettings()
    }, [])

    // rerenders after getting all stock data
    useEffect( () => {
        setAllUom(uomAll.data)
    }, [uomAll])

    // rerenders after patching data 
    // useEffect( () => {
    //     getAllUomSettings()
    // }, [postUomBody, deleteUomBody, putUomBody])
    
    return(
        <Fragment>
            <h2 style={{paddingTop:"15px",paddingLeft:"25px"}}>Size</h2>

            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Size"
                  columns={columns}
                  data={allUom}
                  options={tableOptions}
                />
            </div>

            {
                editUomToggle && 
                <EditUom 
                    show={editUomToggle}
                    handleHide={editUomModalToggle} 
                    uomDetail={uomDetail}
                    putUom={putUom}
                />
            }

            {
                addUomToggle && 
                <AddUom 
                    show={addUomToggle}
                    handleHide={addUomModalToggle} 
                    postUom={postUom}
                />
            }

        </Fragment>
    )
}


const mapStateToProps = ({ inventorySettingsState }) => {
    const { uomAll, uom, postUomBody, putUomBody, deleteUomBody } = inventorySettingsState;
    return { uomAll, uom, postUomBody, putUomBody, deleteUomBody }
  }

export default connect(mapStateToProps, {
    getAllUomSettings,
    postUom,
    deleteUom,
    putUom,
    show
})(Uom)

