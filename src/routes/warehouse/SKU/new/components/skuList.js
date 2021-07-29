import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import {  Link } from "react-router-dom";
import ServerRecordsList from "Components/ServerRecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";

import Button from "@material-ui/core/Button";
import Image from "Components/Image";
import RctSectionLoader from "Components/RctSectionLoader";
//icon
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import baselineDeleteForever from "@iconify/icons-ic/baseline-delete-forever";
import editFilled from "@iconify/icons-ant-design/edit-filled";
import TextField from '@material-ui/core/TextField';
import { getFilterProduct } from "Ducks/producttfes";

const options = Object.assign({}, listOptions);

class SKU_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      errorMsg: ""
    };

    this.passBack = this.passBack.bind(this)
    this.qtyFilter = props.ProductFiltered.filters.find(item => {
      if(item.Qty != undefined){
        return true;
      }
      else {
        return false;
      }
    });
    let dropFilter = this.props.ProductFiltered.filters.filter(item => {
      let keys = Object.keys(item);
      if(keys[0] == "dropsearch"){
        return true;
      }
      else {
        return false;
      }
    })
    this.dropText = dropFilter.map( item => item.dropsearch);
  }

  passBack(productId, skuId, itemQty) {

    console.log("QTY", this.props.rowQty, itemQty);
    if (this.props.rowQty > itemQty) {
      this.setState({errorMsg: "Not enough quantity!"})
      return null
    }
    // console.log("Row id here")
    // console.log(this.props);
    this.setState({errorMsg: ""})
    this.props.getInfo(productId, skuId);
  };

  componentDidMount() {
  }

  render() {
    const { data, count, loading } = this.props.ProductFiltered;
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      {
        name: "subproduct",
        options: { display: "excluded", filter: false, sort: false },
      },
      { label: "P/N", name: "partNumber", options: { filter: false } },
      { label: "Description", name: "description", options: { filter: false } },
      {
        label: "GRP1",
        name: "grpOne",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value ? value.name : "";
          },
          filter: false,
        },
      },
      {
        label: "GRP2",
        name: "grpTwo",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value ? value.name : "";
          },
          filter: false,
        },
      },
      {
        label: "Size",
        name: "size",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value ? value.name : "";
          },
          filter: false,
        },
      },
      {
        label: "Supplier",
        name: "supplier",
        options: {
          customBodyRender: (value, tableMeta) => {
            return "";
          },
          filter: false,
        },
      },
      {
        label: "UOM",
        name: "uom",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value ? value.name : "";
          },
          filter: false,
        },
      },
      {
        label: "Qty",
        name: "qty",
        options: {
          customBodyRender: (value, tableMeta) => {
            let total = 0;
            if (tableMeta.rowData[11]) {
              for (let i = 0; i < tableMeta.rowData[11].length; i++) {
                total += tableMeta.rowData[11][i].quantity;
              }
              return total;
            }
            return "NA";
          },
          filter: false,
        },
      },
      { label: "List Price(SGD)", name: "listPrice", 
        options: { filter: false, 
        customBodyRender: (value)=> {
          if(value){
            return value.toFixed(2);
          }
          else {
            return ""
          }
      }}  
     },
      { label: "Sku", name: "skus", options: { filter: false, display: false } },
      { label: "Location", name: "location", options: { filter: false } },
      { label: "Material", name: "material", options: {
        filter: false,
        display:false,
        customBodyRender: (value) => value ? value.name : ""
      }},
      { label: "Brand", name: "brand", options: {
        filter: false,
        display:false,
        customBodyRender: (value) => value ? value.name : ""
      }},
      { label: "Sel1", name: "selOne", options: {
        filter: false,
        display:false
      }},
      { label: "Sel2", name: "selTwo", options: {
        filter: false,
        display:false
      }},
      {
        name: "Qty",
        options: {
          filter: true,
          display: "excluded",
          filterType: "checkbox",
          filterList: this.qtyFilter ? [this.qtyFilter.Qty] : [],
          filterOptions: {
            names: ['Not zero']
          }
        }
      }
    ];

    // options.onRowClick = (rowData) => {
    //   this.props.getInfo(rowData[0]);
    // };

    // Expandable rows here
    options.expandableRows = true;
    options.renderExpandableRow = (rowData, rowMeta) => {
      if (rowData[11]) {

        let newRowData = [...rowData[11]];

        for (let i = 0; i < newRowData.length; i++) {
          if (newRowData[i].rsvd.length >=1) {
            newRowData[i].reserved = 0;
            for (let j = 0; j < newRowData[i].rsvd.length; j++) {
              newRowData[i].reserved += newRowData[i].rsvd[j].qty
            }
          }
        }

        return newRowData.map((item) => (
          <tr className="SKU-sub-table" onClick={()=> this.passBack(rowData[0], item.id, item.quantity)}>
            <td></td>
            <td>
              {/* {item.pn} */}
              {rowData[2]}
            </td>
            <td>
              {/* {item.description} */}
              <Link to="#">{rowData[3]}</Link>
            </td>
            <td>
              {/* {item.grp1} */}
              {rowData[4]}
            </td>
            <td>
              {/* {item.grp2} */}
              {rowData[5]}
            </td>
            <td>
              {/* {item.size} */}
              {rowData[6]}
            </td>
            <td>
              {/* {item.supp1} */}
              {item.supplier? ("("+item.supplier.suppNo +") "+item.supplier.name) : "" }
            </td>
            <td>
              {/* {item.uom} */}
              {rowData[8]} 
            </td>
              {/* {item.qty} */}
            <td>{item.quantity} { item.reserved && `(${item.reserved})` }</td>
            <td></td>
            <td>{item.location && item.location.name}</td>
          </tr>
        ));
      } else {
        return "";
      }
    };

    let hasSkus = [];
    data.forEach( (item,index) => { 
      if(item.skus && item.skus.length > 0){
        hasSkus.push(index);
      }
      
    });
    options.rowsExpanded = hasSkus;
    // options.onRowClick = (rowData) => {
    //   this.props.getInfo(rowData[0]);
    // };
    //options.searchText = this.props.searchText;
    

    return (
      <div className="rct-block">
        {loading && <RctSectionLoader />} 
         <h1 style={{ textAlign: "center", color: "red"}}> {this.state.errorMsg}</h1>
         <ServerRecordsList title="SKU List" columns={columns} data={data} totalCount={count} otherOptions={options} 
         filterFunc={this.props.getFilterProduct} 
         dropSearch={true} 
         dropText={this.props.searchText ? this.props.searchText : this.dropText}
         dropItems={["Grp1", "Grp2", "PartNo", "Desc",  "Size", "Supplier", "Material","Brand", "Sel1", "Sel2"]}  />
      </div>
    );
  }
}

const mapStateToProps = ({ producttfesState }) => {
  const { ProductFiltered } = producttfesState;
  const { ProductDetails } = producttfesState;
  return { ProductFiltered };
};
export default connect(mapStateToProps, { getFilterProduct })(SKU_list);
