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
import EditPaymentTerm from './EditPaymentTerm';
import AddPaymentDetails from './AddPaymentTerm';

// DUCKS 
import { getAllPaymentTerms, patchPaymentTerm, postPaymentTerm, deletePaymentTerm } from "Ducks/finance-settings/payment-term";

const PaymentTerm = ({ 
    getAllPaymentTerms, 
    paymentTermsAll, 
    patchPaymentTerm, 
    patchPaymentTermBody, 
    postPaymentTerm, 
    postPaymentTermBody, 
    deletePaymentTerm, 
    deletePaymentTermBody, 
    show 
}) => {

    const stockLocationColumns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Name", name: "name", options: { filter: true } },
        {label:"Day",name:"days",options:{filter:true}},
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
                                const paymentDayIndex = stockLocationColumns.findIndex(x => x.name === "days");
                                
                                const stockLocationDetail = {
                                    id: tableMeta.rowData[stockLocationIdIndex],
                                    name: tableMeta.rowData[stockLocationNameIndex],
                                    days:tableMeta.rowData[paymentDayIndex]
                                }
                                
                                console.log("STOCK", stockLocationDetail)

                                setPaymentTermDetail(stockLocationDetail)
                                setPaymentTermToggle(true);
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                delPaymentTerm(tableMeta.rowData[0], tableMeta.rowData[1])
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
                addPaymentTermModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    //const [allPaymentTerms, setAllPaymentTerms] = useState([]);
    const [PaymentTermToggle, setPaymentTermToggle] = useState(false);
    const [stockLocationDetail, setPaymentTermDetail] = useState({});
    const [addPaymentTermToggle, setAddPaymentTermToggle] = useState(false);

    const setPaymentTermModalToggle = () => {
        setPaymentTermToggle(!PaymentTermToggle);
    }

    const addPaymentTermModalToggle = () => {
        setAddPaymentTermToggle(!addPaymentTermToggle)
    }

    const delPaymentTerm = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deletePaymentTerm(id),
          });
      }

    useEffect( () => {
        getAllPaymentTerms()
    }, [])

    // rerenders after getting all stock data
    /*
    useEffect( () => {
        setAllPaymentTerms(paymentTermsAll.data)
    }, [paymentTermsAll])
    */
    // rerenders after patching data 
    /*
    useEffect( () => {
        getAllPaymentTerms()
    }, [patchPaymentTermBody, postPaymentTermBody, deletePaymentTermBody])
*/
    return(
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Down Payments"
                  columns={stockLocationColumns}
                  data={paymentTermsAll.data}
                  options={tableOptions}
                />
            </div>

            {
                PaymentTermToggle && 
                <EditPaymentTerm 
                    show={PaymentTermToggle}
                    handleHide={setPaymentTermModalToggle} 
                    stockLocationDetail={stockLocationDetail}
                    patchPaymentTerm={patchPaymentTerm}
                />
            }

            {
                addPaymentTermToggle && 
                <AddPaymentDetails 
                    show={addPaymentTermToggle}
                    handleHide={addPaymentTermModalToggle} 
                    postPaymentTerm={postPaymentTerm}
                />
            }

        </Fragment>
    )
}

// export default PaymentTerms;



const mapStateToProps = ({ financeState }) => {
    const { PaymentTermsState } = financeState;
    return PaymentTermsState
  }

export default connect(mapStateToProps, {
    getAllPaymentTerms,
    patchPaymentTerm,
    postPaymentTerm,
    deletePaymentTerm,
    show
})(PaymentTerm)