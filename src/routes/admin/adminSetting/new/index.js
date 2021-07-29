// new quotation
import React, { Component } from "react";
import { connect } from "react-redux";
import RctSectionLoader from "Components/RctSectionLoader";
// Redux imports
import { getDropdownGroup } from "Ducks/invoicetfes";
import { setDeposit, patchSingleDeposit, getSingleDepositRequest, getDepositPdf } from "Ducks/accounting/deposit";
import { getPicUsers, getOneUser } from 'Ducks/user'
// React Component import
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import FormInputMultilines from 'Components/Form/FormInputMultilines';
import TabPanel from 'Components/TabPanel/TabPanel';


// material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

import { Button, } from "@material-ui/core";
// Icon
import { Icon, InlineIcon } from '@iconify/react'
import fastReverseButton from '@iconify-icons/emojione-v1/fast-reverse-button'
import fastForwardButton from '@iconify-icons/emojione-v1/fast-forward-button'
// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';

import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';

import { adminSettingListPage } from "Helpers/adminURL";
import {
    getAdminSetting,
    postAdminSetting,
    patchAdminSetting
} from "Ducks/admin/adminSetting"
import { Fragment } from "react";
const INIT_STATE = {
    onEdit: false,
    target: "",
    errorMsg: "",
    status: '',
    disableEdit: false,
    view: false,
    toggleFormSelection: true,
    hireDate: new Date(),
    issueDate: new Date(),
    number: "",
    employmentType: "",
    remarks: "",
    tabValue: "one",
    department: "",
    gender: "",
    nickName: "",
    user: "",
    workingYears: 0,
    firstName: "",
    lastName: "",
    address: "",
    phoneNum: "",
    email: "",
    emergencyPerson: "",
    emergencyTel: "",
    position: "",
    idNumber: "",
    passportNo: "",
    passType: "",
    scpr: "",
    annualLeave: 0,
    sickLeave: 0,
    inLieuLeave: 0,
    childcareLeave: 0,
    maternityLeave: 0,
    paternityLeave: 0,
    // sharedPaternityLeave: 0,
    // unpaidLeave: 0,
    // adoptionLeave: 0,
    cpfFEmployer: "",
    cpfFEmployee: "",
    levy: "",
    sdl: "",
    allowance: "",
    basicSalary: "",
    id: '',
    remainingAnnualLeave: 0,
    remainingChildCareLeave: 0,
    remainingSickLeave: 0,
    remainingInLieuLeave: 0,
    remainingMaternityLeave: 0,
    remainingPaternityLeave: 0,
    leaveCarriedForward: 0,
    reservistLeave: 0,
    remainingReservistLeave: 0
    // remainingSharedPaternityLeave: 0,
    // remainingUnpaidLeave: 0,
    // remainingAdoptionLeave: 0

};
class AdminSettingFormView extends Component {
    constructor(props) {
        super(props);

        this.state = INIT_STATE;
        this.handleDayChange = this.handleDayChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onConfirmInvoice = this.onConfirmInvoice.bind(this)
    }

