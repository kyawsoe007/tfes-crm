// new quotation
import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import RctSectionLoader from "Components/RctSectionLoader";
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation'
import { singleTfesCreditNote, singleTfesDeposit, tfesCreditNoteNewPage } from 'Helpers/accountingURL';
// Redux imports
import { setProduct, getProductDetails, getFilterProduct } from "Ducks/producttfes";
import { getDropdownGroup } from "Ducks/invoicetfes";
import { setDeposit, patchSingleDeposit, getSingleDepositRequest, getDepositPdf } from "Ducks/accounting/deposit";
import { getSingleSkuSalesOrderRequest } from "Ducks/salesordertfes";
import { savePACKINGForm } from "Ducks/packing";
import {
    getFilterSupplier,
} from 'Ducks/suppliertfes'
import { getPicUsers, getOneUser } from 'Ducks/user'

// Actions
import {
    getFilterAdminSettingRequest,
    getAdminSetting
} from "Ducks/admin/adminSetting"

// React Component import
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import FormInputMultilines from 'Components/Form/FormInputMultilines';

// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Button } from "@material-ui/core";
// Icon

import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import 'moment/locale/en-SG'
import ReceiptSharpIcon from "@material-ui/icons/ReceiptSharp";

import { leaveManagementListPage } from "Helpers/adminURL";
import {
    getLeaveManagement,
    postLeaveManagement,
    patchLeaveManagement
} from "Ducks/admin/leaveManagement"
import { number } from "prop-types";
class LeaveManagementFormView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onEdit: false,
            target: "",
            errorMsg: "",
            status: '',
            disableEdit: false,
            toggleFormSelection: true,
            number: "",
            type: "",
            reasons: "",
            applyDate: new Date(),
            startDate: new Date(),
            endDate: new Date(),
            offDays: "",
            employeeName: "",
            usedAnnualLeave: 0,
            usedSickLeave: 0,
            usedCarriedForwardLeave: 0,
            annualLeaveLeft: 0,
            sickLeaveLeft: 0,
            leaveCarriedForward: 0,
            availableAnnual: 0,
            carriedLeaveReserved: 0,
            annualLeaveReserved: 0,
            sickLeavesReserved:0,
        };
        this.handleDayChangeApply = this.handleDayChangeApply.bind(this);
        this.handleDayChangeStart = this.handleDayChangeStart.bind(this)
        this.handleDayChangeEnd = this.handleDayChangeEnd.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onConfirmInvoice = this.onConfirmInvoice.bind(this)
        this.requestApprove = this.requestApprove.bind(this)
        this.cancelApprove = this.cancelApprove.bind(this)
        this.calculateAvailableLeaves = this.calculateAvailableLeaves.bind(this)
    }
    handleDayChangeApply(day) {
        this.setState({ applyDate: day });
    }
    handleDayChangeStart(day) {
        this.setState({ startDate: day });
    }
    handleDayChangeEnd(day) {
        this.setState({ endDate: day });
    }
    onSubmit() {
        if (this.state.type) {
            const data = {
                ...this.state,
            };
            delete data.toggleFormSelection;
            delete data.onEdit;
            delete data._id;
            if (this.state.onEdit) {
                // patch single Leave Management 
                if (this.state.status === 'approved') {
                    this.setState({
                        errorMsg: 'Leave Management approved. Leave Management cannot be edited'
                    })
                }
                else {
                    data.id = this.state.id;
                    // this.props.patchSingleInterbankTransfer(data) 
                    this.props.patchLeaveManagement(data)
                    this.setState({
                        disableEdit: true,
                        toggleFormSelection: true,
                    })
                }

            } else {
                // To Remove state
                const { state } = this.props.history.location;
                if (this.state.onEdit && !this.props.history.location.isDuplicate) {

                    data.id = this.state.id;
                    this.props.patchLeaveManagement(data)

                } else {
                    // To Remove state
                    const { state } = this.props.history.location;
                }
                data.status = 'draft'
                this.props.postLeaveManagement(data);
            }
            this.setState({
                toggleFormSelection: true,
                disableEdit: true,
                errorMsg: "",
            })
        } else {
            this.setState({
                errorMsg: 'Leave Type not selected yet!',
            })
        }
    }

    componentDidMount() {
        this.props.getDropdownGroup();
        this.props.getPicUsers()
        this.props.getOneUser(this.props.loginUser._id)
        this.props.getFilterAdminSettingRequest();
        this.setState({ status: 'draft' })
        if (this.state.employeeName) {
            //console.log('hello')
        }
        const fromCheck = this.props.location.state;

        const id = this.props.match.params.id;
        if (id && !fromCheck) {
            this.props.getLeaveManagement(id);

            if (this.props.leaveManagement.data && this.props.leaveManagement.data.id) {
                this.resetTotalState();
                console.log("am here");
            }
        } else if (id && fromCheck && fromCheck.isDuplicate) {
            this.props.getLeaveManagement(id);

            if (this.props.leaveManagement.data && this.props.leaveManagement.data.id) {
                this.resetTotalState();
            }
        }

    }
    resetTotalState(editStatus, fromSales) {
        let newState;
        newState = {
            onEdit: editStatus,
            ...this.props.leaveManagement.data,
        };

        if (!editStatus) {
            newState.status = "draft";
        }

        this.setState({
            ...this.state,
            ...newState,
        },() => {
            this.props.getAdminSetting(this.props.leaveManagement.data.employeeName);
            this.calculateAvailableLeaves();
        })

        if (newState.status === "cancelled" || newState.status === "approved"){
            this.setState({
                disableEdit: true,
            })
        }


    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.adminSetting.data !== this.props.adminSetting.data) {
            if (this.props.adminSetting.data && this.props.adminSetting.data._id) {
                // console.log('this.props', this.props.adminSetting.data)
                this.setState({
                    annualLeaveLeft: this.props.adminSetting.data.remainingAnnualLeave ? this.props.adminSetting.data.remainingAnnualLeave : 0,
                    usedAnnualLeave: this.props.adminSetting.data.remainingAnnualLeave && this.props.adminSetting.data.annualLeave ? this.props.adminSetting.data.annualLeave - this.props.adminSetting.data.remainingAnnualLeave : 0,
                    sickLeaveLeft: this.props.adminSetting.data.remainingSickLeave ? this.props.adminSetting.data.remainingSickLeave : 0,
                    usedSickLeave: this.props.adminSetting.data.sickLeave && this.props.adminSetting.data.remainingSickLeave ? this.props.adminSetting.data.sickLeave - this.props.adminSetting.data.remainingSickLeave : 0,
                    hireDate:  this.props.adminSetting.data.hireDate ? this.props.adminSetting.data.hireDate : new Date(),
                    leaveCarriedForward: this.props.adminSetting.data.leaveCarriedForward ? this.props.adminSetting.data.leaveCarriedForward : 0,
                    remainingAnnualLeave: this.props.adminSetting.data.remainingAnnualLeave ? this.props.adminSetting.data.remainingAnnualLeave : 0,
                }, () => {
                    this.calculateAvailableLeaves()
                })
            }
            this.calculateAvailableLeaves()
        }
        if (prevProps.leaveManagement.data !== this.props.leaveManagement.data) {
            if (
                this.props.leaveManagement.data &&
                this.props.leaveManagement.data.id
            ) {
                
                this.resetTotalState(true)
            }
        }

    }

    calculateAvailableLeaves(){
        // Get month of current date
        let currentMonth = new Date().getMonth() + 1
        
        // Calculate number of months away the user is from the refresh month
        let hireMonth = this.props.adminSetting.data.hireDate ? new Date(this.props.adminSetting.data.hireDate).getMonth() : 0;
        // if hire month is last year (e.g. Nov) and current month is this year (e.g. June)
        // Calculate number of months from last year Nov to this year June
        let monthsWorked = 0
        if (hireMonth > currentMonth){
            let tillEndYear = 12 - hireMonth;
            monthsWorked = currentMonth + tillEndYear;
        }
        else{
            monthsWorked = currentMonth - hireMonth
        }
        
        //  Calculate how many used annual leave (excluding leaves carried forward)
        let usedAnnualLeaveOnly = this.props.adminSetting.data.annualLeave - this.props.adminSetting.data.remainingAnnualLeave;

        // Calculate how many available annual leaves currently user can use
        //     = total available annual leaves user can take at the moment - those he already used
        let availableAnnual = (this.props.adminSetting.data.annualLeave / 12 * monthsWorked) - usedAnnualLeaveOnly

        if (availableAnnual > this.state.annualLeaveLeft){
            availableAnnual = this.state.annualLeaveLeft;
        }
        availableAnnual = Number(availableAnnual.toFixed(0));

        // console.log("currentMonth: ", currentMonth);
        // console.log("hireMonth:", hireMonth);
        // console.log("monthsWorked:", monthsWorked)
        // console.log("Annual Leave Left:", this.state.annualLeaveLeft)
        // console.log("Available Annual Leave = Annual Leave Left / 12 * Months Worked");
        // console.log("Available Annual Leave:", availableAnnual);

        let carriedLeaveReserved = 0;
        let annualLeaveReserved = 0;
        let sickLeaveReserved = 0;
        if (this.state.type && this.state.type === "annualLeave"){
            if (this.state.offDays && this.state.offDays !== ""){
                // Leave Carried Forward < Leaves Applied ? 
                if (this.state.leaveCarriedForward < parseInt(this.state.offDays)){
                    carriedLeaveReserved = this.state.leaveCarriedForward;
                    annualLeaveReserved = parseInt(this.state.offDays) - carriedLeaveReserved;
                }
                else {
                    carriedLeaveReserved = this.state.offDays;
                }
            }
        } else if (this.state.type && this.state.type === "sickLeave"){
            sickLeaveReserved = this.state.offDays;
        }

        this.setState({
            availableAnnual: availableAnnual,
            carriedLeaveReserved: carriedLeaveReserved,
            annualLeaveReserved: annualLeaveReserved,
            sickLeaveReserved: sickLeaveReserved
        })

    }

    handleChange(field, value) {
        let changeState = { [field]: value };
        this.setState(changeState);
        // console.log("field", field, value)
        if (field === "employeeName") {
            if (value) {
                this.props.getAdminSetting(value)
            }
        }

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
        })
      }

    showStatus() {
        if (this.state.status == "approved") { return "【 Approved 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        if (this.state.status == "cancelled") { return "【 Cancelled】" }
        if (this.state.status == "waiting_approval") { return "【 Waiting Approval 】" }
        else { return " " }
    }
    requestApprove() {
        if (this.state.onEdit === true) {
            const data = {
                ...this.state,
                status: 'waiting_approval'
            };
            this.props.patchLeaveManagement(data)

        } else {

            alert('You must save this deposit in order to execute confirm')
        }
    }
    cancelApprove() {
        if (this.state.onEdit === true) {
            const data = {
                ...this.state,
                status: 'cancelled'
            };
            this.props.patchLeaveManagement(data)

        } else {

            alert('You must save this deposit in order to execute confirm')
        }
    }

    onConfirmInvoice() {
        if (this.state.onEdit === true) {

            const data = {
                ...this.state,
                status: 'approved',
            };
            this.props.patchLeaveManagement(data)


        } else {
            alert('You must save this deposit in order to execute confirm')
        }
    }

    onBackToListView = () => {
        this.props.history.push('/app/admin/leaveManagement')
    };



    render() {
        console.log('this.props.singleUser.data.',this.props.singleUser.data)
        const { disableEdit, toggleFormSelection, number, type, applyDate, startDate, endDate, offDays, reasons, employeeName } = this.state;
        const styleForDate = {
            color: "rgba(0, 0, 0, 0.54)",
            padding: "0",
            fontSize: "0.75rem",
            fontFamily: " Lato",
            fontWeight: "400",
            lineHeight: " 1",
            marginBottom: "1px"
        }
        const employeesAll = this.props.adminSettingFiltered.data
        const employeeList = employeesAll.map(item => ({ name: item.firstName + " " + item.lastName, value: item._id }))
        // console.log("employeesAll", employeesAll)

        return (
            <React.Fragment>
                {this.props.leaveManagement.loading ? (
                    <RctSectionLoader />
                ) : (
                    <FormWrapper
                        onSave={this.onSubmit}
                        onSaveNew={this.onSaveNew}
                        disabled={this.checkDisabled()}
                        title="Back to All Leave Management"
                        centerTitle={
                            this.state.onEdit
                                ? 'Update Leave Management Page'
                                : 'Create New Leave Management Page'
                        }
                        edit="test"
                        promptMessage={this.showStatus()}
                        listRedirect={leaveManagementListPage}
                        onChangeToEdit={this.onChangeToEdit}
                        showEditButton={this.state.disableEdit && this.state.status !== 'approved' && this.state.status !== 'cancelled'}
                    >
                        <form autoComplete="off" style={{ marginLeft: "2.5rem" }} className={this.state.disableEdit && "uneditable"}>
                            <div class="top-container">
                                {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                                <div class="row">
                                    <div class="col-sm-4 " >
                                        <FormInput
                                            label="Leave Request No"
                                            value={number}
                                            target="number"
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={true}
                                            original={this.props.leaveManagement.data.number ? this.props.leaveManagement.data.number : ""}
                                        />
                                    </div>
                                    <div class="col-sm-4 ">
                                        <p style={styleForDate}>Date</p>

                                        <DayPickerInput
                                            formatDate={formatDate}
                                            parseDate={parseDate}
                                            format="L"
                                            value={`${formatDate(applyDate, 'L', 'en-SG')}`}
                                            placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                            onDayChange={this.handleDayChangeApply}
                                            dayPickerProps={{
                                                locale: 'en-SG',
                                                localeUtils: MomentLocaleUtils
                                            }}
                                            isToggledEditForm={toggleFormSelection}
                                        />
                                    </div>
                                    <div class="col-sm-4 " >
                                        <FormInput
                                            label="Employee Name"
                                            value={employeeName}
                                            target="employeeName"
                                            buttonClick={this.buttonClick}
                                            selectValues={employeeList}
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.leaveManagement.data.employeeName ? this.props.leaveManagement.data.employeeName : ""} 

                                        />
                                    </div>
                                </div>
                                <div class="boundary-line" style={{ width: "100%", height: "1px", backgroundColor: "#c0c0c0", margin: "20px auto " }} />
                                <div class="row">
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Take Off Days"
                                            target="offDays"
                                            value={offDays}
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.leaveManagement.data.offDays ? this.props.leaveManagement.data.offDays : ""} 
                                            />
                                    </div>
                                    <div className="col-4">
                                        <p style={styleForDate}>Start Date</p>
                                        <DayPickerInput
                                            formatDate={formatDate}
                                            parseDate={parseDate}
                                            format="L"
                                            value={`${formatDate(startDate, 'L', 'en-SG')}`}
                                            placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                            onDayChange={this.handleDayChangeStart}
                                            dayPickerProps={{
                                                locale: 'en-SG',
                                                localeUtils: MomentLocaleUtils
                                            }}

                                        />
                                    </div>
                                    <div className="col-3">
                                        <p style={styleForDate}>End Date</p>
                                        <DayPickerInput
                                            formatDate={formatDate}
                                            parseDate={parseDate}
                                            format="L"
                                            value={`${formatDate(endDate, 'L', 'en-SG')}`}
                                            placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                            onDayChange={this.handleDayChangeEnd}
                                            dayPickerProps={{
                                                locale: 'en-SG',
                                                localeUtils: MomentLocaleUtils
                                            }}
                                        />
                                    </div>


                                </div>
                                <div className="row">
                                    <div class="col-sm-4 ">
                                        <FormInput
                                            label="Leave Type"
                                            target="type"
                                            value={type}
                                            selectValueName="name"
                                            selectValues={[
                                                { name: "Annual Leave", value: "annualLeave" },
                                                { name: "Leave in Lieu", value: "inLieuLeave" },
                                                { name: "Childcare Leave", value: "childcareLeave" },
                                                // { name: "Maternity Leave", value: "maternityLeave" },
                                                // { name: "Paternity Leave", value: "paternityLeave" },
                                                // { name: "Leave Carried Forward", value: "leaveCarriedForward" },
                                                // { name: "Paternity Leave", value: "paternityLeave" },
                                                { name: "Sick  Leave", value: "sickLeave" },
                                                { name: "Reservist Leave", value: "reservistLeave" }
                                            ]}
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit} 
                                            original={this.props.leaveManagement.data.type ? this.props.leaveManagement.data.type : ""} />

                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <FormInputMultilines
                                            label="reasons for leave"
                                            value={reasons}
                                            target="reasons"
                                            rows={4}
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.leaveManagement.data.reasons ? this.props.leaveManagement.data.reasons : ""} 
                                        />
                                    </div>

                                </div>
                                <div class="boundary-line" style={{ width: "100%", height: "1px", backgroundColor: "#c0c0c0", margin: "20px auto " }} />
                                <div class="row">
                                    <div class="col-sm-8" />
                                    <div class="col-sm-4">
                                        <div class="col quoSummary">
                                            <div class="quoSummary-title">
                                                <h3 >Summary</h3>
                                            </div>
                                            <div class="quoSummary-content">
                                                {/* <h3 style={{ width: "70% " }}>Used Annual Leave (Days) </h3>
                                                <p style={{ width: "30% " }}>{this.state.usedAnnualLeave}</p> */}

                                                <h3 style={{ width: "70% " }}>Leaves Carried Forward (Days) </h3>
                                                <p style={{ width: "30% " }}>
                                                    {this.state.leaveCarriedForward} {this.state.status !== "approved" && this.state.status !== "cancelled" && this.state.carriedLeaveReserved !== 0 ? "(" + this.state.carriedLeaveReserved + ")" : ""}
                                                </p>
                                                <h3 style={{ width: "70% " }}>Annual Leave Available (Days) </h3>
                                                <p style={{ width: "30% " }}>
                                                    {this.state.availableAnnual} {this.state.status !== "approved" && this.state.status !== "cancelled" && this.state.annualLeaveReserved !== 0 ? "(" + this.state.annualLeaveReserved + ")" : ""}
                                                </p>
                                                <h3 style={{ width: "70% " }}>Sick Leave Left (Days) </h3>
                                                <p style={{ width: "30% " }}>
                                                    {this.state.sickLeaveLeft} {this.state.status !== "approved" && this.state.status !== "cancelled" && this.state.sickLeaveReserved !== 0 ? "(" + this.state.sickLeaveReserved + ")" : ""}
                                                </p>

                                                {/* <h3 style={{ width: "70% " }}>Used Sick Leave (Days) </h3>
                                                <p style={{ width: "30% " }}>{this.state.usedSickLeave}</p> */}
                                                
                                                
                                                {/* <h3 style={{ width: "70% " }}>Current Available Leaves (Days) </h3>
                                                <p style={{ width: "30% " }}>{this.state.availableLeaves}</p> */}
                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <div className="row">
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
                                        <div className="Left_Toolbar"
                                            style={{
                                            }}
                                        >
                                            {
                                                this.state.status == "draft" &&
                                                <div onClick={this.requestApprove}>
                                                    <ReceiptSharpIcon />
                                                    <span>Waiting Approval</span>
                                                </div>
                                            }
                                            {this.state.status == "draft" || this.state.status == 'waiting_approval' &&
                                                this.props.singleUser.data && this.props.singleUser.data.access.includes("employee_settings_management")
                                                &&
                                                <Fragment>
                                                    <div onClick={this.onConfirmInvoice}>
                                                        <ConfirmationNumberIcon />
                                                        <span>Approve Request</span>
                                                    </div>
                                                    <div onClick={this.cancelApprove}>
                                                        <CancelPresentationIcon />
                                                        <span>Cancel Request</span>
                                                    </div>
                                                </Fragment>
                                            }



                                            <div onClick={this.onBackToListView}>
                                                <ArrowBackIcon />
                                                <span>Back to Leave Management List</span>
                                            </div>
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </div>
                        </form>
                    </FormWrapper>
                )
                }
            </React.Fragment >
        );
    }
}

