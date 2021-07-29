
// export default warehouseSkuListView;

import React, { Component, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

// Sub components
import { connect } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { show } from "redux-modal";

//import RecordsList from "Components/RecordsList";
import ServerRecordsList from "Components/ServerRecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import StockMovement from 'Components/PopupPage/StockMovement';
import StockAdjustment from 'Components/PopupPage/StockAdjustment';

//icon
import { IconButton } from "@material-ui/core";
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CallSplitIcon from '@material-ui/icons/CallSplit';

// Dialog root imports
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";

// Redux actions imports
import { skuNewPage, singleSKU } from "Helpers/warehouseURL";
import { singleInventoryEnquiry, inventoryEnquiryViewPage } from "Helpers/crmURL";
import { stockAdjustmentListPage, stockAdjustmentEditPage } from "Helpers/accountingURL";
import { getFilterProduct, setDuplicate, getProductDetails, getSavedStockAdjQuery, clearDuplicate } from "Ducks/producttfes";
import { deleteProduct } from "Ducks/producttfes";

import { amountRounding } from "Helpers/helpers";
// MUI data table imports
import TableSearch from "Components/MuiDatatable/components/TableSearch";
import { ContactSupportOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));



class StockAdjustmentListView extends Component {
  constructor(props) {
    super(props);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.handleSingleDelete = this.handleSingleDelete.bind(this);
    // this.delete = this.delete.bind(this);
    // this.edit = this.edit.bind(this);
    this.view = this.view.bind(this);
    // this.duplicate = this.duplicate.bind(this);

    this.state = {
      toggle: false,
      unitcost: "",
      quantity: "",
      location: "",
      remarks: "",
      rowData: {},
      rowIndex: 0,
      listRefresh: false
    };
  }

  componentDidMount() {
    //this.props.getFilterProduct();
    this.props.getProductDetails();

  }

  // productPage() {
  //   this.props.getFilterProductAndSingleSkuReset();
  //   this.props.history.push({ pathname: skuNewPage });
  // }

