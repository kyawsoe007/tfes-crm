import React, { Component } from "react";
import {connect} from "react-redux";

import ServerRecordsList from "Components/ServerRecordsList";
import { listOptions, getDateTime } from "Helpers/helpers";
import * as url from "Helpers/warehouseURL";
import MomentLocaleUtils, {
    formatDate,
    parseDate,
  } from 'react-day-picker/moment';
import DayPickerInput from "react-day-picker/DayPickerInput";
import DialogRoot from 'Components/Dialog/DialogRoot';
import FormWrapper from 'Components/Form/Layout/FormWrapper'
import StyledCheckbox from "Components/Form/StyledCheckbox";
import FormInput from 'Components/Form/FormInput';
import Button from "@material-ui/core/Button";
import { stockListPage } from 'Helpers/warehouseURL';
import moment from 'moment';
import 'moment/locale/en-SG';
import { amountRounding } from "Helpers/helpers";

//import Ducks
import { getMoveLines, saveOperationForm, getFilterMoves } from "Ducks/stocktfes";

class StockOperation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            operationId: '',
            operationNo: "M0001",
            moveNo: "PO0001",
            lines: [],
            status: "",
            toggle: false
        }
        this.saveOperation = this.saveOperation.bind(this);
    }

    componentDidMount() {
        const operationId = this.props.match.params.id;
        console.log(this.props.filteredStockList);
        const data = this.props.filteredStockList.tableData.find(item => item.id === operationId);
        if(data){
            console.log(data);
            this.setState({
                operationNo: data.moveNo,
                moveNo: data.orderNo,
                operationId: operationId,
                status: data.status
            });
        }
        
        /*
        const data = this.props.location.state;
        
        */
        this.props.getMoveLines(operationId);
        // debugger 
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.stockMoveLines.tableData !== this.props.stockMoveLines.tableData) {
            let moveLines = this.props.stockMoveLines.tableData.map(item => {
                let data = { ...item};
                if(data.done){
                    data.isDone = true;
                }
                else {
                    data.isDone = false;
                }
                return data;
            })
            this.setState({
                ...this.state,
                lines: moveLines
            })
        }


    }

    handleDate(selectedDay) {
        this.setState({
            date: selectedDay
        })
    }

    editQty(field, value, data) {
        const lineId = data[0];
        const done = data[6];
        this.state.lines.forEach(line => {
            if (line.id === lineId) {
                if (value >= (line.remainingQty)) {
                    line.done = true;
                    line.arrivedQty = value;
                } else { line.arrivedQty = value }
            }
        });

        this.setState({
            ...this.state,
            lines: this.state.lines
        });
    }

    handleDone(checked, data) {
        const lineId = data[0];
        const done = data[6];

        this.state.lines.forEach(line => {
            if (line.id === lineId) {
                if (checked) {
                    line.arrivedQty = data[4];
                    line.done = checked;
                } else {
                    line.done = checked;
                }
            }
        });

        this.setState({
            ...this.state,
            lines: this.state.lines
        });
    }

    saveOperation() {
        let checkPrompt = false;
        this.state.lines.forEach(line => {
            if (line.arrivedQty != line.remainingQty && line.done && !line.isDone) {
                checkPrompt = true;
            }
        });

        if (checkPrompt) {
            this.setState({toggle: true})
        } else {
            let data = this.state;
            delete data.toggle;
            this.props.saveOperationForm(data);
            setTimeout(() => {
                this.props.history.push({
                    pathname: `${url.stockListPage}`,
                });
            }, 500);
        }
    }

    closeModal() {
        this.setState({toggle: false})
    }

    confirmQuantity() {
        let data = this.state;
        delete data.toggle;
        this.setState({toggle: false});
        this.props.saveOperationForm(data);
        this.props.history.push({
            pathname: `${url.stockListPage}`,
        });
    }
    showStatus() {
        if(this.state.status !== ""){
          let status = this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1);
          return "【 "+status+" 】";
        }
        return " "
      }

    render() {
        const columns = [
            {
                name: "id",
                options: { display: "excluded", filter: false, sort: false },
            },
            {
                label: "No",
                name: "lineNumber",
                options: { filter: false, sort: false },
            },
            {
                label: "Part Number",
                name: "partNumber",
                options: { display: 'excluded', filter: false, sort: false },
            },
            {
                label: "Description",
                name: "description",
                options: { 
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        let partNumberIndex = columns.findIndex(x => x.name === "partNumber");
                        let partNumber = tableMeta.rowData[partNumberIndex];
                        return <div> {partNumber}, {value} </div>
                    } 
                }
            },
            { label: "Qty", name: "qty", options: { filter: false,
                customBodyRender: (value, tableMeta) => {
                    let qty = amountRounding(2,value)
                    return (
                        <div>{qty}</div>
                    )
                }
             } },                      
            { label: "Remaining Qty", name: "remainingQty",
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta) => {
                        let remainingQty =amountRounding(2,value)
                        return (
                            <div>{remainingQty}</div>
                        )
                    }
                }
            },
            { label: "Completed Qty", name: "completedQty", options: { filter: false,
                customBodyRender: (value, tableMeta) => {
                    let completedQty =amountRounding(2,value)
                    return (
                        <div>{completedQty}</div>
                    )
                }
             } },
            {
                label: "Done",                                                                          //7
                name: "done",
                options: {
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <StyledCheckbox
                                defaultChecked={value}
                                checked={value}
                                disabled={tableMeta.rowData[8]}
                                onChange={(event) =>
                                    this.handleDone(event.target.checked, tableMeta.rowData)
                                }
                            />
                        )
                    },
                    filter: false,
                },
            },
            {
                label: "Completed Qty",
                name: "arrivedQty",
                options: {
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <div
                                className="d-flex justify-content-center col-sm-12"
                                style={{paddingLeft: '0'}}
                            >
                                <FormInput
                                    value={value}
                                    target="arrivedQty"
                                    disabled={tableMeta.rowData[6] ? true : false}
                                    handleChange={(field, value) => this.editQty(field, value, tableMeta.rowData)}
                                />
                            </div>
                        )
                    },
                    filter: false,
                },
            },
            {
                name: "isDone",
                options: { display: "excluded", filter: false, sort: false }
            }
        ];

        const options = Object.assign({}, listOptions);
        const { tableData, totalCount } = this.props.stockMoveLines;
        const { lines } = this.state;
        return (
            <FormWrapper
            onSave={this.saveOperation}
            disabled={true}
            title="Back To Stock Operation list"
            centerTitle={
             'Update Stock Moves'
            }
            promptMessage={this.showStatus()}
            telThree="test"
            listRedirect={stockListPage}             
          >
                <div className="m-3">Operation No: <span className="ml-3">{this.state.operationNo}</span></div>
                <div className="m-3">Move No: <span className="ml-3">{this.state.moveNo}</span></div>
                <div className="m-3 mb-30">
                    <span>Date: </span>
                    
                    <DayPickerInput                        
                        formatDate={formatDate}
                        parseDate={parseDate}                        
                        format="L"
              // value={deliveryDate}
                        value={`${formatDate(this.state.date, 'L', 'en-SG')}`}
                        selectedDay={this.state.date}
                        placeholder={`${formatDate(new Date(), 'L', 'en-SG')}`}
                        onDayChange={day => this.handleDate(day)}
                        dayPickerProps={{
                            locale: 'en-SG',
                            localeUtils: MomentLocaleUtils,
                        }}
                        style={{ marginLeft: 25, position: 'relative', zIndex: 999 }}
                        inputProps={this.state.status === "closed" ? { disabled: true } : ""}
                    />
                </div>

                <div>
                    <ServerRecordsList hasSearch={false} columns={columns} data={lines} totalCount={totalCount} otherOptions={options}
                       filterFunc={() => console.log('load')}
                    />
                </div>

                

                <DialogRoot
                    show={this.state.toggle}
                    handleHide={() => this.closeModal()}
                    size={'sm'}
                >
                    <div className="m-30">
                        <h3 className="text-center text-danger mb-20">Completed Quantities don't tally with quantities</h3>
                        <h3 className="text-center">Alert Purchaser?</h3>

                        <div className="d-flex justify-content-around">
                            <div>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className="text-white m-30"
                                    onClick={() => this.closeModal()}
                                >
                                    Cancel
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="text-white m-30"
                                    onClick={() => this.confirmQuantity()}
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </DialogRoot>

            </FormWrapper>
        )
    }
}

const mapStateToProps = ({ stocktfesState }) => {
    const { stockMoveLines, filteredStockList } = stocktfesState;
    return { stockMoveLines, filteredStockList };
};

export default connect(mapStateToProps, {
    getMoveLines,
    saveOperationForm,
    getFilterMoves
})(StockOperation);
