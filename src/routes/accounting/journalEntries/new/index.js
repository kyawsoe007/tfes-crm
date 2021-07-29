import React, { Component, Fragment } from "react";
import FormWrapper from "Components/Form/Layout/FormWrapper";
import FormInput from "Components/Form/FormInput";
import JournalEntriesList from "../components/JournalEntriesList";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

//icon
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import EmailIcon from '@material-ui/icons/Email';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// Actions
import { getJournals, createJournalEntry, getSingleEntryRequest, updateJournalEntry } from "Ducks/accounting";
import { getQuotationDetails } from "Ducks/quotationtfes";
//import {  getAllFiscalPeriodByMonth } from "Ducks/finance-settings/fiscal-year";
// React Day Picker input
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DayPicker from "react-day-picker";
import { DateUtils } from 'react-day-picker';
import MomentLocaleUtils, {
    formatDate,
    parseDate,
} from 'react-day-picker/moment';
import DialogRoot from "Components/Dialog/DialogRoot";
import JournalPartnerList from "../components/JournalPartnerList";
import JournalAccountList from "../components/JournalAccountList";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { Icon } from "@iconify/react";
import fastReverseButton from "@iconify-icons/emojione-v1/fast-reverse-button";
import fastForwardButton from "@iconify-icons/emojione-v1/fast-forward-button";
import { connect } from "react-redux";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import { amountRounding } from "Helpers/helpers";
import NumberFormat from 'react-number-format';
import { journalEntriesListPage, singleJournalEntries } from "Helpers/accountingURL";

import moment from 'moment';
import 'moment/locale/en-SG';
// import { type } from "jodit/src/core/helpers";

const PAGE_MAX = 10;

class JournalEntriesFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleFormSelection: true,
            onEditJournal: false,
            toggle: false,
            element: null,
            target: "",
            errorMsg: "",
            entryDate: new Date(),
            remarks: '',
            status: '',
            journalEntryNum: "",
            journal: [],
            journalValue: "",
            reference: '',
            period: '',
            isOpening: false,
            disableEdit: false,
            lines: [{
                id: '',
                reference: '',
                name: '',
                partner: '',
                account: '',
                account_name: '',
                dueDate: '',
                debit: 0,
                credit: 0,
                amountCurrency: 0,
                currency: '',
                taxAmount: 0,
                reconcile: '',
                partialReconcile: '',
            }],
            totalDebit: 0,
            totalCredit: 0,
            page: 1,
            index: 0,
            journalItems: [],
            view: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleLineChange = this.handleLineChange.bind(this);
        this.deleteNewLine = this.deleteNewLine.bind(this);
        this.getInfoPartner = this.getInfoPartner.bind(this);
        this.getInfoAccount = this.getInfoAccount.bind(this);
        this.onPrintPdf = this.onPrintPdf.bind(this);
        this.onConfirmJournalEntry = this.onConfirmJournalEntry.bind(this);
    }

    onSubmit = () => {
        const data = {
            ...this.state,
            journalItems: this.state.lines
        };

        delete data.element;
        delete data.index;
        delete data.filter;
        delete data.journal;
        delete data.lines;
        delete data.onEditJournal;
        delete data.page;
        delete data.toggle;
        delete data.target;
        delete data.errorMsg;
        delete data.toggleFormSelection;

        if (data.status === '') { data.status = 'draft' }

        let tmpTotalDebit = 0; let tmpTotalCredit = 0;
        this.state.lines.forEach(line => {
            tmpTotalDebit += parseFloat(line.debit);
            tmpTotalCredit += parseFloat(line.credit);
        });
        tmpTotalDebit = Math.round(tmpTotalDebit * 100)/100;
        tmpTotalCredit = Math.round(tmpTotalCredit * 100)/100;
        if ( tmpTotalCredit  !== tmpTotalDebit) {
            this.setState({
                errorMsg: "Total Debit and Credit do not match!"
            })
        }

        else if (this.state.onEditJournal) {
            this.props.updateJournalEntry(data);
            this.setState({errorMsg: ""});
        } else {
            this.props.createJournalEntry(data);
            this.setState({errorMsg: ""});
        }
        this.setState({
            disableEdit: true,
            toggleFormSelection: true,
            view: true,
        })
    };

    componentDidMount() {
        this.props.getJournals();
        this.props.getQuotationDetails();
        //this.props.getAllFiscalPeriodByMonth()

        const id = this.props.match.params.id;
        if (id) {
            this.props.getSingleEntryRequest(id);
        }
        if (this.props.journalEntry.data && this.props.journalEntry.data.id) {
            this.resetTotalState();
        }

        if (typeof this.props.location.state !== 'undefined') {
            if (this.props.location.state.view) {
                let view = this.props.location.state.view
                this.resetTotalState(true)
                this.setState({
                    view: view,
                })

            }
        }

        // If this is in view form, set disableEdit fields
        if (this.props.location.state && this.props.location.state.view == true) {
            if (
                this.state.latestQuotation === false ||
                this.state.isConverted === true
            ) {
                this.setState({
                    disableEdit: true,
                    view: true
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.journalEntry.data !== this.props.journalEntry.data) {
            if (this.props.journalEntry.data && this.props.journalEntry.data._id) {
                if (
                    this.props.match.params.id
                ) {
                    this.props.history.push(
                        singleJournalEntries(this.props.journalEntry.data._id),
                    )
                }
                this.resetTotalState(true);
            }
        }
    }

    resetTotalState(editStatus) {
        // console.log(editStatus);



        const journalEntry = this.props.journalEntry.data;
        let newState = {
            onEditJournal: editStatus,
            id: journalEntry._id ? journalEntry._id : '',
            journalEntryNum: journalEntry.journalEntryNum ? journalEntry.journalEntryNum : '',
            reference: journalEntry.reference ? journalEntry.reference : '',
            periodName: journalEntry.periodName ? journalEntry.periodName : '',
            remarks: journalEntry.remarks ? journalEntry.remarks : '',
            journalValue: journalEntry.journalValue ? journalEntry.journalValue : '',
            entryDate: journalEntry.entryDate,
            isOpening: journalEntry.isOpening,
            journalItems: journalEntry ? journalEntry.journalItems : [],
            // lines: editStatus ? journalEntry.journalItems ? journalEntry.journalItems : [] : [{
            //     id: '',
            //     reference: '',
            //     name: '',
            //     partner: '',
            //     account: '',
            //     account_name: '',
            //     dueDate: '',
            //     debit: 0,
            //     credit: 0,
            //     amountCurrency: 0,
            //     currency: '',
            //     taxAmount: 0,
            //     reconcile: '',
            //     partialReconcile: '',
            // }],
            status: journalEntry.status ? journalEntry.status : '',
            totalDebit: journalEntry.totalDebit,
            totalCredit: journalEntry.totalCredit,
            toggleFormSelection: true,
        };

        // v Make a deep copy of the journalItems by adding the values into a NEW array named lines
        let lines = [];
        if (journalEntry.journalItems) {
            for (let i = 0; i < journalEntry.journalItems.length; i++) {
                let item = { ...journalEntry.journalItems[i] };
                lines.push(item);
            }
        }
        newState.lines = lines;

        newState.lines.forEach(line => {
            line.debit = amountRounding(2, line.debit);
            line.credit = amountRounding(2, line.credit);
            line.amountCurrency = amountRounding(2, line.amountCurrency);
        })

        this.setState({
            ...this.state,
            ...newState,
        })

        if (newState.status == "confirmed" || newState.status == "cancelled"){
            this.setState({ disableEdit: true })
        }
    }

    checkDisabled() {
        if (this.state.disableEdit == true) {
            return false
        } else {
            return true
        }
    }

    onChangeToEdit = () => {
        this.setState({
            disableEdit: false,
            view: false
        })
    }

    handleChange = (field, value) => {
        this.setState({
            [field]: value,
        })
    };

    onConfirmJournalEntry() {
        if (this.state.id) {
            if (!this.state.paymentNo) {
                const data = {
                    ...this.state,
                    status: 'confirmed',
                };
                this.props.updateJournalEntry(data)
            } else {
                alert('This Journal entry was already confirmed')
            }
        } else {
            alert('You must save this Journal entry in order to execute confirm')
        }
    }

    onPrintPdf = () => { console.log('print pdf') };

    onBackJournalList() {
        // this.props.history.push('/app/accounting/journalEntries')
    }

    deleteNewLine(index) {
        let lines = [...this.state.lines];
        lines.splice(index, 1);
        this.calculateTotal(lines);
        const totalPages = Math.ceil(lines.length / PAGE_MAX);
        let page = this.state.page;
        if (this.state.page > totalPages) {
            page--
        }
        this.setState({
            lines: lines,
            page: page
        })
    }

    handleLineChange(field, value, key) {
        if (field === "debit" || field === "credit" || field === "amountCurrency" || field === "taxAmount" ) {
            if (value.length >= 1 && value.match(/[a-z\s]/i) ) {
              return null
            } 
          }
        
        // sets minimum values 
        if (field === "debit" || field === "credit" || field === "amountCurrency" || field === "taxAmount") {
            if (value === "" || value <= 0) {
                value = 0
            }
        }

        let lines = [...this.state.lines];
        // this section manually checks if there are decimals and prevents users from keying in more than 2 decimal places 
        /*
        if (field === "debit" || field === "credit" || field === "amountCurrency" || field === "taxAmount") {
            let newValue = value.split('.');
            if (newValue.length > 1) {
                value = `${newValue[0]}.${newValue[1] ? newValue[1].slice(0,2) : ""}`
            }
        }
        */

        lines[key][field] = value;
        this.calculateTotal(lines);
        this.setState({
            lines: lines,
        })
    }

    calculateTotal(lines) {
        let totalCredit = 0;
        let totalDebit = 0;

        lines.forEach(line => {
            totalDebit += parseFloat(line.debit);
            totalCredit += parseFloat(line.credit);
        });
        this.setState({
            ...this.state,
            totalCredit: totalCredit,
            totalDebit: totalDebit
        })
    }

    buttonClick = (target, index) => {
        this.setState({
            index: index,
            toggle: true,
            element: target,
            target: 'partner',
            filter: {
                ...this.state.filter,
                [target]: this.state[target]
            }
        });
        const filt = {
            [target]: this.state[target],
        };
    };

    accountClick = (target, index) => {
        this.setState({
            index: index,
            toggle: true,
            element: target,
            target: 'account',
            filter: {
                ...this.state.filter,
                [target]: this.state[target]
            }
        });
    };

    getInfoPartner(id) {
        const Partners = this.props.journalPartnerFiltered.data;
        const lines = this.state.lines;
        Partners.map((source) => {
            if (source._id === id) {
                lines.forEach((line, index) => {
                    if (index === this.state.index) {
                        line.partner = source.name
                    }
                })
            }
        });

        this.setState({
            ...this.state,
            toggle: false,
            lines: lines
        })
    }

    getInfoAccount(id) {
        // console.log(id);
        const Accounts = this.props.accountItem.data;
        const lines = this.state.lines;
        Accounts.map((source) => {
            if (source._id === id) {
                // console.log(source);
                lines.forEach((line, index) => {
                    if (index === this.state.index) {
                        line.account = source._id,
                            line.account_name = source.accountName
                    }
                })
            }
        });

        this.setState({
            ...this.state,
            toggle: false,
            lines: lines
        })
    }

    addNewLine = () => {
        let lines = [...this.state.lines];
        lines.push({
            id: '',
            reference: '',
            name: '',
            partner: '',
            account: '',
            account_name: '',
            dueDate: '',
            debit: 0,
            credit: 0,
            amountCurrency: 0,
            currency: '',
            taxAmount: 0,
            reconcile: '',
            partialReconcile: '',
        });

        let page = Math.ceil(lines.length / PAGE_MAX);
        this.setState({
            lines: lines,
            page: page
        })
    };

    forwardToNextQty = () => {
        let totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);
        if (totalPages !== this.state.page) {
            this.setState({
                ...this.state,
                page: this.state.page + 1
            })
        }
    };

    reverToPreQty = () => {
        if (this.state.page !== 1) {
            this.setState({
                ...this.state,
                page: this.state.page - 1
            })
        }
    };

    restartToggle = () => {
        this.setState({
            toggle: false,
        });
    };

    showStatus() {
        if (this.state.status == "confirmed") { return "【 Confirmed 】" }
        if (this.state.status == "draft") { return "【 Draft 】" }
        if (this.state.status == "cancelled") { return "【 Cancelled 】" }
        else { return " " }
    }

    render() {
        const { toggleFormSelection, entryDate, journal, journalValue, disableEdit, remarks, journalEntryNum, reference, periodName, isOpening, page, journalItems, view } = this.state;
        // console.log('to', toReview)
        const totalPages = Math.ceil(this.state.lines.length / PAGE_MAX);
        return (
            <Fragment>
                <FormWrapper
                    onSave={this.onSubmit}
                    centerTitle={this.state.onEditJournal ? 'Update Journal Entry Page' : 'Create New Journal Entry Page'}
                    edit="journal"
                    promptMessage={this.showStatus()}
                    disabled={this.checkDisabled()}
                    onChangeToEdit={this.onChangeToEdit}
                    title="Back to Journal Entries List"
                    listRedirect={journalEntriesListPage}
                    showEditButton={this.state.disableEdit && this.state.status !== "confirmed" && this.state.status !== 'cancelled'}
                >
                    <form autoComplete="off" className={(this.state.disableEdit || this.state.view) && 'uneditable'}>

                        {this.state.errorMsg && (<h3 className="text-danger text-center mb-20 ml-75">{this.state.errorMsg}</h3>)}
                        <div className="row" style={{ paddingLeft: "50px" }}>
                            <div className="col-sm-3 d-flex flex-column" style={{ borderLeft: "1px solid #e9e8e8" }}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3>Journal Entries Num :</h3>
                                    </div>
                                    <div className="col-sm-6">
                                        <FormInput
                                            label=""
                                            value={journalEntryNum}
                                            target="journalEntryNum"
                                            handleChange={this.handleChange}
                                            readOnly={true}
                                            isToggledEditForm={toggleFormSelection}
                                            original={this.props.journalEntry.data.journalEntryNum ? this.props.journalEntry.data.journalEntryNum : ""}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3>Reference  :</h3>
                                    </div>
                                    <div className="col-sm-6">
                                        <FormInput
                                            label=""
                                            value={reference}
                                            target="reference"
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.journalEntry.data.reference ? this.props.journalEntry.data.reference : ""}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3>Period  :</h3>
                                    </div>
                                    <div className="col-sm-6">
                                        <FormInput
                                            label=""
                                            value={periodName}
                                            target="period"
                                            handleChange={this.handleChange}
                                            isToggleEditForm={true}
                                            readOnly={true}
                                            original={this.props.journalEntry.data.periodName ? this.props.journalEntry.data.periodName : ""}

                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-1"></div>
                            <div class="col-sm-3" style={{ borderLeft: "1px solid  #e9e8e8" }}>
                                <div className="row">
                                    <div className="col-sm-4 mt-5">
                                        <h3>Remarks :</h3>
                                    </div>
                                    <div className="col-sm-8">
                                        <FormInput
                                            label=""
                                            value={remarks}
                                            target="remarks"
                                            multiline rows={4}
                                            handleChange={this.handleChange}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.journalEntry.data.remarks ? this.props.journalEntry.data.remarks : ""} />
                                    </div>
                                </div>
                            </div>
                            <div className=" col-sm-1"></div>
                            <div className="col-sm-3" style={{ borderLeft: "1px solid  #e9e8e8" }}>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3>Journal  :</h3>
                                    </div>
                                    <div className="col-sm-6">
                                        <FormInput
                                            label=""
                                            value={journalValue}
                                            target="journalValue"
                                            handleChange={this.handleChange}
                                            selectValueName="name"
                                            selectValueKey="_id"
                                            selectValues={this.props.journals.data}
                                            isToggledEditForm={toggleFormSelection}
                                            readOnly={disableEdit}
                                            original={this.props.journalEntry.data.journalValue ? this.props.journalEntry.data.journalValue : ""}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3>Date:</h3>
                                    </div>
                                    <div className="col-sm-6">
                                        <DayPickerInput
                                            formatDate={formatDate}
                                            parseDate={parseDate}
                                            value={`${formatDate(entryDate, 'L', 'en-SG')}`}
                                            selectedDay={entryDate}
                                            placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                                            onDayChange={(e) => this.setState({ entryDate: e })}
                                            style={{ zIndex: "999" }}
                                            dayPickerProps={{
                                                locale: 'en-SG',
                                                localeUtils: MomentLocaleUtils,
                                            }}
                                            readOnly={disableEdit}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <h3>Is Opening:</h3>
                                    </div>
                                    <div className="col-sm-6">
                                        <input onChange={(e) => this.handleChange(e.target.name, e.target.checked)}
                                            name="isOpening"
                                            defaultChecked={isOpening}
                                            checked={isOpening}
                                            value={isOpening}
                                            type="checkbox"
                                            style={{ width: "20px", height: "15px", marginTop: "5px" }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className=" col-sm-1"></div>
                        </div>
                        <hr />

                        <h2 style={{ color: "#2B4DA0", width: "100%", textAlign: "center", marginTop: "15px" }}>Journal Items</h2>

                        <div className="JournalEntriesList">
                            <JournalEntriesList
                                lines={this.state.lines}
                                totalDebit={this.state.totalDebit}
                                totalCredit={this.state.totalCredit}
                                page={this.state.page}
                                deleteLine={this.deleteNewLine}
                                handleLineChange={this.handleLineChange}
                                buttonClick={(target, index) => this.buttonClick(target, index)}
                                accountClick={(target, index) => this.accountClick(target, index)}
                                readOnly={this.state.disableEdit}
                                isToggledEditForm={toggleFormSelection}
                                originalData={this.props.journalEntry.data.journalItems}
                                currencyList={this.props.QuotationDetails.data ? this.props.QuotationDetails.data.currency : []}
                            />
                        </div>

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
                            <p>{page} of {totalPages}</p>
                            <div>
                                <Icon
                                    icon={fastForwardButton}
                                    className="fastForwardButton"
                                    onClick={this.forwardToNextQty}
                                />
                            </div>
                            <p>Next Qty #</p>
                        </div>
                        <div className="boundary-line" />

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
                                        {this.state.status != "confirmed"
                                            && <div onClick={this.onConfirmJournalEntry}>
                                                <ConfirmationNumberIcon />
                                                <span> Confirm Journal Entry </span>
                                            </div>}

                                        {/* <div >
                                    <EmailIcon />
                                    <span> Email </span>
                                  </div> */}

                                    </div>
                                </Toolbar>
                            </AppBar>
                        </div>
                    </form>
                </FormWrapper>

                <DialogRoot show={this.state.toggle} handleHide={this.restartToggle} size={"lg"}>
                    {this.state.target === "partner" ? (
                        <div>
                            <h3>Partner List</h3>
                            <JournalPartnerList
                                getInfo={this.getInfoPartner} />
                        </div>) : (this.state.target === 'account')
                        ? (<div>
                            <h3>Account List</h3>
                            <JournalAccountList
                                getInfo={this.getInfoAccount} />
                        </div>) : null}
                </DialogRoot>
            </Fragment>
        )
    }
}

const mapStateToProps = ({ accountingState, financeState, accountItemState, quotationtfesState }) => {
    const { QuotationDetails } = quotationtfesState;
    const { journalState } = accountingState;
    const { journals, journalPartnerFiltered, journalEntry } = journalState;
    const { accountItem } = accountItemState;

    return { journals, accountItemState, journalPartnerFiltered, accountItem, journalEntry, QuotationDetails };
};
export default connect(mapStateToProps, { getJournals, createJournalEntry, getSingleEntryRequest, updateJournalEntry, getQuotationDetails })(JournalEntriesFormView);
