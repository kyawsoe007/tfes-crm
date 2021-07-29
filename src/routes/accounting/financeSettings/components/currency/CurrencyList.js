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

import { getAllCurrences, getCurrency, deleteCurrency } from "Ducks/finance-settings/currences";

const CurrencyList=({
    show,
    onEdit,
    getAllCurrences,
    currencesAll,
    getCurrency,
    currency,
    deleteCurrency
})=>{
    
    
    

    
    const[onOpenEdit,setOnOpenEdit] = useState()
const[editId,setEditId]=useState("")
    const delCurrency = (id, name) =>  {
        show("alert_delete", 
        {
          name: name,
          action: () => deleteCurrency(id),
          });
      }

    useEffect( () => {
        getAllCurrences()
        //getCurrency(editId)
    }, [])

    const [testData, setTestData] = React.useState(["1","2","3"]);




    const currencyListColumns=[
        { label:"ID", name:"id", options: { display:false, filter:false }},
        { label:"Name", name:"name", options: { display:true, filter:true }},
        { label:"Symbol", name:"symbol", options: { display:true, filter:true }},
        { label:"Currency", name:"currencySymbol", options: { display:true, filter:true }},
        { label:"Latest Rate", name:"latestRate", options: { display:true, filter:true }},
        { label:"Actions", name:"actions", options:{
            display:true,
            customBodyRender: (value, tableMeta) => {
                return( <div>
                    <IconButton
                    size="small"
                        onClick={() => {
                            // const currencyIdIndex = currencyListColumns.findIndex(x => x.name === "id");
                            // const currencyNameIndex = currencyListColumns.findIndex(x => x.name === "name");
                            // const currencySymbolIndex = currencyListColumns.findIndex(x => x.name === "symbol");
                            // const currencyDataIndex=currencyListColumns.findIndex(x => x.name === "currencySymbol");
                            
                            // const currencyDetail = {
                            //     id: tableMeta.rowData[currencyIdIndex],
                            //     name: tableMeta.rowData[currencyNameIndex],
                            //     symbol: tableMeta.rowData[currencySymbolIndex],
                            //     currencySymbol: tableMeta.rowData[currencyDataIndex],
                            // }
                            onEdit(false, currencesAll.data[tableMeta.rowIndex])
                            setEditId(tableMeta.rowData[0])
                        }}
                    >
                     <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                    </IconButton>
                    <IconButton
                    size="small"
                    onClick={()=> { delCurrency(tableMeta.rowData[0],tableMeta.rowData[1])}}
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
            <Tooltip id="tooltip-icon" title="Add Currency">
              <IconButton className="mr-2" aria-label="Add Currency" 
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
                  Title="Currency list"
                  columns={currencyListColumns}
                  data={currencesAll.data}
                  options={tableOptions}
                />
            </div>
           
            
            
        </Fragment>
    )
}
const mapStateToProps=({financeState})=>{
const {CurrencesState} =financeState
    return CurrencesState
}
export default connect(mapStateToProps,{
    show,
    getAllCurrences,
    deleteCurrency,
    getCurrency
})(CurrencyList)





