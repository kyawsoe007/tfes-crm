import React, { Component } from "react";

// page req
import Helmet from "Components/Helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

//Page Req
import ReportViews from "./components/Views";

// Side Drawer
import SideDrawer from "Components/SideDrawer";
import DrawerListCollapsible from "Components/SideDrawer/DrawerListCollapsible";
import DrawerListItem from "Components/SideDrawer/DrawerListItem";

class ReportsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeView: "",
      nestedView: {
        // leads: false,
        deals: true,
        acctcust: true,
        closedDeals: true,
        sales: true,
        custAnalysis: true
      },
      dateRange: { startDate: null, endDate: null, focusedInput: null }
    };
    this.handleNestedView = this.handleNestedView.bind(this);
    this.onSelectView = this.onSelectView.bind(this);
  }

  handleNestedView(view) {
    this.setState({
      ...this.state,
      nestedView: {
        ...this.state.nestedView,
        [view]: !this.state.nestedView[view]
      }
    });
  }

  onSelectView(view) {
    this.setState({
      ...this.state,
      activeView: view
    });
  }

  render() {
    const renderList = [
      {
        title: "Deals",
        stateName: "deals",
        nestedList: [
          { title: "Deals By Owner", stateName: "dealsByOwner" },
          { title: "Deals Pipeline", stateName: "dealsPipeline" },
          { title: "Deals By Source", stateName: "dealsBySource" }
        ]
      },
      {
        title: "Customer Analysis",
        stateName: "custAnalysis",
        nestedList: [
          {
            title: "Top Spender Report (Customers)",
            stateName: "topSpenderCustomer"
          },
          {
            title: "Demographic",
            stateName: "custDemographic"
          }
        ]
      },
      {
        title: "Sales Report",
        stateName: "sales",
        nestedList: [
          {
            title: "Individual Report",
            stateName: "individualReport"
          },
          {
            title: "Products Sold",
            stateName: "topSeller"
          },
          {
            title: "Commission Report",
            stateName: "commission"
          }
        ]
      }
    ];
    const { nestedView, activeView } = this.state;

    return (
      <div className="todo-dashboard">
        <Helmet title="Reports" metaDesc="Everyday Informational Reports" />
        <PageTitleBar title="Reports" />
        <div className="row">
          <div className="col-lg-2">
            <SideDrawer listHeader="Reports List">
              {renderList.map((list, key) =>
                list.nestedList.length > 0 ? (
                  <DrawerListCollapsible
                    key={key}
                    title={list.title}
                    state={nestedView[list.stateName]}
                    openNested={() => this.handleNestedView(list.stateName)}
                  >
                    {list.nestedList.map((nest, index) => (
                      <DrawerListItem
                        key={index}
                        onClickListItem={() =>
                          this.onSelectView(nest.stateName)
                        }
                        title={nest.title}
                        secondary
                        selected={activeView == nest.stateName}
                      />
                    ))}
                  </DrawerListCollapsible>
                ) : (
                  <DrawerListItem
                    key={key}
                    onClickListItem={() => this.onSelectView(list.stateName)}
                    title={list.title}
                    selected={activeView == list.stateName}
                  />
                )
              )}
            </SideDrawer>
          </div>
          <div className="col-lg-10">
            <ReportViews componentToRender={activeView} />
          </div>
        </div>
      </div>
    );
  }
}

export default ReportsComponent;
