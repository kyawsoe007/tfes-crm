import React, { useState, useEffect, Fragment } from "react";


// components
import RecordsList from "Components/RecordsList";

import EditCurrency from "../../new";
// icon

import { Icon } from '@iconify/react'
import { IconButton } from "@material-ui/core";
import editFilled from '@iconify/icons-ant-design/edit-filled';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever'
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';
// redux
import { connect } from "react-redux";
import { show } from "redux-modal";

import { getAllFiscalYears, getFiscalYear, deleteFiscalYear } from "Ducks/finance-settings/fiscal-year";

const FiscalYearList=({
    show,
    onEdit,
    getAllFiscalYears,
    fiscalYearsAll,
    getFiscalYear,
    currency,
    deleteFiscalYear
})=>{
    
    
    

    
    const[onOpenEdit,setOnOpenEdit] = useState()
const[editId,setEditId]=useState("")
    const delFiscalYear = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteFiscalYear(id),
          });
      }

    useEffect( () => {
        getAllFiscalYears()
        //getFiscalYear(editId)
    }, [])

    const [testData, setTestData] = React.useState(["1","2","3"]);




    const fiscalYearListColumns=[
        { label:"ID", name:"id", options: { display:false, filter:false }},
        { label:"Code", name:"code", options: { display:true, filter:true }},
        { label:"FiscalYear", name:"fiscalYear", options: { display:true, filter:true }},
        { label:"Status", name:"status", options: { display:true, filter:true }},
        { label:"Actions", name:"actions", options:{
            display:true,
            customBodyRender: (value, tableMeta) => {
                return( <div>
                    <IconButton
                    size="small"
                        onClick={() => {
                            // const currencyIdIndex = fiscalYearListColumns.findIndex(x => x.name === "id");
                            // const currencyNameIndex = fiscalYearListColumns.findIndex(x => x.name === "name");
                            // const currencySymbolIndex = fiscalYearListColumns.findIndex(x => x.name === "symbol");
                            // const currencyDataIndex=fiscalYearListColumns.findIndex(x => x.name === "currencySymbol");
                            
                            // const currencyDetail = {
                            //     id: tableMeta.rowData[currencyIdIndex],
                            //     name: tableMeta.rowData[currencyNameIndex],
                            //     symbol: tableMeta.rowData[currencySymbolIndex],
                            //     currencySymbol: tableMeta.rowData[currencyDataIndex],
                            // }
                            onEdit(false, fiscalYearsAll.data[tableMeta.rowIndex])
                            setEditId(tableMeta.rowData[0])
                        }}
                    >
                     <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                    </IconButton>
                    <IconButton
                    size="small"
                    onClick={()=> { delFiscalYear(tableMeta.rowData[0],tableMeta.rowData[1])}}
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
            <Tooltip id="tooltip-icon" title="Add Fiscal Year">
              <IconButton className="mr-2" aria-label="Add Fiscal Year" 
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
                  Title="Fiscal Year list"
                  columns={fiscalYearListColumns}
                  data={fiscalYearsAll.data}
                  options={tableOptions}
                />
            </div>
           
            
            
        </Fragment>
    )
}
const mapStateToProps=({financeState})=>{
const {FiscalYearsState} =financeState
    return FiscalYearsState
}
export default connect(mapStateToProps,{
    show,
    getAllFiscalYears,
    deleteFiscalYear,
    getFiscalYear
})(FiscalYearList)





