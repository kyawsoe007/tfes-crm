import React, { Fragment, useEffect, useState } from "react";
import { connect } from 'react-redux'
import RecordsList from "Components/RecordsList"

// Icon Imports
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from "@material-ui/core/Tooltip";
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { IconButton } from '@material-ui/core';

//Components Imports 
import DialogRoot from 'Components/Dialog/DialogRoot'
import SplitDeliveryOrderModal from "./SplitDeliveryOrderModal";

import { getWoBySoId } from "Ducks/workorders";
import { setDeliveryOrderItemFromPackingList } from "Ducks/deliveryordertfes"

import { singleDeliveryOrder } from "Helpers/warehouseURL";


const DeliveryOrderModal = ({ history, salesOrderId, getWoBySoId, workorderState, deliveryorderState, setDeliveryOrderItemFromPackingList }) => {

    const [soId, setSoId] = useState(salesOrderId);
    const [checkboxState, setCheckBoxState] = useState({});
    const [errMsg, setErrMsg] = useState("");
    const [doId, setDoId] = useState("");
    const [data, setData] = useState([]);
    const [checkAllToggle, setCheckAllToggle] = useState(false);
    const [splitDoToggle, setSplitDoToggle] = useState(false);
    const [splitQty, setSplitQty] = useState({});
    const [splitQtyRowIndex, setSplitQtyRowIndex] = useState(0);

    const handleChange = (event) => {
        console.log(event.target)
        setCheckBoxState({ ...checkboxState, [event.target.name]: event.target.checked });
      };

    const checkAllHandler = () => {

        let checkBoxData = {}
        for (let i = 0; i < data.length; i++) {
            if (!checkAllToggle) {
                checkBoxData[data[i]["_id"]] = true
            } else {
                checkBoxData[data[i]["_id"]] = false
            }
        }

        setCheckBoxState(checkBoxData)
        setCheckAllToggle(!checkAllToggle)
    }

    const mergeToTop = (rowIndex) => {
        const newLines = [...data];

        // top line
        newLines[rowIndex - 1].balanceQty += newLines[rowIndex].balanceQty;
        newLines.splice(rowIndex, 1);

        for (let i = 0; i < newLines.length; i ++) {
            // reorders the runningNum sequence when splitting 
            newLines[i].runningNum = i+1;
        }
        
        setData(newLines);
    }


    useEffect( () => {
        getWoBySoId(soId)
    }, [])

    useEffect(() => {
        setData(workorderState.getWoBySoIdBody.data)
    }, [workorderState])

    useEffect(() => {
        if (deliveryorderState.doItem && deliveryorderState.doItem.id) {
            // alert(deliveryorderState.doItem.id)
            history.push({ pathname: singleDeliveryOrder(deliveryorderState.doItem.id)})
        }
        
    }, [deliveryorderState.doItem])

    const columns = [
        { label: "ID", name: "_id", options: { display: false, filter: false } },
        { label: "Work Order Item ID", name: "woItemId", options: { display: false, filter: false } },
        { label: "SKU", name: "sku", options: { display: false, filter: false } },
        { label: "No", name: "runningNum", options: { filter: true } },
        { label: "Description", name: "description", options: { filter: true } },
        { label: "Work Type", name: "workType", options: { filter: true } },
        { label: "WO Item Status", name: "woItemStatus", options: { display: true } },
        { label: "Qty", name: "balanceQty", options: { display: true } },
        { 
            label: "Select", 
            name: "actions", 
            options: { 
                filter: false ,
                customBodyRender: (value, tableMeta) => {

                    const idIndex = columns.findIndex( x => x.name === "_id")
                    // console.log("ASDASD", tableMeta.rowData, idIndex);
                    return (
                      <Fragment>

                        <Checkbox
                            // defaultChecked
                            // caters for undefined state when delivery modal is first loaded. 
                            checked={checkboxState[tableMeta.rowData[idIndex]] === true ? true : false }
                            color="primary"
                            name={tableMeta.rowData[idIndex]}
                            onChange={handleChange}
                        />
                      </Fragment>
                    )
                }
            } 
        },
        { 
            label: "Actions", 
            name: "actions", 
            options: { 
                filter: false ,
                customBodyRender: (value, tableMeta) => {

                    return (
                      <Fragment>
                        <div className="cell-button-container" style={{flexDirection:"row",justifyContent: "space-around"}}>
                            <button 
                                type="button" 
                                onClick={() => {
                                    setSplitDoToggle(!splitDoToggle);
                                    // passes in the entire data from index

                                    console.log(data[tableMeta.rowIndex])
                                    setSplitQty(data[tableMeta.rowIndex]);
                                    setSplitQtyRowIndex(tableMeta.rowIndex);
                                }}
                                style={{backgroundColor:"#254065",color:"#ffffff",borderRadius:"4px",width:"100px",outline:"none" ,marginRight:"10%"}}
                                >
                                Split qty
                            </button>

                            {
                                // only shows if split is true, boolean value is added locally after splitting in splitDeliveryOrderModal.js
                                data[tableMeta.rowIndex].split && 
                                <button 
                                type="button" 
                                onClick={() => {mergeToTop(tableMeta.rowIndex)}}
                                style={{backgroundColor:"#254065",color:"#ffffff",borderRadius:"4px",width:"100px",outline:"none"}}
                                >
                                Merge to Top 
                                </button>
                            }

                        </div>
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
                <Tooltip id="tooltip-icon" title="Check All">
                    <IconButton 
                        className="mr-2" 
                        aria-label="Check All"
                        onClick={checkAllHandler}                       
                    >
                        <DoneAllIcon />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    };

    const createDeliveryOrderDraft = () => {

        const deliveryLines = [];

        for (let i = 0; i < data.length; i++) {
            for (var key in checkboxState) {
                if (key === data[i]._id && checkboxState[key]) {
                    if(data[i].split) {
                        //this section removes the original Date Id and replaces back with the original ID 
                        delete data[i]._id
                        data[i]._id = data[i-1]._id
                    }
                    console.log(data[i])
                    deliveryLines.push(data[i]);
                }
            }
        }

        const postBody = {
            orderId: soId,
            deliveryLines: deliveryLines  
        }
        console.log(postBody);

        // console.log("POST BODEHHH", postBody);
        if ( deliveryLines.length === 0) {
            setErrMsg("Please select at least one work order! ")
        } else {
            setDeliveryOrderItemFromPackingList(postBody)
            setErrMsg("")
        }

        // this is where we do the post and redirect, deliveryorderState.doItem
    }

    return (
        <Fragment>
            <h1 style={{ color: "red", textAlign: "center"}}> {errMsg} </h1>
            <RecordsList 
                title="Delivery Order Create"
                columns={columns}
                options={tableOptions}
                data={data}
            />

            <br /> <br />
            <div>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={createDeliveryOrderDraft}
                    style={{ float: "right" }}
                >
                    Create Delivery Order Draft
                </Button>
            </div>

        {
            splitDoToggle && 
            <DialogRoot
                show={splitDoToggle}
                handleHide={() => setSplitDoToggle(!splitDoToggle)}
            >
                <SplitDeliveryOrderModal 
                    splitQty={splitQty}
                    splitQtyRowIndex={splitQtyRowIndex}
                    data={data}
                    setData={setData}
                    modalState={splitDoToggle}
                    closeModalHandler={setSplitDoToggle}
                />
            </DialogRoot>
        }
        </Fragment>
    )
}

const mapStateToProps = ({ workorderState, deliveryorderState }) => {
    return { workorderState, deliveryorderState }
  }

export default connect(mapStateToProps, {
    getWoBySoId,
    setDeliveryOrderItemFromPackingList
})(DeliveryOrderModal)