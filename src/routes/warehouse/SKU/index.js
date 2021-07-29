import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// Sub components
import { connect } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { show } from "redux-modal";

//import RecordsList from "Components/RecordsList";
import ServerRecordsList from "Components/ServerRecordsList";
import RctSectionLoader from "Components/RctSectionLoader";
import { listOptions, getDateTime } from "Helpers/helpers";

//icon
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import baselineDeleteForever from "@iconify/icons-ic/baseline-delete-forever";
import editFilled from "@iconify/icons-ant-design/edit-filled";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

// Dialog root imports
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";

// Redux actions imports
import addFilled from "@iconify/icons-carbon/add-filled";
import { skuNewPage, singleSKU } from "Helpers/warehouseURL";
import { getFilterProduct, setDuplicate, getFilterProductAndSingleSkuReset, getProductDetails, deleteProduct, getCsvCreate, getSavedSKUMainQuery } from "Ducks/producttfes";
import { amountRounding } from "Helpers/helpers";
// MUI data table imports
import TableSearch from "Components/MuiDatatable/components/TableSearch";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));



class SKU_customer_list extends Component {
  constructor(props) {
    super(props);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleSingleDelete = this.handleSingleDelete.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.duplicate = this.duplicate.bind(this);
    this.getCSV = this.getCSV.bind(this);

    this.state = {
      toggle: false,
      unitcost: "",
      quantity: "",
      location: "",
      remarks: "",
    };
    this.qtyFilter = props.ProductFiltered && props.ProductFiltered.filters.find(item => {
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

  componentDidMount() {
    //this.props.getFilterProduct();
    this.props.getProductDetails();
  }

  productPage() {
    this.props.getFilterProductAndSingleSkuReset();
    this.props.history.push({ pathname: skuNewPage });
  }

  addItem() {
    this.setState({
      toggle: true,
    });
  }

  onChangeForm = (element, value) => {
    this.setState({ [element]: value });
  };

  onSubmit() {
    this.setState({
      toggle: false,
    });
  }

  restartToggle = () => {
    this.setState({
      toggle: false,
    });
  };

  // Delete row
  delete(id, partNumber) {
    this.props.show("alert_delete", {
      name: partNumber,
      action: () => this.handleSingleDelete(id),
    });
  }

  handleSingleDelete(skuId) {
    this.props.deleteProduct(skuId);
  }

  // delete(custID, custname, custdetails) {
  //   this.props.show("alert_delete", {
  //     name: custname,
  //     action: () => this.handleSingleDelete(custID)
  //   });
  // }

  // handleSingleDelete(custId) {
  //   this.props.deleteFooterSection(custId);
  // }
  edit(id) {
    this.props.history.push(singleSKU(id));
  }

  duplicate(rowNum) {
    let data = { ...this.props.ProductFiltered.data[rowNum] };
    // delete data.id;
    delete data.partNumber;
    delete data._id;
    console.log("data", data)
    // delete data.suppId;
    // let data = { ...this.props.ProductFiltered.data[rowNum] };
    // delete data._id;
    // delete data.id;
    this.props.setDuplicate(data);
    this.props.history.push(skuNewPage,{view:false,isDuplicate: true });
  }

  getCSV() {
    // alert("TEST!");
    this.props.getCsvCreate();
  }


  render() {
    const { unitcost, quantity, location, remarks } = this.state;
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
      { label: "P/N", name: "partNumber", options: { filter: false, sort: true } },
      { label: "Description", name: "description", options: { filter: false, sort: false } },
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
          filter: false
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
          sort: false,
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
            if (tableMeta.rowData[12]) {
              for (let i = 0; i < tableMeta.rowData[12].length; i++) {
                total += tableMeta.rowData[12][i].quantity;
              }
              return amountRounding(2,total);
            }
            return "NA";
          },
          filter: false,
        },
      },
      // {
      //   label: "Currency",
      //   name: "currency",
      //   options: {
      //     customBodyRender: (value, tableMeta) => {
      //       return value ? value.name : "";
      //     },
      //     filter: false,
      //   },
      // },
      {
        label: "Unit Cost",
        name: "unitCost",
        options: {
          customBodyRender: (value, tableMeta) => {
            
            return value ? amountRounding(2, value) : "0.00";
          },
          filter: false,
        },
      },
      {
        label: "List Price(SGD)",
        name: "listPrice",
        options: { filter: false, 
          customBodyRender: (value)=> {
            return value ? amountRounding(2, value) : "0.00";
        }}
      },
      // { label: "Location", name: "Location", options: { filter: false} },
      { label: "Sku", name: "skus", options: { filter: false, display: "excluded" } },
      { label: "Bom", name: "bomlist", options: { filter: false, display: "excluded" }},
      { label: "Location", name: "location", options: {
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return value ? value.name : "";
        },
         filter: false } },
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
        label: "Action",
        name: "action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {
            return (
              <div>
                <IconButton
                  size="small"
                  onClick={() => {
                    this.edit(tableMeta.rowData[0]);
                  }}
                >
                  <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                </IconButton>
                <IconButton
                  // size="small" className="tableDeleteIcon" onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[2]) }}>
                  size="small"
                  className="tableDeleteIcon"
                  onClick={() => {
                    this.delete(tableMeta.rowData[0], tableMeta.rowData[1]);
                  }}
                >
                  <Icon icon={baselineDeleteForever} color="#595959" width="1.5rem" height="1.5rem" />
                </IconButton>
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

                {/* {add button here under actions} */}
                {/* <IconButton size="small" onClick={() => this.addItem()}>
                  <Icon
                    // className="tableEditIcon"
                    icon={addFilled}
                    color="#FFA500"
                    width="1.6rem"
                    height="1.6rem"
                  />
                </IconButton> */}
              </div>
            );
          },
        },
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
      }
    ];

    // dynamically adds back filter list based on the props 
    for (var i = 0; i < columns.length; i++) {
      // FOR FILTERS
      if (this.props.SavedSKUMainQuery.saved) {
        columns[i].options.filterList = this.props.SavedSKUMainQuery.filterList[i];
      } else {
        columns[i].options.filterList = [];
      }

      // FOR COLUMNS
      if(this.props.SavedSKUMainQuery.display){
        columns[i].options.display = this.props.SavedSKUMainQuery.display[i];
      }
    }

    let options = {};
    options.expandableRows = true;
    options.renderExpandableRow = (rowData, rowMeta) => {
      if(rowData[13] && rowData[13].length > 0) {
        
        return rowData[13].map((item) => (
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
            <td>{amountRounding(2, item.qty)}</td>
            <td></td>
            <td></td>
            <td>{item.skuData && item.skuData.location && item.skuData.location.name}</td>
          </tr>
        ));
      } else if (rowData[12] && rowData[12].length > 0) {

        let newRowData = [...rowData[12]];

        // console.log("FUCK", newRowData);

        for (let i = 0; i < newRowData.length; i++) {
          if (newRowData[i].rsvd.length >= 1) {
            newRowData[i].reserved = 0;
            for (let j = 0; j < newRowData[i].rsvd.length; j++) {
              newRowData[i].reserved += newRowData[i].rsvd[j].qty
            }
          }
        }

        console.log("ASDASD", rowData[11])
        return rowData[12].map((item) => (
          <tr className="SKU-sub-table">
            <td></td>
            <td>
              {console.log(item)}
              {/* {item.pn} */}
              {rowData[2]}
            </td>
            <td>
              {/* {item.description} */}
              {rowData[3]}
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
            <td>{amountRounding(2, item.quantity)} {item.reserved && `(${amountRounding(4,item.reserved)})`}</td>
            <td>{item.unitCost ? amountRounding(2, item.unitCost): "-"}</td>
            <td></td>
            <td>{item.location ? item.location.name: ""}</td>
          </tr>
        ));
      }
      else {
        return "";
      }
    };
    options.customToolbar = () => {
      return (
        <React.Fragment>

          <IconButton size="small" onClick={() => this.getCSV()}>
            <CloudDownloadIcon />
          </IconButton>

          <IconButton size="small" onClick={() => this.productPage()}>
            <Icon className="tableEditIcon" icon={addFilled} color="#df0021" width="2rem" height="2rem" />
          </IconButton>

        </React.Fragment>
      );
    };

    let hasSkus = [];
    data.forEach( (item,index) => { 
      if(item.skus && item.skus.length > 0){
        hasSkus.push(index);
      }
      
    });
    options.rowsExpanded = hasSkus;


    return (
      <div>
         {loading && <RctSectionLoader />}
            <div style={{
              width:"50%",
              margin:"10px auto",
              minWidth:"400px",
              color:"#2b4da0",
              fontWeight:"bolder",
              fontSize:"18px",
              textAlign:"center", 
              }} > SKU Maintenance
            </div>

      <div className="rct-block">
        <DialogRoot show={this.state.toggle} handleHide={this.restartToggle} size={"md"} dialogActionLabel={"Save"} dialogAction={this.onSubmit} close>
          {/* <div className="row justify-content-start">
            <div className="col-md-6">
              <FormInput
                placeholder="Template Title"
                rows={1}
                value={unitcost}
                target="unitcost"
                handleChange={this.handleChange}
              />
            </div>
          </div> */}
          <h3>Add Item</h3>
          <label for="inputFirstName">Unit Cost</label>
          <input type="text" className="form-control" id="unitcost" required={true} value={unitcost} onChange={(e) => this.onChangeForm("unitcost", e.target.value)} placeholder="Enter Unit Cost" />
          <label for="inputFirstName">Quantity</label>
          <input type="text" className="form-control" id="quantity" required={true} value={quantity} onChange={(e) => this.onChangeForm("quantity", e.target.value)} placeholder="Enter Quantity" />
          <label for="inputFirstName">Location</label>
          <input type="text" className="form-control" id="location" required={true} value={location} onChange={(e) => this.onChangeForm("location", e.target.value)} placeholder="Enter Location" />
          <label for="inputFirstName">Remarks</label>
          <input type="text" className="form-control" id="remarks" required={true} value={remarks} onChange={(e) => this.onChangeForm("remarks", e.target.value)} placeholder="Enter Remarks" />
        </DialogRoot>
        <ServerRecordsList 
        title="" 
        columns={columns} 
        data={data} 
        totalCount={count} 
        otherOptions={options} 
        filterFunc={this.props.getFilterProduct} 
        dropSearch={true} 
        dropItems={["Grp1", "Grp2", "PartNo", "Desc",  "Size", "Supplier", "Material","Brand", "Sel1", "Sel2"]} 
        dropText={ this.dropText}   
        savedQuery={this.props.SavedSKUMainQuery}
        getSavedQuery={this.props.getSavedSKUMainQuery}     
        />
       
      </div>
    </div>
    );
  }
}

const mapStateToProps = ({ producttfesState }) => {
  // const { Products } = producttfesState;
  const { ProductFiltered } = producttfesState;
  const { ProductDetails, SavedSKUMainQuery } = producttfesState;
  return { ProductFiltered, ProductDetails, SavedSKUMainQuery };
};
export default connect(mapStateToProps, {
  show,
  getFilterProduct,
  deleteProduct,
  setDuplicate,
  getFilterProductAndSingleSkuReset,
  getProductDetails,
  getCsvCreate,
  getSavedSKUMainQuery
})(SKU_customer_list);
