import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { show } from "redux-modal";
import moment from "moment";
// components
import ServerRecordsList from "Components/ServerRecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import InternalRemarks from '../../dashboard/components/InternalRemarks';

//icon
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import baselineDeleteForever from "@iconify/icons-ic/baseline-delete-forever";
import editFilled from "@iconify/icons-ant-design/edit-filled";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import VisibilityIcon from '@material-ui/icons/Visibility';

// Redux Imports
import addFilled from "@iconify/icons-carbon/add-filled";
import { purchaseNewPage, singlePurchase } from "Helpers/crmURL";
import { purchaseStatus } from 'Constants/modelStatus';
import { getPurchase, getFilterPurchase, deletePurchase, setDuplicate, clearDuplicate, getSavedPurchaseQuery ,patchSinglePurchaseRequestInternalRemarks } from "Ducks/purchasetfes";
import NumberFormat from 'react-number-format';
import { amountRounding } from "Helpers/helpers";

const options = Object.assign({}, listOptions);
class crm_purchase_list extends Component {
  constructor(props) {
    super(props);
    this.state ={
      purchaseOrderData:[]
    }
    this.handleSingleDelete = this.handleSingleDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.duplicate = this.duplicate.bind(this);
  }

  componentDidMount() {
    // this.props.getPurchase();
  }

  productPage() {
    this.props.clearDuplicate();
    this.props.history.push({pathname:purchaseNewPage,state:{view:false} });
  }
  // Push Edit/Update Page
  edit(id) {
    this.props.history.push({pathname:singlePurchase(id),state:{view:false}});
  }
  view=(id)=>{
    this.props.history.push({pathname:singlePurchase(id),state:{view:true}});
  }
  duplicate(rowNum) {
    let data = { ...this.props.PurchaseFiltered.data[rowNum] };
    delete data.poNumber;
    delete data._id;
    delete data.id;
    data.status = 'draft';
    this.props.setDuplicate(data);
    this.props.history.push({pathname:purchaseNewPage,state:{isDuplicate:true,view:false}});
  }

  // Push Edit/Update Page
  // clone(id) {
  //   this.props.history.push(singlePurchase(id));
  // }

  // Delete row
  delete(id) {
    this.props.show("alert_delete", {
      name: id,
      action: () => this.handleSingleDelete(id),
    });
  }

  handleSingleDelete(purchaseId) {
    console.log(purchaseId);
    this.props.deletePurchase(purchaseId);
  }

  componentDidUpdate(prevProps) {
    // have to render after send the thing over 
    
    let data = this.props.PurchaseFiltered.data
    if(prevProps.PurchaseFiltered){
        if (prevProps.PurchaseFiltered !== this.props.PurchaseFiltered) {
        this.setState({ purchaseOrderData: this.props.PurchaseFiltered.data });
    }
    }
    // console.log("purchaseOrderData in componentDidUpdate",this.state.purchaseOrderData) 
    
  }
  handleChange = (field, value, index) => {
      if (field === "internalRemarks") {
          let purchaseOrderData = [...this.state.purchaseOrderData];
          purchaseOrderData[index].internalRemarks = value;
          this.setState({ purchaseOrderData: purchaseOrderData});
      }
      
  }
  editRemarkHandler = (id, internalRemarks) => {

      let patchBody = {
          id: id,
          internalRemarks: internalRemarks
      }
      this.props.patchSinglePurchaseRequestInternalRemarks(patchBody)
  }

