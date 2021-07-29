import React, { Component } from "react";
import { connect } from "react-redux";

// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput'
import DayPicker from 'react-day-picker'
import { DateUtils } from 'react-day-picker'
import MomentLocaleUtils, {
  formatDate,
  parseDate
} from 'react-day-picker/moment'

// React Component import
import * as url from "Helpers/warehouseURL";
import DialogRoot from 'Components/Dialog/DialogRoot';
import FormWrapper from 'Components/Form/Layout/FormWrapper'
import FormInput from 'Components/Form/FormInput';
import { stockExpenseListPage, singleStockExpense } from 'Helpers/warehouseURL';
import moment from 'moment';
import 'moment/locale/en-SG';
import { amountRounding } from "Helpers/helpers";
import FormInputMultilines from 'Components/Form/FormInputMultilines';
import ItemsLine from "./components/ItemsLine"
import SKU_list from '../../SKU/new/components/skuList'

// material-ui
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

// Icon
import { Icon } from '@iconify/react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import fastReverseButton from '@iconify-icons/emojione-v1/fast-reverse-button'
import fastForwardButton from '@iconify-icons/emojione-v1/fast-forward-button'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

//import Ducks
// import { getMoveLines, saveOperationForm, getFilterMoves } from "Ducks/stocktfes";
import { postStockExpense, getStockExpense, patchStockExpense } from "Ducks/stockexpensetfes";
import {
  getPicUsers
} from 'Ducks/user';
const PAGE_MAX = 10
const INIT_STATE = {
  date: new Date(),
  status: "draft",
  tfesPic: "",
  remarks: "",
  toggle: false,
  disableEdit: false,
  targetSearch: "",
  page: 1,
  stockExpenseItem: [
    {
      id: '',
      SN: 1,
      qty: 1,
      reason: "",
      description: '',
      skuId: '',
      productId: ''
    },
  ],
  isDuplicate: false,
  id: '',
  view: true,
  toggleFormSelection: true,

}

