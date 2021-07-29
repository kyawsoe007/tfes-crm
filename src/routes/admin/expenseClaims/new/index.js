// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
// Redux imports
import { getDropdownGroup } from "Ducks/invoicetfes";
import { uploadFile, uploadMultipleFile, getUploadFile, deleteUploadFile, patchUploadFile, downloadUploadFile } from 'Ducks/uploadFile';
import { getPicUsers } from 'Ducks/user'
import { getExpenseClaims, postExpenseClaims, patchExpenseClaims } from 'Ducks/expenseClaims';

// React Component import
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import FormInputMultilines from 'Components/Form/FormInputMultilines';
import ExpenseClaimsLine from '../component/ExpenseClaimsLine'
import Dropzone from 'Components/Dropzone'

// material-ui
import { Button } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Icon
import { Icon, InlineIcon } from '@iconify/react'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import fastReverseButton from '@iconify-icons/emojione-v1/fast-reverse-button'
import fastForwardButton from '@iconify-icons/emojione-v1/fast-forward-button'
import ThumbupAlt from '@material-ui/icons/ThumbUpAlt';
import ThumbdownAlt from '@material-ui/icons/ThumbDownAlt';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, { formatDate, parseDate, } from 'react-day-picker/moment';

// helper functions 
import { expenseClaimsListPage, singleExpenseClaims } from "Helpers/adminURL";
import { expenseClaimsStatus } from 'Constants/modelStatus';
import { supplierInvoiceNewPage } from 'Helpers/accountingURL';

// Redux
const INIT_STATE = {
    onEdit: false,
    target: "",
    errorMsg: "",
    status: '',
    readOnly: false,
    saveBtnShow: true,
    toggleFormSelection: true,
    claimNo: "",
    remark: "",
    claimItems: [],
    files: [],
    uploadedFiles: [],
    userClaim: "",
    page: 1,
    createdDate: new Date(),
    newPost: false,
};
const PAGE_MAX = 10

class ExpenseClaimsFormView extends Component {
    constructor(props) {
        super(props);
        this.state = INIT_STATE
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.submitFileBtnHandler=this.submitFileBtnHandler.bind(this);

    }

    componentDidMount() {
        this.props.getDropdownGroup();
        this.props.getPicUsers()

        const id = this.props.match.params.id;

        // when status is new 
        if (!id) {
            this.setState({ status: 'draft' })
            // ensures that 1 line always appears 
            this.addNewLine()
        }

        // for  already created item 
        if (id) {
            this.props.getExpenseClaims(id)
            this.props.getUploadFile(id)
        }

        // for duplicate 
        if (this.props.history.location.state) {
            const data = this.props.history.location.state
            if (data.duplicate && data.duplicateId) {
                this.setState({ toggleFormSelection: false}, () => { this.props.getExpenseClaims(data.duplicateId) })
            }
        }


        this.setState({ userClaim: this.props.loginUser._id })

    }

    componentDidUpdate(prevProps, prevState) {

        // redirects to id page after post
        if (prevProps.expenseClaims.data !== this.props.expenseClaims.data && this.state.newPost === true) {
            this.props.history.push(singleExpenseClaims(this.props.expenseClaims.data.id))
            this.setState({ newPost: false})
        }

        // renders after get call and post call 
        if (prevProps.expenseClaims.data !== this.props.expenseClaims.data) {
            let data = this.props.expenseClaims.data
            const newState = { ...INIT_STATE, ...this.props.expenseClaims.data }
            if (data.status === expenseClaimsStatus.APPROVED || data.status === expenseClaimsStatus.REJECTED || data.status === expenseClaimsStatus.WAITINGAPPROVAL) {
                newState.readOnly = true
                newState.saveBtnShow = false
            }
            newState.onEdit=true
            this.setState(newState)
        }
      // sets uploaded file into state 
      if (prevProps.uploadedFiles !== this.props.uploadedFiles) {
        this.setState({ uploadedFiles: this.props.uploadedFiles.data })
      }

        // caters for duplicate 
        if (prevProps.expenseClaims.data !== this.props.expenseClaims.data && 
            this.props.history.location.state && this.props.history.location.state.duplicateId) {
            const newState = { ...INIT_STATE, ...this.props.expenseClaims.data }
            newState.claimNo = "";
            newState.status = 'draft';
            newState.toggleFormSelection = false;
            delete newState.approvedBy
            newState.onEdit=true
            this.setState(newState)
        }

    }

