import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { show } from "redux-modal";

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

class SkuList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
    };

    this.passBack = this.passBack.bind(this)
  }

  passBack(productId, skuId) {
    
    // console.log("Row id here")
    this.props.getInfo(productId, skuId);
    this.qtyFilter = this.props.ProductFiltered.filters.find(item => {
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
      { label: "Description", name: "description", options: { filter: false,
         customBodyRender: (value, tableMeta) => {
           return (
           <div onClick={()=> {
             this.passBack(tableMeta.rowData[0], undefined)
            }}>
             <Link to="#">{ value }</Link>
           </div>
           )
         }
      } },
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
      // {
      //   label: "Unit Cost",
      //   name: "unitCost",
      //   options: {
      //     customBodyRender: (value, tableMeta) => {
      //       return value;
      //     },
      //     filter: false,
      //   },
      // },
      { label: "List Price(SGD)", name: "listPrice", 
      options: { filter: false, 
        customBodyRender: (value)=> {
          if(value){
            return value.toFixed(2);
          }
          else {
            return ""
          }
      }}   },
      { label: "Sku", name: "skus", options: { filter: false, display: false } },
      { label: "BOM", name: "bomlist", options: { filter: false, display: "excluded" } },
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
      if(rowData[12] && rowData[12].length > 0) {
        return rowData[12].map((item) => (
          <tr className="SKU-sub-table">
            <td></td>
            <td>              
              {/* {item.pn} */}
              {item.productData.partNumber}
            </td>
            <td>
              {/* {item.description} */}
              {item.productData.description}
            </td>
            <td>
              {/* {item.grp1} */}
              {item.productData.grpOne && item.productData.grpOne.name}
            </td>
            <td>
              {/* {item.grp2} */}
              { item.productData.grpTwo && item.productData.grpTwo.name}
            </td>
            <td>
              {/* {item.size} */}
              { item.productData.size && item.productData.size.name}
            </td>
            <td>
              {/* {item.supp1} */}
             
            </td>
            <td>
              {/* {item.uom} */}
              { item.productData.uom && item.productData.uom.name }
            </td>
            <td>{item.qty}</td>
            <td></td>
            <td></td>
            <td>{item.skuData && item.skuData.location && item.skuData.location.name}</td>
          </tr>
        ));
      }
      else if (rowData[11] && rowData[11].length > 0) {
        return rowData[11].map((item) => (
          <tr className="SKU-sub-table" onClick={()=> this.passBack(rowData[0], item.id)}>
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
            <td>{item.quantity}</td>
            {/* <td>{item.unitCost}</td> */}
            <td></td>
            <td>{item.location && item.location.name}</td>
          </tr>
        ));
      }
      else {
        return "";
      }
    };
    
    // options.onRowClick = (rowData) => {
    //   this.props.getInfo(rowData[0]);
    // };
    //options.searchText = this.props.searchText;
    let hasSkus = [];
    data.forEach( (item,index) => { 
      if(item.skus && item.skus.length > 0){
        hasSkus.push(index);
      }
      
    });
    options.rowsExpanded = hasSkus;

    // options.customSearchRender = (searchText, handleSearch, hideSearch, options) => {

    //   let searchSeg = parseSearch(searchText);

    //   function parseSearch(sText) {


    //     let searchVals = {};
    //     if (sText != null) {
    //       let searchItems = sText.split("|");
    //       searchItems.forEach(item => {
    //         let sVal = item.split(":");
    //         searchVals[sVal[0]] = sVal[1];
    //       });
    //     }
    //     return searchVals;
    //   }

    //   return (
    //     <React.Fragment>
    //       <div style={{ display: "flex", justifyContent: "space-around" }}>
    //         <div>
    //           <TextField id="outlined-basic" label="Part Number" variant="standard" value={searchSeg.partNo} onChange={evt => {
    //             let searchStr = "";
    //             Object.keys(searchSeg).forEach(s => { if (s !== "partNo") searchStr += s + ":" + searchSeg[s] + "|" });
    //             searchStr += "partNo:" + evt.target.value;
    //             handleSearch(searchStr);
    //           }} />
    //         </div>
    //         <div>
    //           <TextField id="outlined-basic" label="Description" variant="standard" value={searchSeg.description} onChange={evt => {
    //             let searchStr = "";
    //             Object.keys(searchSeg).forEach(s => { if (s !== "description") searchStr += s + ":" + searchSeg[s] + "|" });
    //             searchStr += "description:" + evt.target.value;
    //             handleSearch(searchStr);
    //           }} />
    //         </div>
    //         <div>
    //           <TextField id="outlined-basic" label="Size" variant="standard" value={searchSeg.size} onChange={evt => {
    //             let searchStr = "";
    //             Object.keys(searchSeg).forEach(s => { if (s !== "size") searchStr += s + ":" + searchSeg[s] + "|" });
    //             searchStr += "size:" + evt.target.value;
    //             handleSearch(searchStr);
    //           }} />
    //         </div>
    //       </div>
    //     </React.Fragment>
    //   );
    // };


    return (
      <div className="rct-block">
         {loading && <RctSectionLoader />}
         <ServerRecordsList title="SKU List" columns={columns} data={data} totalCount={count} otherOptions={options} 
         filterFunc={this.props.getFilterProduct} 
         dropSearch={true}
         dropText={this.props.searchText ? this.props.searchText : this.dropText}
         dropItems={[ "Grp1", "Grp2", "PartNo", "Desc", "Size", "Supplier", "Material","Brand", "Sel1", "Sel2"]} />
      
      </div>
    );
  }
}

const mapStateToProps = ({ producttfesState }) => {
  const { ProductFiltered } = producttfesState;
  const { ProductDetails } = producttfesState;
  return { ProductFiltered };
};
export default connect(mapStateToProps, { getFilterProduct })(SkuList);