class StockExpenseFormView extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    if (props.loginUser) {
      this.state.tfesPic = props.loginUser._id;
    }
    this.resetTotalState = this.resetTotalState.bind(this);
  }


  resetTotalState() {
    let source = this.props.singleStockExpense.data
    let newState = {
      ...INIT_STATE,
      date: new Date(),
      status: source.status ? source.status : "draft",
      tfesPic: source.tfesPic ? source.tfesPic : "",
      remarks: source.remarks ? source.remarks : "",
      // stockExpenseItem: source.stockExpenseItem ? source.stockExpenseItem : [],
      id: source._id ? source._id : '',
      // isDuplicate: source._id ? true : false,
      //disableEdit:source._id?true:false
    }
    delete newState.disableEdit;
    delete newState.view;
    // v Make a deep copy of the stockExpenseItem by adding the values into a NEW array named lines
    let lines = [];
    if (source.stockExpenseItem) {
        for (let i = 0; i < source.stockExpenseItem.length; i++) {
            let item = { ...source.stockExpenseItem[i] };
            lines.push(item);
        }
    }
    newState.stockExpenseItem = lines;

    this.setState({
      ...this.state,
      ...newState,
    })

    if (newState.status == "closed") {
      this.setState({ 
        disableEdit: true, 
        view: true
      })
    }
  }

  componentDidMount() {
    this.props.getPicUsers();
    const _id = this.props.match.params.id
    console.log('id', this.props)
    if (_id !== 'new') {
      this.props.getStockExpense(_id)
    }

    if (this.props.singleStockExpense && this.props.singleStockExpense.id) {
      this.resetTotalState()
    }

    if (this.props.history.location.state === undefined) {
      this.setState({
        isDuplicate: false
      })
    } else {
      if (this.props.history.location.state.isDuplicate) {
        let isDuplicate = this.props.location.state.isDuplicate;
        this.setState({
          isDuplicate: isDuplicate,
          disableEdit: false,
          toggleFormSelection: true,
        })
      }
      if (this.props.history.location.state.view) {
        let view = this.props.location.state.view
        this.setState({
          view: view,
          disableEdit: view,
        })

      }
      if (this.props.history.location.state.isNewPage === true) {
        this.setState({
          view: false,
          disableEdit: false,
          toggleFormSelection: true,
          status: "draft"

        })

      }

    }
  }

  componentDidUpdate(prevProps, prevState) {
    // if(prevProps.loginUser._id != this.props.loginUser._id){
    //   if(this.state.purchasePic == undefined){
    //     this.setState({
    //       purchasePic: this.props.loginUser._id
    //     })
    //   }
    // }
    if (prevProps.singleStockExpense.data !== this.props.singleStockExpense.data) {
      if (this.props.singleStockExpense.data && this.props.singleStockExpense.data.id) {
        const { state } = this.props.history.location
        if (
          this.props.match.params.id !== this.props.singleStockExpense.data.id
        ) {
          this.props.history.push(
            singleStockExpense(this.props.singleStockExpense.data._id),

          )
        }
        // If browser has not ID , means new page
        // Push to edit page on Save
        if (state && state.isDuplicate) {
          console.log('he', state.isDuplicate)
          this.resetTotalState()
          this.setState({
            disableEdit: true
          })
        }
        if (!this.props.match.params.id) {
          this.props.history.push(
            singleStockExpense(this.props.singleStockExpense.data.id),
          )
        }

        this.resetTotalState()
        if (this.state.status === "") {
          this.setState({
            status: "draft"
          })
        }
      }
    }

  }


  onSubmit = () => {
    let data = this.state;
    delete data.toggleFormSelection;
    delete data.toggle;
    delete data.targetSearch;
    delete data.page;
    

    if (this.state.id) {
      data.id = this.state.id;
      this.props.patchStockExpense(data)
      // alert("patchSinglePurchaseRequest")
    } else {
      // If Save as new onSubmit
      this.props.postStockExpense(data)
    }
    // setTimeout(() => {
    //     this.props.history.push({
    //         pathname: `${url.stockExpenseListPage}`,
    //     });
    // }, 500);

    this.setState({
      disableEdit: true,
      toggleFormSelection: true,
      view: true,
    })
  }
  onBackToListView = () => {
    this.props.history.push({
      pathname: `${url.stockExpenseListPage}`,
    });
  }

  showStatus = () => {

    if (this.state.status !== "") {
      let status = this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1);
      return "【 " + status + " 】";
    }
    return " "

  }

  handleChange = (field, value) => {
    this.setState({ [field]: value })
  }

  handleLineChange = (field, value, key) => {
    console.log("handleLineChange", field, value, key)
    // first layer validtion, checks if input value is alpabet
    // https://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
    if (field === "qty" || field === "unitPrice") {
      if (value.length >= 1 && value.match(/[a-z]/i)) {
        return null
      }
    }
    // sets minimum qty 
    if (field === "qty") {
      if (value === "" || value <= 0) {
        value = 1
      }
    }

    let lines = [...this.state.stockExpenseItem]
    lines[key][field] = value

    this.setState({
      stockExpenseItem: lines
    })
  }

  buttonClick = (target, index) => {
    let targetSearch = ''
    if (this.state.stockExpenseItem[index].description) {
      targetSearch = 'Desc:' + this.state.stockExpenseItem[index].description
    }

    if (this.state.stockExpenseItem[index].partNumber) {
      targetSearch = 'PartNo:' + this.state.stockExpenseItem[index].partNumber
    }
    this.setState({
      index: index,
      toggle: true,
      element: target,
      // target: target,
      target: 'sku',
      targetSearch: targetSearch
    })
  }

  addNewLine = () => {
    let lines = [...this.state.stockExpenseItem]
    lines.push({
      id: '',
      description: '',
      SN: lines.length + 1,
      qty: 0,
      reason: '',
    })
    let page = Math.ceil(lines.length / PAGE_MAX)
    this.setState({
      stockExpenseItem: lines,
      page: page
    })
  }

  deleteLine = (index) => {
    let lines = [...this.state.stockExpenseItem]
    // Removes the specific array
    lines.splice(index, 1)
    // this.calculateTotal(lines)
    lines.forEach((item, index) => {
      item.SN = index + 1
    })
    const totalPages = Math.ceil(lines.length / PAGE_MAX)
    let page = this.state.page
    if (this.state.page > totalPages) {
      page--
    }
    this.setState({
      stockExpenseItem: lines,
      page: page
    })
  }

  forwardToNextQty = () => {
    let lines = [...this.state.stockExpenseItem]
    let totalPages = Math.ceil(lines.length / PAGE_MAX)
    if (totalPages !== this.state.page) {
      this.setState({
        ...this.state,
        page: this.state.page + 1
      })
    }
  }

  reverToPreQty = () => {
    if (this.state.page !== 1) {
      this.setState({
        ...this.state,
        page: this.state.page - 1
      })
    }
  }
  calculateTotal(lines) {
    this.setState({
    })

  }
  checkDisabled() {
    if (this.state.disableEdit == true) {
      return false
    } 
      return true

  }

  onChangeToEdit = () => {
    this.setState({
      disableEdit: false,
      view: false
    })
  }

  getInfoSKU = (productId, skuId) => {
    const SKU = this.props.ProductFiltered.data
    SKU.map((source) => {
      if (source.id == productId) {
        console.log('hello', source)
        this.setState(prevState => ({
          stockExpenseItem: prevState.stockExpenseItem.map((eachItem, index) =>
            index == this.state.index // eachItem.num
              ? {
                ...eachItem,
                id: skuId,
                skuId: skuId,
                description: source.description,
                qty: 0,
                productId: productId
              }
              : eachItem
          )
        }));
        this.setState({
          toggle: false,
        });
      }
    })
  }

  onConfirm = () => {
    let data = this.state;
    delete data.toggleFormSelection;
    delete data.toggle;
    delete data.targetSearch;
    delete data.page;

    data.status = "confirmed";
    data.id = this.state.id;
    this.props.patchStockExpense(data)
    // alert("patchSinglePurchaseRequest")

    this.setState({
      status: "confirmed",
      view: true,
      disableEdit: false
    })
    // setTimeout(() => {
    //     this.props.history.push({
    //         pathname: `${url.stockExpenseListPage}`,
    //     });
    // }, 500);
  }

  render() {
    let userList = this.props.picUserList.data.map(user => ({ name: user.firstName + " " + user.lastName, value: user.id }))
    console.log("userList", this.state.lines)
    const { tfesPic, remarks, toggleFormSelection, disableEdit, targetSearch, page, date, lines } = this.state;
    const totalPages = Math.ceil(this.state.stockExpenseItem.length / PAGE_MAX)

    return (
      <React.Fragment>

        <FormWrapper
          onSave={this.onSubmit}
          disabled={this.checkDisabled()}
          title="Back To Stock Expenses list"
          centerTitle={
            this.state.isDuplicate ? 'Update Stock Expense' : 'Create Stock Expense'
          }
          promptMessage={this.showStatus()}
          telThree="test"
          listRedirect={stockExpenseListPage}
          showEditButton={this.state.disableEdit && this.state.status !== 'closed'}
          onChangeToEdit={this.onChangeToEdit}
        >

          <form autoComplete="off" style={{ marginLeft: "20px" }} className={this.state.disableEdit && 'uneditable'}>
            <div className="row">
              <div className="col-3" style={{}}>
                <FormInput
                  label="TFES PIC"
                  key={tfesPic}
                  value={tfesPic}
                  target="tfesPic"
                  isToggledEditForm={toggleFormSelection}
                  handleChange={this.handleChange}
                  selectValues={
                    userList
                  }
                  readOnly={disableEdit}
                  original={this.props.singleStockExpense.data && this.props.singleStockExpense.data.tfesPic ? this.props.singleStockExpense.data.tfesPic : ""}
                />
              </div>
              <div className="col-3" style={{}}>
                <p
                  style={{
                    color: 'rgba(0, 0, 0, 0.54)',
                    padding: '0',
                    fontSize: '0.75rem',
                    fontFamily: ' Lato',
                    fontWeight: '400',
                    lineHeight: ' 1',
                    marginBottom: '1px'
                  }}
                >Date </p>
                <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  value={`${formatDate(
                    this.state.date,
                    'L',
                    'en-SG'
                  )}`}
                  format="L"
                  selectedDay={this.state.date}
                  placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                  onDayChange={(e) => this.setState({ day: e })}
                  dayPickerProps={{
                    locale: 'en-SG',
                    localeUtils: MomentLocaleUtils
                  }}
                />
              </div>
            </div>
            <div className="row" >
              <div className="col-8" style={{}}>
                <FormInputMultilines
                  label="Reason for the expenses"
                  value={remarks}
                  target="remarks"
                  handleChange={this.handleChange}
                  isToggledEditForm={toggleFormSelection}
                  readOnly={disableEdit}
                  original={this.props.singleStockExpense.data && this.props.singleStockExpense.data.remarks ? this.props.singleStockExpense.data.remarks : ""}
                />

              </div>

            </div>
            <div class="boundary-line" style={{ marginTop: "15px", marginBottom: "15x" }} />
            <div>
              <div style={{
                // width:"50%",
                margin: "10px 3px",
                minWidth: "400px",
                color: "#2b4da0",
                fontWeight: "bold",
                fontSize: "18px",
                // textAlign:"center", 
              }} > Items
              </div>

              <ItemsLine
                page={this.state.page}
                lines={this.state.stockExpenseItem}
                deleteLine={this.deleteLine}
                handleLineChange={this.handleLineChange}
                toggleFormSelection={toggleFormSelection}
                buttonClick={this.buttonClick}
                disableEdit={this.state.disableEdit}
                buttonShow={!this.state.disableEdit}
                originalData={this.props.singleStockExpense.data && this.props.singleStockExpense.data.stockExpenseItem ? this.props.singleStockExpense.data.stockExpenseItem : []}
              />
              <div class="row quotation-btn">
                <AddCircleOutlineIcon
                  className="tableAddIcon"
                  onClick={this.addNewLine}
                />
              </div>

              <div
                class=" preQty-nextQty"
                style={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <p>Pre Qty #</p>
                <div>
                  <Icon
                    icon={fastReverseButton}
                    className="fastReverseButton"
                    onClick={this.reverToPreQty}
                  />
                </div>
                <p>
                  {page} of {totalPages}
                </p>
                <div>
                  <Icon
                    icon={fastForwardButton}
                    className="fastForwardButton"
                    onClick={this.forwardToNextQty}
                  />
                </div>
                <p>Next Qty #</p>
              </div>
              <div class="boundary-line" />
            </div>
          </form>
        </FormWrapper>
        <div className="Left_Toolbar-wrapper">
          <AppBar
            position="fixed"
            color="primary"
            style={{
              top: 'auto',
              bottom: '50px',
              left: '0',
              right: '-20px',
              width: '50px',
              opacity: '0.8',
              borderRadius: '4px'
            }}
          >
            <Toolbar>
              <div className="Left_Toolbar" style={{}}>
                {this.state.status != "closed" && (
                  <div onClick={this.onConfirm}>
                    <ConfirmationNumberIcon />
                    <span> Confirm Stock Expense </span>
                  </div>
                )}

                <div onClick={this.onBackToListView}>
                  <ArrowBackIcon />
                  <span>Back to Sales Order</span>
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </div>



        <DialogRoot
          show={this.state.toggle}
          handleHide={this.restartToggle}
          size={'lg'}
        >
          {this.state.target === 'sku' &&
            <div>
              <SKU_list
                getInfo={this.getInfoSKU}
                searchText={this.state.targetSearch}
              />
            </div>}

        </DialogRoot>
      </React.Fragment>
    )
  }

}

const mapStateToProps = ({ producttfesState, userState, stocktexpensetfesState, sessionState }) => {
  const { picUserList } = userState;
  const { ProductDetails, ProductFiltered } = producttfesState;
  const { allStockExpense, singleStockExpense } = stocktexpensetfesState;
  const loginUser = sessionState.authState.user
  return { ProductDetails, ProductFiltered, picUserList, allStockExpense, singleStockExpense, loginUser };
};

export default connect(mapStateToProps, {
  getPicUsers,
  postStockExpense,
  getStockExpense,
  patchStockExpense

})(StockExpenseFormView);
