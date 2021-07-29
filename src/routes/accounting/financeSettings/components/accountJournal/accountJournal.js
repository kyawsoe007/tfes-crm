import React, { useState, useEffect, Fragment } from "react";


// components
import RecordsList from "Components/RecordsList";

import EditAccountJournal from "../../new";
// icon

import { Icon } from '@iconify/react'
import { IconButton } from "@material-ui/core";
import editFilled from '@iconify/icons-ant-design/edit-filled';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';
// redux
import { connect, useDispatch } from "react-redux";
import { show } from "redux-modal";

import { getAllAccountJournals, getAccountJournal, deleteAccountJournal } from "Ducks/finance-settings/account-journal";

const AccountJournal=({
    show,
    onEdit,
    getAllAccountJournals,
    accountJournalsAll,
    getAccountJournal,
    AccountJournal,
    deleteAccountJournal
})=>{
    const dispatch=useDispatch()
    const delAccountJournal = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteAccountJournal(id),
          });
      }

    useEffect( () => {
        dispatch(getAllAccountJournals())
        //getAccount Journal(editId)
    }, [])
console.log('dd',accountJournalsAll.data)

    const AccountJournalListColumns=[
        { label:"ID", name:"_id", options: { display:false, filter:false }},
        { label:"Name", name:"name", options: { display:true, filter:true }},
        { label:"Debit", name:"debit_account", options: { 
            display:true, filter:true,
            customBodyRender: (value) => {
                return  value ? value.accountName : ""
            }
        
        }},
        { label:"Credit", name:"credit_account", options: { 
            display:true, filter:true,
            customBodyRender: (value) => {
                return value ? value.accountName : ""
            }
        }},
        { label:"Currency", name:"currency_name", options: { display:true, filter:true }},
        { label:"Actions", name:"actions", options:{
            display:true,
            customBodyRender: (value, tableMeta) => {
                return( <div>
                    <IconButton
                    size="small"
                        onClick={() => {
                            onEdit(false, accountJournalsAll.data[tableMeta.rowIndex])
                            // setEditId(tableMeta.rowData[0])
                        }}
                    >
                     <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                    </IconButton>
                    <IconButton
                    size="small"
                    onClick={()=> { delAccountJournal(tableMeta.rowData[0],tableMeta.rowData[1])}}
                    >
                     <Icon className="baselineDeleteForever" icon={baselineDeleteForever} color="#595959" width="1.5rem" height="1.5rem" />
                    </IconButton>
                </div>)
               
            }
        },
    }
    ]
   
    const tableOptions = {
        selectableRows: false,
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
        customToolbar: () => (
            <React.Fragment>
            <Tooltip id="tooltip-icon" title="Add Account Journal">
              <IconButton className="mr-2" aria-label="Add Account Journal" 
               onClick={() => {
                onEdit(false);
              }}
              >
                <AddIcon/>
              </IconButton>
            
            </Tooltip>    
          </React.Fragment>
        ) 
    };
    
    return(
        <Fragment>
            <div style={{padding: "1rem", minWidth: "1200px"}}>
                <RecordsList 
                  Title="Account Journal list"
                  columns={AccountJournalListColumns}
                  data={accountJournalsAll.data}
                  options={tableOptions}
                />
            </div>
           
            
            
        </Fragment>
    )
}
const mapStateToProps=({financeState})=>{
const {AccountJournalsState} =financeState
    return AccountJournalsState
}
export default connect(mapStateToProps,{
    show,
    getAllAccountJournals,
    deleteAccountJournal,
    getAccountJournal
})(AccountJournal)





