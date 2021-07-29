import React, { Component, Fragment } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormInput from "Components/Form/FormInput";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const StyledTableCell = withStyles((theme) => ({
  head: {
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


class ContainerList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { packagingType, deleteLine, handleLineChange, addNewLine, packinglistStatus, remark, handlePackingInformationChange, originalRemark, originalData } = this.props;
    let data = [];
    packagingType.map((line, index) => data.push(line));
    return (
      <Fragment>
        <div style={{ marginTop: "15px", maxWidth: "1000px" }} >
          <h2 style={{ color: "#2B4DA0", width: "100%", textAlign: "center", marginBottom: "30px" }}>Packing</h2>
          <div style={{ backgroundColor: "#fff", borderRadius: "15px", paddingTop: "65px" }}>
            <Table style={{ width: "100%" }}>
              <TableHead >
                <TableRow >
                  <StyledTableCell style={{ backgroundColor: "#254065" }}>Pack</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#254065" }}>Measurement</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#254065" }}>Weight</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#254065" }}>COO</StyledTableCell>
                  <StyledTableCell style={{ backgroundColor: "#254065" }}>HS Code</StyledTableCell>
                  {/* <StyledTableCell style={{backgroundColor:"#254065"}}> Qty</StyledTableCell> */}
                  {
                    packinglistStatus !== 'completed' &&
                    <StyledTableCell style={{ backgroundColor: "#254065" }}>Delete</StyledTableCell>
                  }
                </TableRow>
              </TableHead>

              <TableBody>
                {data.map((row, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="right">
                      <FormInput
                        placeholder="type"
                        handleChange={handleLineChange}
                        keys={index}
                        value={row.container}
                        target="container"
                        isToggledEditForm={true}
                        original={originalData[index] && originalData[index].container ? originalData[index].container : ""}
                      // style={{outline:"none",border:0,padding:0}}
                      // disabled={packinglistStatus === 'completed' ? true : false}
                      />

                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <FormInput
                        placeholder="measurement"
                        handleChange={handleLineChange}
                        keys={index}
                        value={row.measurement}
                        target="measurement"
                        isToggledEditForm={true}
                        original={originalData[index] && originalData[index].measurement ? originalData[index].measurement : ""}
                      // disabled={packinglistStatus === 'completed' ? true : false}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <FormInput
                        placeholder="Weight"
                        handleChange={handleLineChange}
                        keys={index}
                        value={row.weight}
                        target="weight"
                        isToggledEditForm={true}
                        original={originalData[index] && originalData[index].weight ? originalData[index].weight : ""}
                      // disabled={packinglistStatus === 'completed' ? true : false}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <FormInput
                        placeholder="COO"
                        handleChange={handleLineChange}
                        keys={index}
                        value={row.cooCode}
                        target="cooCode"
                        isToggledEditForm={true}
                        original={originalData[index] && originalData[index].cooCode ? originalData[index].cooCode : ""}
                      // disabled={packinglistStatus === 'completed' ? true : false} 
                      />
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <FormInput
                        placeholder="HS Code"
                        handleChange={handleLineChange}
                        keys={index}
                        value={row.hsCode}
                        target="hsCode"
                        isToggledEditForm={true}
                        original={originalData[index] && originalData[index].hsCode ? originalData[index].hsCode : ""}
                      // disabled={packinglistStatus === 'completed' ? true : false} 
                      />
                    </StyledTableCell>
                    {
                      packinglistStatus !== 'completed' &&
                      <StyledTableCell align="right">
                        <div className="journal-delete-btn">
                          <HighlightOffIcon
                            className="tableOffIcon"
                            onClick={() => deleteLine(index)} />
                        </div>
                      </StyledTableCell>
                    }

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            {
              // packinglistStatus !== 'completed' &&
              <div className="row quotation-btn">
                <AddCircleOutlineIcon
                  className="tableAddIcon"
                  onClick={addNewLine}
                />
              </div>
            }

          </div>
          {/* FREE TEXT SECTION */}
          <div style={{ marginTop: "15px" }}>
            <Table>
              <colgroup>
                <col width="100%" />
              </colgroup>
              <TableHead  >
                <TableRow>
                  <StyledTableCell style={{ backgroundColor: "#254065" }}>Packing Information</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableCell>
                  <FormInput
                    placeholder="Packing Information"
                    handleChange={handlePackingInformationChange}
                    target="remark"
                    value={remark}
                    multiline
                    rows={4}
                    isToggledEditForm={true}
                    original={originalRemark}
                  // disabled={packinglistStatus === 'completed' ? true : false} 
                  />
                </StyledTableCell>
              </TableBody>
            </Table>

          </div>
        </div>
      </Fragment>
    );
  }

}
export default ContainerList
