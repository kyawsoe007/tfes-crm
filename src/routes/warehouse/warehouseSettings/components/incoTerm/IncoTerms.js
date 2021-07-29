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
import EditIncoTermDetails from './EditIncoTerm';
import AddIncoTermDetails from './AddIncoTerm';

// DUCKS 
import { getAllIncoTerms, patchIncoTerm, postIncoTerm, deleteIncoTerm } from "Ducks/warehouse/incoTerm";

const IncoTerms = ({ 
    getAllIncoTerms, 
    incoTermsAll, 
    patchIncoTerm, 
    patchIncoTermBody, 
    postIncoTerm, 
    postIncoTermBody, 
    deleteIncoTerm, 
    deleteIncoTermBody, 
    show 
}) => {

    const incoTermColumns = [
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

                                const incoTermIdIndex = incoTermColumns.findIndex(x => x.name === "id");
                                const incoTermNameIndex = incoTermColumns.findIndex(x => x.name === "name");

                                const incoTermDetail = {
                                    id: tableMeta.rowData[incoTermIdIndex],
                                    name: tableMeta.rowData[incoTermNameIndex]
                                }
                                
                                console.log("STOCK", incoTermDetail)

                                setIncoTermDetail(incoTermDetail)
                                setIncoTermToggle(true);
                            }}
                        >
                            <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                        </IconButton>

                        <IconButton
                            size="small" className="tableDeleteIcon"
                            onClick={() => {
                                delIncoTerm(tableMeta.rowData[0], tableMeta.rowData[1])
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
                addIncoTermModalToggle()
              }}
              >
                <AddIcon />
              </IconButton>
            </Tooltip>    
          </React.Fragment>
        ) 
    };


    const [allIncoTerms, setAllIncoTerms] = useState([]);
    const [incoTermToggle, setIncoTermToggle] = useState(false);
    const [incoTermDetail, setIncoTermDetail] = useState({});
    const [addIncoTermToggle, setAddIncoTermToggle] = useState(false);

    const setIncoTermModalToggle = () => {
        setIncoTermToggle(!incoTermToggle);
    }

    const addIncoTermModalToggle = () => {
        setAddIncoTermToggle(!addIncoTermToggle)
    }

    const delIncoTerm = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteIncoTerm(id),
          });
      }

    useEffect( () => {
        getAllIncoTerms()
    }, [])

    // rerenders after getting all stock data
    /*
    useEffect( () => {
        setAllIncoTerms(incoTermsAll.data)
    }, [incoTermsAll])

    // rerenders after patching data 
    useEffect( () => {
        getAllIncoTerms()
    }, [patchIncoTermBody, postIncoTermBody, deleteIncoTermBody])
 */
    return(
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="All Stock Locations"
                  columns={incoTermColumns}
                  data={incoTermsAll.data}
                  options={tableOptions}
                />
            </div>

            {
                incoTermToggle && 
                <EditIncoTermDetails 
                    show={incoTermToggle}
                    handleHide={setIncoTermModalToggle} 
                    incoTermDetail={incoTermDetail}
                    patchIncoTerm={patchIncoTerm}
                />
            }

            {
                addIncoTermToggle && 
                <AddIncoTermDetails 
                    show={addIncoTermToggle}
                    handleHide={addIncoTermModalToggle} 
                    postIncoTerm={postIncoTerm}
                />
            }

        </Fragment>
    )
}

// export default IncoTerms;



const mapStateToProps = ({ incoTermsState }) => {
    return incoTermsState
  }

export default connect(mapStateToProps, {
    getAllIncoTerms,
    patchIncoTerm,
    postIncoTerm,
    deleteIncoTerm,
    show
})(IncoTerms)