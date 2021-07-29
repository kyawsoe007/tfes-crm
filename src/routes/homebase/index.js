import React, { Component } from "react";
import { connect } from "react-redux";

// sub components
import Helmet from "Components/Helmet";

import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// Widgets

import CalendarLayout from "Components/Widgets/Calendar/CalendarLayout";
import CrmSummary from "Components/Widgets/CrmSummary";
import UntouchedLeadsTable from "Components/Widgets/UntouchedLeadsTable";
import DisplayEvents from "../../components/Widgets/Calendar/DisplayEvents";
import { getAllEvents } from "Ducks/calendar";
import Moment from "moment";

const numberOfDays = 6;

class Homebase extends Component {

  componentDidMount() {

    const userId = localStorage.getItem("user_id");

    this.props.getAllEvents(
      false,
      new Date().toISOString(),
      Moment(new Date())
        .add(numberOfDays, "day")
        .toISOString(),
      userId
    );
  }

  

  render() {



    const { name } = this.props;
    return (
      <React.Fragment>
        <Helmet title="Homebase" />
        <PageTitleBar title={`Hello ${name},`} noBack />
        <CrmSummary />
        <div className="row">
          <div className="col-md-8 "   style={{
                maxHeight: 580,
                overflow: "auto",
              }} >
      
            <DisplayEvents
            myEvents={this.props.myEvents.length > 0 ? this.props.myEvents : []}
          />
          
          
          </div>
          
          <div className="col-md-4">
            <CalendarLayout />
            <hr/>
         
    
          </div>
          <div className="col-md-8 pt-40 ">
           
          <UntouchedLeadsTable />
          </div>
        </div>
 
      </React.Fragment>
    );
  }
}
const mapStateToProps = ({ sessionState, calendarState }) => {
  const { authState } = sessionState;
  const { name } = authState.loggedInUser;
  const { myEvents } = calendarState;
  return { name, myEvents };
};

export default connect(mapStateToProps, {getAllEvents})(Homebase);
