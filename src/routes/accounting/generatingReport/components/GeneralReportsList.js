import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
// COMPONENTS
import RecordsList from "Components/RecordsList";
import SelectReportScope from "./SelectReportScope"
import { getGeneratingReport } from "Ducks/generatingReport"

const GeneralReportsList = ({ data, getGeneratingReport }) => {
    const [type, setType] = useState("")
    const [title, setTitle] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [custData, setCustData] = useState({})
    const [accountData, setAccountData] = useState({})
    const [errorMsg, setErrorMsg] = useState("")

    const columns = [
        { label: "ID", name: "id", options: { display: false, filter: false } },
        { label: "Name", name: "name", options: { filter: true } },
        {
            label: "Actions", name: "actions", options: {
                filter: false,
                customBodyRender: (value, tableMeta) => {
                    const nameIndex = columns.findIndex(x => x.name === "name");
                    const pdfOnly = ["General Ledger", "GST Report", "Stock Movement Report", "Customer Statement of Accounts",]
                    const pdfCsvOnly = ["Sales Order Report", "Back Order Report", "Purchase Order Report"]
                    const csvOnly = ["Trial Balance", "Profit & Loss", "Balance Sheet", "Journal Item Report", "Account Journal Report", "Sales Report"]

                    // need to fine tune this part as it is all hardcoded. 
                    if (pdfOnly.includes(tableMeta.rowData[nameIndex]) || csvOnly.includes(tableMeta.rowData[nameIndex])) {
                        return (
                            <Fragment>
                                <button
                                    className="primary_btn"
                                    style={styles.button}
                                    onClick={() => {
                                        setTitle(tableMeta.rowData[nameIndex])
                                        onShowSelectPage()
                                    }}
                                >Get Report
                                </button>
                            </Fragment>
                        )
                    } else if (pdfCsvOnly.includes(tableMeta.rowData[nameIndex])) {
                        return (
                            <Fragment>
                                <button
                                    className="primary_btn"
                                    style={styles.button}
                                    onClick={() => {
                                        setTitle(tableMeta.rowData[nameIndex])
                                        setType('csv')
                                        onPrintCommercialReport(tableMeta.rowData[nameIndex])
                                    }}
                                >CSV Report
                                </button>
                                <button
                                    className="primary_btn"
                                    style={styles.button}
                                    onClick={() => {
                                        setTitle(tableMeta.rowData[nameIndex])
                                        setType('pdf')
                                        onPrintCommercialReport(tableMeta.rowData[nameIndex])
                                    }}
                                >PDF Report
                                </button>
                            </Fragment>
                        )
                    } else return ""
                }
            }
        },

    ]
    const tableOptions = {
        selectableRows: false,
        download: false,
        filter: false,
        print: false,
        viewColumns: false,
    }

    const [isOpenToggle, setIsOpenToggle] = useState(false)
    const onShowSelectPage = () => {
        setIsOpenToggle(!isOpenToggle)
    }

    const onPrintReport = () => {

        let error = false

        if (startDate > endDate) {
            setErrorMsg("Start date cannot be later than end date!")
            error = true
        }

        if (error) { return null } else if (!error) { setErrorMsg("") }

        const getBodyData = {
            startDate: startDate,
            endDate: endDate,
        }


        switch (title) {
            case "General Ledger":
                getBodyData.reportName = "General Ledger";
                getGeneratingReport(getBodyData);
                break;

            case "GST Report":
                getBodyData.reportName = "GST Report";
                getGeneratingReport(getBodyData);
                break;

            case "Stock Movement Report":
                getBodyData.reportName = "Stock Movement Report";
                getGeneratingReport(getBodyData);
                break;

            case "Customer Statement of Accounts":
                getBodyData.reportName = "Customer Statement of Acccounts";
                getBodyData.custId = custData.id;

                // getGeneratingReport(getBodyData);
                break;

            case "Journal Item Report":
                getBodyData.reportName = "Journal Item Report CSV";

                getGeneratingReport(getBodyData);
                break;

            case "Account Journal Report":
                getBodyData.reportName = "Account Journal Report CSV";
                getBodyData.account = accountData.id;

                getGeneratingReport(getBodyData);
                break;

            case "Trial Balance":
                getBodyData.reportName = "Trial Balance Report CSV";
                getBodyData.account = accountData.id;

                getGeneratingReport(getBodyData);
                break;

            case "Profit & Loss":
                getBodyData.reportName = "Profit and Loss CSV";

                getGeneratingReport(getBodyData);
                break;
            case "Balance Sheet":
                getBodyData.reportName = "Balance Sheet CSV";

                getGeneratingReport(getBodyData);
                break;
            case "Sales Report":
                getBodyData.reportName = "Sales Report CSV";
                getBodyData.account = accountData.id;

                getGeneratingReport(getBodyData);
                break;

            case "Sales Order Report":
                switch (type) {
                    case "csv":
                        getBodyData.reportName = "SalesOrderList CSV";
                        getGeneratingReport(getBodyData);
                        break;

                    case "pdf":
                        getBodyData.reportName = "SalesOrderList PDF";
                        getGeneratingReport(getBodyData);
                        break;
                }
                break;

            case "Purchase Order Report":
                switch (type) {
                    case "csv":
                        getBodyData.reportName = "PurchaseOrderList CSV";
                        getGeneratingReport(getBodyData);
                        break;

                    case "pdf":
                        getBodyData.reportName = "PurchaseOrderList PDF";
                        getGeneratingReport(getBodyData);
                        break;
                }
                break;

        }
        onShowSelectPage();

    }

    const onPrintCommercialReport = (report) => {

        if (report === "Back Order Report") {
            const getBodyData = {}
            switch (type) {
                case "csv":
                    getBodyData.reportName = "BackOrderList CSV";
                    getGeneratingReport(getBodyData);
                    break;

                case "pdf":
                    getBodyData.reportName = "BackOrderList PDF";
                    getGeneratingReport(getBodyData);
                    break;
            }
        } else {
            onShowSelectPage()
        }


    }

    return (
        <Fragment>

            <h2 style={{ paddingTop: "15px", paddingLeft: "25px" }}>{title}</h2>
            <div style={{ padding: "1rem", minWidth: "1200px" }}>
                <RecordsList
                    Title="All Down Payments"
                    columns={columns}
                    data={data}
                    options={tableOptions}
                />
            </div>

            {isOpenToggle &&
                <SelectReportScope
                    show={isOpenToggle}
                    handleHide={onShowSelectPage}
                    onPrintReport={onPrintReport}
                    title={title}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    custData={custData}
                    setCustData={setCustData}
                    accountData={accountData}
                    setAccountData={setAccountData}
                    errorMsg={errorMsg}
                />
            }
        </Fragment>

    )

}

const mapStateToProps = ({ generatingReportState }) => {
    return generatingReportState
}


export default connect(mapStateToProps, {
    getGeneratingReport
    // getGeneralLedgerPdf,
    // getGstReportPdf,
    // getSalesOrderReportCsv,
    // getSalesOrderReportPdf, 
    // getBackOrderReportCsv, 
    // getBackOrderReportPdf, 
    // getPurchaseOrderReportCsv, 
    // getPurchaseOrderReportPdf,
    // getStockMovementReportCsv
})(GeneralReportsList)

const styles = {
    button: {
        textAlign: "center",
        float: "none"
    }
}