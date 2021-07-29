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
      style={{ boxShadow: "none", borderRadius: 0 }}
    >
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Tax Options</TableCell>
            <TableCell align="right">Tax</TableCell>
            <TableCell align="right">Discount</TableCell>
            <TableCell align="right">Total Amount</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((row, key) => (
            <TableRow key={key}>
              <TableCell>
                <FormInput
                  // label="Description"
                  value={row.description}
                  // required={!row.description}
                  target="description"
                  keys={key}
                  handleChange={handleChange}
                  style={{ margin: 0, padding: 0 }}
                />
              </TableCell>
              <TableCell align="right">
                <AmountInput
                  value={row.quantity}
                  // required={!row.quantity}
                  nodollar
                  target="quantity"
                  keys={key}
                  handleChange={handleChange}
                  style={{ margin: 0, padding: 0 }}
                />
              </TableCell>
              <TableCell align="right">
                <AmountInput
                  value={row.price}
                  // required={!row.price}
                  target="price"
                  // nodollar
                  keys={key}
                  handleChange={handleChange}
                  style={{ margin: 0, padding: 0 }}
                />
              </TableCell>

              <TableCell align="right">
                <FormMultiInput
                  value={row.tax_id}
                  // required={!row.tax_id}
                  selectValues={taxTable}
                  target="tax_id"
                  keys={key}
                  handleChange={handleChange}
                  style={{ margin: 0, padding: 0 }}
                />
              </TableCell>

              <TableCell align="right">
                <FormInput
                  disabled={true}
                  value={`${row.tax_rate}%`}
                  style={{ margin: 0, padding: 0 }}
                />
              </TableCell>

              <TableCell align="right">
                <AmountInput
                  value={row.discount}
                  target="discount"
                  keys={key}
                  handleChange={handleChange}
                  style={{ margin: 0, padding: 0 }}
                  // onChange={e => {
                  //   console.log(e.target.value)
                  //   handleChange("price", e.target.value, key)
                  // }}
                />
              </TableCell>

              <TableCell align="right">{`$${row.amount}`}</TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell colSpan={4} rowSpan={3} />
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
