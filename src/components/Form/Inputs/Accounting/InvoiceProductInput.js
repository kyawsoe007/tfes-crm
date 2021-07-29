import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import FormInput from "Components/Form/FormInput";
import FormMultiInput from "Components/Form/FormMultiInput";
import AmountInput from "Components/Form/Inputs/AmountInput";
import DatePickerInput from "Components/Form/Pickers/DatePicker";

import EditableInput from "Components/Profile/Details/EditableInput";

const TAX_RATE = 0.07;

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
}));

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

export default function SpanningTable(props) {
  const classes = useStyles();

  const {
    products,
    quotation,
    handleChange,
    handleAdd,
    handleRemove,
    restart,
    taxTable,
    disabled,
    edit
  } = props;

  // description, quantity, price, tax option, tax %, discount, total amount,
  return (
    <Paper
      className={classes.root}
      style={{ marginBottom: 25, boxShadow: "none", borderRadius: 0 }}
    >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Tax</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((row, key) => (
            <TableRow key={key}>
              <TableCell>{row.description}</TableCell>
              <TableCell align="right">{`${row.quantity}`}</TableCell>
              <TableCell align="right">{`$${row.price}`}</TableCell>
              <TableCell align="right">{`${row.tax_rate}%`}</TableCell>
              <TableCell align="right">{`$${row.discount}`}</TableCell>
              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={3} rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">
              ${ccyFormat(quotation.subtotal)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}>Tax</TableCell>
            <TableCell align="right">
              ${ccyFormat(quotation.tax_amount)}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">
              ${ccyFormat(quotation.totalAmt)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}
