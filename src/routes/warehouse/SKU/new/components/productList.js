import React, { Component } from "react";
// Sub components
import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { show } from "redux-modal";
import FormInput from "Components/Form/FormInput";
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

class Product_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "",
      // salesNumber,
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

  passBack(productId, skuId) {
    this.props.getInfo(productId, skuId);
  };

  saveBtn = () => {
    this.props.saveToggle();                                                            //TODO this should be asked also
  };


  render() {
    const { data, count, loading } = this.props.ProductFiltered;
    // const {salesNumber}=this.state
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      // { label: "S/N", name: "salesNumber", display: "excluded", options: { filter: false } },     //TODO should get more detail what is S/N
      { label: "P/N", name: "partNumber", options: { filter: false } },
      { label: "Description", name: "description", options: { 
        filter: false, 
        customBodyRender: (value) => (<Link to="#">{ value }</Link>)                  
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
        label: "SEL 1",
        name: "selOne",
        options: {
          filter: false
        }
      },
      {
        label: "SEL 2",
        name: "selTwo",
        options: {
          filter:false,
        }
      },
      {
        label: "Brands",
        name: "brand",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value ? value.name : "";
          },
          filter: false,
        },
      },
      {
        label: "Material",
        name: "material",
        options: {
          display: false,
          customBodyRender: (value, tableMeta) => {
            return value ? value.name : "";
          },
          filter: false,
        },
      },
      {
        label: "Supp",
        name: "supp1",
        options: {
          customBodyRender: (value, tableMeta) => {
            return value ? value.name : "";
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
            if (tableMeta.rowData[15]) {
              for (let i = 0; i < tableMeta.rowData[15].length; i++) {
                total += tableMeta.rowData[15][i].quantity;
              }
              return total;
            }
            return "NA";
          },
          filter: false,
        },         
      },
      {
        label: "Unit Cost",
        name: "unitCost",
        options: { filter: false, 
          customBodyRender: (value)=> {
            if(value){
              return value.toFixed(2);
            }
            else {
              return ""
            }
        } },
        
      },
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
      },
      { label: "Sku", name: "skus", options: { filter: false, display: "excluded" } },
    ];

    // Expandable rows here
    options.expandableRows = false;


    options.onRowClick = (rowData) => {
      this.props.getInfo(rowData[0]);
    };

    return (
      <div className="rct-block">
        {loading && <RctSectionLoader />} 
        <ServerRecordsList title="SKU List" columns={columns} data={data} totalCount={count} otherOptions={options} filterFunc={this.props.getFilterProduct} 
         dropText={this.props.searchText ? this.props.searchText : this.dropText}
        dropSearch={true} 
        dropItems={["Grp1", "Grp2", "PartNo", "Desc",  "Size", "Supplier", "Material","Brand", "Sel1", "Sel2"]} />
        
        <div class="row " style={{ display: "flex", margin: "20px 0" }}>
          <div class="col-sm-11 "></div>
          <div class="col-sm-1 ">
            <button
              onClick={this.saveBtn}
              style={{
                width: 64,
                height: 36,
                color: "white",
                border: 0,
                cursor: "pointer",
                display: "inline-flex",
                outline: 0,
                padding: 0,
                position: "relative",
                alignItems: "center",
                borderRadius: 4,
                verticalAlign: "middle",
                justifyContent: "center",
                backgroundColor: "#DF0021",
                float: "right"
              }}
            >
                Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ producttfesState }) => {
  const { ProductFiltered } = producttfesState;
  const { ProductDetails } = producttfesState;
  return { ProductFiltered };
};
export default connect(mapStateToProps, { getFilterProduct })(Product_list);
