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
import EditDownPayment from './EditDownPayment';
import AddDownPaymentDetails from './AddDownPayment';

// DUCKS 
import { getAllDownPayments, patchDownPayment, postDownPayment, deleteDownPayment } from "Ducks/finance-settings/down-payment";

const DownPayment = ({ 
    getAllDownPayments, 
    downPaymentsAll, 
    patchDownPayment, 
    patchDownPaymentBody, 
    postDownPayment, 
    postDownPaymentBody, 
    deleteDownPayment, 
    deleteDownPaymentBody, 
    show 
}) => {

    const downPaymentColumns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Name", name: "name", options: { filter: true } },
        { label: "Amount", name: "amount", options: { filter: true } },
        { label: "Actions", name: "actions", options: { 
            filter: false,
            customBodyRender: (value, tableMeta) => {
                return(
                    <Fragment>
                        <IconButton
                            size="small"
                            onClick={() => {

                                const downPaymentIdIndex = downPaymentColumns.findIndex(x => x.name === "id");
                                const downPaymentNameIndex = downPaymentColumns.findIndex(x => x.name === "name");
                                const downPaymentAmountIndex = downPaymentColumns.findIndex(x => x.name === "amount");

                                const downPaymentDetail = {
                                    id: tableMeta.rowData[downPaymentIdIndex],
                                    name: tableMeta.rowData[downPaymentNameIndex],
                                    amount: tableMeta.rowData[downPaymentAmountIndex],
                                }
                                
                               
                                setDownPaymentDetail(downPaymentDetail)
                                setDownPaymentToggle(true);
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                delDownPayment(tableMeta.rowData[0], tableMeta.rowData[1])
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
                addDownPaymentModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    //const [allDownPayments, setAllDownPayments] = useState([]);
    const [downPaymentToggle, setDownPaymentToggle] = useState(false);
    const [downPaymentDetail, setDownPaymentDetail] = useState({});
    const [addDownPaymentToggle, setAddDownPaymentToggle] = useState(false);

    const setDownPaymentModalToggle = () => {
        setDownPaymentToggle(!downPaymentToggle);
    }

    const addDownPaymentModalToggle = () => {
        setAddDownPaymentToggle(!addDownPaymentToggle)
    }

    const delDownPayment = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteDownPayment(id),
          });
      }

    useEffect( () => {
        getAllDownPayments()
    }, [])

    // rerenders after getting all stock data
    /*
    useEffect( () => {
        setAllDownPayments(downPaymentsAll.data)
    }, [downPaymentsAll])
    */
    // rerenders after patching data 
    /*
    useEffect( () => {
        getAllDownPayments()
    }, [patchDownPaymentBody, postDownPaymentBody, deleteDownPaymentBody])
    */
    return(
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Down Payments"
                  columns={downPaymentColumns}
                  data={downPaymentsAll.data}
                  options={tableOptions}
                />
            </div>

            {
                downPaymentToggle && 
                <EditDownPayment 
                    show={downPaymentToggle}
                    handleHide={setDownPaymentModalToggle} 
                    downPaymentDetail={downPaymentDetail}
                    patchDownPayment={patchDownPayment}
                />
            }

            {
                addDownPaymentToggle && 
                <AddDownPaymentDetails 
                    show={addDownPaymentToggle}
                    handleHide={addDownPaymentModalToggle} 
                    postDownPayment={postDownPayment}
                />
            }

        </Fragment>
    )
}

// export default DownPayments;



const mapStateToProps = ({ financeState }) => {
    const { DownPaymentsState } = financeState;
    return DownPaymentsState
  }

export default connect(mapStateToProps, {
    getAllDownPayments,
    patchDownPayment,
    postDownPayment,
    deleteDownPayment,
    show
})(DownPayment)