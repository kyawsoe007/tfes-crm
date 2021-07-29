
// export default warehouseSkuListView;

import React, { Component, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { amountRounding } from "Helpers/helpers";

// Sub components
import { connect } from "react-redux";
import { NavLink, useHistory, Redirect } from "react-router-dom";
import { show } from "redux-modal";

//import RecordsList from "Components/RecordsList";
import ServerRecordsList from "Components/ServerRecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import StockMovement from 'Components/PopupPage/StockMovement'
import StockMerging from 'Components/PopupPage/StockMerging'

//icon
import { IconButton } from "@material-ui/core";
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import CallMergeIcon from '@material-ui/icons/CallMerge';;

// Dialog root imports
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import DialogRoot from "Components/Dialog/DialogRoot";

// Redux actions imports
import { skuNewPage, singleSKU } from "Helpers/warehouseURL";
import { singleInventoryEnquiry, inventoryEnquiryViewPage } from "Helpers/crmURL";
import { getFilterProduct, setDuplicate, getProductDetails, getSavedSKUListQuery, patchStockMergeSku } from "Ducks/producttfes";
import { deleteProduct } from "Ducks/producttfes";

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



class warehouseSkuListView extends Component {
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
      splitToggle: false,
      mergeToggle: false,
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
    /*
    if (this.state.editForm==true) {
      this.props.getFilterProduct(0, 0, "Unknown Type: any", "", "Unknown Type: any")
    }
    */
    //console.log('pf',this.props.ProductFiltered)
  }

  // productPage() {
  //   this.props.getFilterProductAndSingleSkuReset();
  //   this.props.history.push({ pathname: skuNewPage });
  // }

  componentDidUpdate(prevProps) {
    // refreshes after stockMerge data changes 
    if (prevProps.stockMergeData !== this.props.stockMergeData) {
        // this.setState(listRefresh: !this.state.)
        this.setState({
          listRefresh: !this.state.listRefresh
        })    
      }
  }

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
        splitToggle: false,
        listRefresh: !this.state.listRefresh
      })
    }
    else {
      this.setState({
        splitToggle: false,
      });
    }

  };

  // Delete row
  // delete(id, partNumber) {
  //   this.props.show("alert_delete", {
  //     name: partNumber,
  //     action: () => this.handleSingleDelete(id),
  //   });
  // }
  view(id) {
    this.props.history.push({ pathname: singleInventoryEnquiry(id), state: { view: false } })

    // this.props.history.push({ pathname: singleInventoryEnquiry(id), state: { view: true } })
  }

  // handleSingleDelete(skuId) {
  //   this.props.deleteProduct(skuId);
  // }

  // delete(custID, custname, custdetails) {
  //   this.props.show("alert_delete", {
  //     name: custname,
  //     action: () => this.handleSingleDelete(custID)
  //   });
  // }

  // handleSingleDelete(custId) {
  //   this.props.deleteFooterSection(custId);
  // }
  // edit(id) {
  //   this.props.history.push(singleSKU(id));
  //   // this.props.history.push(inventoryEnquiryViewPage);
  // }

  // duplicate(data) {
  // let data = { ...this.props.ProductFiltered.data[rowNum] };
  // delete data._id;
  // delete data.id;
  // this.props.setDuplicate(data);
  // this.props.history.push(skuNewPage);
  // }

  // _DeleteCar = async (id) => {
  //   await api.post(`products/deleteSpecificProductGrade`, { data: id });
  //   await this._FetchProductsAPI();
  //   NotificationManager.success("You have successfully deleted a grade");
  // };

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
        name: "supp1",
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
              return amountRounding(2, total);
            }
            return "NA";
          },
          filter: false,
        },
      },

      {
        label: "List Price(SGD)",
        name: "listPrice",
        options: {
          filter: false,
          customBodyRender: (value) => {
            return value ? amountRounding(2, value) : "0.00";
          }
        }
      },
      // { label: "Location", name: "Location", options: { filter: false} },
      { label: "Sku", name: "skus", options: { filter: false, display: "excluded" } },
      { label: "BOM", name: "bomlist", options: { filter: false, display: "excluded" } },
      { label: "Location", name: "location", options: { filter: false } },
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



              </div>
            );
          },
        },
      },
    ];

    // dynamically adds back filter list based on the props 
    for (var i = 0; i < columns.length; i++) {
      // FOR FILTERS
      if (this.props.SavedSKUListQuery.saved) {
        columns[i].options.filterList = this.props.SavedSKUListQuery.filterList[i];
      } else {
        columns[i].options.filterList = [];
      }

      // FOR COLUMNS
      if(this.props.SavedSKUListQuery.display){
        columns[i].options.display = this.props.SavedSKUListQuery.display[i];
    }
    }

    let options = {};
    options.expandableRows = true;
    options.renderExpandableRow = (rowData, rowMeta) => {
      if (rowData[12] && rowData[12].length > 0) {
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
      else if (rowData[11] && rowData[11].length > 0) {

        let newRowData = [...rowData[11]];

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
        return rowData[11].map((item, index) => (
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
              {item.supplier ? ("(" + item.supplier.suppNo + ") " + item.supplier.name) : ""}
            </td>
            <td>
              {/* {item.uom} */}
              {rowData[8]}
            </td>
            <td>{amountRounding(2, item.quantity)} {item.reserved && `(${amountRounding(4,item.reserved)})`}</td>
            <td></td>
            <td>{item.location ? item.location.name : ""}</td>
            <td>

              { !item.reserved &&  //item with reserved qty cannot split or merge 
              <div>
                <IconButton size="small" className="tableCloneIcon">
                  <CallSplitIcon
                    onClick={() => {
                      this.setState({
                        splitToggle: true,
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
                </IconButton>

                <IconButton size="small" className="tableCloneIcon">
                  <CallMergeIcon onClick={() => this.setState({ mergeToggle: true, rowData: item, rowIndex: index})}/>
                </IconButton>
              </div>
              }
              

            </td>
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
        }} > SKU List
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
            savedQuery={this.props.SavedSKUListQuery}
            getSavedQuery={this.props.getSavedSKUListQuery}
          />
          <DialogRoot
            show={this.state.splitToggle}
            handleHide={() => this.setState({ splitToggle: false })}
            size={"lg"}>
            <StockMovement
              rowData={this.state.rowData}
              handleHide={this.restartToggle}
              ProductFiltered={this.props.ProductFiltered}
              rowIndex={this.state.rowIndex}
              saveButton={this.saveButton}
            />

          </DialogRoot>

          <DialogRoot show={this.state.mergeToggle} handleHide={() => this.setState({ mergeToggle: false })} size={'lg'}>
            <StockMerging 
              rowData={this.state.rowData}
              handleHide={() => this.setState({ mergeToggle: false })}
              ProductFiltered={this.props.ProductFiltered}
              rowIndex={this.state.rowIndex}
              patchStockMergeSku={this.props.patchStockMergeSku}
            />
          </DialogRoot>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ producttfesState }) => {
  const { ProductFiltered } = producttfesState;
  const { ProductDetails, SavedSKUListQuery, stockMergeData } = producttfesState;
  return { ProductFiltered, ProductDetails, SavedSKUListQuery, stockMergeData };
};
export default connect(mapStateToProps, {
  show,
  getFilterProduct,
  deleteProduct,
  setDuplicate,
  getProductDetails,
  getSavedSKUListQuery,
  patchStockMergeSku
})(warehouseSkuListView);