  addItem() {
    this.setState({
      toggle: true,
    });
  }
  saveButton = () => {
    this.setState({
      editForm: true,
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

  restartToggle = (needRefresh) => {
    if (needRefresh) {
      this.setState({
        toggle: false,
        listRefresh: !this.state.listRefresh
      })
    }
    else {
      this.setState({
        toggle: false,
      });
    }

  };

  view(id) {
    this.props.clearDuplicate();
    this.props.history.push({ pathname: stockAdjustmentEditPage(id), state: { view: false } })

    // this.props.history.push({ pathname: singleInventoryEnquiry(id), state: { view: true } })
  }

  // handleSingleDelete(skuId) {
  //   this.props.deleteProduct(skuId);
  // }



  render() {
    const { unitcost, quantity, location, remarks } = this.state;
    const { data, count } = this.props.ProductFiltered;
    const columns = [
      {
        name: "id",
        options: { display: "excluded", filter: false, sort: false },
      },
      {
        name: "subproduct",
        options: { display: "excluded", filter: false, sort: false },
      },
      { label: "P/N", name: "partNumber", options: { filter: false, sort: false } },
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
        name: "supp1",
        options: {
          customBodyRender: (value, tableMeta) => {
            return "";
          },
          filter: false,
          sort: false
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
            const skuIndex = columns.findIndex(x => x.name === "skus")
            if (tableMeta.rowData[skuIndex]) {
              for (let i = 0; i < tableMeta.rowData[skuIndex].length; i++) {
                total += tableMeta.rowData[skuIndex][i].quantity;
              }
              return amountRounding(2, total);
            }
            return "0";
          },
          filter: false,
        },
      },
      {
        label: "Unit Cost",
        name: "unitCost",
        options: {
          filter: false,
          customBodyRender: (value) => {
            if (value) {
              return amountRounding(2, value)
            } else {
              return ""
            }
          }
        }
      },
      {
        label: "List Price(SGD)",
        name: "listPrice",
        options: {
          filter: false,
          customBodyRender: (value) => {
            if (value) {
              return amountRounding(2, value)
            }
            else {
              return ""
            }
          }
        }
      },
      // { label: "Location", name: "Location", options: { filter: false} },
      { label: "Sku", name: "skus", options: { filter: false, display: "excluded" } },
      { label: "BOM", name: "bomlist", options: { filter: false, display: "excluded" } },
      { label: "Location", name: "location", options: { filter: false, sort: false } },
      {
        label: "Material", name: "material", options: {
          filter: false,
          display: false,
          customBodyRender: (value) => value ? value.name : ""
        }
      },
      {
        label: "Brand", name: "brand", options: {
          filter: false,
          display: false,
          customBodyRender: (value) => value ? value.name : ""
        }
      },
      {
        label: "Sel1", name: "selOne", options: {
          filter: false,
          display: false
        }
      },
      {
        label: "Sel2", name: "selTwo", options: {
          filter: false,
          display: false
        }
      },
      {
        label: "Action",
        name: "action",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta) => {

            // console.log("ASDASD", tableMeta.rowIndex, tableMeta)
            let productId = columns.findIndex(x => x.name === "id");
            productId = tableMeta.rowData[productId];
            // console.log("YAHOO", tableMeta.rowData[productId]);

            const item = this.props.ProductFiltered.data.find(x => x.id === productId);

            return (
              <div>
                <IconButton
                  size="small"
                  onClick={() => { this.view(tableMeta.rowData[0]) }}>
                  <VisibilityIcon
                    color="#595959"
                    width="1.5rem"
                    height="1.5rem"
                  />
                </IconButton>

                <IconButton size="small" className="tableCloneIcon">
                  <CallSplitIcon
                    onClick={() => {
                      this.setState({
                        toggle: true,
                        rowData: item,
                        rowIndex: 1
                      })
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
      // FOR FILTER
      if (this.props.SavedStockAdjQuery.saved) {
        columns[i].options.filterList = this.props.SavedStockAdjQuery.filterList[i];
      } else {
        columns[i].options.filterList = [];
      }

      // FOR COLUMNS
      if(this.props.SavedStockAdjQuery.display){
        columns[i].options.display = this.props.SavedStockAdjQuery.display[i];
      } 
    }

    let options = {};
    options.expandableRows = true;
    options.renderExpandableRow = (rowData, rowMeta) => {

      const bomIndex = columns.findIndex(x => x.name === "bomlist");
      const skuIndex = columns.findIndex(x => x.name === "skus");
      // console.log("ROWADARA", rowData);
      if (rowData[bomIndex] && rowData[bomIndex].length > 0) {
        return rowData[bomIndex].map((item) => (
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
              {item.productData.grpTwo && item.productData.grpTwo.name}
            </td>
            <td>
              {/* {item.size} */}
              {item.productData.size && item.productData.size.name}
            </td>
            <td>
              {/* {item.supp1} */}

            </td>
            <td>
              {/* {item.uom} */}
              {item.productData.uom && item.productData.uom.name}
            </td>
            <td>{amountRounding(2, item.qty)}</td>
            <td></td>
            <td></td>
            <td>{item.skuData && item.skuData.location && item.skuData.location.name}</td>
          </tr>
        ));
      }
      else if (rowData[skuIndex] && rowData[skuIndex].length > 0) {
        return rowData[skuIndex].map((item, index) => (
          <tr className="SKU-sub-table">
            <td></td>
            <td>
              {/* {console.log(item)} */}
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
              {item.supplier ? ("(" + item.supplier.suppNo + ") " + item.supplier.name) : ""}
            </td>
            <td>
              {/* {item.uom} */}
              {rowData[8]}
            </td>
            <td>{amountRounding(2, item.quantity)}</td>
            <td>{amountRounding(2, item.unitCost)}</td>
            <td> </td>
            <td>{item.location && item.location.name ? item.location.name : ""}</td>
            <td><IconButton size="small" className="tableCloneIcon">
              <CallSplitIcon
                onClick={() => {
                  this.setState({
                    toggle: true,
                    rowData: item,
                    rowIndex: index
                  })
                }}
                style={{
                  color: "#595959",
                  width: "1.5rem",
                  height: "1.5rem",
                }}
              />
            </IconButton></td>
          </tr>
        ));
      }
      else {
        return "";
      }
    };

    let hasSkus = [];
    data.forEach((item, index) => {
      if (item.skus && item.skus.length > 0) {
        hasSkus.push(index);
      }

    });
    options.rowsExpanded = hasSkus;


    return (
      <Fragment>
        <div style={{
          width: "50%",
          margin: "10px auto",
          minWidth: "400px",
          color: "#2b4da0",
          fontWeight: "bolder",
          fontSize: "18px",
          textAlign: "center",
        }} >
          Stock Adjustment SKU List
            </div>
        <div className="rct-block"></div>
        <div className="rct-block">
          <ServerRecordsList
            needRefresh={this.state.listRefresh}
            title=""
            columns={columns}
            data={data}
            totalCount={count}
            otherOptions={options}
            filterFunc={this.props.getFilterProduct}
            dropSearch={true}
            dropItems={["Grp1", "Grp2", "PartNo", "Desc",  "Size", "Supplier", "Material","Brand", "Sel1", "Sel2"]}
            savedQuery={this.props.SavedStockAdjQuery}
            getSavedQuery={this.props.getSavedStockAdjQuery}
          />
          <DialogRoot
            show={this.state.toggle}
            handleHide={this.restartToggle}
            size={"lg"}>
            <StockAdjustment
              rowData={this.state.rowData}
              handleHide={this.restartToggle}
              ProductFiltered={this.props.ProductFiltered}
              rowIndex={this.state.rowIndex}
              saveButton={this.saveButton}
            />

          </DialogRoot>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ producttfesState }) => {
  const { ProductFiltered } = producttfesState;
  const { ProductDetails, SavedStockAdjQuery } = producttfesState;
  return { ProductFiltered, ProductDetails, SavedStockAdjQuery };
};
export default connect(mapStateToProps, {
  show,
  getFilterProduct,
  deleteProduct,
  setDuplicate,
  getProductDetails,
  getSavedStockAdjQuery,
  clearDuplicate
})(StockAdjustmentListView);

