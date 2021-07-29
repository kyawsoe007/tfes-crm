import React, { Component } from "react";
import { connect } from "react-redux";
import { show } from "redux-modal";
import MUIDataTable from "../MuiDatatable";
import { listOptions, getDateTime } from "Helpers/helpers";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

//icon
import { IconButton } from "@material-ui/core";
import { Icon } from "@iconify/react";
import baselineDeleteForever from "@iconify/icons-ic/baseline-delete-forever";
import editFilled from "@iconify/icons-ant-design/edit-filled";

const myTheme = createMuiTheme({
  overrides: {
    MUIDataTable: {
      responsiveScroll: {
        maxHeight: "none",
      },
      responsiveScrollMaxHeight: {
        maxHeight: "650px",
      },
    },
    MuiPaper: {
      rounded: { borderRadius: "15px" },
    },
    MuiTableCell: {
      root: { fontFamily: "Lato", borderBottom: "none", padding: "14px" },
    },
    MuiTypography: {
      root: {
        fontFamily: "Lato!important",
      },
      h6: { fontSize: "1rem" },
    },
    MUIDataTableBodyRow: {
      root: {
        "&:nth-child(odd)": {
          backgroundColor: "#F6F8FC",
        },
      },
      hover: {
        "&$hover:hover": {
          backgroundColor: "#FCE8D4 !important",
        },
      },
    },
    MUIDataTableToolbarSelect: {
      root: {
        paddingTop: "0px",
        paddingBottom: "0px",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: "#F00",
        "&$icon": {
          color: "#FF8B19 !important",
        },
        svg: { backgroundColor: "#FCE804" },
      },
      label: {
        color: "#FCE804",
        backgroundColor: "#FCE804",
      },
      active: {
        text: {
          color: "#FFF",
        },
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: "#254065",
      },
    },
    MUIDataTableHeadCell: {
      root: {
        backgroundColor: "#254065 !important",
        color: "#FFFFFF",
        fontFamily: "Lato",
        fontWeight: "bold",
        fontSize: "14px",
      },
    },
    MuiTableRow: {
      root: {
        "&$selected": {
          backgroundColor: "#FCE8D4 !important",
          color: "#FFF",
        },
      },
    },
    MUIDataTableSelectCell: {
      checked: { color: "#FF8B19 !important" },
      root: {
        "&$selected": {
          backgroundColor: "#FCE8D4 !important",
        },
        backgroundColor: "#F6F8FC !important",
      },
      headerCell: {
        backgroundColor: "#254065",
      },
    },
    MuiButton: {
      text: {
        color: "white",
        backgroundColor: "#FF8B19",
        borderRadius: 5,
        border: 0,
        padding: "5px",
        marginLeft: "10px",
      },
      hover: {
        "&$hover:hover": {
          backgroundColor: "#FCE8D4 !important",
        },
      },
    },
  },
});