    getAge(hireDate) {
        let now = new Date();
        let days = Math.floor((now.getTime() - hireDate.getTime()) / 1000 / 60 / 60 / 24);
        let age = 0;
        for (let year = hireDate.getFullYear(); year <= now.getFullYear(); year++) {
            let daysInYear = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) ? 366 : 365;
            if (days >= daysInYear) {
                days -= daysInYear;
                age++;
            }
        }
        return age;
    }
    handleDayChange(day) {
        let years = this.getAge(day)
        console.log("handleDayChange years", years)

        this.setState({
            hireDate: day,
            workingYears: years
        });
    }

    onSubmit() {
        const data = {
            ...this.state,
        };
        if (this.state.hireDate == '') {
            this.setState({
                errorMsg: 'Date not selected yet!'
            })
        }
        delete data.toggleFormSelection;
        delete data.onEdit;
        delete data._id;

        if (this.state.onEdit) {
            // patch single Expense Claims 
            // if (this.state.status === 'confirmed') {
            //     this.setState({
            //         errorMsg: 'Expense Claims confirmed. Expense Claims cannot be edited'
            //     })
            // }
            // else {
            data.id = this.state.id;
            // this.props.patchSingleInterbankTransfer(data) 
            this.props.patchAdminSetting(data)
            // }

        } else {
            // To Remove state
            const { state } = this.props.history.location;
            // duplicate data pass in
            if (state && state.isDuplicate) {
                const stateCopy = { ...state };
                delete stateCopy.isDuplicate;
                this.props.history.replace({ state: stateCopy })
            }
            if (this.state.onEdit && !this.props.history.location.isDuplicate) {

                data.id = this.state.id;
                this.props.patchAdminSetting(data)

            } else {
                // To Remove state
                const { state } = this.props.history.location;
                if (state && state.isDuplicate) {
                    const stateCopy = { ...state };
                    delete stateCopy.isDuplicate;
                    this.props.history.replace({ state: stateCopy })
                }
            }
            data.status = 'draft'
            this.props.postAdminSetting(data);
        }
        this.setState({
            toggleFormSelection: true,
            disableEdit: true,
            errorMsg: "",
        })

    }

    componentDidMount() {
        this.props.getDropdownGroup();
        this.props.getPicUsers()
        this.props.getOneUser(this.props.loginUser._id)
        //console.log('hello', this.props.singleUser)
        this.setState({
            firstName: this.props.singleUser.data.isManager == true ? "" : this.props.singleUser.data.firstName,
            lastName: this.props.singleUser.data.isManager == true ? "" : this.props.singleUser.data.lastName,
            email: this.props.singleUser.data.isManager == true ? "" : this.props.singleUser.data.email,
            phoneNum: this.props.singleUser.data.isManager == true ? "" : this.props.singleUser.data.mobile,
            user: this.props.singleUser.data.isManager == true ? "" : this.props.loginUser._id,
            //status: 'draft',
            employmentType: "local"
        })
        const fromCheck = this.props.location.state;
        const id = this.props.match.params.id;
        if (id && !fromCheck) {
            this.props.getAdminSetting(id);

            if (this.props.adminSetting.data && this.props.adminSetting.data.id) {
                this.resetTotalState();

            }
        } else if (id && fromCheck && fromCheck.view) {
            this.props.getAdminSetting(id);

            if (this.props.adminSetting.data && this.props.adminSetting.data.id) {
                this.resetTotalState();
                this.setState({
                    disableEdit: fromCheck.view,
                    view: fromCheck.view,
                })
            }
        }
    }
    resetTotalState(editStatus) {
        let newState;
        newState = {
            ...INIT_STATE,
            onEdit: editStatus,
            ...this.props.adminSetting.data,
        };

        if (!editStatus) {
            newState.status = "draft";
        }
        this.setState({
            ...this.state,
            ...newState,
        })

    }

    componentDidUpdate(prevProps, prevState) {
        let sourceData = this.props.adminSetting.data
        if (prevProps.singleUser.data != this.props.singleUser.data) {
            if (this.props.singleUser.data && this.props.singleUser.data._id) {
                this.setState({
                    firstName: this.props.singleUser.data.firstName,
                    lastName: this.props.singleUser.data.lastName,
                    email: this.props.singleUser.data.email,
                    phoneNum: this.props.singleUser.data.mobile,
                    user: this.props.singleUser.data._id
                })
            }
        }
        if (prevProps.adminSetting.data !== sourceData) {
            if (
                sourceData &&
                sourceData.id
            ) {

                this.resetTotalState(true);
            }
        }
    }

    handleChange(field, value) {
        let changeState = { [field]: value };
        console.log('field', field)
        console.log('value', value)
        if (field == 'user') {
            this.props.getOneUser(value)

        }
        this.setState(changeState);
    }
    checkDisabled() {
        if (this.state.status === "confirmed" && this.state.disableEdit === true) {
            return false;
        } else {
            return true
        }


    }
    showStatus() {
        if (this.state.status == "confirmed") { return "【 Confirmed 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        else { return " " }
    }


    onConfirmInvoice() {
        if (this.state.onEdit === true) {
            const data = {
                ...this.state,
                status: 'confirmed',
            };
            this.props.patchAdminSetting(data)

        } else {
            alert('You must save this deposit in order to execute confirm')
        }
        this.setState({
            disableEdit: true
        })
    }

    onBackToListView = () => {
        this.props.history.push('/app/admin/adminSetting')
    };
    changeTab = (event, newValue) => {
        this.setState({
            tabValue: newValue
        })
    }
    onChangeToEdit = () => {
        this.setState({
            disableEdit: false,
        })
    }
    render() {
        const { disableEdit, toggleFormSelection, tabValue, remarks, number, employmentType, department, hireDate, gender, nickName, user, workingYears, firstName, lastName, address, phoneNum, email, emergencyPerson, emergencyTel, position, idNumber, passportNo, passType, scpr, issueDate } = this.state;
        const { annualLeave, remainingAnnualLeave, remainingSickLeave, remainingInLieuLeave, remainingChildCareLeave, leaveCarriedForward, reservistLeave, remainingReservistLeave, remainingMaternityLeave, remainingPaternityLeave, sickLeave, childcareLeave, inLieuLeave, maternityLeave, paternityLeave } = this.state
        const { cpfFEmployer, cpfFEmployee, levy, sdl, allowance, basicSalary } = this.state
        let userList = this.props.picUserList.data.map(user => ({ name: user.firstName + " " + user.lastName, value: user.id }))
        console.log(userList)
        console.log('this', this.props.loginUser)
        const originalData = this.props.adminSetting.data
        const styleForDate = {
            color: "rgba(0, 0, 0, 0.54)",
            padding: "0",
            fontSize: "0.75rem",
            fontFamily: " Lato",
            fontWeight: "400",
            lineHeight: " 1",
            marginBottom: "1px"
        }
        const a11yProps = (index) => {
            return {
                id: `wrapped-tab-${index}`,
                'aria-controls': `wrapped-tabpanel-${index}`,
            };
        }
        return (
            <React.Fragment>
                <FormWrapper
                    onSave={this.onSubmit}
                    onSaveNew={this.onSaveNew}
                    onChangeToEdit={this.onChangeToEdit}
                    disabled={this.checkDisabled()}
                    title="Back to All Employee Setting Page "
                    centerTitle={
                        this.state.onEdit
                            ? 'Update Employee Setting  Page'
                            : 'Create New Employee Setting  Page'
                    }
                    edit="test"
                    promptMessage=" "
                    listRedirect={adminSettingListPage}
                    showEditButton={this.state.disableEdit && !this.state.view}
                >
                    <form autoComplete="off" style={{ marginLeft: "2.5rem" }}
                        className={this.state.disableEdit && 'uneditable'}
                    >
                        <div class="top-container">
                            {this.state.errorMsg && (<h4 class="text-danger text-center">{this.state.errorMsg}</h4>)}
                            {/* <div> <strong>Employee Details </strong> 
                                </div>
                                <div class="boundary-line" style={{ width: "100%", height: "1px", backgroundColor: "#c0c0c0", margin: "0px 0px 20px 0px" }}/> */}
                            <div class="row">
                                <div class="col-sm-3 " >
                                    <FormInput
                                        label="Employee No"
                                        value={number}
                                        target="number"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.number ? originalData.number : ""}
                                        readOnly={true}
                                    />
                                </div>
                                <div class="col-sm-3 unvisibleBtn">
                                    <FormInput
                                        label="Nickname"
                                        value={nickName}
                                        target="nickName"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        readOnly={disableEdit}
                                        original={originalData.nickName ? originalData.nickName : ""}
                                    />
                                </div>
                                <div class="col-sm-3 ">
                                    <p style={styleForDate}>Hiredate</p>
                                    <DayPickerInput
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        format="L"
                                        value={`${formatDate(hireDate, 'L', 'en-SG')}`}
                                        placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                        onDayChange={this.handleDayChange}
                                        dayPickerProps={{
                                            locale: 'en-SG',
                                            localeUtils: MomentLocaleUtils
                                        }}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.hireDate ? originalData.hireDate : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                                <div class="col-sm-3">
                                    <FormInput
                                        label="User"
                                        value={user}
                                        target="user"
                                        buttonClick={this.buttonClick}
                                        selectValues={userList}
                                        handleChange={this.handleChange}
                                        readOnly={disableEdit}
                                        isToggledEditForm={toggleFormSelection}
                                        // When enter new form, default original value = id of logged-in user's id
                                        original={originalData.user ? originalData.user : ""}
                                    />
                                </div>

                            </div>
                            <div className="row">
                                <div class="col-sm-3">
                                    <FormInput
                                        label="First Name"
                                        value={firstName}
                                        target="firstName"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        readOnly={disableEdit}
                                        original={originalData.firstName ? originalData.firstName : ""}
                                    />
                                </div>
                                <div class="col-sm-3">
                                    <FormInput
                                        label="Last Name"
                                        value={lastName}
                                        target="lastName"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.lastName ? originalData.lastName : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                                <div class="col-sm-3">
                                    <FormInput
                                        label="working years"
                                        value={workingYears}
                                        target="workingYears"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.workingYears ? originalData.workingYears : ""}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div class="col-sm-3">
                                    <FormInput
                                        label="Phone Number"
                                        value={phoneNum}
                                        target="phoneNum"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.phoneNum ? originalData.phoneNum : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                                <div class="col-sm-3">
                                    <FormInput
                                        label="Email"
                                        value={email}
                                        target="email"
                                        type="email"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.email ? originalData.email : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                                <div class="col-sm-3">
                                    <FormInput
                                        label="Emergency Contact Person"
                                        value={emergencyPerson}
                                        target="emergencyPerson"
                                        type="emergencyPerson"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.emergencyPerson ? originalData.emergencyPerson : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                                <div class="col-sm-3">
                                    <FormInput
                                        label="Emergency Contact Tel"
                                        value={emergencyTel}
                                        target="emergencyTel"
                                        type="emergencyTel"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.emergencyTel ? originalData.emergencyTel : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div class="col-sm-3">
                                    <FormInput
                                        label="UIN/NRIC/FIN"
                                        value={idNumber}
                                        target="idNumber"
                                        type="idNumber"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.idNumber ? originalData.idNumber : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                                <div class="col-sm-3">
                                    <FormInput
                                        label="Gender"
                                        value={gender}
                                        target="gender"
                                        handleChange={this.handleChange}
                                        selectValueName="name"
                                        selectValues={[
                                            { name: "Male", value: "male" },
                                            { name: "Female", value: "female" },
                                        ]}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.gender ? originalData.gender : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                                <div class="col-sm-3 ">
                                    <FormInput
                                        label="Department"
                                        target="department"
                                        value={department}
                                        selectValueName="name"
                                        selectValues={[
                                            { name: "Sales Division", value: "sales" },
                                            { name: "Operations", value: "operations" },
                                            { name: "Admin", value: "admin" },
                                            { name: "Finance", value: "finance" },
                                        ]}
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.department ? originalData.department : ""}
                                        readOnly={disableEdit} />
                                </div>
                                <div class="col-sm-3 ">
                                    <FormInput
                                        label="Position"
                                        target="position"
                                        value={position}
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.position ? originalData.position : ""}
                                        readOnly={disableEdit} />
                                </div>

                            </div>
                            <div className="row">
                                <div class="col-sm-3">
                                    <FormInput
                                        label="Employment Type"
                                        value={employmentType}
                                        target="employmentType"
                                        handleChange={this.handleChange}
                                        selectValueName="name"
                                        selectValues={[
                                            { name: "Local", value: "local" },
                                            { name: "Foreigner", value: "foreigner" },
                                        ]}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.employmentType ? originalData.employmentType : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                                {this.state.employmentType === "local"
                                    ? (<div class="col-sm-9">
                                        <div class="col-sm-4">
                                            <FormInput
                                                label="SC/PR"
                                                value={scpr}
                                                target="scpr"
                                                selectValueName="name"
                                                selectValues={[
                                                    { name: "SC", value: "sc" },
                                                    { name: " PR", value: "pr" },
                                                ]}
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.scpr ? originalData.scpr : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                    </div>)
                                    : (<div class="col-sm-9">
                                        <div className="row">
                                            <div class="col-sm-4">
                                                <FormInput
                                                    label="Passport Number"
                                                    value={passportNo}
                                                    target="passportNo"
                                                    handleChange={this.handleChange}
                                                    isToggledEditForm={toggleFormSelection}
                                                    original={originalData.passportNo ? originalData.passportNo : ""}
                                                    readOnly={disableEdit}
                                                />
                                            </div>
                                            <div class="col-sm-4">
                                                <FormInput
                                                    label="Visit Pass Type"
                                                    value={passType}
                                                    target="passType"
                                                    selectValueName="name"
                                                    selectValues={[
                                                        { name: "EP", value: "ep" },
                                                        { name: "SP", value: "sp" },
                                                        { name: "DP", value: "sp" },
                                                        { name: "WP", value: "wp" },
                                                    ]}
                                                    handleChange={this.handleChange}
                                                    isToggledEditForm={toggleFormSelection}
                                                    original={originalData.passType ? originalData.passType : ""}
                                                    readOnly={disableEdit}
                                                />
                                            </div>
                                            <div class="col-sm-4">
                                                <p style={styleForDate}>Date of Issue</p>
                                                <DayPickerInput
                                                    formatDate={formatDate}
                                                    parseDate={parseDate}
                                                    format="L"
                                                    value={`${formatDate(issueDate, 'L', 'en-SG')}`}
                                                    placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                                    onDayChange={this.handleDayChange}
                                                    dayPickerProps={{
                                                        locale: 'en-SG',
                                                        localeUtils: MomentLocaleUtils
                                                    }}
                                                    isToggledEditForm={toggleFormSelection}
                                                    original={originalData.issueDate ? originalData.issueDate : ""}
                                                />
                                            </div>
                                        </div>

                                    </div>)}

                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <FormInput
                                        label="Address"
                                        value={address}
                                        target="address"
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.address ? originalData.address : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                                <div class="col-sm-12">
                                    <FormInputMultilines
                                        label="Remarks"
                                        value={remarks}
                                        target="remarks"
                                        // rows={4}
                                        handleChange={this.handleChange}
                                        isToggledEditForm={toggleFormSelection}
                                        original={originalData.remarks ? originalData.remarks : ""}
                                        readOnly={disableEdit}
                                    />
                                </div>
                            </div>


                            <div style={{ width: '100%', marginTop: '20px' }}>
                                <AppBar position="static">
                                    <Tabs value={tabValue} onChange={(e, e2) => this.changeTab(e, e2)} aria-label="wrapped label tabs example">
                                        <Tab value="one" label="Leave Details"  {...a11yProps('one')} />
                                        <Tab value="two" label="Payroll Details" {...a11yProps('two')} />

                                    </Tabs>
                                </AppBar>

                                <TabPanel value={tabValue} index="one">
                                    <div className="row">
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="Annual Leave  (days)"
                                                value={annualLeave}
                                                target="annualLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.annualLeave ? originalData.annualLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="Remaining Annual Leave  (days)"
                                                value={remainingAnnualLeave}
                                                target="remainingAnnualLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.remainingAnnualLeave ? originalData.remainingAnnualLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="Sick Leave (days) "
                                                value={sickLeave}
                                                target="sickLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.sickLeave ? originalData.sickLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="Remaining Sick Leave (days) "
                                                value={remainingSickLeave}
                                                target="remainingSickLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.remainingSickLeave ? originalData.remainingSickLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="leave in lieu (days) "
                                                value={inLieuLeave}
                                                target="inLieuLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.inLieuLeave ? originalData.inLieuLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="Remaining leave in lieu (days) "
                                                value={remainingInLieuLeave}
                                                target="remainingInLieuLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.remainingInLieuLeave ? originalData.remainingInLieuLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="Childcare Leave (days) "
                                                value={childcareLeave}
                                                target="childcareLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.childcareLeave ? originalData.childcareLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="Remaining Childcare Leave (days) "
                                                value={remainingChildCareLeave}
                                                target="remainingChildCareLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.remainingChildCareLeave ? originalData.remainingChildCareLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label=" Leave Carried foward (days) "
                                                value={leaveCarriedForward}
                                                target="leaveCarriedForward"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.leaveCarriedForward ? originalData.leaveCarriedForward : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="Reservist Leave (days) "
                                                value={reservistLeave}
                                                target="reservistLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.reservistLeave ? originalData.reservistLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-3">
                                            <FormInput
                                                label="Remaining Reservist Leave (days) "
                                                value={remainingReservistLeave}
                                                target="remainingReservistLeave"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.remainingReservistLeave ? originalData.remainingReservistLeave : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>

                                        {(this.state.passType !== "wp" && this.state.gender === "female") &&
                                            <Fragment>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Maternity Leave (days) "
                                                        value={maternityLeave}
                                                        target="maternityLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.maternityLeave ? originalData.maternityLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Remaining Maternity Leave (days) "
                                                        value={remainingMaternityLeave}
                                                        target="remainingMaternityLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.remainingMaternityLeave ? originalData.remainingMaternityLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                            </Fragment>
                                        }

                                        {(this.state.passType !== "wp" && this.state.gender === "female") &&
                                            <Fragment>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Paternity Leave (days) "
                                                        value={paternityLeave}
                                                        target="paternityLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.paternityLeave ? originalData.paternityLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Remaining Paternity Leave (days) "
                                                        value={remainingPaternityLeave}
                                                        target="remainingPaternityLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.remainingPaternityLeave ? originalData.remainingPaternityLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                            </Fragment>
                                        }

                                        {/* {(this.state.passType !== "wp" && this.state.gender === "male") &&
                                            <Fragment>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Shared Parental Leave (days) "
                                                        value={sharedPaternityLeave}
                                                        target="sharedPaternityLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.sharedPaternityLeave ? originalData.sharedPaternityLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Remaining Shared Parental Leave (days) "
                                                        value={remainingSharedPaternityLeave}
                                                        target="remainingSharedPaternityLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.remainingSharedPaternityLeave ? originalData.remainingSharedPaternityLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                            </Fragment>
                                        }

                                        {this.state.passType !== "wp" &&
                                            <Fragment>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Unpaid Infant Care Leave (days) "
                                                        value={unpaidLeave}
                                                        target="unpaidLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.unpaidLeave ? originalData.unpaidLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Remaining Unpaid Infant Care Leave (days) "
                                                        value={remainingUnpaidLeave}
                                                        target="remainingUnpaidLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.remainingUnpaidLeave ? originalData.remainingUnpaidLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                            </Fragment>
                                        }

                                        {this.state.employmentType === "local" &&
                                            <Fragment>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Adoption Leave (days)"
                                                        value={adoptionLeave}
                                                        target="adoptionLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.adoptionLeave ? originalData.adoptionLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                                <div class="col-sm-3">
                                                    <FormInput
                                                        label="Remaining Adoption Leave (days)"
                                                        value={remainingAdoptionLeave}
                                                        target="remainingAdoptionLeave"
                                                        handleChange={this.handleChange}
                                                        isToggledEditForm={toggleFormSelection}
                                                        original={originalData.remainingAdoptionLeave ? originalData.remainingAdoptionLeave : ""}
                                                        readOnly={disableEdit}
                                                    />
                                                </div>
                                            </Fragment>
                                        } */}

                                    </div>
                                </TabPanel>
                                <TabPanel value={tabValue} index="two">
                                    <div className="row">
                                        <div class="col-sm-4 ">
                                            <FormInput
                                                label="Basic Salary (SGD)"
                                                value={basicSalary}
                                                target="basicSalary"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.basicSalary ? originalData.basicSalary : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>
                                        <div class="col-sm-4 ">
                                            <FormInput
                                                label="Allowance (SGD)"
                                                value={allowance}
                                                target="allowance"
                                                handleChange={this.handleChange}
                                                isToggledEditForm={toggleFormSelection}
                                                original={originalData.allowance ? originalData.allowance : ""}
                                                readOnly={disableEdit}
                                            />
                                        </div>


                                    </div>
                                    {this.state.employmentType === "local"
                                        ? (<div className="row">
                                            <div class="col-sm-4">
                                                <FormInput
                                                    label="CPF Contribution by Employer (%)"
                                                    value={cpfFEmployer}
                                                    target="cpfFEmployer"
                                                    handleChange={this.handleChange}
                                                    isToggledEditForm={toggleFormSelection}
                                                    original={originalData.cpfFEmployer ? originalData.cpfFEmployer : ""}
                                                    readOnly={disableEdit}
                                                />
                                            </div>
                                            <div class="col-sm-4">
                                                <FormInput
                                                    label="CPF Contribution by Employee (%)"
                                                    value={cpfFEmployee}
                                                    target="cpfFEmployee"
                                                    handleChange={this.handleChange}
                                                    isToggledEditForm={toggleFormSelection}
                                                    original={originalData.cpfFEmployee ? originalData.cpfFEmployee : ""}
                                                    readOnly={disableEdit}
                                                />
                                            </div>
                                            <div class="col-sm-4">
                                                <FormInput
                                                    label="SDL (%)"
                                                    value={sdl}
                                                    target="sdl"
                                                    handleChange={this.handleChange}
                                                    isToggledEditForm={toggleFormSelection}
                                                    original={originalData.sdl ? originalData.sdl : ""}
                                                    readOnly={disableEdit}
                                                />
                                            </div>
                                        </div>)
                                        : (<div className="row">
                                            <div class="col-sm-4">
                                                <FormInput
                                                    label="SDL (%)"
                                                    value={sdl}
                                                    target="sdl"
                                                    handleChange={this.handleChange}
                                                    isToggledEditForm={toggleFormSelection}
                                                    original={originalData.sdl ? originalData.sdl : ""}
                                                    readOnly={disableEdit}
                                                />
                                            </div>
                                            <div class="col-sm-4">
                                                <FormInput
                                                    label="LEVY (SGD)"
                                                    value={levy}
                                                    target="levy"
                                                    handleChange={this.handleChange}
                                                    isToggledEditForm={toggleFormSelection}
                                                    original={originalData.levy ? originalData.levy : ""}
                                                    readOnly={disableEdit}
                                                />
                                            </div>


                                        </div>)}

                                </TabPanel>

                            </div>

                        </div>
                        {/* <div className="Left_Toolbar-wrapper">
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
                                        {this.state.status == "draft" &&
                                            this.props.singleUser.data && this.props.singleUser.data.isManager == true
                                            &&

                                            <div onClick={this.onConfirmInvoice}>
                                                <ConfirmationNumberIcon />
                                                <span> Confirm  </span>
                                            </div>

                                        }

                                        <div onClick={this.onBackToListView}>
                                            <ArrowBackIcon />
                                            <span>Back to List Page</span>
                                        </div>
                                    </div>
                                </Toolbar>
                            </AppBar>
                        </div> */}
                    </form>
                </FormWrapper>
            </React.Fragment >
        );
    }
}

const mapStateToProps = ({ accountItemState, adminState, invoiceState, depositState, userState, sessionState }) => {
    const { InvoiceDetails } = invoiceState;
    const { accountItem } = accountItemState;
    const { adminSettingState } = adminState;
    const { adminSetting } = adminSettingState;
    const { picUserList, singleUser } = userState;
    const loginUser = sessionState.authState.user;
    return { accountItem, InvoiceDetails, adminSetting, picUserList, singleUser, loginUser };
};
export default connect(mapStateToProps, {
    getAdminSetting,
    postAdminSetting,
    patchAdminSetting,
    setDeposit,
    patchSingleDeposit,
    getSingleDepositRequest,
    getDepositPdf,
    getDropdownGroup,
    getPicUsers,
    getOneUser
})(AdminSettingFormView);
