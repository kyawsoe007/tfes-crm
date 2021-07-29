import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import moment from "moment";
import ServerRecordsList from "Components/ServerRecordsList";
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import { singleStockExpense, stockExpenseSinglePage } from "Helpers/warehouseURL";
import * as url from "Helpers/warehouseURL";
// Icons
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import VisibilityIcon from '@material-ui/icons/Visibility';
import editFilled from "@iconify/icons-ant-design/edit-filled";
import addFilled from '@iconify/icons-carbon/add-filled';
import baselineDeleteForever from '@iconify/icons-ic/baseline-delete-forever';
//import Ducks
import {
    getAllStockExpenses,
    deleteStockExpense,
    getSavedStockExpenseQuery
} from "Ducks/stockexpensetfes";
import { getAllStocks, getFilterStocks } from "Ducks/stocktfes";
class StockExpenseListView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getAllStockExpenses();
    }
    delete(id, number) {
        this.props.show("alert_delete",
            {
                name: number,
                action: () => this.props.deleteStockExpense(id),
            });
    }
    edit(rowData) {
        const id = rowData[0];
        console.log("edit(rowData) ", id)
        this.props.history.push({
            pathname: `${url.stockExpenseListPage}/${id}`,
            state: { isDuplicate: true }
        });
        // this.props.history.push({ pathname: singleStockExpense(id), state: { view: false } })
    }
    view(id) {
        this.props.history.push({ pathname: singleStockExpense(id), state: { view: true } })
    }
    onCreateNew() {
        this.props.history.push(stockExpenseSinglePage, { isNewPage: true })
    }
    render() {
        const columns = [
            {
                name: "id",
                options: { display: "excluded", filter: false, sort: false },
            },
            // 
            { label: "TFES PIC", name: "TfesPic", options: { filter: false, sort: false } },

            {
                label: "Status", name: "status", options: {
                    filter: true,
                    sort: false,
                    filterType: "checkbox",
                    filterOptions: { names: ["draft", "closed"] },
                }
            },
            {
                label: "Date",
                name: "date",
                options: {
                    filter: false,
                    customBodyRender: (value) => (
                        <div>{moment(value).format('DD/MM/YYYY')}</div>
                    )
                },
            },

            {
                label: "Remarks",
                name: "remarks",
                options: { filter: false, sort: false },
            },
            {
                label: "Action",
                name: "action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        //get the status row
                        let statusIndex = columns.findIndex(x => x.name === "status")
                        let status = "";
                        if (statusIndex > 0) {
                            status = tableMeta.rowData[statusIndex];
                        }
                        return (
                            <div>
                                {
                                    status != "closed" &&

                                    (<IconButton
                                        size="small"
                                        onClick={() => {
                                            this.edit(tableMeta.rowData);
                                        }}
                                    >
                                        <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                                    </IconButton>)
                                }
                                { status != "closed" && (
                                    <IconButton
                                        size="small" className="tableDeleteIcon"
                                        onClick={() => { this.delete(tableMeta.rowData[0], tableMeta.rowData[1]) }}
                                    >
                                        <Icon
                                            icon={baselineDeleteForever}
                                            color="#595959"
                                            width="1.5rem"
                                            height="1.5rem"
                                        />
                                    </IconButton>
                                )}
                                <IconButton
                                    size="small"
                                    onClick={() => { this.view(tableMeta.rowData[0]) }}>
                                    <VisibilityIcon
                                        color="#595959"
                                        width="1.5rem"
                                        height="1.5rem"
                                    />
                                </IconButton>
                            </div>
                        );
                    },
                },
            },
        ];
        // should change after redux completed
        const { data } = this.props.allStockExpenses

        const totalCount = 3;

        // dynamically adds back filter list based on the props 
        for (var i = 0; i < columns.length; i++) {
            // FOR FILTERS
            if (this.props.SavedQuery.saved) {
                columns[i].options.filterList = this.props.SavedQuery.filterList[i];
            } else {
                columns[i].options.filterList = [];
            }

            // FOR COLUMNS
            if(this.props.SavedQuery.display){
                columns[i].options.display = this.props.SavedQuery.display[i];
            }
        }

        const options = Object.assign({}, listOptions);
        options.customToolbar = () => {
            return (
                <IconButton size="small"
                    onClick={() => this.onCreateNew()}
                >
                    <Icon
                        className="tableEditIcon"
                        icon={addFilled}
                        color="#df0021"
                        width="2rem"
                        height="2rem"
                    />
                </IconButton>
            );
        };




        return (
            <div>
                <div style={{
                    width: "50%",
                    margin: "10px auto",
                    minWidth: "400px",
                    color: "#2b4da0",
                    fontWeight: "bolder",
                    fontSize: "18px",
                    textAlign: "center",
                }} > Stock Expenses
            </div>
                <ServerRecordsList
                    title=""
                    hasSearch={true}
                    columns={columns}
                    data={data}
                    totalCount={totalCount}
                    otherOptions={options}
                    // should change after redux completed
                    filterFunc={() => console.log('no filter')}
                    savedQuery={this.props.SavedQuery}
                    getSavedQuery={this.props.getSavedStockExpenseQuery}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ stocktexpensetfesState }) => {
    const { allStockExpenses, singleStockExpense, SavedQuery } = stocktexpensetfesState
    return { allStockExpenses, singleStockExpense, SavedQuery };
};

export default connect(mapStateToProps, {
    getAllStockExpenses,
    deleteStockExpense,
    getFilterStocks,
    show,
    getSavedStockExpenseQuery
})(StockExpenseListView);
