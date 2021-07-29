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
import EditPaymentMethod from './EditPaymentMethod';
import AddPaymentMethodDetails from './AddPaymentMethod';

// DUCKS 
import { getAllPaymentMethods, patchPaymentMethod, postPaymentMethod, deletePaymentMethod } from "Ducks/finance-settings/payment-method";

const PaymentMethod = ({ 
    getAllPaymentMethods, 
    paymentMethodsAll, 
    patchPaymentMethod, 
    postPaymentMethod, 
    deletePaymentMethod, 
    show 
}) => {

    const PaymentMethodColumns = [
        { label: "ID", name: "_id", options: { display: false, filter: false } },
        { label: "Name", name: "name", options: { filter: true } },
        {label:"Account",name:"account", options: { 
            display:true, filter:true,
            customBodyRender: (value,tableMeta) => {
                console.log('act',tableMeta)
                return  value ? value.accountName : ''
            }
        
        }},
        {label:"Journal",name:"journal", options: { 
            display:true, filter:true,
            customBodyRender: (value,tableMeta) => {
                console.log('act',tableMeta)
                return  value ? value.name : ''
            }
        
        }},
        {label:"Currency",name:"currency", options: { 
            display:true, filter:true,
            customBodyRender: (value,tableMeta) => {
                
                return  value ? value.name : ''
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

                                const paymentMethodIdIndex = PaymentMethodColumns.findIndex(x => x.name === "_id");
                                const paymentMethodNameIndex = PaymentMethodColumns.findIndex(x => x.name === "name");
                                const paymentMethodAccountIndex = PaymentMethodColumns.findIndex(x => x.name === "account");
                                const paymentMethodJournalIndex = PaymentMethodColumns.findIndex(x => x.name === "journal");
                                
                                const PaymentMethodDetail = {
                                    id: tableMeta.rowData[paymentMethodIdIndex],
                                    name: tableMeta.rowData[paymentMethodNameIndex],
                                    account:tableMeta.rowData[paymentMethodAccountIndex],
                                    journal:tableMeta.rowData[paymentMethodJournalIndex]
                                }
                            

                                setPaymentMethodDetail(PaymentMethodDetail)
                                setPaymentMethodToggle(true);
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                delPaymentMethod(tableMeta.rowData[0], tableMeta.rowData[1])
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
                addPaymentMethodModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };

    const dispatch=useDispatch()
    //const [allPaymentMethods, setAllPaymentMethods] = useState([]);
    const [PaymentMethodToggle, setPaymentMethodToggle] = useState(false);
    const [PaymentMethodDetail, setPaymentMethodDetail] = useState({});
    const [addPaymentMethodToggle, setAddPaymentMethodToggle] = useState(false);

    const setPaymentMethodModalToggle = () => {
        setPaymentMethodToggle(!PaymentMethodToggle);
    }

    const addPaymentMethodModalToggle = () => {
        setAddPaymentMethodToggle(!addPaymentMethodToggle)
    }

    const delPaymentMethod = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deletePaymentMethod(id),
          });
      }

    useEffect( () => {
        dispatch(getAllPaymentMethods())
    }, [])

    return(
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Down Payments"
                  columns={PaymentMethodColumns}
                  data={paymentMethodsAll.data}
                  options={tableOptions}
                />
            </div>

            {
                PaymentMethodToggle && 
                <EditPaymentMethod 
                    show={PaymentMethodToggle}
                    handleHide={setPaymentMethodModalToggle} 
                    PaymentMethodDetail={PaymentMethodDetail}
                    patchPaymentMethod={patchPaymentMethod}
                />
            }

            {
                addPaymentMethodToggle && 
                <AddPaymentMethodDetails 
                    show={addPaymentMethodToggle}
                    handleHide={addPaymentMethodModalToggle} 
                    postPaymentMethod={postPaymentMethod}
                />
            }

        </Fragment>
    )
}

const mapStateToProps = ({ financeState }) => {
    const { PaymentMethodsState } = financeState;
    return PaymentMethodsState
  }

export default connect(mapStateToProps, {
    getAllPaymentMethods,
    patchPaymentMethod,
    postPaymentMethod,
    deletePaymentMethod,
    show
})(PaymentMethod)