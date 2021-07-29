import React, { Component, Fragment } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormInput from "Components/Form/FormInput";
import { BorderLeft } from "@material-ui/icons";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import moment from 'moment';
import 'moment/locale/en-SG';
import { amountRounding } from "Helpers/helpers";
import NumberFormat from 'react-number-format';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


// const rows = [
//   createData("0000121481", "GST", "SINGAPORE 123 PTE LTD", "1110224 Tax Received", "12/09/2020", 1234.00 ,0.00," SGD" , "123123 test " ,0.00,"Balannced", "None","None"),
//   createData("0000121481", "/", "SINGAPORE Test PTE LTD", "1110224 Tax Received", "-", 0.00 ,1234.00," SGD" , "123123 test " ,0.00,"Balannced", "None","None"),
// ];

function createData(invoice, name, partner, account, dueDate, debit, credit, amountCurrency, currency, taxAmount, tbAmount, status, reconcile, partialReconcile) {
  return { invoice, name, partner, account, dueDate, debit, credit, amountCurrency, currency, taxAmount, tbAmount, status, reconcile, partialReconcile };
}

const PAGE_MAX = 10;

class JournalEntriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { lines, page, deleteLine, handleLineChange, buttonClick, accountClick, readOnly, totalCredit, totalDebit, currencyList, originalData, isToggledEditForm } = this.props;

    let data = [];
    let original = [];
    lines.map((line, index) => {
      if (index >= (page - 1) * PAGE_MAX && index < page * PAGE_MAX) {
        data.push(line);
        if (originalData && index < originalData.length) {
          original.push(originalData[index]);
        }
      }
    });

    return (
      <Fragment>
        <div style={{ marginBottom: "15px", borderLeft: "1px solid #e9e8e8", borderRight: "1px solid #e9e8e8" }} >
          <TableHead>
            <TableRow >
              <StyledTableCell style={{ backgroundColor: "#254065" }}>Reference</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}>Name</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}>Partner</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}>Account</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}>Due date</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}> Debit</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}>Credit </StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}>Amount Currency </StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}>Currency </StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}> Tax Amount</StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#254065" }}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => {
              let index = i + (page - 1) * PAGE_MAX;
              return (<StyledTableRow key={index}>
                <StyledTableCell align="right">
                  {/* {row.invoice} */}
                  <FormInput
                    placeholder="Reference"
                    handleChange={handleLineChange}
                    keys={index}
                    value={row.reference}
                    target="reference"
                    // style={{ outline: "none", border: 0, padding: 0 }}
                    readOnly={readOnly}
                    isToggledEditForm={isToggledEditForm}
                    original={original[index] ? original[index].reference : ""}
                  />
                </StyledTableCell>

                <StyledTableCell align="right">
                  {/* {row.name} */}
                  <FormInput
                    placeholder="Name"
                    handleChange={handleLineChange}
                    keys={index}
                    value={row.name}
                    target="name"
                    readOnly={readOnly} 
                    isToggledEditForm={isToggledEditForm}
                    original={original[index] ? original[index].name : ""}/>
                </StyledTableCell>

                <StyledTableCell align="right">
                  {/* {row.partner} */}
                  <FormInput
                    placeholder="Partner"
                    onClick={() => buttonClick('partner', index)}
                    keys={index}
                    value={row.partner}
                    target="partner"
                    readOnly={readOnly} 
                    isToggledEditForm={isToggledEditForm}
                    original={original[index] ? original[index].partner : ""}/>
                </StyledTableCell>

                <StyledTableCell align="right">
                  {/* {row.account} */}
                  <FormInput
                    placeholder="Account"
                    onClick={() => accountClick('account', index)}
                    keys={index}
                    value={row.account_name}
                    target="account_name"
                    readOnly={readOnly} 
                    isToggledEditForm={isToggledEditForm}
                    original={original[index] ? original[index].account_name : ""}/>
                </StyledTableCell>

                <StyledTableCell align="right">
                  {/* {row.dueDate} */}
                  <DayPickerInput
                    formatDate={formatDate}
                    parseDate={parseDate}
                    value={`${formatDate(row.dueDate ? row.dueDate : new Date(), 'L', 'en-SG')}`}
                    format="L"
                    selectedDay={row.dueDate}
                    placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                    onDayChange={(e) => handleLineChange("dueDate", e, index)}
                    dayPickerProps={{
                      locale: 'en-SG',
                      localeUtils: MomentLocaleUtils,
                    }}
                    readOnly={readOnly}
                  />
                </StyledTableCell>

                <StyledTableCell align="right">
                  {/* {row.debit} */}
                  {/* <FormInput  placeholder="00.00" handleChange={handleLineChange} value={row.debit} keys={index}target="debit" >  */}
                  <FormInput
                    placeholder="00.00"
                    handleChange={handleLineChange}
                    value={row.debit}
                    keys={index}
                    target="debit"
                    readOnly={readOnly}
                    isToggledEditForm={isToggledEditForm}
                    original={original[index] ? amountRounding(2, original[index].debit) : 0.00}>
                  </FormInput>
                </StyledTableCell>

                <StyledTableCell align="right">
                  {/* {row.credit} */}
                  <FormInput
                    placeholder="00.00"
                    handleChange={handleLineChange}
                    keys={index}
                    value={row.credit}
                    target="credit"
                    readOnly={readOnly}
                    isToggledEditForm={isToggledEditForm}
                    original={original[index] ? amountRounding(2, original[index].credit) : 0.00}>
                  </FormInput>
                </StyledTableCell>

                <StyledTableCell align="right">
                  {/* {row.amountCurrency} */}
                  <FormInput
                    placeholder="00.00"
                    handleChange={handleLineChange}
                    keys={index}
                    value={row.amountCurrency}
                    target="amountCurrency"
                    readOnly={readOnly} 
                    isToggledEditForm={isToggledEditForm}
                    original={original[index] ? amountRounding(2, original[index].amountCurrency) : 0.00}/>
                </StyledTableCell>

                <StyledTableCell align="right">
                  {/* {row.currency} */}
                  <FormInput
                    // type="text"
                    placeholder="00.00"
                    handleChange={handleLineChange}
                    keys={index}
                    value={row.currency}
                    target="currency"
                    selectValueKey="id"
                    selectValueName="name"
                    selectValues={currencyList}
                    readOnly={readOnly} 
                    isToggledEditForm={isToggledEditForm}
                    original={original[index] ? original[index].currency: ""}/>
                </StyledTableCell>

                <StyledTableCell align="right">
                  {/* {row.taxAmount} */}
                  <FormInput
                    placeholder="00.00"
                    handleChange={handleLineChange}
                    keys={index}
                    value={row.taxAmount}
                    target="taxAmount"
                    readOnly={readOnly} 
                    isToggledEditForm={isToggledEditForm}
                    original={original[index] ? original[index].taxAmount : 0}/>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <div className="journal-delete-btn">
                    <HighlightOffIcon
                      className="tableOffIcon"
                      onClick={() => deleteLine(index)} />
                  </div>
                </StyledTableCell>
              </StyledTableRow>)
            }
            )}
          </TableBody>
          <TableBody>
            <StyledTableRow >
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }} ></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }}></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }}></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }}></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }}>TOTAL</StyledTableCell>
              {/* <StyledTableCell style={{backgroundColor:"#c0c0c0" ,fontWeight:"bolder", }}>{totalDebit} </StyledTableCell>
                <StyledTableCell style={{backgroundColor:"#c0c0c0" ,fontWeight:"bolder", }} >{totalCredit}</StyledTableCell> */}
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }}><NumberFormat value={amountRounding(2, totalDebit)} displayType={'text'} thousandSeparator={true} /></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }} ><NumberFormat value={amountRounding(2, totalCredit)} displayType={'text'} thousandSeparator={true} /></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }}></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }}></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }}></StyledTableCell>
              <StyledTableCell style={{ backgroundColor: "#c0c0c0", fontWeight: "bolder", }} ></StyledTableCell>
            </StyledTableRow>

          </TableBody>


        </div>
      </Fragment>
    );
  }

}
export default JournalEntriesList
