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
import AddBrand from "./AddBrand"
import EditBrand from "./EditBrand"

// DUCKS 
import { getAllBrandSettings, postBrand, deleteBrand, putBrand } from "Ducks/warehouse/inventorySettings";

const Brand = ({ 
    show,
    getAllBrandSettings, 
    brandAll,
    postBrand,
    deleteBrand,
    putBrand,
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

                                const brandDetail = {
                                    id: tableMeta.rowData[IdIndex],
                                    name: tableMeta.rowData[NameIndex]
                                }
                                
                                setBrandDetail(brandDetail)
                                editBrandModalToggle();
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                const nameIndex = columns.findIndex(x => x.name === "name");
                                delBrand(tableMeta.rowData[0], tableMeta.rowData[nameIndex])
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
                addBrandModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allBrand, setAllBrand] = useState([]);
    const [editBrandToggle, setEditBrandToggle] = useState(false);
    const [brandDetail, setBrandDetail] = useState({});
    const [addBrandToggle, setAddBrandToggle] = useState(false);


    const addBrandModalToggle = () => {
        setAddBrandToggle(!addBrandToggle)
    }

    const editBrandModalToggle = () => {
        setEditBrandToggle(!editBrandToggle)
    }

    const delBrand = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteBrand(id),
          });
      }

    useEffect( () => {
        getAllBrandSettings()
    }, [])

    // rerenders after getting all stock data
    useEffect( () => {
        setAllBrand(brandAll.data)
    }, [brandAll])

    // rerenders after patching data 
    // useEffect( () => {
    //     getAllBrandSettings()
    // }, [postBrandBody, deleteBrandBody, putBrandBody])
    
    return(
        <Fragment>
            <h2 style={{paddingTop:"15px",paddingLeft:"25px"}}>Size</h2>

            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Size"
                  columns={columns}
                  data={allBrand}
                  options={tableOptions}
                />
            </div>

            {
                editBrandToggle && 
                <EditBrand 
                    show={editBrandToggle}
                    handleHide={editBrandModalToggle} 
                    brandDetail={brandDetail}
                    putBrand={putBrand}
                />
            }

            {
                addBrandToggle && 
                <AddBrand 
                    show={addBrandToggle}
                    handleHide={addBrandModalToggle} 
                    postBrand={postBrand}
                />
            }

        </Fragment>
    )
}


const mapStateToProps = ({ inventorySettingsState }) => {
    const { brandAll, brand, postBrandBody, putBrandBody, deleteBrandBody } = inventorySettingsState;
    return { brandAll, brand, postBrandBody, putBrandBody, deleteBrandBody } 
  }

export default connect(mapStateToProps, {
    getAllBrandSettings,
    postBrand,
    deleteBrand,
    putBrand,
    show
})(Brand)

