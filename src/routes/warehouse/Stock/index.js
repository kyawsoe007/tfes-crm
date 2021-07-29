import React, { Component } from "react";
import {connect} from "react-redux";
import moment from "moment";

import ServerRecordsList from "Components/ServerRecordsList";
import { listOptions, getDateTime, getDate } from "Helpers/helpers";
import * as url from "Helpers/warehouseURL";

import {IconButton} from "@material-ui/core";
import {Icon} from "@iconify/react";
import editFilled from "@iconify/icons-ant-design/edit-filled";

//import Ducks
import { getAllStocks, getFilterStocks, getSavedStockQuery } from "Ducks/stocktfes";
import {stockOperationStatus } from 'Constants/modelStatus';
class StockList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        //this.props.getFilterStocks();
    }

    edit(rowData) {
        const id = rowData[0];
        this.props.history.push({
            pathname: `${url.stockListPage}/${id}`,
        });
    }

    render() {
        const columns = [
            {
                name: "id",
                options: { display: "excluded", filter: false, sort: false },
            },
            {
                label: "Move Num",
                name: "moveNo",
                options: { filter: false, sort: false },
            },
            { label: "Type", name: "type", options: { 
                filter: true,
                filterType: "dropdown",
                filterOptions: { names: ["Incoming", "Outgoing", "Internal"]},
                filterList: ["Incoming"]
            
            } },
            { label: "Order No", name: "orderNo", options: { filter: false } },
            { label: "Partner", name: "partner", options: { filter: false }},
            {
                label: "Destination",
                name: "destination",
                options: {
                    customBodyRender: (value, tableMeta) => { 
                        //find status
                        let returnVal = "";
                        let stateIndex = columns.findIndex(x => x.name == "status")
                        if(stateIndex >= 0){
                            if(tableMeta.rowData[stateIndex] == stockOperationStatus.CLOSED){
                                returnVal = value && value.name ? value.name: "";
                            }
                        }                        
                        return <div>{returnVal }</div> 
                    }
                    ,
                    filter: false,
                },
            },
            { label: "Status", name: "status", options: { 
                filter: true,
                filterType: "checkbox",
                filterOptions:  { names: Object.values(stockOperationStatus)},
                filterList: [stockOperationStatus.OPEN, stockOperationStatus.PARTIAL],
                customFilterListOptions:{
                render: (v) => `Status: ${v}`
                }
            
            } },
            {
                label: "Create date",
                name: "createdAt",
                options: {
                    filter: false,
                    customBodyRender: (value) => (
                        <div>{moment(value).format('DD/MM/YYYY')}</div>
                    )
                  },
            },
            {
                label: "Expected Date",
                name: "expectedDate",
                options: {
                    filter: false,
                    customBodyRender: (value) => (
                        <div>{moment(value).format('DD/MM/YYYY')}</div>
                    )
                  },
            },
            {
                label: "Completed Date",
                name: "completedDate",
                options: {
                    customBodyRender: (value, tableMeta) => {
                        return <div>{value ? moment(value).format('DD/MM/YYYY') : ''}</div>
                    },
                    filter: false,
                },
            },
            {
                label: "Action",
                name: "action",
                options: {
                    filter: false,
                    sort: false,
                    customBodyRender: (value, tableMeta) => {
                        return (
                            <div>
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        this.edit(tableMeta.rowData);
                                    }}
                                >
                                    <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                                </IconButton>
                            </div>
                        );
                    },
                },
            },
        ];

        // dynamically adds back filter list based on the props 
        for (var i = 0; i < columns.length; i++) {
            // FOR FILTERS
            if (this.props.SavedQuery.saved){
                columns[i].options.filterList = this.props.SavedQuery.filterList[i];
            } else{
                // sets default filter list for status on first load 
                if (columns[i].name === 'status') {
                    columns[i].options.filterList = [stockOperationStatus.OPEN, stockOperationStatus.PARTIAL];
                } else {
                    columns[i].options.filterList = []
                }
            }

            // FOR COLUMNS
            if(this.props.SavedQuery.display){
                columns[i].options.display = this.props.SavedQuery.display[i];
            }
        }

        const options = Object.assign({}, listOptions);

        const { tableData, totalCount } = this.props.filteredStockList;
        return (
            <div>
            <div style={{
              width:"50%",
              margin:"10px auto",
              minWidth:"400px",
              color:"#2b4da0",
              fontWeight:"bolder",
              fontSize:"18px",
              textAlign:"center", 
              }} > Stock Management
            </div>
            <ServerRecordsList 
                title="" 
                hasSearch={true} 
                columns={columns} 
                data={tableData} 
                totalCount={totalCount} 
                otherOptions={options}
                filterFunc={this.props.getFilterStocks}
                savedQuery={this.props.SavedQuery}
                getSavedQuery={this.props.getSavedStockQuery}
            />
            </div>
        )
    }
}

const mapStateToProps = ({ stocktfesState }) => {
    const { stockList, filteredStockList, SavedQuery } = stocktfesState;
    return { stockList, filteredStockList, SavedQuery };
};

export default connect(mapStateToProps, {
    getAllStocks,
    getFilterStocks,
    getSavedStockQuery
})(StockList);
