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
import EditCreditLimit from './EditCreditLimit';

// DUCKS 
import { getAllCreditLimits, patchCreditLimit, postCreditLimit, deleteCreditLimit } from "Ducks/finance-settings/credit-limit";
import AddCreditLimit from "./AddCreditLimit";

const CreditLimit = ({ 
    getAllCreditLimits, 
    creditLimitsAll, 
    patchCreditLimit, 
    patchCreditLimitBody, 
    postCreditLimit, 
    postCreditLimitBody, 
    deleteCreditLimit, 
    deleteCreditLimitBody, 
    show 
}) => {

    const creditLimitColumns = [
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

                                const creditLimitIdIndex = creditLimitColumns.findIndex(x => x.name === "id");
                                const creditLimitNameIndex = creditLimitColumns.findIndex(x => x.name === "name");
                                const creditLimitAmounhtIndex = creditLimitColumns.findIndex(x => x.name === "amount");
                                
                                const creditLimitDetail = {
                                    id: tableMeta.rowData[creditLimitIdIndex],
                                    name: tableMeta.rowData[creditLimitNameIndex],
                                    amount:tableMeta.rowData[creditLimitAmounhtIndex]
                                }
                                
                                console.log("STOCK", creditLimitDetail)

                                setCreditLimitDetail(creditLimitDetail)
                                setCreditLimitToggle(true);
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                delCreditLimit(tableMeta.rowData[0], tableMeta.rowData[1])
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
                addCreditLimitModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allCreditLimits, setAllCreditLimits] = useState([]);
    const [creditLimitToggle, setCreditLimitToggle] = useState(false);
    const [creditLimitDetail, setCreditLimitDetail] = useState({});
    const [addCreditLimitToggle, setAddCreditLimitToggle] = useState(false);

    const setCreditLimitModalToggle = () => {
        setCreditLimitToggle(!creditLimitToggle);
    }

    const addCreditLimitModalToggle = () => {
        setAddCreditLimitToggle(!addCreditLimitToggle)
    }

    const delCreditLimit = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteCreditLimit(id),
          });
      }

    useEffect( () => {
        getAllCreditLimits()
    }, [])

    // rerenders after getting all stock data
    /*
    useEffect( () => {
        setAllCreditLimits(creditLimitsAll.data)
    }, [creditLimitsAll])

    // rerenders after patching data 
    useEffect( () => {
        getAllCreditLimits()
    }, [patchCreditLimitBody, postCreditLimitBody, deleteCreditLimitBody])
    */
    return(
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Credit Limits"
                  columns={creditLimitColumns}
                  data={creditLimitsAll.data}
                  options={tableOptions}
                />
            </div>

            {
                creditLimitToggle && 
                <EditCreditLimit 
                    show={creditLimitToggle}
                    handleHide={setCreditLimitModalToggle} 
                    creditLimitDetail={creditLimitDetail}
                    patchCreditLimit={patchCreditLimit}
                />
            }

            {
                addCreditLimitToggle && 
                <AddCreditLimit 
                    show={addCreditLimitToggle}
                    handleHide={addCreditLimitModalToggle} 
                    postCreditLimit={postCreditLimit}
                />
            }

        </Fragment>
    )
}

// export default CreditLimits;



const mapStateToProps = ({ financeState }) => {
    const { CreditLimitsState } = financeState;
    return CreditLimitsState
  }

export default connect(mapStateToProps, {
    getAllCreditLimits,
    patchCreditLimit,
    postCreditLimit,
    deleteCreditLimit,
    show
})(CreditLimit)