const mapStateToProps = ({ producttfesState, userState, sessionState, customertfesState, accountItemState, invoiceState, packinglistState, suppliertfesState, depositState, adminState }) => {
    const { ProductDetails, ProductFiltered } = producttfesState;
    const { customerFiltered } = customertfesState;
    const { SupplierFiltered } = suppliertfesState;
    const { InvoiceDetails } = invoiceState;
    const { packingList } = packinglistState;
    const { accountItem } = accountItemState;
    const { picUserList, singleUser } = userState;
    const loginUser = sessionState.authState.user;
    const { adminSettingState, leaveManagementState } = adminState;
    const { adminSettingFiltered, adminSetting } = adminSettingState;
    const { leaveManagement } = leaveManagementState;
    return { picUserList, singleUser, loginUser, adminSetting, packingList, accountItem, ProductDetails, ProductFiltered, customerFiltered, InvoiceDetails, leaveManagement, SupplierFiltered, adminSettingFiltered };
};
export default connect(mapStateToProps, {
    setProduct,
    getProductDetails,
    getFilterProduct,
    patchSingleDeposit,
    getSingleDepositRequest,
    getDepositPdf,
    savePACKINGForm,
    getSingleSkuSalesOrderRequest,
    getDropdownGroup,
    getFilterSupplier,
    getLeaveManagement,
    postLeaveManagement,
    patchLeaveManagement,
    getFilterAdminSettingRequest,
    getAdminSetting,
    getPicUsers,
    getOneUser
})(LeaveManagementFormView);
