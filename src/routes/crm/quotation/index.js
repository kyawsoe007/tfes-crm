import React, { Component } from 'react';
import moment from "moment";
// Sub components
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { show } from 'redux-modal';
import ServerRecordsList from 'Components/ServerRecordsList';

import RecordsList from 'Components/RecordsList';
import { listOptions, getDateTime } from 'Helpers/helpers';
import {
  FormGroup,
  FormLabel,
  FormControl,
  ListItemText,
  TextField,
  Checkbox,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';

import Button from '@material-ui/core/Button';
import Image from 'Components/Image';
import RctSectionLoader from 'Components/RctSectionLoader';
// Icon Imports
import { IconButton } from '@material-ui/core';
import { Icon } from '@iconify/react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
import editFilled from '@iconify/icons-ant-design/edit-filled';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';

import { singlequotation } from 'Helpers/crmURL';

// Actions
import addFilled from '@iconify/icons-carbon/add-filled';
import { quotationNewPage } from 'Helpers/crmURL';
// import { getFilterProduct } from "Ducks/producttfes";
import {
  getFilterQuotationRequest,
  deleteQuotation,
  setDuplicate,
  clearDuplicate,
  getSingleSkuQuotationRequest,
  getSavedQuotationQuery
} from 'Ducks/quotationtfes'
import { getPicUsers } from 'Ducks/user'
import { quotationStatus, saleStatus } from 'Constants/modelStatus';
import NumberFormat from 'react-number-format';
import { amountRounding } from "Helpers/helpers";

class crm_quotation_list extends Component {
  constructor(props) {
    super(props)

    this.delete = this.delete.bind(this)
    this.edit = this.edit.bind(this)
    this.duplicate = this.duplicate.bind(this)
    this.view = this.view.bind(this)

    this.state = {
      remarks: '',
    }
  }
  productPage() {
    this.props.clearDuplicate();
    this.props.history.push({ pathname: quotationNewPage, state: {view: false} })
  }
  // Edit comes here
  edit(id) {
    this.props.history.push({ pathname: singlequotation(id), state: {view: false} })
  }

  view(id) {
    this.props.history.push({ pathname: singlequotation(id), state: {view: true} })
  }
  duplicate(id) {
    // this.props.setDuplicate(data);
    // this.props.history.push(quotationNewPage);
    this.props.getSingleSkuQuotationRequest(id)
    this.props.history.push(quotationNewPage, { isDuplicate: true ,view: false})
    // this.props.history.push({ pathname: singlequotation(id), state: {isDuplicate: true} })
  }

  delete(id, partNumber) {
    this.props.show('alert_delete', {
      name: partNumber,
      action: () => this.handleSingleDelete(id),
    })
  }

  handleSingleDelete(skuId) { 
    this.props.deleteQuotation(skuId)
  }

  

  componentDidMount() {
    // this.props.getFilterProduct();
    // this.props.getFilterQuotation();
    this.props.getPicUsers()
  }

  render() {
    const tableData = this.props.QuotationFiltered
    const picUserList = this.props.picUserList.data

    let salesperson = [];
    if (this.props.QuotationDetails.data) {
      if (this.props.QuotationDetails.data.salesPic)
        salesperson = this.props.QuotationDetails.data.salesPic.map((val) => val.name)
    }
    const columns = [
      {
        name: 'id',
        options: { display: 'excluded', filter: false, sort: false },
      },
      {
        name: 'subproduct',
        options: { display: 'excluded', filter: false, sort: false },
      },
      {
        label: 'salesPic',
        name: 'salesPic',
        options: {
          display: 'excluded',
          filter: false,                  
        },
      },
      { label: 'Quote #', name: 'quoRef', options: { filter: false } },
      // { label: 'Version No', name: 'versionNum', options: { filter: false } },
      {
        label: 'Date', name: 'updatedAt',
        options: {
          filter: true,
          customBodyRender: (value) => (
              <div>{moment(value).format('DD/MM/YYYY')}</div>
          ),
          filterType: 'custom',
          // filterList: this.props.SavedQuery.saved? this.props.SavedQuery.filterList[4] : [],
          customFilterListRender: filterList => {
           return `Date ${filterList[0]} - ${filterList[1]}`
          },
          filterOptions: {
            display: (filterList, onChange, index, column) => (
              <div className="date_filter">
                <FormLabel>Date</FormLabel>
                <FormGroup row>
                  <TextField
                    label=''
                    type="date"
                    value={filterList[index][0] ? filterList[index][0] : ''}
                    onChange={event => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: '45%', marginRight: '10%', paddingTop: "17px" }}
                  />
                  <TextField
                    label=''
                    type="date"
                    value={filterList[index][1] || ''}
                    onChange={event => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: '45%', paddingTop: "17px" }}
                  />
                </FormGroup>
              </div>
            ),
          },
        }


      },
      { label: 'SalesPic FirstName', name: 'salesPicFirstName', options: { display: 'excluded', filter: false } },
      { label: 'SalesPic LastName', name: 'salesPicLastName', options: { display: 'excluded', filter: false } },
      { label: 'Sales PIC', name: "salesPic", options: { 
        sort: false,
        filter: true, 
        customBodyRender: (value, tableMeta) => {

          const firstNameIndex = columns.findIndex(x => x.name === "salesPicFirstName");
          const lastNameIndex = columns.findIndex(x => x.name === "salesPicLastName");
          
          return <div> {tableMeta.rowData[firstNameIndex]} {tableMeta.rowData[lastNameIndex]}</div>
        },
        filterType: 'custom',
        // filterList: this.props.SavedQuery.saved ? this.props.SavedQuery.filterList[7] : [],
        filterOptions: {
          display: (filterList, onChange, index, column) => {

            // create set for unique values 
            // let optionValues = new Set()
            // for (let i = 0; i < tableData.data.length; i++) {
            //   let salesname = `${tableData.data[i].salesPicFirstName} ${tableData.data[i].salesPicLastName}`
            //   optionValues.add(salesname);
            // }
            // convert back to array so can do map
            // optionValues = [...optionValues];

            let optionValues = []
            for (let i = 0; i < picUserList.length; i++) {
              let salesname = `${picUserList[i].firstName} ${picUserList[i].lastName}`
              optionValues.push(salesname);
            }

          return (
            <div>
                <FormControl>
                <FormLabel>Sales PIC</FormLabel>
                  <Select
                    multiple
                    value={filterList[index]}
                    renderValue={selected => selected.join(', ')}
                    onChange={event => {
                      filterList[index] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                  >
                    {optionValues.map(item => (
                      <MenuItem key={item} value={item}>
                        <Checkbox
                          color='primary'
                          checked={filterList[index].indexOf(item) > -1}
                        />
                        <ListItemText primary={item} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
            </div>
          )
          }
        },
        customFilterListOptions:{
          render: (v) => `Sales PIC: ${v}`
        },
      }},
      { label: 'Customer Name', name: 'custName', options: { display: 'true', filter: false, sort: false } },
      { label: 'Currency', name: 'currency', options: { display: 'excluded', filter: false, sort: false } },
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
      {
        label: 'Amount', name: 'grandTotalAmt', options: {
          display: 'excluded',
          filter: true,
          filterType: 'custom',
          // filterList: this.props.SavedQuery.saved ? this.props.SavedQuery.filterList[10] : [],
          customBodyRender: (value,index,tableMeta) => {
            return <div>
              <NumberFormat value={value} displayType={'text'} thousandSeparator={true}/>
            </div>
          },
          customFilterListRender: filterList => `Amount $${filterList[0]} - $${filterList[1]} `,
          filterOptions: {
            display: (filterList, onChange, index, column) => (
              <div className="amount_filter">
                <FormLabel>Amount</FormLabel>
                <FormGroup row>
                  <TextField
                    label='min'
                    type="number"
                    value={filterList[index][0] ? filterList[index][0] : ''}
                    onChange={event => {
                      filterList[index][0] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: '45%', marginRight: '10%' }}
                  />
                  <TextField
                    label='max'
                    type="number"
                    value={filterList[index][1] || ''}
                    onChange={event => {
                      filterList[index][1] = event.target.value;
                      onChange(filterList[index], index, column);
                    }}
                    style={{ width: '45%' }}
                  />
                </FormGroup>
              </div>
            ),
          },

        }
      },  
      {
        label: 'Status', name: 'status', options: {
          sort: false,
          filter: true,
          filterType: "checkbox",
          filterOptions: { names: Object.values(quotationStatus)},   
          // column 11 is status column
          // filterList: this.props.SavedQuery.saved ? this.props.SavedQuery.filterList[11] : [],       
          customFilterListOptions:{
            render: (v) => `Status: ${v}`
          },
          customBodyRender: (value) => {
            if(value == 'win'){
              return(<span style={{color:"#04c21a", fontWeight:"bold"}}>
                { value }
              </span>
            )
            }
            else if(value == 'loss') {
              return(<span style={{color:"#bd0f09", fontWeight:"bold"}}>
                { value }
              </span>
            )           
            }
            else if(value == 'delay'){
              return(<span style={{color:"#b8770f", fontWeight:"bold"}}>
              { value }
            </span>)
            }
            else if(value == 'issued'){
              return(<span style={{color:"#0d7ad4", fontWeight:"bold"}}>
              { value }
            </span>)           
            }
            else {
              return(<span style={{color:"#5d5e5e", fontWeight:"bold"}}>
              { value }
            </span>)
            }
          },

        }
      },
      { label: 'SO Status', name: 'soStatus', options: { 
        filter: true, 
        sort: false,
        filterType: 'checkbox',
        filterOptions: { names: Object.values(saleStatus)},
        customFilterListOptions:{
          render: (v) => `SO Status: ${v}`
        }, 
      } },
      { label: 'Remarks', name: 'remarks', options: { display: 'excluded',filter: false } },
      { label: 'Version List', name: 'oldVersionList', options: { filter: false, display: 'excluded' } },
      {
        label: 'Action',
        name: 'action',
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            let statusIndex = columns.findIndex(x => x.name === "status");
            let data = tableMeta.rowData

            let editIcon = false;
            let deleteIcon = false;
            let viewIcon = true;

            if (data[statusIndex] === "issued" || data[statusIndex] === "delay" || data[statusIndex] === 'draft') {
              editIcon = true;
              viewIcon = false
            }

            if (data[statusIndex] === "draft" || data[statusIndex] === "issued") {
              deleteIcon = true;
            }


            return (
              <div>
                {viewIcon&&
                <IconButton
                size="small"
                onClick={() => { this.view(tableMeta.rowData[0]) }}>
                <VisibilityIcon
                  color="#595959"
                  width="1.5rem"
                  height="1.5rem"
                />
              </IconButton>}
              {
                editIcon &&
                <IconButton
                  size="small"
                  onClick={() => {
                    this.edit(tableMeta.rowData[0])
                  }}
                >
                  <Icon
                    className="tableEditIcon"
                    icon={editFilled}
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                </IconButton>
              }

              {
                deleteIcon &&
                <IconButton
                  size="small"
                  className="tableDeleteIcon"
                  onClick={() => {
                    this.delete(tableMeta.rowData[0], tableMeta.rowData[3])
                  }}>
                  <Icon
                    icon={baselineDeleteForever}
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                </IconButton>
              }

                <IconButton
                  size="small"
                  className="tableCloneIcon"
                  onClick={() => {
                    this.duplicate(tableMeta.rowData[0])
                  }}
                >
                  <FileCopyOutlinedIcon
                    style={{
                      color: '#595959',
                      width: '1.5rem',
                      height: '1.5rem',
                    }}
                  />
                </IconButton>
              </div>
            )
          },
        },
      },
    ]

    // dynamically adds back filter list based on the props 
    for (var i = 0; i < columns.length; i++) {
      // FOR FILTERS
      if (this.props.SavedQuery.saved){
        columns[i].options.filterList = this.props.SavedQuery.filterList[i];
      } else {
        columns[i].options.filterList = [];
      }

      // FOR COLUMNS
      if(this.props.SavedQuery.display){
        columns[i].options.display = this.props.SavedQuery.display[i];
      }
    }
    // console.log(columns);
    
    let options = {}
    options.expandableRows = true
    // { label: 'Version List', name: 'oldVersionList', options: { filter: false, display: false } },
    options.renderExpandableRow = (rowData, rowMeta) => {
      const versionIndex = columns.findIndex(x => x.name === "oldVersionList")
      if (rowData[versionIndex]) {
        return rowData[versionIndex].map((item) => (
          <tr className="CRM-sub-table">
            <td></td>
            <td>
              {item.quoRef}
            </td>
            <td>
              {item.versionNum}
            </td>
            <td>
              {item.createdAt}
            </td>
            <td>
              {item.custName}
            </td>
            <td>
              {item.currency}
            </td>
            <td>
              {item.total}
            </td>
            <td>
              {item.status}
            </td>
            <td>
              SO Status
            </td>
            <td>
              {item.remarks}
            </td>
            <td>
              <IconButton
                size="small"
                onClick={() => { this.view(item.id) }}>
                <VisibilityIcon
                  color="#595959"
                  width="1.5rem"
                  height="1.5rem"
                />
              </IconButton>
              <IconButton
                size="small" className="tableCloneIcon" onClick={() => { this.duplicate(item.id) }}>
                <FileCopyOutlinedIcon
                  style={{
                    color: "#595959",
                    width: "1.5rem",
                    height: "1.5rem"
                  }}
                />
              </IconButton>
            </td>
          </tr>
        ))
      } else {
        return ""
      }

    }

    options.customToolbar = () => {
      return (
        <IconButton size="small" onClick={() => this.productPage()}>
          <Icon
            className="tableEditIcon"
            icon={addFilled}
            // color="#12394C"
            color="#df0021"
            width="2rem"
            height="2rem"
          />
        </IconButton>
      )
    }

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
              }} > Quotation
            </div>
           <div className="rct-block">
        
        <ServerRecordsList
          title=" "
          hasSearch={true}
          columns={columns}
          data={tableData.data}
          totalCount={tableData.count}
          otherOptions={options}
          filterFunc={this.props.getFilterQuotationRequest}
          savedQuery={this.props.SavedQuery}
          getSavedQuery={this.props.getSavedQuotationQuery}
        />
      </div>
    
      </div>
   )
  }
}

const mapStateToProps = ({ quotationtfesState, userState }) => {
  const { Quotations } = quotationtfesState
  const { QuotationDetails } = quotationtfesState
  const { QuotationFiltered } = quotationtfesState
  const { SavedQuery } = quotationtfesState
  const { picUserList } = userState
  return { Quotations, QuotationDetails, QuotationFiltered, SavedQuery, picUserList }
}

export default connect(mapStateToProps, {
  show,
  getFilterQuotationRequest,
  deleteQuotation,
  setDuplicate,
  clearDuplicate,
  getSingleSkuQuotationRequest,
  getSavedQuotationQuery,
  getPicUsers

})(crm_quotation_list)
