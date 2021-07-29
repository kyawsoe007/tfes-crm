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
import EditStockLocationDetails from './EditStockLocationDetails';
import AddStockLocationDetails from './AddStockLocationDetails';

// DUCKS 
import { getAllStockLocations, patchStockLocation, postStockLocation, deleteStockLocation } from "Ducks/warehouse/warehouseSettings";

const StockLocations = ({ getAllStockLocations, stockLocationsAll, patchStockLocation, postStockLocation, deleteStockLocation, show }) => {

    const stockLocationColumns = [
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

                                const stockLocationIdIndex = stockLocationColumns.findIndex(x => x.name === "id");
                                const stockLocationNameIndex = stockLocationColumns.findIndex(x => x.name === "name");

                                const stockLocationDetail = {
                                    id: tableMeta.rowData[stockLocationIdIndex],
                                    name: tableMeta.rowData[stockLocationNameIndex]
                                }
                                
                                console.log("STOCK", stockLocationDetail)

                                setStockLocationDetail(stockLocationDetail)
                                setStockLocationToggle(true);
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                delStockLocation(tableMeta.rowData[0], tableMeta.rowData[1])
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
            <Tooltip id="tooltip-icon" title="Add Location">
              <IconButton className="mr-2" aria-label="Add Location" 
               onClick={() => {
                addStockLocationModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allStockLocations, setAllStockLocations] = useState([]);
    const [stockLocationToggle, setStockLocationToggle] = useState(false);
    const [stockLocationDetail, setStockLocationDetail] = useState({});
    const [addStockLocationToggle, setAddStockLocationToggle] = useState(false);

    const setStockLocationModalToggle = () => {
        setStockLocationToggle(!stockLocationToggle);
    }

    const addStockLocationModalToggle = () => {
        setAddStockLocationToggle(!addStockLocationToggle)
    }

    const delStockLocation = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteStockLocation(id),
          });
      }

    useEffect( () => {
        getAllStockLocations()
    }, [])

    // rerenders after getting all stock data
    useEffect( () => {
        setAllStockLocations(stockLocationsAll.data)
    }, [stockLocationsAll])

    // rerenders after patching data 
    // useEffect( () => {
    //     getAllStockLocations()
    // }, [patchStockLocationBody, postStockLocationBody, deleteStockLocationBody])
    
    return(
        <Fragment>
            <h2 style={{paddingTop:"15px",paddingLeft:"25px"}}>Location</h2>

            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Stock Locations"
                  columns={stockLocationColumns}
                  data={allStockLocations}
                  options={tableOptions}
                />
            </div>

            {
                stockLocationToggle && 
                <EditStockLocationDetails 
                    show={stockLocationToggle}
                    handleHide={setStockLocationModalToggle} 
                    stockLocationDetail={stockLocationDetail}
                    patchStockLocation={patchStockLocation}
                />
            }

            {
                addStockLocationToggle && 
                <AddStockLocationDetails 
                    show={addStockLocationToggle}
                    handleHide={addStockLocationModalToggle} 
                    postStockLocation={postStockLocation}
                />
            }

        </Fragment>
    )
}

// export default StockLocations;



const mapStateToProps = ({ warehouseSettingsState }) => {
    return warehouseSettingsState
  }

export default connect(mapStateToProps, {
    getAllStockLocations,
    patchStockLocation,
    postStockLocation,
    deleteStockLocation,
    show
})(StockLocations)