  render() {
    const { data, count } = this.props.PurchaseFiltered;
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      { label: "PO Number", name: "poNumber",
        options: {
          filter: false,          
        }
      },
      { label: "Purchase Type", name: "purchaseType", 
        options: { 
          filter: true, 
          sort: false,
          filterType: "checkbox",
          filterOptions:  { names: ["Trading", "Stocks", "Expenses", "Fixed Assets"]},
          customFilterListOptions:{
          render: (v) => `Purchase Type: ${v}`
          },
        } },
      { label: "Date", name: "createdDate",
        options: {
          filter: false,
          customBodyRender: (value) => (
              <div>{moment(value).format('DD/MM/YYYY')}</div>
          )
        }
      },
      { label: "Supp. Name", name: "name", options: { filter: false, sort: false } },
      { label: "Supp. Number", name: "suppNo", options: { filter: false, sort: false } },      
      {
        name: "purchasePic",
        options: { 
          filter: false, sort: false,
          customBodyRender: (value) => (
            value && (value.firstName + " "+value.lastName)
          )
        
        },
      },
      {
        name: "delAddress",
        options: { display: "excluded", filter: false, sort: false },
      },
      {
        label: 'Amount',
        name: 'total',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value,tableMeta) => {
            let totalIndex = columns.findIndex(items => items.name === "grandTotalAmt")
            let totalAmount = amountRounding(2,tableMeta.rowData[totalIndex])
            let currencyIndex = columns.findIndex(items => items.name === "currency")
            let currencySymbol = tableMeta.rowData[currencyIndex] ? tableMeta.rowData[currencyIndex].symbol : ''
            return <div >
              <span>{currencySymbol && currencySymbol} </span>
              <NumberFormat value={totalAmount} displayType={'text'} thousandSeparator={true}/>
            </div>
          },
        },
      },
      { label: "Amount", name: "grandTotalAmt", options: { display: 'excluded', filter: false ,
        customBodyRender:(value,tableData)=>{
          let currency= columns.findIndex(items=>items.name ==="currency")
          if(value){
            let symbol = "";
            if(currency){
              symbol = tableData.rowData[currency] && tableData.rowData[currency].currencySymbol ? tableData.rowData[currency].currencySymbol : "";
            }
                    
            let totalAmount= amountRounding(2,value)
            return <div>
              <span>{symbol} </span>
              <NumberFormat value={totalAmount} displayType={'text'} thousandSeparator={true}/>  
            </div>
          }
          else {
            return "";
          }
       
         
       }   
  } },
       {label: "Currency", name: "currency", options: {
        display: "excluded",
        filter: false,
       }},
      { label: "Status", name: "status", options: { 
        sort: false,
        filter: true,       
        filterType: "checkbox",
        filterOptions: { names: Object.values(purchaseStatus)},
        filterList: [purchaseStatus.DRAFT, purchaseStatus.REQUEST, purchaseStatus.ERROR_STATUS, purchaseStatus.OPEN, purchaseStatus.PARTIAL],
        customFilterListOptions:{
          render: (v) => `Status: ${v}`
        }
      } },
      {
        label: "Inv Status", name: "invStatus", options: { filter: false, sort: false }
      },                 
      {
        label: 'Internal Remarks', name: 'internalRemarks', options: {
            filter: false,
            sort: false,
            customBodyRender: (value,tableMeta) => {
                let index = tableMeta.rowIndex
                let purchaseOrderData =this.state.purchaseOrderData
                if(purchaseOrderData.length > 0 )
                {
                    let rowData =  purchaseOrderData[index]
                    // console.log("item",rowData)
                    return (
                        <InternalRemarks 
                            target="internalRemarks"
                            keys={index}
                            value={rowData && rowData.internalRemarks ? rowData.internalRemarks: ""}
                            handleChange={this.handleChange}
                            onBlur={(e) => this.editRemarkHandler(rowData.id, e.target.value)}
                            originalVal={rowData && rowData.internalRemarks ? rowData.internalRemarks: ""} 
                        /> 
                    )
                }
            }
        }
    },
      {
        label: "Action",
        name: "action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            let statusIndex = columns.findIndex(x=>x.name =="status");
            let data = tableMeta.rowData;

            return (
              <div>{ (tableMeta.rowData[statusIndex] == purchaseStatus.CLOSED || tableMeta.rowData[statusIndex] == purchaseStatus.PARTIAL) &&
                 <IconButton
                  size="small"
                  onClick={() => { this.view(tableMeta.rowData[0]) }}>
                  <VisibilityIcon
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                  </IconButton>
              }
                { ( tableMeta.rowData[statusIndex] != purchaseStatus.CLOSED && tableMeta.rowData[statusIndex] != purchaseStatus.PARTIAL) &&
                <IconButton
                  size="small"
                  onClick={() => {
                    this.edit(tableMeta.rowData[0]);
                  }}
                >
                  <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                </IconButton>} 
                
                {console.log(tableMeta.rowData[statusIndex])}
                { (tableMeta.rowData[statusIndex] == purchaseStatus.DRAFT || tableMeta.rowData[statusIndex] == purchaseStatus.OPEN ) && 
                <IconButton
                    size="small"
                    className="tableDeleteIcon"
                    onClick={() => {
                    this.delete(tableMeta.rowData[0]);}}>
                  <Icon icon={baselineDeleteForever} color="#595959" width="1.5rem" height="1.5rem" />
                </IconButton>  } 
                 

                <IconButton size="small" className="tableCloneIcon">
                  <FileCopyOutlinedIcon
                    onClick={() => {
                      this.duplicate(tableMeta.rowIndex);
                    }}
                    style={{
                      color: "#595959",
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                  />
                </IconButton>
              </div>
            );
          },
        },
      },
    ];

    // dynamically adds back filter list based on the props 
    for (var i = 0; i < columns.length; i++) {
      if (this.props.SavedQuery.saved){
        columns[i].options.filterList = this.props.SavedQuery.filterList[i];
      } else{
          // sets default filter list for status on first load 
          if (columns[i].name === 'status') {
              columns[i].options.filterList = [purchaseStatus.DRAFT, purchaseStatus.REQUEST, purchaseStatus.ERROR_STATUS, purchaseStatus.OPEN, purchaseStatus.PARTIAL];
          } else {
              columns[i].options.filterList = []
          }
      }

      // FOR COLUMNS
      if(this.props.SavedQuery.display){
        columns[i].options.display = this.props.SavedQuery.display[i];
      }
    }

    options.customToolbar = () => {
      return (
        <IconButton size="small" onClick={() => this.productPage()}>
          <Icon
            className="tableEditIcon"
            icon={addFilled}
            color="#df0021"
            width="2rem"
            height="2rem"
          />
        </IconButton>
      );
    };


    return (
      <div>
      <div style={{
            width:"50%",
            margin:"10px auto",
            minWidth:"400px",
            color:"#2b4da0",
            fontWeight:"bolder",
            fontSize:"18px",
            textAlign:"center", 
            }} > Purchase Orders
          </div>
      <div className="rct-block">
         <ServerRecordsList 
          title=" " 
          hasSearch={true} 
          columns={columns} 
          data={data} 
          totalCount={count} 
          otherOptions={options}
          filterFunc={this.props.getFilterPurchase}
          savedQuery={this.props.SavedQuery}
          getSavedQuery={this.props.getSavedPurchaseQuery}
        />
      </div>
      </div>
    );
  }
}

const mapStateToProps = ({ purchasetfesState }) => {
  const { Purchases } = purchasetfesState;
  const { PurchaseDetails } = purchasetfesState;
  const { PurchaseFiltered } = purchasetfesState;
  const { SavedQuery } = purchasetfesState
  return { Purchases, PurchaseDetails, PurchaseFiltered, SavedQuery };
};
export default connect(mapStateToProps, {
  show,
  getPurchase,
  deletePurchase,
  getFilterPurchase,
  setDuplicate,
  clearDuplicate,
  getSavedPurchaseQuery,
  patchSinglePurchaseRequestInternalRemarks
})(crm_purchase_list);
