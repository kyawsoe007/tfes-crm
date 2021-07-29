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
import EditCreditTerm from './EditCreditTerm';
import AddCreditTerm from './AddCreditTerm';

// DUCKS 
import { getAllCreditTerms, patchCreditTerm, postCreditTerm, deleteCreditTerm } from "Ducks/finance-settings/credit-term";

const CreditTerm = ({ 
    getAllCreditTerms, 
    creditTermsAll, 
    patchCreditTerm, 
    patchCreditTermBody, 
    postCreditTerm, 
    postCreditTermBody, 
    deleteCreditTerm, 
    deleteCreditTermBody, 
    show 
}) => {

    const creditTermColumns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Name", name: "name", options: { filter: true } },
        {label:"Term",name:"term",options:{filter:true}},
        { label: "Actions", name: "actions", options: { 
            filter: false,
            customBodyRender: (value, tableMeta) => {
                return(
                    <Fragment>
                        <IconButton
                            size="small"
                            onClick={() => {

                                const creditTermIdIndex = creditTermColumns.findIndex(x => x.name === "id");
                                const creditTermNameIndex = creditTermColumns.findIndex(x => x.name === "name");
                                const creditTermIndex = creditTermColumns.findIndex(x => x.name === "term");
                                const creditTermDetail = {
                                    id: tableMeta.rowData[creditTermIdIndex],
                                    name: tableMeta.rowData[creditTermNameIndex],
                                    term:tableMeta.rowData[creditTermIndex]
                                }
                                
                                console.log("STOCK", creditTermDetail)

                                setCreditTermDetail(creditTermDetail)
                                setCreditTermToggle(true);
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                delCreditTerm(tableMeta.rowData[0], tableMeta.rowData[1])
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
                addCreditTermModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allCreditTerms, setAllCreditTerms] = useState([]);
    const [creditTermToggle, setCreditTermToggle] = useState(false);
    const [creditTermDetail, setCreditTermDetail] = useState({});
    const [addCreditTermToggle, setAddCreditTermToggle] = useState(false);

    const setCreditTermModalToggle = () => {
        setCreditTermToggle(!creditTermToggle);
    }

    const addCreditTermModalToggle = () => {
        setAddCreditTermToggle(!addCreditTermToggle)
    }

    const delCreditTerm = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteCreditTerm(id),
          });
      }


    useEffect( () => {
        getAllCreditTerms()
    }, [])

    // rerenders after getting all stock data
    /*
    useEffect( () => {
        setAllCreditTerms(creditTermsAll.data)
    }, [creditTermsAll])
    */
    // rerenders after patching data 
    /*
    useEffect( () => {
        getAllCreditTerms()
    }, [patchCreditTermBody, postCreditTermBody, deleteCreditTermBody])
    */
    return(
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Credit Term"
                  columns={creditTermColumns}
                  data={creditTermsAll.data}
                  options={tableOptions}
                />
            </div>

            {
                creditTermToggle && 
                <EditCreditTerm 
                    show={creditTermToggle}
                    handleHide={setCreditTermModalToggle} 
                    creditTermDetail={creditTermDetail}
                    patchCreditTerm={patchCreditTerm}
                />
            }

            {
                addCreditTermToggle && 
                <AddCreditTerm 
                    show={addCreditTermToggle}
                    handleHide={addCreditTermModalToggle} 
                    postCreditTerm={postCreditTerm}
                />
            }

        </Fragment>
    )
}

// export default CreditTerms;



const mapStateToProps = ({ financeState }) => {
    const { CreditTermsState } = financeState;
    return CreditTermsState
  }

export default connect(mapStateToProps, {
    getAllCreditTerms,
    patchCreditTerm,
    postCreditTerm,
    deleteCreditTerm,
    show
})(CreditTerm)