    submitFileBtnHandler() {

        const formData = new FormData();
        console.log('hello')
         const id = this.props.match.params.id;
        let patchBody = {
          id: id,
          formData: formData
        }
        if (this.state.files.length === 1) {
          formData.append('file', this.state.files[0]);
          formData.append('modelId', this.props.match.params.id);
          formData.append('modelName', "expenseClamin")
            console.log('hello',this.state.files)
          if (this.state.uploadedFiles.length >= 1) {
            this.props.patchUploadFile(patchBody)
          } else {
            this.props.uploadFile(formData);
          }
          // api.post("/upload",formData).then(res=>console.log(res)).catch(err=>console.log(err))
         // console.log([...formData]);
        } 
        else if (this.state.files.length > 1) {
          // this is for multiple file upload 
          formData.append('modelId', this.props.match.params.id);
          formData.append('modelName', "expenseClamin")
          for (const key of Object.keys(this.state.files)) {
            formData.append('file', this.state.files[key])
          }
        //  console.log([...formData]);
          if (this.state.uploadedFiles.length >= 1) {
           // alert("ASDASD")
            this.props.patchUploadFile(patchBody)
          } else {
            this.props.uploadMultipleFile(formData);
          }
          // api.post("/upload/multiple",formData).then(res=>console.log(res)).catch(err=>console.log(err))
        }
    
         this.setState({ files: [] })
      }

    onSubmit = () => {

        const id = this.props.match.params.id;
        let items = this.state.claimItems;
        let error = false;
        let errorMsg = ""

        // ERROR CHECKING SECTION
        for (let i = 0; i < items.length; i++) {
            if (items[i].amount === "" || items[i].claimType === "" || items[i].currency === "" || items[i].gstAmt === "") {
                error = true;
                errorMsg = 'Please ensure all items are filled up before proceeding!'
            }

            if (typeof parseFloat(items[i].amount) !== 'number' || typeof parseFloat(items[i].gstAmt) !== 'number') {
                error = true;
                errorMsg = 'Please ensure all amount and gstAmount are in correct format!'
            }
        }

        if (error) {
            this.setState({ errorMsg: errorMsg })
            return null
        }

        let dataBody = {
            status: this.state.status,
            createdDate: this.state.createdDate,
            claimNo: "",
            userClaim: this.state.userClaim,
            getApproved: "",
            remark: this.state.remark,
            claimItems: this.state.claimItems
        }

        // inital post 
        if (this.state.status === 'draft' && !id) {
            console.log("POSTBODY", dataBody)
            this.setState({ newPost: true }, () => { this.props.postExpenseClaims(dataBody) })
        }

        // update details 
        if (this.state.status === 'draft' && id) {
            console.log("PATCHBODY", dataBody)
            dataBody.id = id;
            this.props.patchExpenseClaims(dataBody)
            //patch 
        }

        // clears error msg 
        this.setState({ errorMsg: "" })

    }

    submitForApprovalHandler = () => {
        const id = this.props.match.params.id;

        let dataBody = {
            status: 'waiting-approval',
            createdDate: this.state.createdDate,
            claimNo: "",
            userClaim: this.state.userClaim,
            getApproved: "",
            remark: this.state.remark,
            claimItems: this.state.claimItems,
            id: id
        }

        this.props.patchExpenseClaims(dataBody)
    }

    approveRejectHandler = (status) => {
        const id = this.props.match.params.id;

        let dataBody = {
            status: status,
            createdDate: this.state.createdDate,
            claimNo: this.state.claimNo,
            userClaim: this.state.userClaim,
            getApproved: "",
            remark: this.state.remark,
            claimItems: this.state.claimItems,
            id: id
        }

        this.props.patchExpenseClaims(dataBody)
    }