function getFilters(filterList, columns) {
  let filter = [];
  for (let i = 0; i < filterList.length; i++) {
    let list = filterList[i];
    if (list.length > 0) {
      let property = columns[i].name;
      let val = null;
      for (let a = 0; a < list.length; a++) {
        if (list[a] == undefined) {
          list[a] = 0;
        }
        if (val == null) {
          val = list[a]
        }
        else if (Array.isArray(val)) {
          val.push(list[a]);
        }
        else {
          let v = [val];
          v.push(list[a]);
          val = v;
        }
      }
      filter.push({ [property]: val });
    }
  }
  return filter;
}
function createServerSideList(columns) {
  let list = [];
  for (let i = 0; i < columns.length; i++) {
    let array = [];
    if (columns[i].options.filterList) {
      array = columns[i].options.filterList;
    }
    list.push(array);
  }
  return list;
}
//Takes In Filter Function
//Total Count
class ServerRecordsList extends Component {
  constructor(props) {
    super(props);
    let serverList = createServerSideList(props.columns);
    let columns = [...props.columns];
    if (props.editTrue) {
      serverList.push([]);
    }
    if (props.dropSearch) {
      columns.push({ name: "dropsearch" })
      if (props.dropText) {
        if (Array.isArray(props.dropText)) {
          serverList.push(props.dropText);
        }
        else {
          serverList.push([props.dropText])
        }

      }
      else {
        serverList.push([]);
      }

    }
    let filtered = getFilters(serverList, columns);
    let dropChoices = [];
    if (this.props.dropItems) {
      dropChoices.push(this.props.dropItems[0]);
      dropChoices.push(this.props.dropItems[1]);
      dropChoices.push(this.props.dropItems[2]);
    }
    this.state = {
      limit: 20,
      skip: 0,
      filters: filtered,
      searchText: "",
      orderBy: [],
      // serverSideFilterList: [], //match number of columns
      serverSideFilterList: serverList, //match number of columns
      columns: [],
      sorted: {
      },
      selected: [],
      selectedRows: [],
      bulkAction: "",
      searchDropChoice: dropChoices,
    };
    this.dropText1 = React.createRef();
    this.dropText2 = React.createRef();
    this.dropText3 = React.createRef();
    this.triggerSearch = this.triggerSearch.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.bulkActionGo = this.bulkActionGo.bind(this);
    this.changeBulkAction = this.changeBulkAction.bind(this);
    this.onDropChange = this.onDropChange.bind(this);
    this.onDropType = this.onDropType.bind(this);
    this.startDropSearch = this.startDropSearch.bind(this);
    this.updateTablePage = this.updateTablePage.bind(this);
    this.updateColumnViews = this.updateColumnViews.bind(this);
    // this.updateSkip = this.updateSkip.bind(this);
    // this.delete = this.delete.bind(this);
    // this.edit = this.edit.bind(this);
  }
  handleFilterSubmit(filterList) {
    const filter = getFilters(filterList, this.state.columns);
    this.props.filterFunc(this.state.limit, 0, filter, this.state.searchText, this.state.sorted, this.state.columns);
    this.setState({ filters: filter, serverSideFilterList: filterList, selected: [], selectedRows: [] });
    this.props.getSavedQuery && this.props.getSavedQuery({ filter: filter, filterList: filterList, saved: true })

  }

  // Get new table page number and save/update to global state. 
  updateTablePage(page, skip, limit) {
    this.props.getSavedQuery && this.props.getSavedQuery({ page: page, skip:skip, limit: limit})
  }

  // // Get new skip and save/update to global state. 
  // updateSkip(skip) {
  //   this.props.getSavedQuery && this.props.getSavedQuery({ skip: skip, saved: true })
  // }

  // Get new columns display state and save/update to global state. 
  updateColumnViews(columns){
    let displayList = [];
    for (let i = 0; i < columns.length; i++){
      displayList.push(columns[i].display);
    }
    this.props.getSavedQuery && this.props.getSavedQuery({ display:displayList, saved: true})
  }

  triggerSearch(searchText) {
    clearInterval(this.searchInterval);
    this.props.filterFunc(this.state.limit, this.state.skip, this.state.filters, searchText, this.state.sorted, this.state.columns);
    this.setState({ searchText: searchText, skip: 0, selected: [], selectedRows: [] });
    this.props.getSavedQuery && this.props.getSavedQuery({ searchText: searchText, saved: true })
  }

