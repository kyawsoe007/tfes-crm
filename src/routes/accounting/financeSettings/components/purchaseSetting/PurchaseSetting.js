import React, { useState, useEffect, Fragment } from "react";
import { connect,useDispatch } from "react-redux";

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
import EditPurchaseSetting from './EditPurchaseSetting';
import AddPurchaseSettingDetails from './AddPurchaseSetting';

// DUCKS 
import { getAllPurchaseSettings, patchPurchaseSetting, postPurchaseSetting, deletePurchaseSetting } from "Ducks/finance-settings/purchase-setting";

const PurchaseSetting = ({ 
    getAllPurchaseSettings, 
    purchaseSettingsAll, 
    patchPurchaseSetting, 
    postPurchaseSetting, 
    deletePurchaseSetting, 
    show 
}) => {

    const purchaseSettingColumns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Setting Name", name: "setting_name", options: { filter: true } },
        {label:"Account",name:"account", options: { 
            display:true, filter:true,
            customBodyRender: (value,tableMeta) => {
                console.log('act',tableMeta)
                return  value ? value.accountName : ''
            }
        
        }},
        { label: "Actions", name: "actions", options: { 
            filter: false,
            customBodyRender: (value, tableMeta) => {
                return(
                    <Fragment>
                        <IconButton
                            size="small"
                            onClick={() => {

                                const purchaseIdIndex = purchaseSettingColumns.findIndex(x => x.name === "id");
                                const purchaseNameIndex = purchaseSettingColumns.findIndex(x => x.name === "setting_name");
                                const purchaseAccountIndex = purchaseSettingColumns.findIndex(x => x.name === "account");
                                
                                const purchaseSettingDetail = {
                                    id: tableMeta.rowData[purchaseIdIndex],
                                    setting_name: tableMeta.rowData[purchaseNameIndex],
                                    account:tableMeta.rowData[purchaseAccountIndex]
                                }
                            

                                setPurchaseSettingDetail(purchaseSettingDetail)
                                setPurchaseSettingToggle(true);
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                delPurchaseSetting(tableMeta.rowData[0], tableMeta.rowData[1])
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
                addPurchaseSettingModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };

    const dispatch=useDispatch()
    //const [allPurchaseSettings, setAllPurchaseSettings] = useState([]);
    const [purchaseSettingToggle, setPurchaseSettingToggle] = useState(false);
    const [purchaseSettingDetail, setPurchaseSettingDetail] = useState({});
    const [addPurchaseSettingToggle, setAddPurchaseSettingToggle] = useState(false);

    const setPurchaseSettingModalToggle = () => {
        setPurchaseSettingToggle(!purchaseSettingToggle);
    }

    const addPurchaseSettingModalToggle = () => {
        setAddPurchaseSettingToggle(!addPurchaseSettingToggle)
    }

    const delPurchaseSetting = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deletePurchaseSetting(id),
          });
      }

    useEffect( () => {
        dispatch(getAllPurchaseSettings())
    }, [])

    return(
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Down Payments"
                  columns={purchaseSettingColumns}
                  data={purchaseSettingsAll.data}
                  options={tableOptions}
                />
            </div>

            {
                purchaseSettingToggle && 
                <EditPurchaseSetting 
                    show={purchaseSettingToggle}
                    handleHide={setPurchaseSettingModalToggle} 
                    purchaseSettingDetail={purchaseSettingDetail}
                    patchPurchaseSetting={patchPurchaseSetting}
                />
            }

            {
                addPurchaseSettingToggle && 
                <AddPurchaseSettingDetails 
                    show={addPurchaseSettingToggle}
                    handleHide={addPurchaseSettingModalToggle} 
                    postPurchaseSetting={postPurchaseSetting}
                />
            }

        </Fragment>
    )
}

const mapStateToProps = ({ financeState }) => {
    const { PurchaseSettingsState } = financeState;
    return PurchaseSettingsState
  }

export default connect(mapStateToProps, {
    getAllPurchaseSettings,
    patchPurchaseSetting,
    postPurchaseSetting,
    deletePurchaseSetting,
    show
})(PurchaseSetting)