    makePaymentHandler = () => {
        // this.props.history.push(supplierInvoiceNewPage)
        const id = this.props.match.params.id;
        this.props.history.push({ pathname: supplierInvoiceNewPage, state: { expenseClaims: true, claimId: id } })

    }


    handleChange(field, value) {
        let changeState = { [field]: value };
        this.setState(changeState);
    }

    showStatus() {
        // need to make dynamic 
        // draft, waiting-approval, approved, rejected 
        if (this.state.status === expenseClaimsStatus.DRAFT) { return "【 Draft 】" }
        if (this.state.status === expenseClaimsStatus.WAITINGAPPROVAL) { return "【 Waiting Approval 】" }
        if (this.state.status === expenseClaimsStatus.APPROVED) { return "【 Approved 】" }
        if (this.state.status === expenseClaimsStatus.REJECTED) { return "【 Rejected 】" }
        else { return " " }
    }

    calculateTotal() {

    }
    handleLineChange = (field, value, key) => {

        if (field === "amount" || field === "gstAmt") {
            if (value.length >= 1 && value.match(/[a-z\s]/i)) {
                return null
            }
        }

        let claimItems = [...this.state.claimItems];
        claimItems[key][field] = value;

        this.calculateTotal(claimItems)
        this.setState({
            claimItems: claimItems
        })


    }

    handleLineChangeDate = (index, date) => {
        let claimItems = [...this.state.claimItems]
        claimItems[index].date = date
        this.setState({ claimItems })

    }

    addNewLine = () => {
        let claimItems = [...this.state.claimItems]
        claimItems.push({
            lineNum: claimItems.length + 1,
            startDate: new Date(),
            description: '',
            amount: '',
            gstAmt: '',
            claimType: '',
            currency: '',
            remarks: ''
        })
        let page = Math.ceil(claimItems.length / PAGE_MAX)
        this.setState({
            claimItems: claimItems,
            page: page
        })
    }

    deleteNewLine = (index) => {
        let claimItems = [...this.state.claimItems]
        claimItems.splice(index, 1)
        this.calculateTotal(claimItems)
        claimItems.forEach((item, index) => {
            item.lineNum = index + 1
        })
        const totalPages = Math.ceil(claimItems.length / PAGE_MAX)
        let page = this.state.page
        if (this.state.page > totalPages) {
            page--
        }
        this.setState({
            claimItems: claimItems,
            page: page
        })
    }