  changeBulkAction(evt) {
    this.setState({
      bulkAction: evt.target.value,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.needRefresh !== this.props.needRefresh) {
      this.props.filterFunc(this.state.limit, this.state.skip, this.state.filters, this.state.searchText, this.state.sorted, this.state.columns);
    }
  }

  handleSelect(rowsSelected, allRowsSelected) {
    if (rowsSelected.length > 0) {
      //check if user click select all checkbox

      if (rowsSelected.length >= this.state.limit) {
        //user has selected everything
        var contacts = [];
        var selected = [];
        if (this.state.selected.length >= rowsSelected.length) {
          //unselect all
        } else {
          for (let i = 0; i < this.props.totalCount; i++) {
            contacts.push(1);
            selected.push(i);
          }
        }

        this.setState({
          selected: contacts,
          selectedRows: selected,
        });
      } else {
        //initialize contacts
        let contactSelected = [...this.state.selected];
        if (contactSelected.length == 0) {
          for (let i = 0; i < this.props.totalCount; i++) {
            contactSelected.push(0);
          }
        }
        //check if select or deselect
        for (let i = 0; i < rowsSelected.length; i++) {
          if (contactSelected[rowsSelected[i].index + this.state.skip] == 1) {
            contactSelected[rowsSelected[i].index + this.state.skip] = 0;
          } else {
            contactSelected[rowsSelected[i].index + this.state.skip] = 1;
          }
        }
        var selected = [];
        for (let i = this.state.skip; i < this.state.limit + this.state.skip && i < contactSelected.length; i++) {
          if (contactSelected[i] == 1) {
            selected.push(i - this.state.skip);
          }
        }

        this.setState({
          selected: contactSelected,
          selectedRows: selected,
        });
      }
    } else {
      this.setState({
        selected: [],
        selectedRows: [],
      });
    }
  }
  /**
   * DELETE RECORD
   */
  bulkActionGo() {
    var numRows = this.state.selectedRows.length;
    if (this.state.bulkAction == "deleteSelected") {
      this.props.show("alert_delete", {
        name: numRows + "",
        action: () => this.handleDelete(),
      });
    }
  }
  handleDelete() {
    //map selected to correct numbers
    var selectedIds = [];
    for (let i = 0; i < this.state.selected.length; i++) {
      if (this.state.selected[i] == 1) {
        selectedIds.push(i);
      }
    }
    this.props.bulkDelete("delete", selectedIds, this.state.limit, this.state.skip, this.state.filters, this.state.searchText, this.state.sorted, this.state.columns);
    this.setState({
      selected: [],
      selectedRows: [],
    });
  }

  onDropChange(index, value) {
    let choices = [...this.state.searchDropChoice];
    choices[index] = value;
    this.setState({
      searchDropChoice: choices
    })
  }

  onDropType(index, value) {
    let remarks = [...this.state.searchDropRemarks];
    remarks[index] = value;
    this.setState({
      searchDropRemarks: remarks
    })
  }

  startDropSearch() {
    let filterList = [...this.state.serverSideFilterList];



    if (this.dropText1.current.value != "" && this.state.searchDropChoice[0] != "") {
      filterList[filterList.length - 1].push(this.state.searchDropChoice[0] + ":" + this.dropText1.current.value);
    }
    if (this.dropText2.current.value != "" && this.state.searchDropChoice[1] != "") {
      filterList[filterList.length - 1].push(this.state.searchDropChoice[1] + ":" + this.dropText2.current.value);
    }
    if (this.dropText3.current.value != "" && this.state.searchDropChoice[2] != "") {
      filterList[filterList.length - 1].push(this.state.searchDropChoice[2] + ":" + this.dropText3.current.value);
    }



    this.setState({
      searchDropChoice: [this.props.dropItems[0], this.props.dropItems[1], this.props.dropItems[2]],
    });
    this.dropText1.current.value = "";
    this.dropText2.current.value = "";
    this.dropText3.current.value = "";
    this.handleFilterSubmit(filterList);


  }

  render() {
    //server side options
    const options = Object.assign({}, listOptions);
    const { title, columns, data, totalCount, editTrue, edit, deleted, hasSearch, otherOptions } = this.props;
    options.serverSide = true;
    options.count = totalCount;
    options.onTableInit = (action, tableState) => {

      // debugger
      const limit = this.props.savedQuery && this.props.savedQuery.limit ? this.props.savedQuery.limit : tableState.rowsPerPage;
      const skip = this.props.savedQuery && this.props.savedQuery.skip ? this.props.savedQuery.skip : tableState.page * tableState.rowsPerPage;
      if (action == "tableInitialized") {

        let searchText = tableState.searchText;
        let filters = this.state.filters
        let filterList = tableState.filterList

        // debugger
        if (this.props.savedQuery && this.props.savedQuery.saved) {
          searchText = this.props.savedQuery.searchText
          // filters = this.props.savedQuery.filter
          // filterList = this.props.savedQuery.filterList
        }
        this.setState({
          limit: limit,
          skip: skip,
          // serverSideFilterList: tableState.filterList,
          serverSideFilterList: filterList,
          columns: tableState.columns,
          searchText: searchText
        });

        this.props.filterFunc(limit, skip, filters, searchText, this.state.sorted, tableState.columns);

      }
    };
    options.onTableChange = (action, tableState) => {
      const limit = this.props.savedQuery && this.props.savedQuery.limit ? this.props.savedQuery.limit : tableState.rowsPerPage;
      const skip = this.props.savedQuery && this.props.savedQuery.skip ? this.props.savedQuery.skip : tableState.page * tableState.rowsPerPage;
      var selected = [];
      if (this.state.selected.length > 0) {
        for (let i = skip; i < limit + skip && i < this.state.selected.length; i++) {
          if (this.state.selected[i] == 1) {
            selected.push(i - skip);
          }
        }
      }
      switch (action) {
        case "propsUpdate":
          tableState.filterList = this.state.serverSideFilterList;
          break;
        case "changePage":
        case "changeRowsPerPage":
          //filter = getFilters(tableState.filterList, tableState.columns);

          this.setState({ limit, skip, selectedRows: selected });
          this.props.filterFunc(limit, skip, this.state.filters, this.state.searchText, this.state.sorted, this.state.columns);
          break;
      }
    };

    options.onFilterChange = (column, filterList, type) => {
      if (type == "chip") {
        var filter = getFilters(filterList, this.state.columns);
        this.props.filterFunc(this.state.limit, this.state.skip, filter, this.state.searchText, this.state.sorted, this.state.columns);
        this.setState({
          filters: filter,
          serverSideFilterList: filterList,
          selected: [],
          selectedRows: [],
        });
      }
    };


    options.onFilterChipClose = (index, removedFilter, filterList) => {

      var filter = getFilters(filterList, this.state.columns);
      this.props.filterFunc(this.state.limit, this.state.skip, filter, this.state.searchText, this.state.sorted, this.state.columns);
      this.setState({
        filters: filter,
        serverSideFilterList: filterList,
        selected: [],
        selectedRows: []
      })

    }

    if (hasSearch) {
      options.search = true;
      // debugger
      options.onSearchChange = (searchText) => {

        if (searchText == null) {
          this.setState({ searchText: "" });
          this.triggerSearch("");
        } else if (searchText.length > 1) {
          clearInterval(this.searchInterval);
          this.searchInterval = setInterval(this.triggerSearch, 1000, searchText);
        }
      };

      options.onSearchClose = () => {
        this.setState({ searchText: "" });
        this.triggerSearch("");
      };
    }
    else if (this.props.dropSearch) {
      options.search = true;
      options.customSearchRender = (searchText, handleSearch, hideSearch, options) => {
        return (
          <React.Fragment>

            <Select style={{ width: "13%", marginRight: "15px", marginTop: "15px", marginLeft: "15px" }} value={this.state.searchDropChoice[0]} onChange={(e) => this.onDropChange(0, e.target.value)} >
              {
                this.props.dropItems && this.props.dropItems.map(di => (
                  <MenuItem key={di} value={di}>
                    {di}
                  </MenuItem>
                ))
              }

            </Select>

            <TextField style={{ width: "15%" }} inputRef={this.dropText1} label="Search Text" variant="standard" onKeyDown={(e) => {
              if (e.key === 'Enter') {
                this.startDropSearch();
              }
            }} />
            <Select style={{ width: "13%", marginRight: "15px", marginTop: "15px", marginLeft: "15px" }} value={this.state.searchDropChoice[1]} onChange={(e) => this.onDropChange(1, e.target.value)} >
              {
                this.props.dropItems && this.props.dropItems.map(di => (
                  <MenuItem key={di} value={di}>
                    {di}
                  </MenuItem>
                ))
              }

            </Select>

            <TextField style={{ width: "15%" }} inputRef={this.dropText2} label="Search Text" variant="standard" onKeyDown={(e) => {
              if (e.key === 'Enter') {
                this.startDropSearch();
              }
            }} />
            <Select style={{ width: "13%", marginRight: "15px", marginTop: "15px", marginLeft: "15px" }} value={this.state.searchDropChoice[2]} onChange={(e) => this.onDropChange(2, e.target.value)} >
              {
                this.props.dropItems && this.props.dropItems.map(di => (
                  <MenuItem key={di} value={di}>
                    {di}
                  </MenuItem>
                ))
              }

            </Select>

            <TextField style={{ width: "15%" }} inputRef={this.dropText3} id="outlined-basic" label="Search Text" variant="standard" onKeyDown={(e) => {
              if (e.key === 'Enter') {
                this.startDropSearch();
              }
            }} />
            <Button onClick={this.startDropSearch}>Search</Button>
          </React.Fragment>
        );
      }
    }
    else {
      options.search = false;
    }

    options.onColumnSortChange = (column, direction) => {
      //var orderString = column;

      var sorted = { [column]: -1 };
      if (direction == "ascending") {
        //orderString += " DESC";

        //orderString += " ASC";
        sorted[column] = 1;
      }
      this.setState({
        sorted: sorted,
      });

      this.props.filterFunc(this.state.limit, this.state.skip, this.state.filters, this.state.searchText, sorted, this.state.columns);
    };

    options.sort = true;

    // options.selectableRows = "multiple";
    options.selectableRows = "none";


    options.onRowsSelect = this.handleSelect;
    options.rowsSelected = this.state.selectedRows;
    options.searchText = this.state.searchText;
    options.filterType = "dropdown";
    options.serverSideFilterList = this.state.serverSideFilterList;
    options.customFilterDialogFooter = (filterList) => {
      return (
        <div style={{ marginTop: "40px" }}>
          <Button className="btn-success text-white" variant="contained" onClick={() => this.handleFilterSubmit(filterList)}>
            Search
          </Button>
        </div>
      );
    };
    options.customToolbarSelect = (selectedRows, displayData, setSelectedRows) => (
      <div className="p-10">
        Bulk Action : &nbsp;
        <FormControl>
          <Select className="formSelect" value={this.state.bulkAction} onChange={this.changeBulkAction}>
            <MenuItem disabled value="">
              <em>Select the action</em>
            </MenuItem>
            <MenuItem value="deleteSelected">Delete Selected</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={this.bulkActionGo}>GO</Button>
      </div>
    );

    let allOptions = { ...options, ...otherOptions };
    var cols = [...columns];
    if (editTrue) {
      cols.push(
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
                      edit(tableMeta.rowData[0]);
                    }}
                  >
                    <Icon className="tableEditIcon" icon={editFilled} color="#595959" width="1.5rem" height="1.5rem" />
                  </IconButton>
                  <IconButton
                    size="small"
                    className="tableDeleteIcon"
                    onClick={() => {
                      deleted(tableMeta.rowData[0], tableMeta.rowData[1]);
                    }}
                  >
                    <Icon icon={baselineDeleteForever} color="#595959" width="1.5rem" height="1.5rem" />
                  </IconButton>
                </div>
              );
            },
          },
        });
    }
    if (this.props.dropSearch) {
      cols.push({
        name: "dropsearch",
        options: {
          display: 'none',
          sort: false,
          filter: false
        }

      })
    }


    for (let i = 0; i < cols.length; i++) {
      // console.log("ASDASDASD", cols)
      if (cols[i].options.filter || cols[i].name == "dropsearch") {

        cols[i].options.filterList = this.state.serverSideFilterList[i];


      }
      let keys = Object.keys(this.state.sorted);
      if (cols[i].name == keys[0]) {
        if (this.state.sorted[keys[0]] == -1) {
          cols[i].options.sortDirection = "desc";
        }
        else {
          cols[i].options.sortDirection = "asc";
        }

      }
    }

    return (
      <React.Fragment>
        <MuiThemeProvider theme={myTheme}>
          {/* <MUIDataTable title={title} columns={columns} data={data} options={options} /> */}
          <MUIDataTable 
          title={title} 
          columns={cols} 
          data={data} 
          options={allOptions} 
          searchText={this.state.searchText} 
          updateTablePage={this.updateTablePage}
          updateColumnViews={this.updateColumnViews}
          savedQuery={this.props.savedQuery} />
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}
// export default ServerRecordsList;

const mapStateToProps = () => {
  return {}
};
// const mapStateToProps = ({ crmState })
export default connect(mapStateToProps, { show })(ServerRecordsList);
