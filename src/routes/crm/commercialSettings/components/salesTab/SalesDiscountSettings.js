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

// // COMPONENTS 
import AddDiscountSetting from './AddDiscountSetting';
import EditDiscountSetting from './EditDiscountSetting';

// DUCKS 
import { getAllDiscounts, postDiscount, deleteDiscount, putDiscount } from "Ducks/discounttfes";

const SalesDiscountSettings = ({ show, getAllDiscounts, discountsAll, postDiscount, postDiscountBody, deleteDiscount, deleteDiscountBody, putDiscount, putDiscountBody }) => {

    const discountColumns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Type", name: "type", options: { display: false, filter: false } },
        { label: "Name", name: "name", options: { filter: true } },
        { label: "Value", name: "value", options: { filter: true } },
        { label: "isPercentage", name: "isPercentage", options: { filter: false, display:'excluded' } },
        { label: "Actions", name: "actions", options: { 
            filter: false,
            customBodyRender: (value, tableMeta) => {
                return(
                    <Fragment>
                        <IconButton
                            size="small"
                            onClick={() => {

                                const discountIdIndex = discountColumns.findIndex(x => x.name === "id");
                                const discountTypeIndex = discountColumns.findIndex(x => x.name === "type");
                                const discountNameIndex = discountColumns.findIndex(x => x.name === "name");
                                const discountValueIndex = discountColumns.findIndex(x => x.name === "value");
                                const isPercentageIndex = discountColumns.findIndex(x => x.name === "isPercentage");

                                const discountDetail = {
                                    id: tableMeta.rowData[discountIdIndex],
                                    type: tableMeta.rowData[discountTypeIndex],
                                    name: tableMeta.rowData[discountNameIndex],
                                    value: tableMeta.rowData[discountValueIndex],
                                    isPercentage: tableMeta.rowData[isPercentageIndex]
                                }

                                console.log("discountDetail", discountDetail)

                                setDiscountDetail(discountDetail)
                                editDiscountModalToggle();
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                const discountNameIndex = discountColumns.findIndex(x => x.name === "name");
                                delDiscount(tableMeta.rowData[0], tableMeta.rowData[discountNameIndex])
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
                addDiscountModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };

    const [allDiscounts, setAllDiscounts] = useState([]);
    const [discountDetail, setDiscountDetail] = useState({});
    const [editDiscountToggle, setEditDiscountToggle] = useState(false); 
    const [addDiscountToggle, setAddDiscountToggle] = useState(false);


    const addDiscountModalToggle = () => {
        setAddDiscountToggle(!addDiscountToggle)
    }

    const editDiscountModalToggle = () => {
        setEditDiscountToggle(!editDiscountToggle)
    }

    const delDiscount = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteDiscount(id),
          });
      }

    useEffect( () => {
        getAllDiscounts()
    }, [])

    // rerenders after getting all discount data
    useEffect( () => {

        if (discountsAll.data && discountsAll.data.type !== "undefined") {
            const filterArr = discountsAll.data.filter( discount => discount.type === "sales");
            setAllDiscounts(filterArr)
        }

    }, [discountsAll])

    useEffect( () => {
        getAllDiscounts()
    }, [postDiscountBody, deleteDiscountBody, putDiscountBody])


    return (
        <Fragment>

            <h2 style={{paddingTop:"15px",paddingLeft:"25px"}}>Sales Discount Settings</h2>

            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Discount"
                  columns={discountColumns}
                  data={allDiscounts}
                  options={tableOptions}
                />
            </div>

            {
                editDiscountToggle && 
                <EditDiscountSetting 
                    show={editDiscountToggle}
                    handleHide={editDiscountModalToggle} 
                    discountDetail={discountDetail}
                    putDiscount={putDiscount}
                />
            }

            {
                addDiscountToggle && 
                <AddDiscountSetting 
                    show={addDiscountToggle}
                    handleHide={addDiscountModalToggle} 
                    postDiscount={postDiscount}
                />
            }

        </Fragment>
    )
}


const mapStateToProps = ({ discountSettingsState }) => {
    return discountSettingsState
  }

export default connect(mapStateToProps, {
    getAllDiscounts,
    postDiscount,
    deleteDiscount,
    putDiscount,
    show
})(SalesDiscountSettings)