    forwardToNextQty = () => {
        let totalPages = Math.ceil(this.state.claimItems.length / PAGE_MAX)
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

    buttonClick = (target, index) => {
        this.setState({
            index: index,
            toggle: true,
            element: target,
            // target: target,
        })
    }

    onBackToListView = () => {
        this.props.history.push(expenseClaimsListPage)
    };

    handleUpload = file => {
        let data = [{ key: 'file', value: file[0] }]
        console.log('dataaaa', data, file)
        this.setState({
            files: file
        });
    };

    removeFile = (file) => {
        this.setState(state => {
            const index = state.files.indexOf(file);
            const files = state.files.slice(0);
            files.splice(index, 1);
            return { files };
        });
    }

    deleteFile = (path) => {
        console.log("IDDD", path)
        let postBody = {
            modelId: this.props.match.params.id,
            filePath: path
        }
        this.props.deleteUploadFile(postBody)
    }

    downloadFile = (filename) => {
        this.props.downloadUploadFile(filename)
    }



    render() {
        const { status, readOnly, saveBtnShow, toggleFormSelection, claimNo, type, remark, claimItems, userClaim, page, applyDate, reason, contactTel, contactPic, companyName, orderNo } = this.state;
        let userList = this.props.picUserList.data.map(user => ({ name: user.firstName + " " + user.lastName, value: user.id }))
        const totalPages = Math.ceil(this.state.claimItems.length / PAGE_MAX);
        const styleForDate = {
            color: "rgba(0, 0, 0, 0.54)",
            padding: "0",
            fontSize: "0.75rem",
            fontFamily: " Lato",
            fontWeight: "400",
            lineHeight: " 1",
            marginBottom: "1px"
        }
        return (
            <React.Fragment>
                <FormWrapper
                    onSave={this.onSubmit}
                    onSaveNew={this.onSaveNew}
                    // true ==/== false =.=;;;
                    disabled={saveBtnShow}
                    title="Back to All Expense Claims "
                    centerTitle={this.state.onEdit ? 'Update Expense Claims Page' : 'Create New Expense Claims Page'}
                    promptMessage={this.showStatus()}
                    listRedirect={expenseClaimsListPage}
                >
                    <form autoComplete="off" style={{ marginLeft: "2.5rem" }}
                        className={(status === expenseClaimsStatus.APPROVED || status === expenseClaimsStatus.REJECTED) ? 'uneditable' : ""}
                    >
                        <div className="top-container">
                            {this.state.errorMsg && (<h4 className="text-danger text-center">{this.state.errorMsg}</h4>)}
                            <div className="row">
                                <div className="col-sm-3 " >
                                    <FormInput
                                        label="Expense Claims No"
                                        value={claimNo}
                                        target="claimNo"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        readOnly={true}
                                        original={this.props.expenseClaims.data && this.props.expenseClaims.data.claimNo ? this.props.expenseClaims.data.claimNo : ""}
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <p style={styleForDate}>Date</p>

                                    <DayPickerInput
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        format="L"
                                        value={`${formatDate(applyDate, 'L', 'en-SG')}`}
                                        placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                        // onDayChange={(this.handleDayChange)}
                                        onDayChange={(day) => this.setState({ applyDate: day })}
                                        dayPickerProps={{
                                            locale: 'en-SG',
                                            localeUtils: MomentLocaleUtils,
                                        }}
                                        inputProps={{ readOnly: true }}
                                        isToggledEditForm={toggleFormSelection}
                                    />
                                </div>
                                <div className="col-sm-3">
                                    <FormInput
                                        label="Expense Claims PIC"
                                        value={userClaim}
                                        target="userClaim"
                                        buttonClick={this.buttonClick}
                                        selectValues={userList}
                                        handleChange={this.handleChange}
                                        readOnly={readOnly}
                                        isToggledEditForm={toggleFormSelection}
                                        original={this.props.expenseClaims.data && this.props.expenseClaims.data.userClaim ? this.props.expenseClaims.data.userClaim : ""}
                                    // When enter new form, default original value = id of logged-in user's id
                                    // original={this.props.SalesOrderProduct.data.claimsPic !== undefined? this.props.SalesOrderProduct.data.claimsPic: this.props.loginUser._id}
                                    />
                                </div>
                            </div>
                            <div className="boundary-line" style={{ width: "100%", height: "1px", backgroundColor: "#c0c0c0", margin: "20px auto " }} />
                            <ExpenseClaimsLine
                                lines={this.state.claimItems}
                                page={this.state.page}
                                deleteLine={this.deleteNewLine}
                                handleLineChange={this.handleLineChange}
                                toggleFormSelection={toggleFormSelection}
                                buttonClick={(target, index) =>
                                    this.buttonClick(target, index)
                                }
                                readOnly={this.state.readOnly}
                                // buttonShow={!this.state.view}
                                page={this.state.page}
                                buttonShow={false}
                                styleForDate={styleForDate}
                                handleLineChangeDate={this.handleLineChangeDate}
                                currency={this.props.InvoiceDetails.data && this.props.InvoiceDetails.data.currency}
                                status={this.state.status}
                                originalData={this.props.expenseClaims.data && this.props.expenseClaims.data.claimItems ? this.props.expenseClaims.data.claimItems : ""}
                            />
                            <div className="row quotation-btn">
                                <AddCircleOutlineIcon
                                    className="tableAddIcon"
                                    onClick={this.addNewLine}
                                />
                            </div>
                            <div
                                className=" preQty-nextQty"
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
                                    {page} of{totalPages}
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
                            <div className="row">
                                <div className="col-sm-8">
                                    <FormInputMultilines
                                        label="Remarks"
                                        value={remark}
                                        target="remark"
                                        rows={4}
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        readOnly={readOnly}
                                        original={this.props.expenseClaims.data && this.props.expenseClaims.data.remark ? this.props.expenseClaims.data.remark : ""}
                                    />

                                    <Dropzone
                                        acceptFileTypes="text/csv, image/jpeg, image/png, .pdf"
                                        onDrop={this.handleUpload}
                                        onRemove={this.removeFile}
                                        uploadedFiles={this.state.files}
                                        additionalText="Files can't be edited once uploaded."
                                    />

                                    <div>
                                        <div className="row">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                // color="#df0021"
                                                className="text-white ml-20"
                                                onClick={this.submitFileBtnHandler}
                                                style={{ marginBottom: '0.5rem', marginTop: '0.5rem' }}
                                            >
                                                Save File
                                    </Button>
                                        </div>

                                        {
                                            this.state.uploadedFiles.map(file => (
                                                <div>
                                                    <a key={file._id} onClick={() => this.downloadFile(file.filename)} > {file.filename}</a>
                                                    <Button onClick={() => this.deleteFile(file.path)}> Delete </Button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {/* <div className="col-sm-4 ">
                                    <div className="col quoSummary">
                                        <div className="quoSummary-title">
                                            <h3 >Summary</h3>
                                        </div>
                                        <div className="quoSummary-content">
                                            <h3 style={{ width: "70% " }}></h3>
                                            <p style={{ width: "30% " }}></p>
                                            <h3 style={{ width: "70% " }}></h3>
                                            <p style={{ width: "30% " }}></p>
                                            <h3 style={{ width: "70% " }}></h3>
                                            <p style={{ width: "30% " }}></p>
                                            <h3 style={{ width: "70% " }}></h3>
                                            <p style={{ width: "30% " }}></p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="Left_Toolbar-wrapper">
                            <AppBar position="fixed" color="primary" style={{
                                top: 'auto',
                                bottom: "50px",
                                left: "0",
                                right: "-20px",
                                width: "50px",
                                opacity: "0.8",
                                borderRadius: "4px"
                            }}>
                                <Toolbar>
                                    <div className="Left_Toolbar" >
                                        {
                                            this.state.status == "draft" && this.props.match.params.id &&
                                            <div onClick={this.submitForApprovalHandler}>
                                                <ConfirmationNumberIcon />
                                                <span> Confirm </span>
                                            </div>
                                        }

                                        {
                                            this.state.status === 'waiting-approval' &&
                                            <React.Fragment>
                                                <div onClick={() => this.approveRejectHandler('approved')}>
                                                    <ThumbupAlt />
                                                    <span> Approve</span>
                                                </div>

                                                <div onClick={() => this.approveRejectHandler('rejected')}>
                                                    <ThumbdownAlt />
                                                    <span> Reject</span>
                                                </div>
                                            </React.Fragment>
                                        }

                                        {
                                            this.state.status === 'approved' &&
                                            <div onClick={this.makePaymentHandler}>
                                                <AccountBalanceIcon />
                                                <span> Make Payment</span>
                                            </div>
                                        }

                                        <div onClick={this.onBackToListView}>
                                            <ArrowBackIcon />
                                            <span>Back to Expense Claim List</span>
                                        </div>
                                    </div>
                                </Toolbar>
                            </AppBar>
                        </div>
                    </form>
                </FormWrapper>
            </React.Fragment >
        );
    }
}

const mapStateToProps = ({ invoiceState, userState, sessionState, expenseClaimsState,fileUploadState }) => {
    const { InvoiceDetails } = invoiceState;
    const { picUserList } = userState;
    const loginUser = sessionState.authState.user;
    const { expenseClaims } = expenseClaimsState;
    const { uploadedFiles } = fileUploadState
    return {
        InvoiceDetails,
        picUserList,
        loginUser,
        expenseClaims,
        uploadedFiles
    };
};
export default connect(mapStateToProps, {
    getDropdownGroup,
    getPicUsers,
    getExpenseClaims,
    postExpenseClaims,
    patchExpenseClaims,
    uploadFile, 
    uploadMultipleFile, 
    getUploadFile, 
    deleteUploadFile, 
    patchUploadFile, 
    downloadUploadFile
})(ExpenseClaimsFormView);
